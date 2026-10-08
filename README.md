# Gaharu Creative

Website company profile Gaharu Creative, digital agency 360 yang berbasis di Semarang.
Proyek PKL, dikerjakan tim enam orang (PM, dua frontend, satu backend, satu UI/UX, satu QA).

## Stack

- Vite 8
- React 19
- React Router 7
- Tailwind CSS v4

JavaScript murni. Tidak ada TypeScript, tidak ada file `.ts` atau `.tsx` di project ini.
Tanpa database, tanpa CMS. Semua data konten disimpan di `src/data/`.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:5173.

```bash
npm run build   # cek produksi
npm run preview # jalankan hasil build
npm run lint
```

Butuh Node.js 20 atau lebih baru.

## Struktur

```
index.html           shell HTML, meta tag default, dan skrip anti-kedip tema
vite.config.js       plugin React dan Tailwind
src/
  main.jsx           titik masuk, membungkus App dengan BrowserRouter
  App.jsx            daftar route, header, footer, tombol WhatsApp
  index.css          token desain, dark mode, focus ring
  pages/             satu file per halaman
  components/        Header, Footer, tombol WhatsApp, CopyrightYear, Seo
  data/              site.js, services.js, types.js
public/              icon.svg
docs/                daftar data yang dibutuhkan sebelum tayang
```

## Menambah halaman baru

1. Buat `src/pages/NamaPage.jsx`, export default sebuah komponen.
2. Di dalam komponen, panggil `<Seo title="..." description="..." />`.
3. Daftarkan route-nya di `src/App.jsx` dan tambahkan link-nya di `src/components/Header.jsx`.

## Catatan penting untuk SEO

Beranda sudah punya `<title>` dan `<meta name="description">` di `index.html`. Halaman
selain beranda rendered di browser, jadi meta tag-nya di-set lewat `src/components/Seo.jsx`
setiap kali pindah halaman. Kalau nanti judged Google dan meta tag halaman tidak ikut
terbaca, tambahkan tiap route ke `vite.config.js`:

```js
build: {
  rollupOptions: {
    input: {
      main: "index.html",
      tentang: "layanan.html",
      // seterusnya
    },
  },
}
```

## Konten

## Konten

Semua copy masih berupa kerangka. Data klien, portofolio, artikel, dan detail legal belum
diterima, jadi halaman terkait sengaja belum diisi. Daftar lengkap yang dibutuhkan ada di
[docs/DATA-YANG-DIBUTUHKAN.md](docs/DATA-YANG-DIBUTUHKAN.md).

Setiap nilai di `src/data/site.js` yang belum dikonfirmasi ditandai komentar `TBD` dan punya
flag boolean (`emailVerified`, `waNumberVerified`, `addressVerified`). Set flag itu `true`
setelah data asli masuk, lalu hapus catatan tidak terverifikasi yang mengikutinya.

## Warna

Token ada di `src/index.css`. Dua aturan yang perlu dijaga:

- `accent` (#10B981) hanya untuk graphic dan garis. Rasio kontrasnya terhadap latar terang
  cuma 2.43:1, jadi tidak boleh dipakai untuk teks.
- `action` (#047857 di light, #34d399 di dark) untuk tombol dan link, selalu berpasangan
  dengan `on-action`. Keduanya lolos WCAG AA.

Jangan menukar warna tanpa menghitung ulang kontrasnya. Angka lengkap ada di komentar
`src/index.css`.

## Dark mode

Class `.dark` di elemen `<html>`, disimpan di `localStorage` dengan key `theme`. default ikut `prefers-color-scheme` saat kunjungan pertama. Belum ada tombol toggle di UI,
jadi sementara mengikuti setelan sistem.

## Catatan tim

`Footer` dan tombol WhatsApp adalah client component. `Footer` memakai
`new Date().getFullYear()` supaya tahun copyright selalu benar tanpa update manual.

## Brief

Ringkasan proyek ada di [docs/DATA-YANG-DIBUTUHKAN.md](docs/DATA-YANG-DIBUTUHKAN.md).
