-- 0006: tabel penghargaan (awards) untuk panel admin.
-- Sudah dijalankan pengawas di Supabase; berkas ini catatan migrasi.
-- Trigger `set_updated_at` sudah terpasang di tabel ini.
create table if not exists public.awards (
  id uuid primary key default gen_random_uuid(),
  group_id uuid,
  locale text not null default 'id',
  slug text,
  title text not null,
  issuer text,
  year integer,
  description text,
  image_path text,
  image_alt text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- slug unik per locale hanya untuk baris hidup (soft delete membebaskan slug).
create unique index if not exists awards_slug_locale_idx
  on public.awards (locale, slug) where deleted_at is null;

create index if not exists awards_locale_sort_idx
  on public.awards (locale, sort_order);