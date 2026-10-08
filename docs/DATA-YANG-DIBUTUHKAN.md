# Data yang dibutuhkan sebelum situs-published

Semua halaman sudah punya struktur dan navigasi. Yang belum ada adalah isi. Daftar di bawah
menandai file mana yang perlu diubah, supaya tidak ada lagi halaman yang dibuat asal isi.

## Prioritas 1: tanpa ini situs tidak boleh tayang

| Data | File | Catatan |
|---|---|---|
| Nomor WhatsApp resmi | `src/data/site.js` (`waNumber`) | Saat ini masih nomor contoh. Salah nomor berarti chat masuk ke orang lain. |
| Email resmi | `src/data/site.js` (`email`) | Domain `gaharucreative.com` belum dikonfirmasi. |
| Alamat lengkap | `src/data/site.js` (`address`) | Brief hanya menyebut "Semarang, Jawa Tengah". |
| Bentuk badan usaha + NIB | `src/data/site.js` (`legal`) | Untuk baris footer dan halaman legal. |

Setelah data masuk, set `waNumberVerified`, `emailVerified`, `addressVerified` jadi `true`, lalu
hapus blok catatan tidak terverifikasi yang memakainya di `src/pages/HomePage.jsx` dan
`src/components/layout/Footer.tsx`.

## Prioritas 2: isi halaman

| Halaman | File | Yang dibutuhkan |
|---|---|---|
| Tentang | `src/pages/TentangPage.jsx` | Profil singkat, sejarah, daftar tim, cara kerja. |
| Layanan | `src/pages/LayananPage.jsx` | Rincian tiap layanan dari `src/data/services.js`. |
| Portofolio | `src/pages/PortofolioPage.jsx` | Studi kasus nyata beserta angka hasil. Buat `src/data/portfolio.js`. |
| Insight | `src/pages/InsightPage.jsx` | Artikel pertama, beserta tanggal dan penulisnya. |
| Kontak | `src/pages/KontakPage.jsx` | Integrasi form (EmailJS atau Formspree) dan peta. |

## Prioritas 3: polish

- Logo asli dan favicon. Sekarang pakai kotak huruf "G" sebagai placeholder.
- Foto tim dan foto workspace untuk halaman Tentang.
- Brand guideline resmi. Palet sekarang turunan palet dari klien, belum disahkan.
- Tombol toggle dark mode. Persistensi sudah jalan, tombolnya belum ada.

## Aturan isi

- Jangan isi angka atau statistik yang tidak punya sumber. Kalau angkanya estimasi, tulis
  begitulah di halaman.
- Klien hanya ditampilkan kalau sudah menyetujui publikasi namanya.
- Ganti catatan "belum dikonfirmasi" begitu datanya masuk. Jangan dibiarkan menetap.
