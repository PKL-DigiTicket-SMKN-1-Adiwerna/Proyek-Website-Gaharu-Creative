import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import Database from 'better-sqlite3';
import * as bcrypt from 'bcryptjs';
import { SEED_SERVICES, SEED_PORTFOLIO, SEED_ARTICLES, SEED_STATS, SEED_STORIES, SEED_VALUES, SEED_TEAM, SEED_MISSION, SEED_VISION, SEED_CLIENTS } from './seed-data';

function parseRow(row: any): any {
  if (!row || typeof row !== 'object') return row;
  const out: any = {};
  for (const k of Object.keys(row)) {
    let v = row[k];
    if (typeof v === 'string') {
      const t = v.trim();
      if (t.startsWith('{') || t.startsWith('[')) {
        try { v = JSON.parse(t); } catch { /* keep */ }
      }
    }
    if (/^is_/i.test(k) && (v === 0 || v === 1)) {
      v = v === 1;
    }
    out[k] = v;
  }
  return out;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'viewer',
  avatar_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '{}',
  is_public INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by TEXT
);
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  slug TEXT NOT NULL,
  tag TEXT,
  name TEXT NOT NULL,
  short_desc TEXT,
  problem TEXT,
  solution TEXT,
  deliverables TEXT NOT NULL DEFAULT '[]',
  icon TEXT,
  cover_path TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_featured INTEGER NOT NULL DEFAULT 1,
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  deleted_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_by TEXT,
  updated_by TEXT
);
CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  suffix TEXT,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS portfolio_items (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  category_id TEXT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  result_badge TEXT,
  body TEXT,
  cover_path TEXT,
  cover_alt TEXT,
  client_name TEXT,
  industry TEXT,
  project_date TEXT,
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  deleted_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_by TEXT,
  updated_by TEXT
);
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  category_id TEXT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  cover_path TEXT,
  cover_alt TEXT,
  author_id TEXT,
  author_name TEXT,
  read_minutes INTEGER,
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  scheduled_at TEXT,
  deleted_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by TEXT
);
CREATE TABLE IF NOT EXISTS about_stories (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  title TEXT NOT NULL,
  label TEXT,
  description TEXT NOT NULL,
  image_path TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS mission_vision (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS company_values (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo_path TEXT,
  photo_alt TEXT,
  linkedin_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  group_id TEXT,
  locale TEXT NOT NULL DEFAULT 'id',
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'pemerintah',
  logo_path TEXT,
  logo_alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT,
  budget_range TEXT,
  message TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'id',
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  internal_notes TEXT,
  assigned_to TEXT,
  admin_replied_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db!: Database.Database;
  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const dbPath = this.config.get<string>('DB_PATH') ?? './data/gaharu.db';
    const dir = path.dirname(path.resolve(dbPath));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this.db = new Database(path.resolve(dbPath));
    this.db.pragma('journal_mode = WAL');
    this.db.exec(SCHEMA);
    // seed admin user if none
    const count = (this.db.prepare('SELECT COUNT(*) as c FROM profiles').get() as any).c;
    if (count === 0) {
      const email = this.config.get<string>('ADMIN_EMAIL') ?? 'admin@gmail.com';
      const password = this.config.get<string>('ADMIN_PASSWORD') ?? 'GaharuAdmin2026!';
      const hash = bcrypt.hashSync(password, 10);
      this.db.prepare('INSERT INTO profiles (id,email,password_hash,full_name,role,is_active) VALUES (?,?,?,?,?,1)')
        .run(crypto.randomUUID(), email, hash, 'Administrator', 'superadmin');
    }
    // auto-seed content if empty
    const svcCount = (this.db.prepare('SELECT COUNT(*) as c FROM services').get() as any).c;
    if (svcCount === 0) {
      const now = new Date().toISOString();
      for (const s of SEED_SERVICES) {
        this.db.prepare('INSERT INTO services (id,group_id,locale,slug,tag,name,short_desc,icon,sort_order,is_featured,is_published,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', s.slug, s.tag, s.name, s.short_desc, s.icon, 0, 1, 1, now, now, now);
      }
      for (const p of SEED_PORTFOLIO) {
        this.db.prepare('INSERT INTO portfolio_items (id,group_id,locale,slug,title,client_name,industry,summary,result_badge,cover_path,cover_alt,is_published,published_at,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', p.slug, p.title, p.client_name, p.industry, p.summary, p.result_badge, p.cover_path, p.cover_alt, 1, now, 0, now, now);
      }
      for (const a of SEED_ARTICLES) {
        this.db.prepare('INSERT INTO articles (id,group_id,locale,slug,title,excerpt,body,cover_path,cover_alt,is_published,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', a.slug, a.title, a.excerpt, a.body, a.cover_path, a.cover_alt, 1, a.published_at, now, now);
      }
      for (let i=0;i<SEED_STATS.length;i++){
        const s=SEED_STATS[i];
        this.db.prepare('INSERT INTO stats (id,group_id,locale,label,value,sort_order,is_published) VALUES (?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', s.label, s.value, s.sort_order ?? i, 1);
      }
      for (let i=0;i<SEED_STORIES.length;i++){
        const s=SEED_STORIES[i];
        this.db.prepare('INSERT INTO about_stories (id,group_id,locale,title,description,sort_order,is_published) VALUES (?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', s.title, s.body, s.sort_order ?? i, 1);
      }
      for (let i=0;i<SEED_VALUES.length;i++){
        const v=SEED_VALUES[i];
        this.db.prepare('INSERT INTO company_values (id,group_id,locale,title,description,sort_order,is_published) VALUES (?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', v.title, v.description, v.sort_order ?? i, 1);
      }
      for (let i=0;i<SEED_TEAM.length;i++){
        const t=SEED_TEAM[i];
        this.db.prepare('INSERT INTO team_members (id,group_id,locale,name,role,bio,sort_order,is_published) VALUES (?,?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', t.name, t.role, t.bio, t.sort_order ?? i, 1);
      }
      // mission/vision
      const mId = crypto.randomUUID();
      this.db.prepare('INSERT INTO mission_vision (id,group_id,locale,kind,title,description,sort_order) VALUES (?,?,?,?,?,?,?)')
        .run(mId, crypto.randomUUID(), 'id', 'misi', 'Misi', SEED_MISSION, 0);
      const vId = crypto.randomUUID();
      this.db.prepare('INSERT INTO mission_vision (id,group_id,locale,kind,title,description,sort_order) VALUES (?,?,?,?,?,?,?)')
        .run(vId, crypto.randomUUID(), 'id', 'visi', 'Visi', SEED_VISION, 0);
    }
    // mitra / klien: dipisah dari blok di atas supaya basis data yang sudah terisi
    // layanan ikut mendapat tabel clients saat pertama kali dibaca
    const clientCount = (this.db.prepare('SELECT COUNT(*) as c FROM clients').get() as any).c;
    if (clientCount === 0) {
      const now = new Date().toISOString();
      for (let i = 0; i < SEED_CLIENTS.length; i++) {
        const c = SEED_CLIENTS[i];
        this.db.prepare('INSERT INTO clients (id,group_id,locale,name,slug,category,logo_path,logo_alt,sort_order,is_published,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)')
          .run(crypto.randomUUID(), crypto.randomUUID(), 'id', c.name, c.slug, c.category,
            `/logos/klien/${c.logo}`, c.name, i, 1, now, now);
      }
    }
  }

  all(sql: string, params: any[] = []): any[] {
    return this.db.prepare(sql).all(...params).map(parseRow);
  }
  get(sql: string, params: any[] = []): any {
    const r = this.db.prepare(sql).get(...params);
    return r ? parseRow(r) : null;
  }
  run(sql: string, params: any[] = []): any {
    return this.db.prepare(sql).run(...params);
  }
  exec(sql: string): void {
    this.db.exec(sql);
  }
  raw(): Database.Database {
    return this.db;
  }
}
