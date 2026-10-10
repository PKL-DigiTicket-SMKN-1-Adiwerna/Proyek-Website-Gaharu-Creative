# Gaharu Creative

Website company profile Gaharu Creative, konsultan dan eksekutor 360 digital agency.
Proyek PKL, dikerjakan tim enam orang (PM, dua frontend, satu backend, satu UI/UX, satu QA).

Situs berjalan di https://proyek-website-gaharu-creative.vercel.app

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
index.html           shell HTML, meta tag default, link favicon
vite.config.js       plugin React dan Tailwind
vercel.json          preset deploy dan rewrite untuk SPA
src/
  main.jsx           titik masuk, membungkus App dengan BrowserRouter
  App.jsx            daftar route, banner CTA per halaman, footer
  index.css          token warna, focus ring, badge placeholder
  pages/             satu file per halaman
  components/        Header, Footer, Logo, CtaBanner, WhatsAppButton, ui, Icons, Seo, CopyrightYear
  data/              site.js, services.js, portfolio.js, insights.js, tentang.js, cta.js
public/
  icon.svg           logo dan favicon, warna literal
  icon-32.png        favicon 32px
  icon-192.png       favicon 192px untuk apple-touch-icon
docs/                daftar data yang dibutuhkan sebelum tayang
```

## Halaman

Enam halaman sesuai wireframe: Beranda, Tentang, Layanan, Portofolio, Insight, Kontak.
Route tidak dikenal diarahkan ke halaman 404 di `src/pages/NotFoundPage.jsx`.

Banner CTA penutup dipasang di `src/App.jsx`, bukan di tiap halaman, supaya judulnya bisa
diatur per rute dari satu tempat (`src/data/cta.js`).

Dua halaman tidak punya hero dan langsung masuk ke konten, sesuai wireframe terbaru:

- **Layanan** mulai dari section "5 Layanan Utama"
- **Kontak** mulai dari section "Hubungi Kami"

Karena tidak ada hero, kedua halaman itu memakai `<SectionHead as="h1">` supaya setiap
halaman tetap punya satu H1.

## Branch

`main` adalah branch default dan satu-satunya yang ter-deploy ke Vercel.

Enam branch `page/*` dibuat sebagai penanda halaman, isinya identik dengan `main`
(pin di commit yang sama):

| Branch | Halaman |
| --- | --- |
| `page/beranda` | Beranda |
| `page/tentang-kami` | Tentang Kami |
| `page/layanan` | Layanan |
| `page/portofolio` | Portofolio |
| `page/insight` | Insight / Blog |
| `page/kontak` | Kontak |

Branch `page/*` tidak otomatis ter-deploy. Kalau mau tiap branch punya preview sendiri,
aktifkan Preview Deployments di Vercel.

Branch `backup/*` (`backup/pre-wireframe`, `backup/pre-squash`, `backup/pre-rewrite`) ada
lokal saja dan tidak pernah di-push.

## Menambah halaman baru

1. Buat `src/pages/NamaPage.jsx`, export default sebuah komponen.
2. Di dalam komponen, panggil `<Seo title="..." description="..." />`.
3. Daftarkan route-nya di `src/App.jsx`. Kalau halamannya perlu menu, tambahkan juga di
   `navLinks` pada `src/data/site.js`.
4. Untuk banner CTA, tambah entri baru di `ctaByPath` (`src/App.jsx`) dan isi tiga slide di
   `src/data/cta.js`.

## Tahap desain sekarang

Tampilan masih mengikuti wireframe: hitam, putih, dan abu. Spesifikasi desain ada di
[docs/DESAIN.md](docs/DESAIN.md). Warna brand belum ditetapkan, jadi semua warna duduk di
variabel `:root` pada `src/index.css`. Saat brand guideline masuk, ganti variabel itu dan
seluruh situs ikut berubah tanpa menyentuh komponen.

Hijau hanya dipakai di logo (kotak berisi huruf G) dan favicon. Halaman selain itu tetap
grayscale. Warna logo tidak lewat `var()` di file SVG favicon karena favicon berdiri sendiri
tanpa CSS halaman, jadi hex-nya ditulis langsung di `public/icon.svg`.

Yang sudah diterapkan dari wireframe:

- Navbar: logo kiri, menu tengah, pemilih bahasa dan tombol Hubungi Kami kanan.
- Menu aktif ditandai garis bawah, di ponsel jadi menu hamburger.
- Footer satu komponen untuk semua halaman.
- Kartu horizontal dan kartu vertikal, tag kategori di pojok kiri atas.
- Banner CTA penutup dengan tiga slide dan indikator titik.
- Kartu layanan memakai format Problem, Solusi, Deliverables.
- Filter kategori Portofolio dan Insight bekerja tanpa pindah halaman.

Tombol `Baca Selengkapnya` di Insight dan `Unduh Company Profile` di Tentang masih
mengarah ke email karena berkas dan naskahnya belum ada. Form kontak dan berlangganan
memvalidasi isian lalu berhenti dengan pesan yang jujur; pengiriman nyata menunggu layanan
form dipilih.

## Kontras

Angka dihitung di atas putih, bukan ditebak:

- `--ink` #111111 terhadap putih 18.9:1
- `--muted` #595959 terhadap putih 7.0:1
- `--tag-ink` #404040 terhadap `--tag-bg` #efefef 9.0:1
- border control form memakai `--field` #8f8f8f, 3.2:1 terhadap putih

Garis pemisah antar section sengaja lebih terang (#d9d9d9) karena tidak membawa teks atau
menandai batas control.

Warna logo dihitung terpisah: putih di atas hijau `#047857` 5.5:1, lolos AA.

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

## Deploy

Vercel, preset dikunci lewat `vercel.json` di root (`framework: vite`, output `dist`, rewrite
SPA ke `/index.html`). Repo private, push ke `origin/main`.

## Catatan tim

`Footer` dan tombol WhatsApp adalah client component. `CopyrightYear` memakai
`new Date().getFullYear()` supaya tahun copyright selalu benar tanpa update manual.

`SectionHead` menerima prop `as` untuk memilih heading (`h1` atau `h2`, default `h2`).
Halaman tanpa hero memakainya supaya H1 tetap satu per halaman.

Logo ada di satu komponen (`src/components/Logo.jsx`) dan dipakai ulang di Header, Footer,
serta favicon. Kalau logo berubah, perbarui ketiga tempat itu.
