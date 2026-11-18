-- 0001: selaraskan skema public dengan kolom yang dipakai backend
-- Diterapkan ke project Supabase zjlqcksxhyyzptudgvof (18 Nov 2026).

-- clients: slug, kategori, alt logo, dan audit timestamp dibutuhkan panel admin
alter table public.clients add column if not exists slug text;
alter table public.clients add column if not exists category text not null default 'pemerintah';
alter table public.clients add column if not exists logo_alt text;
alter table public.clients add column if not exists created_at timestamptz not null default now();
alter table public.clients add column if not exists updated_at timestamptz not null default now();

-- panel admin belum mengirim kategori portofolio; biarkan kosong sampai diisi
alter table public.portfolio_items alter column category_id drop not null;