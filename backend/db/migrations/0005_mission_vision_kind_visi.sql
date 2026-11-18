-- 0005: constraint `mission_vision_kind_check` hanya mengizinkan 'misi' dan 'tujuan',
-- padahal panel admin (dan API) memakai pasangan 'misi' + 'visi'.
-- 'tujuan' tetap diizinkan karena baris lama di database memakainya.
alter table public.mission_vision drop constraint if exists mission_vision_kind_check;

alter table public.mission_vision
  add constraint mission_vision_kind_check check (kind in ('misi', 'visi', 'tujuan'));
