# Data yang dibutuhkan sebelum situs-published

Semua halaman sudah punya struktur dan navigasi. Yang belum ada adalah isi. Daftar di bawah
menandai file mana yang perlu diubah, supaya tidak ada lagi halaman yang dibuat asal isi.

## Prioritas 1: tanpa ini situs tidak boleh tayang

| Data | File | Catatan |
|---|---|---|
| Nomor WhatsApp resmi | `src/lib/site.ts` (`waNumber`) | Saat ini masih nomor contoh. Salah nomor berarti chat masuk ke orang lain. |
| Email resmi | `src/lib/site.ts` (`email`) | Domain `gaharucreative.com` belum dikonfirmasi. |
| Alamat lengkap | `src/lib/site.ts` (`address`) | Brief hanya menyebut "Semarang, Jawa Tengah". |
| Bentuk badan usaha + NIB | `src/lib/site.ts` (`legal`) | Untuk baris footer dan halaman legal. |

Setelah data masuk, set `waNumberVerified`, `emailVerified`, `addressVerified` jadi `true`, lalu
hapus blok catatan tidak terverifikasi yang memakainya di `src/app/page.tsx` dan
`src/components/layout/Footer.tsx`.

## Prioritas 2: isi halaman

| Halaman | File | Yang dibutuhkan |
|---|---|---|
| Tentang | `src/app/tentang/page.tsx` | Profil singkat, sejarah, daftar tim, cara kerja. |
| Layanan | `src/app/layanan/page.tsx` | Rincian tiap layanan dari `src/content/services.ts`. |
| Portofolio | `src/app/portofolio/page.tsx` | Studi kasus nyata beserta angka hasil. Buat `src/content/portfolio.ts`. |
| Insight | `src/app/insight/page.tsx` | Artikel pertama, beserta tanggal dan penulisnya. |
| Kontak | `src/app/kontak/page.tsx` | Integrasi form (EmailJS atau Formspree) dan peta. |

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
