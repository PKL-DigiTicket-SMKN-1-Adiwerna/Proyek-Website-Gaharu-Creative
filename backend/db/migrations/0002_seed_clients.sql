-- 0002: isi dinding logo mitra (section Rekam Jejak)
-- Sumber: daftar mitra resmi Gaharu Creative; berkas logo ada di
-- frontend/public/logos/klien. Hanya jalan saat tabel clients masih kosong.

insert into public.clients (locale, name, slug, category, logo_path, logo_alt, sort_order, is_published)
select 'id', v.name, v.slug, v.category, '/logos/klien/' || v.logo, v.name, v.ord, true
from (values
  ('Bank Indonesia', 'bank-indonesia', 'pemerintah', 'bank-indonesia.png', 0),
  ('Kementerian Keuangan Republik Indonesia', 'kemenkeu', 'pemerintah', 'kemenkeu.png', 1),
  ('Kementerian Luar Negeri Republik Indonesia', 'kemlu', 'pemerintah', 'kemlu.svg', 2),
  ('Kementerian Koperasi', 'kemenkop', 'pemerintah', 'kemenkop.svg', 3),
  ('Kementerian Agama Republik Indonesia', 'kemenag', 'pemerintah', 'kemenag.png', 4),
  ('Kementerian Komunikasi dan Digital (Komdigi)', 'komdigi', 'pemerintah', 'komdigi.png', 5),
  ('Kementerian UMKM', 'kemenumkm', 'pemerintah', 'kemenumkm.svg', 6),
  ('Kementerian Koordinator Bidang Pemberdayaan Masyarakat', 'menkopm', 'pemerintah', 'menkopm.png', 7),
  ('Kementerian Perdagangan', 'kemendag', 'pemerintah', 'kemendag.svg', 8),
  ('Kementerian Perindustrian', 'kemenperin', 'pemerintah', 'kemenperin.svg', 9),
  ('Kementerian Hukum dan HAM', 'kemenkum', 'pemerintah', 'kemenkum.svg', 10),
  ('Badan Pengawas Obat dan Makanan', 'bpom', 'pemerintah', 'bpom.png', 11),
  ('Kementerian Pariwisata', 'kemenpar', 'pemerintah', 'kemenpar.png', 12),
  ('Kementerian Ekonomi Kreatif', 'ekraf', 'pemerintah', 'ekraf.png', 13),
  ('Otoritas Jasa Keuangan', 'ojk', 'pemerintah', 'ojk.png', 14),
  ('Kementerian Pemuda dan Olahraga', 'kemenpora', 'pemerintah', 'kemenpora.png', 15),
  ('Astra International', 'astra', 'swasta', 'astra.svg', 16),
  ('Telkom Indonesia', 'telkom', 'swasta', 'telkom.svg', 17),
  ('GoTo', 'goto', 'swasta', 'goto.svg', 18),
  ('Adira Finance', 'adira', 'swasta', 'adira.svg', 19),
  ('Google Indonesia', 'google', 'swasta', 'google.svg', 20),
  ('Dafam Hotel Management (DHM)', 'dafam', 'swasta', 'dafam.png', 21),
  ('Polytron', 'polytron', 'swasta', 'polytron.svg', 22),
  ('Bank Mandiri', 'mandiri', 'swasta', 'mandiri.svg', 23),
  ('Bank Rakyat Indonesia (BRI)', 'bri', 'swasta', 'bri.svg', 24),
  ('Bank Tabungan Negara (BTN)', 'btn', 'swasta', 'btn.svg', 25),
  ('Bank Negara Indonesia (BNI)', 'bni', 'swasta', 'bni.svg', 26),
  ('Bank Syariah Indonesia (BSI)', 'bsi', 'swasta', 'bsi.svg', 27),
  ('Djarum Group', 'djarum', 'swasta', 'djarum.png', 28),
  ('Pegadaian', 'pegadaian', 'swasta', 'pegadaian.png', 29)
) as v(name, slug, category, logo, ord)
where not exists (select 1 from public.clients);