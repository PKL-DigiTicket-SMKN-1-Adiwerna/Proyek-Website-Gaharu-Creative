# Data yang dibutuhkan sebelum situs tayang

Halaman sudah lengkap dan mengikuti wireframe enam halaman. Yang belum ada adalah isi asli.
Daftar di bawah menandai file mana yang perlu diubah, supaya tidak ada lagi halaman yang dibuat
asal isi.

## Prioritas 1: tanpa ini situs tidak boleh tayang

| Data | File | Catatan |
|---|---|---|
| Nomor WhatsApp resmi | `src/data/site.js` (`waNumber`, `waDisplay`) | Saat ini +62 812-3456-7890, contoh dari wireframe. Salah nomor berarti chat masuk ke orang lain. |
| Email resmi | `src/data/site.js` (`email`) | Wireframe memakai empat versi email berbeda di halaman yang berbeda. Perlu satu keputusan. |
| Telepon kantor | `src/data/site.js` (`phone`) | Wireframe menulis (021) 0000 0000, jelas placeholder. |
| Alamat lengkap | `src/data/site.js` (`address`) | Wireframe menulis "Jl. Contoh No. 12, Jakarta Selatan". Brief lama menyebut Semarang. |
| Bentuk badan usaha + NIB | `src/data/site.js` (`legal`) | Untuk baris footer dan bagian Legalitas di halaman Tentang. |
| Akun media sosial | `src/data/site.js` (`socials`) | Tautan sekarang hanya menebak nama akun. |

Setelah data masuk, set flag `verified` jadi `true` dan hapus atribut `data-placeholder` yang
memakainya. Badge belum diverifikasi muncul otomatis dari atribut itu, lihat `src/index.css`.

## Prioritas 2: isi halaman

| Halaman | File | Yang dibutuhkan |
|---|---|---|
| Beranda | `src/data/portfolio.js` (`stats`, `clientLogos`, `testimonials`) | Angka 100+ klien dan 500+ proyek belum punya sumber. Nama klien dan testimoni asli. |
| Tentang | `src/data/tentang.js` | Nama dan foto tim inti, sejarah yang sebenarnya, dokumen legalitas. |
| Layanan | `src/data/services.js` | Rincian deliverables tiap layanan, dan harga atau paket kalau mau ditampilkan. |
| Portofolio | `src/data/portfolio.js` (`portfolioItems`) | Studi kasus nyata beserta angka hasil. Entri sekarang contoh dari wireframe. |
| Insight | `src/data/insights.js` | Naskah artikel, tanggal terbit lengkap dengan tahun, dan penulisnya. |
| Kontak | `src/pages/KontakPage.jsx` | Layanan form (EmailJS atau Formspree) supaya tombol Kirim Pesan benar-benar mengirim. |
| Kontak | `src/pages/KontakPage.jsx` (bagian peta) | Koordinat atau link Google Maps untuk menanam peta asli. |

## Prioritas 3: polish

- Logo asli dan favicon. Sekarang lingkaran huruf "G" dan `public/icon.svg`.
- Foto hero, foto tim, dan sampul artikel. Sekarang kotak placeholder bergaris.
- Brand guideline resmi, untuk menggantikan palet hitam-putih-abu tahap wireframe.
- Halaman Kebijakan Privasi, Syarat & Ketentuan, dan Karier. Sekarang muncul sebagai teks
  berlabel di footer karena tujuannya belum ada.
- Bahasa kedua. Pemilih bahasa di navbar baru menawarkan ID; struktur datanya sudah disiapkan
  untuk EN.

## Aturan isi

- Jangan isi angka atau statistik yang tidak punya sumber. Kalau angkanya estimasi, tulis
  begitulah di halaman.
- Klien hanya ditampilkan kalau sudah menyetujui publikasi namanya.
- Ganti catatan "belum dikonfirmasi" begitu datanya masuk. Jangan dibiarkan menetap.
- Satu istilah untuk satu hal. Wireframe memakai "Digital Agency", "Agensi Digital", dan
  "Agency" bergantian; "360 Digital Agency" yang dipakai sekarang.
- Nama brand di URL dan email harus sama. Perlu keputusan: gaharucreative, gaharukreatif,
  atau gaharustudio.

## Yang belum disenggol dari wireframe

- Carousel banner CTA: tiga slide sudah jalan, tapi isinya masih tulisan sendiri. Kalau klien
  punya copy resmi, ganti `src/data/cta.js`.
- Tautan halaman detail studi kasus dan detail artikel. Wireframe menuliskan "Silakan klik untuk
  melihat detail", tapi halaman detailnya belum ada di daftar enam halaman wajib.
