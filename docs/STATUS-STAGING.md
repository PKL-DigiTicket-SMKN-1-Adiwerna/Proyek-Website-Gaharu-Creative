# Status staging dan sakelar produksi

Dokumen ini mencatat konfigurasi yang membuat situs ini masih berstatus staging,
beserta langkah yang harus dilakukan saat domain resmi dan data resmi sudah siap.
Dibuat 17 Oktober 2026 setelah audit staging 12 Oktober 2026.

## Domain dan URL absolut

`vite.config.js` memakai satu nilai: `VITE_SITE_URL`. Kalau variabel itu belum
diisi, nilai cadangan `https://proyek-website-gaharu-creative.vercel.app` yang
dipakai. Nilai itu menentukan isi empat hal sekaligus:

- `canonical` di halaman beranda (statis, jadi crawler yang tidak menjalankan
  JavaScript tetap membacanya);
- `og:url` dan `og:image` (gambar pratinjau 1200x630 di `public/og-gaharu-creative.jpg`);
- `Sitemap:` di `robots.txt`;
- alamat setiap halaman di `sitemap.xml`.

Saat domain resmi ditetapkan: isi `VITE_SITE_URL` di pengaturan Environment
Variables Vercel dengan domain tanpa garis miring di akhir, lalu deploy ulang.
Tidak ada berkas lain yang perlu disunting.

## Proteksi indeks (noindex) saat staging

`vercel.json` mengirim header `X-Robots-Tag: noindex, nofollow` untuk semua jalur.
Artinya mesin pencari tidak mengindeks deployment staging ini.

`index.html` tetap memuat `<meta name="robots" content="index, follow">` dengan
sengaja: meta itu menyatakan niat untuk produksi. Sakelarnya ada di header
Vercel, satu tempat saja.

Saat situs resmi siap tayang: hapus blok `headers` di `vercel.json`, lalu deploy
ulang. Urutannya: isi `VITE_SITE_URL` dulu, baru hapus blok `headers`.

## robots.txt dan sitemap.xml

Keduanya tidak lagi disimpan sebagai berkas statis di `public/`, karena isinya
butuh URL absolut. Keduanya dibuat saat build oleh plugin `gaharu-seo` di
`vite.config.js`:

- `dist/robots.txt` berisi `Allow: /` plus baris `Sitemap:`;
- `dist/sitemap.xml` berisi 6 rute statis plus seluruh rute detail layanan,
  portofolio, dan insight yang diambil langsung dari `src/data`, sehingga slug
  di sitemap tidak bisa menyimpang dari yang dirender react-router.

Catatan: sebelum perubahan ini, kedua jalur itu dijawab HTTP 200 berisi
`index.html` karena rewrite SPA `/(.*)` di `vercel.json`. Status 200 bukan bukti
berkasnya ada, jadi selalu periksa isi responsnya.

## Data yang masih menunggu konfirmasi pemilik usaha

Dicatat di sini supaya tidak tayang sebagai data contoh:

- email resmi, alamat kantor, peta, dan akun sosial resmi (lihat `src/data/site.js`);
- angka hasil pada studi kasus portofolio (blok contoh tidak dirender sama sekali);
- testimoni klien (daftar `testimonials` masih kosong, section tidak dirender);
- bentuk badan usaha dan NIB;
- kanal selain WhatsApp resmi pada halaman Kebijakan Privasi (email dan alamat
  menyusul; lihat bagian berikutnya).

## Halaman Kebijakan Privasi

`/kebijakan-privasi` sudah tayang sejak perbaikan 18 Oktober 2026 dan ikut masuk
`sitemap.xml`. Isinya sengaja hanya menyebut WhatsApp resmi sebagai kanal kontak
karena email dan alamat kantor belum dikonfirmasi. Kalau nanti email resmi sudah
diterima, dua hal yang harus ikut diperbarui:

1. tabel kontak di `src/data/site.js` (`email` dan `emailVerified`);
2. bagian "Formulir kontak dan WhatsApp" serta "Mengajukan permintaan atau
   pertanyaan" di `src/pages/KebijakanPrivasiPage.jsx`.

Bila formulir suatu saat dihubungkan ke layanan form atau server, bagian cookie
dan pihak ketiga di halaman itu juga harus ditulis ulang; jangan hanya menambah
satu kalimat di footer.

## Angka acuan untuk perubahan berikutnya

Beberapa hal sudah ditetapkan lewat angka, jadi perlu dicek ulang kalau ada
perubahan tampilan atau aset:

- Lighthouse ponsel (simulasi jaringan, server dengan gzip):
  beranda 87, portofolio 91, kontak 91, kebijakan privasi 92. Accessibility,
  best practices, dan SEO 100 di keempat halaman; CLS 0.
- Aset yang tidak dirujuk kode tidak ditaruh di `public/`. Yang lama dipindah ke
  `arsip-aset/` (tidak ikut dibangun ke `dist/`), bukan dihapus dari riwayat.
- Lebar gambar disimpan maksimal 1400 px, cukup untuk tampil penuh di layar ponsel dan tablet. Asli sebelum
  dikompres tersimpan di `arsip-aset/asli-gambar/` (tidak di-commit).
- `src/app/` masih berisi peninggalan Next.js lama. Folder itu tidak dirujuk
  router aktif, tapi isinya memakai warna hex sendiri; jangan dipakai sebagai
  contoh warna.
