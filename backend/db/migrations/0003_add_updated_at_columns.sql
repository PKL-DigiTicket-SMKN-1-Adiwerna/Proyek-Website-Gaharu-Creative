-- 0003: tabel yang punya trigger `set_updated_at()` tapi belum punya kolom `updated_at`
-- sehingga setiap UPDATE gagal dengan "record \"new\" has no field \"updated_at\"".
alter table public.about_stories add column if not exists updated_at timestamptz not null default now();
alter table public.article_categories add column if not exists updated_at timestamptz not null default now();
alter table public.company_values add column if not exists updated_at timestamptz not null default now();
alter table public.cta_banners add column if not exists updated_at timestamptz not null default now();
alter table public.legalities add column if not exists updated_at timestamptz not null default now();
alter table public.mission_vision add column if not exists updated_at timestamptz not null default now();
alter table public.page_heroes add column if not exists updated_at timestamptz not null default now();
alter table public.portfolio_categories add column if not exists updated_at timestamptz not null default now();
alter table public.stats add column if not exists updated_at timestamptz not null default now();
alter table public.team_members add column if not exists updated_at timestamptz not null default now();
alter table public.testimonials add column if not exists updated_at timestamptz not null default now();
