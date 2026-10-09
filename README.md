# Gaharu Creative

Website company profile Gaharu Creative, digital agency 360° yang berbasis di Semarang.
Proyek PKL, dikerjakan tim enam orang (PM, dua frontend, satu backend, satu UI/UX, satu QA).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4

Tanpa database, tanpa CMS, tanpa dependency runtime di luar tiga paket di atas. Semua data
konten disimpan di `src/content/` dan `src/lib/site.ts`.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

```bash
npm run build   # cek produksi
npm run start   # jalankan hasil build
npm run lint
```

Butuh Node.js 20 atau lebih baru.

## Struktur

```
src/
  app/              route per halaman, layout, dan stylesheet global
  components/
    layout/         Header, Footer, tombol WhatsApp
    sections/       potongan seksi yang dipakai lebih dari satu halaman
  content/          data konten (services.ts)
  lib/              types.ts dan site.ts (konfigurasi situs)
docs/               catatan keputusan dan daftar data yang dibutuhkan
```

## Konten

Semua copy masih berupa kerangka. Data klien, portofolio, artikel, dan detail legal belum
diterima, jadi halaman terkait sengaja belum diisi. Daftar lengkap yang dibutuhkan ada di
[docs/DATA-YANG-DIBUTUHKAN.md](docs/DATA-YANG-DIBUTUHKAN.md).

Setiap nilai di `src/lib/site.ts` yang belum dikonfirmasi ditandai komentar `TBD` dan punya
flag boolean (`emailVerified`, `waNumberVerified`, `addressVerified`). Set flag itu `true`
setelah data asli masuk, lalu hapus catatan tidak terverifikasi yang mengikutinya.

## Warna

Token ada di `src/app/globals.css`. Dua aturan yang perlu dijaga:

- `accent` (#10B981) hanya untuk graphic dan garis. Rasio kontrasnya terhadap latar terang
  cuma 2.43:1, jadi tidak boleh dipakai untuk teks.
- `action` (#047857 di light, #34d399 di dark) untuk tombol dan link, selalu berpasangan
  dengan `on-action`. Keduanya lolos WCAG AA.

Jangan menukar warna tanpa menghitung ulang kontrasnya. Angka lengkap ada di komentar
`globals.css`.

## Dark mode

Class `.dark` di elemen `<html>`, disimpan di `localStorage` dengan key `theme`. default ikut `prefers-color-scheme` saat kunjungan pertama. Belum ada tombol toggle di UI,
jadi sementara mengikuti setelan sistem.

## Catatan tim

`Footer` dan tombol WhatsApp adalah client component. `Footer` memakai
`new Date().getFullYear()` supaya tahun copyright selalu benar tanpa update manual.

## Brief

Ringkasan proyek ada di [BRIEF.md](BRIEF.md), disalin dari file brief yang dikirim klien.
