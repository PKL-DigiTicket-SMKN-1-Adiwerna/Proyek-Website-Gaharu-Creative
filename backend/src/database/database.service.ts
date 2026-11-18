import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';
import { configurePgTypes, parseRow, toHttpError, toPgParams } from './sql.util';

/**
 * Akses basis data tunggal untuk seluruh backend (Supabase / Postgres).
 * Skema tidak dibuat di runtime: semua perubahan skema lewat migrasi di
 * `db/migrations` supaya struktur di cloud dan lokal tidak pernah berbeda.
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool!: Pool;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const connectionString = this.config.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL belum diisi. Ambil connection string Postgres dari dashboard Supabase, lalu tulis di backend/.env',
      );
    }
    configurePgTypes();
    const poolConfig: PoolConfig = {
      connectionString,
      max: Number(this.config.get('DB_POOL_MAX') ?? 5),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 15_000,
    };
    if (!connectionString.includes('sslmode=')) {
      poolConfig.ssl = { rejectUnauthorized: false };
    }
    this.pool = new Pool(poolConfig);
    this.pool.on('error', (err) => this.logger.error(`Koneksi Postgres bermasalah: ${err.message}`));
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }

  private async query(sql: string, params: any[] = []) {
    try {
      return await this.pool.query(toPgParams(sql), params);
    } catch (err) {
      throw toHttpError(err);
    }
  }

  async all(sql: string, params: any[] = []): Promise<any[]> {
    const res = await this.query(sql, params);
    return res.rows.map(parseRow);
  }

  async get(sql: string, params: any[] = []): Promise<any | null> {
    const res = await this.query(sql, params);
    return res.rows[0] ? parseRow(res.rows[0]) : null;
  }

  async run(sql: string, params: any[] = []): Promise<{ changes: number }> {
    const res = await this.query(sql, params);
    return { changes: res.rowCount ?? 0 };
  }

  /** Dipakai endpoint /health untuk memastikan koneksi ke Supabase hidup. */
  async ping(): Promise<boolean> {
    const res = await this.pool.query('select 1 as ok');
    return res.rows[0]?.ok === 1;
  }
}
