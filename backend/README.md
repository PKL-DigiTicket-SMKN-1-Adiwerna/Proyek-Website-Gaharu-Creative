# Backend Gaharu Creative

API NestJS untuk website Gaharu Creative. Database dan autentikasi memakai **Supabase**
(Postgres + Supabase Auth), query lewat driver `pg`, bukan SQLite.

## Alur singkat

- Semua permintaan masuk lewat prefix `/api/v1`.
- Endpoint publik (`/public/*`) tidak butuh token, hanya menampilkan data yang sudah
  dipublikasikan.
- Endpoint admin (`/admin/*`) butuh header `Authorization: Bearer <access_token>` dari
  Supabase Auth, dan hanya untuk profil di tabel `public.profiles` dengan `is_active = true`.
- Role `superadmin` boleh semuanya, `editor` untuk konten, `viewer` hanya baca
  (lihat `src/common/guards/roles.guard.ts`).

## Menyiapkan lingkungan

1. `npm install`
2. Salin `.env.example` menjadi `.env`, lalu isi:
   - `DATABASE_URL` — connection string Postgres Supabase. Untuk deploy serverless
     (Vercel) wajib memakai **pooler** port `6543`.
   - `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` — dipakai hanya di server untuk
     Supabase Auth. Jangan pernah dipakai di frontend.
   - `FRONTEND_ORIGIN` — asal yang diizinkan CORS (mis. `http://localhost:5173`).
3. Jalankan `npm run start:dev`. Cek `GET /api/v1/health`: balas
   `{"status":"ok","database":"supabase"}` kalau koneksi database hidup.

## Migrasi database

Semua perubahan skema ditulis sebagai file SQL di `db/migrations/` dan dijalankan manual
di Supabase (SQL Editor atau `supabase db push`). Tidak ada DDL yang jalan otomatis dari
kode aplikasi.

| File | Isi |
| --- | --- |
| `0001_align_backend_columns.sql` | kolom `clients` yang dipakai API + `category_id` portfolio boleh kosong |
| `0002_seed_clients.sql` | data awal mitra/klien |
| `0003_add_updated_at_columns.sql` | kolom `updated_at` untuk tabel yang sudah punya trigger `set_updated_at()` |
| `0004_inquiry_idempotency_key.sql` | kunci idempotensi form kontak |
| `0005_mission_vision_kind_visi.sql` | constraint `mission_vision.kind` menerima `misi`, `visi`, `tujuan` |

## Akun admin

Baris `public.profiles` diisi otomatis oleh trigger `handle_new_user` saat user dibuat di
Supabase Auth. Setelah user dibuat, cukup perbarui `role` dan `is_active` di tabel
`profiles`; jangan INSERT manual karena akan bentrok dengan trigger.

Endpoint auth: `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`,
`POST /api/v1/auth/logout` (butuh token), `GET /api/v1/auth/me`.

## Pengujian

- `npm test` — unit test (`src/**/*.spec.ts`), tidak butuh database.
- `npm run test:e2e` — e2e `/health`, **butuh `.env` valid dan database terjangkau**.
- `npm run smoke` — alur penuh lewat HTTP: CRUD semua resource admin, form kontak publik
  (termasuk uji idempotensi), dan pembacaan semua endpoint publik. Butuh server hidup:
  `npm run start:dev`. Skrip membuat user uji sementara lalu menghapusnya, dan
  membandingkan jumlah baris tabel sebelum/sesudah supaya data tidak tertinggal.
  Arahkan ke server lain dengan `SMOKE_API=http://localhost:3000 npm run smoke`.

## Deploy

`vercel.json` + `api/[...slug].ts` membungkus aplikasi Nest sebagai fungsi serverless.
Pastikan variabel lingkungan diset di Vercel dan `DATABASE_URL` memakai pooler port 6543
karena koneksi langsung akan kehabisan slot saat trafik naik.
