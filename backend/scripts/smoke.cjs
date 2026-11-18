// Skrip smoke test: CRUD semua resource admin + kirim inquiry publik + baca semua endpoint publik.
// Butuh server hidup (`npm run start:dev` atau `node dist/src/main.js`) dan `.env` yang valid.
// Pakai: npm run smoke   (opsional SMOKE_API=http://localhost:3000)
// Setiap perubahan data dibersihkan lagi, dan jumlah baris dibandingkan sebelum/sesudah.
require('dotenv').config({ path: __dirname + '/../.env' });
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

const API = (process.env.SMOKE_API || 'http://localhost:3100') + '/api/v1';
const EMAIL = 'verifikasi.minju@gaharu.test';
const PASSWORD = crypto.randomBytes(18).toString('base64url') + 'Aa1!';
const RESULTS = [];
const ok = (label, pass, extra = '') => { RESULTS.push(`${pass ? 'OK   ' : 'GAGAL'} ${label}${extra ? ' | ' + extra : ''}`); return pass; };

const TABLES = ['services', 'clients', 'stats', 'portfolio_items', 'articles', 'about_stories', 'mission_vision', 'company_values', 'team_members', 'settings', 'contact_inquiries'];

(async () => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const before = {};
  let userId = null;
  const created = []; // [metode, url]

  const counts = async () => {
    const out = {};
    for (const t of TABLES) out[t] = (await pool.query(`select count(*)::int n from public.${t}`)).rows[0].n;
    return out;
  };
  let H = null;

  const call = async (method, path, body) => {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: H,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* respons tanpa body (204) */ }
    return { status: res.status, json, text };
  };

  const crud = async (label, path, payload, patch) => {
    const c = await call('POST', path, payload);
    const id = c.json?.data?.id ?? null;
    const passCreate = (c.status === 201 || c.status === 200) && !!id;
    ok(`POST ${path}`, passCreate, `HTTP ${c.status} ${passCreate ? '' : c.text.slice(0, 160)}`);
    if (!id) return null;
    if (patch) {
      const p = await call('PATCH', `${path}/${id}`, patch);
      ok(`PATCH ${path}/:id`, p.status === 200, `HTTP ${p.status} ${p.status === 200 ? '' : p.text.slice(0, 160)}`);
    }
    return id;
  };

  try {
    before.counts = await counts();
    before.settingsKeys = (await pool.query('select key from public.settings')).rows.map((r) => r.key);
    before.mission = (await pool.query("select id, kind, description from public.mission_vision")).rows;
    const user = await supabase.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (user.error) throw new Error('createUser: ' + user.error.message);
    userId = user.data.user.id;
    const upd = await pool.query("update public.profiles set role = 'superadmin', is_active = true where id = $1", [userId]);
    ok('user uji + profil siap', upd.rowCount === 1);

    const login = await fetch(`${API}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });
    const loginBody = await login.json().catch(() => ({}));
    ok('POST /auth/login (Supabase Auth)', login.status === 200 && !!loginBody.access_token, `HTTP ${login.status}`);
    H = { 'Content-Type': 'application/json', Authorization: `Bearer ${loginBody.access_token}` };

    // --- CRUD tiap resource ---
    created.push(['services', await crud('layanan', '/admin/services',
      { slug: 'uji-minju', tag: 'UJI', name: 'Layanan Uji', deliverables: ['a', 'b'], is_published: true },
      { name: 'Layanan Uji (ubah)', is_published: false })]);
    created.push(['clients', await crud('klien', '/admin/clients',
      { name: 'Klien Uji Minju', category: 'pemerintah', is_published: true },
      { name: 'Klien Uji (ubah)', category: 'swasta', is_published: false })]);
    created.push(['portfolio_items', await crud('portofolio', '/admin/portfolio',
      { slug: 'uji-minju', title: 'Portofolio Uji', is_published: true },
      { title: 'Portofolio Uji (ubah)', is_published: false })]);
    created.push(['articles', await crud('artikel', '/admin/articles',
      { slug: 'uji-minju', title: 'Artikel Uji', is_published: true },
      { title: 'Artikel Uji (ubah)', is_published: false })]);
    created.push(['stats', await crud('statistik', '/admin/stats',
      { label: 'Uji Minju', value: 42, is_published: true }, { label: 'Uji Minju (ubah)' })]);
    created.push(['about_stories', await crud('cerita', '/admin/about/stories',
      { title: 'Cerita Uji', body: 'Deskripsi uji' }, { title: 'Cerita Uji (ubah)' })]);
    created.push(['company_values', await crud('nilai', '/admin/about/values',
      { title: 'Nilai Uji', description: 'Deskripsi uji' }, { title: 'Nilai Uji (ubah)' })]);
    created.push(['team_members', await crud('tim', '/admin/about/team',
      { name: 'Anggota Uji', role: 'Penguji' }, { role: 'Penguji Senior' })]);

    const misvis = await call('PATCH', '/admin/about/mission', { mission: 'Misi uji minju', vision: 'Visi uji minju' });
    ok('PATCH /admin/about/mission', misvis.status === 200, `HTTP ${misvis.status} ${misvis.json ? JSON.stringify(misvis.json).slice(0, 120) : ''}`);

    const set = await call('PATCH', '/admin/settings/site_profile', { value: { name: 'Uji Minju', tags: ['a'] } });
    ok('PATCH /admin/settings/:key (jsonb)', set.status === 200, `HTTP ${set.status} ${JSON.stringify(set.json?.data?.value ?? null).slice(0, 120)}`);

    // --- inquiry publik (form website) + idempotensi ---
    const idem = `uji-minju-${Date.now()}`;
    const pubPayload = { full_name: 'Pengunjung Uji', email: 'uji.minju@example.com', message: 'Halo dari verifikasi otomatis.', locale: 'id' };
    const inq = await fetch(`${API}/public/inquiries`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idem }, body: JSON.stringify(pubPayload),
    });
    const inqBody = await inq.json().catch(() => ({}));
    const inqId = inqBody.data?.id ?? null;
    ok('POST /public/inquiries (form kontak)', !!inqId, `HTTP ${inq.status} status=${inqBody.data?.status} ref=${inqBody.data?.reference_code}`);
    const inq2 = await fetch(`${API}/public/inquiries`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idem }, body: JSON.stringify(pubPayload),
    });
    const inq2Body = await inq2.json().catch(() => ({}));
    ok('idempotency-key mencegah duplikat', inq2Body.idempotent === true && inq2Body.data?.id === inqId, `idempotent=${inq2Body.idempotent}`);
    const badInq = await fetch(`${API}/public/inquiries`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ full_name: 'x', email: 'bukan-email', message: 'y' }),
    });
    ok('inquiry tidak valid ditolak', badInq.status === 400, `HTTP ${badInq.status}`);

    // --- endpoint publik ---
    for (const p of ['/public/site', '/public/services', '/public/clients', '/public/portfolio', '/public/articles', '/public/stats', '/public/about']) {
      const r = await call('GET', p);
      const n = Array.isArray(r.json?.data) ? r.json.data.length : (r.json?.data ? Object.keys(r.json.data).length : 0);
      ok(`GET ${p}`, r.status === 200, `HTTP ${r.status} jumlah=${n}`);
    }

    // --- hapus resource uji lewat API (soft delete) ---
    for (const [table, id] of created) {
      if (!id) continue;
      const path = table === 'services' ? '/admin/services' : table === 'clients' ? '/admin/clients'
        : table === 'portfolio_items' ? '/admin/portfolio' : table === 'articles' ? '/admin/articles'
        : table === 'stats' ? '/admin/stats' : table === 'about_stories' ? '/admin/about/stories'
        : table === 'company_values' ? '/admin/about/values' : '/admin/about/team';
      const d = await call('DELETE', `${path}/${id}`);
      ok(`DELETE ${path}/:id`, d.status === 204 || d.status === 200, `HTTP ${d.status}`);
    }
  } finally {
    // bersihkan sisa data uji (hard delete) supaya database kembali seperti semula
    const cleanup = [
      ["delete from public.services where slug = 'uji-minju'"],
      ["delete from public.clients where name like 'Klien Uji%'"],
      ["delete from public.portfolio_items where slug = 'uji-minju'"],
      ["delete from public.articles where slug = 'uji-minju'"],
      ["delete from public.stats where label like 'Uji Minju%'"],
      ["delete from public.about_stories where title like 'Cerita Uji%'"],
      ["delete from public.company_values where title like 'Nilai Uji%'"],
      ["delete from public.team_members where name = 'Anggota Uji'"],
      ["delete from public.contact_inquiries where email = 'uji.minju@example.com'"],
    ];
    for (const [sql] of cleanup) await pool.query(sql).catch(() => {});
    // kembalikan settings & misi/visi ke kondisi semula
    if (before.settingsKeys && !before.settingsKeys.includes('site_profile')) {
      await pool.query("delete from public.settings where key = 'site_profile'").catch(() => {});
    }
    if (before.mission) {
      const keep = before.mission.map((r) => r.id);
      for (const r of before.mission) {
        await pool.query('update public.mission_vision set description = $1 where id = $2', [r.description, r.id]).catch(() => {});
      }
      await pool.query('delete from public.mission_vision where not (id = any($1::uuid[]))', [keep]).catch(() => {});
    }
    if (userId) {
      await pool.query('delete from public.profiles where id = $1', [userId]).catch(() => {});
      await supabase.auth.admin.deleteUser(userId).catch(() => {});
    }
    const after = await counts();
    console.log(RESULTS.join('\n'));
    const diff = TABLES.filter((t) => before.counts?.[t] !== after[t]).map((t) => `${t}: ${before.counts?.[t]} -> ${after[t]}`);
    console.log(`selisih jumlah baris setelah pembersihan: ${diff.length ? diff.join(', ') : 'tidak ada (sama seperti sebelum uji)'}`);
    await pool.end();
  }
})().catch((e) => { console.error('GAGAL:', e.message); process.exit(1); });
