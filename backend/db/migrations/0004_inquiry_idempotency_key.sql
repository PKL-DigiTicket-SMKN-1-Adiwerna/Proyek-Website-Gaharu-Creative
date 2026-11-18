-- 0004: kolom khusus untuk kunci idempotensi form kontak.
-- `reference_code` diisi otomatis oleh trigger `generate_reference_code()`
-- (mis. "2026-000002"), jadi tidak bisa dipakai sebagai kunci idempotensi.
alter table public.contact_inquiries add column if not exists idempotency_key text;

create unique index if not exists contact_inquiries_idempotency_key_idx
  on public.contact_inquiries (idempotency_key)
  where idempotency_key is not null;
