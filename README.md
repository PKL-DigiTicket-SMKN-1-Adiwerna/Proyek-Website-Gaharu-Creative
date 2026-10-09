# Gaharu Creative

Website company profile Gaharu Creative, konsultan dan eksekutor 360 digital agency.
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
index.html           shell HTML dan meta tag default
vite.config.js       plugin React dan Tailwind
vercel.json          preset deploy dan rewrite untuk SPA
src/
  main.jsx           titik masuk, membungkus App dengan BrowserRouter
  App.jsx            daftar route, banner CTA per halaman, footer
  index.css          token warna wireframe, focus ring, badge placeholder
  pages/             satu file per halaman
  components/        Header, Footer, CtaBanner, WhatsAppButton, ui, Icons, Seo
  data/              site.js, services.js, portfolio.js, insights.js, tentang.js, cta.js
public/              icon.svg
docs/                daftar data yang dibutuhkan sebelum tayang
```

## Halaman

Enam halaman sesuai wireframe: Beranda, Tentang, Layanan, Portofolio, Insight, Kontak.
Route tidak dikenal diarahkan ke halaman 404 di `src/pages/NotFoundPage.jsx`.

Banner CTA penutup dipasang di `src/App.jsx`, bukan di tiap halaman, supaya judulnya bisa
diatur per rute dari satu tempat (`src/data/cta.js`).

## Menambah halaman baru

1. Buat `src/pages/NamaPage.jsx`, export default sebuah komponen.
2. Di dalam komponen, panggil `<Seo title="..." description="..." />`.
3. Daftarkan route-nya di `src/App.jsx`. Kalau halamannya perlu menu, tambahkan juga di
   `navLinks` pada `src/data/site.js`.
4. Untuk banner CTA, tambah entri baru di `ctaByPath` (`src/App.jsx`) dan isi tiga slide di
   `src/data/cta.js`.

## Tahap desain sekarang

Tampilan masih mengikuti wireframe: hitam, putih, dan abu. DESAIN.md belum menetapkan warna
brand, jadi semua warna duduk di variabel `:root` pada `src/index.css`. Saat brand guideline
masuk, ganti variabel itu dan seluruh situs ikut berubah tanpa menyentuh komponen.

Yang sudah diterapkan dari wireframe:

- Navbar: logo kiri, menu tengah, pemilih bahasa dan tombol Hubungi Kami kanan.
- Menu aktif ditandai garis bawah, di ponsel jadi menu hamburger.
- Footer satu komponen untuk semua halaman.
- Kartu horizontal dan kartu vertikal, tag kategori di pojok kiri atas.
- Banner CTA penutup dengan tiga slide dan indikator titik.
- Kartu layanan memakai format Problem, Solusi, Deliverables.
- Filter kategori Portofolio dan Insight bekerja tanpa pindah halaman.

Tombol `Baca Selengkapnya` di Insight, `Unduh Company Profile`, dan `Minta Dokumen Legal`
masih mengarah ke email karena berkasnya belum ada. Form kontak dan berlangganan memvalidasi
isian lalu berhenti dengan pesan yang jujur; pengiriman nyata menunggu layanan form dipilih.

## Kontras

Angka dihitung di atas putih, bukan ditebak:

- `--ink` #111111 terhadap putih 18.9:1
- `--muted` #595959 terhadap putih 7.0:1
- `--tag-ink` #404040 terhadap `--tag-bg` #efefef 9.0:1
- border control form memakai `--field` #8f8f8f, 3.2:1 terhadap putih

Garis pemisah antar section sengaja lebih terang (#d9d9d9) karena tidak membawa teks atau
menandai batas control.

## SEO

`index.html` memegang title dan description default. Halaman lain dirender di browser, jadi
meta tag di-set lewat `src/components/Seo.jsx` setiap kali pindah halaman. Kalau nanti meta
tag per halaman dirasa perlu terbaca tanpa JavaScript, tambahkan tiap route ke `vite.config.js`:

```js
build: {
  rollupOptions: {
    input: {
      main: "index.html",
      tentang: "tentang.html",
      // seterusnya
    },
  },
}
```

## Data

Semua copy berasal dari wireframe. Data klien, portofolio, artikel, dan detail legal belum
diterima. Daftar yang dibutuhkan ada di [docs/DATA-YANG-DIBUTUHKAN.md](docs/DATA-YANG-DIBUTUHKAN.md).

Nilai di `src/data/site.js` yang belum dikonfirmasi ditandai komentar `TBD` dan punya flag
boolean (`emailVerified`, `waNumberVerified`, `addressVerified`). Set flag itu `true` setelah
data asli masuk. Elemen yang ditandai `data-placeholder` otomatis diberi badge kecil bertuliskan
belum diverifikasi, jadi tidak ada data contoh yang tampil seolah-olah fakta.

## Catatan tim

`Footer` dan tombol WhatsApp adalah client component. `CopyrightYear` memakai
`new Date().getFullYear()` supaya tahun copyright selalu benar tanpa update manual.

## Brief

Ringkasan proyek ada di [docs/DATA-YANG-DIBUTUHKAN.md](docs/DATA-YANG-DIBUTUHKAN.md).
