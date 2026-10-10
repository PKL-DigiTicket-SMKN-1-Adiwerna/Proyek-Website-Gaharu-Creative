# Gaharu Creative

Website company profile Gaharu Creative. Proyek PKL, dikerjakan enam orang selama empat minggu.
Live di https://proyek-website-gaharu-creative.vercel.app

Vite 8, React 19, React Router 7, Tailwind CSS v4. JavaScript saja, tidak ada TypeScript.
Tidak ada database dan tidak ada CMS. Semua konten ada di `src/data/`.

## Jalanin

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build
npm run preview
```

Node.js 20 ke atas.

## Isi folder

```
index.html          shell HTML, meta tag, link favicon
vite.config.js      plugin React dan Tailwind
vercel.json         preset deploy dan rewrite SPA
docs/
  DESAIN.md                  spesifikasi desain, sumber kebenaran semua copy
  DATA-YANG-DIBUTUHKAN.md    daftar data yang masih perlu dari klien
src/
  main.jsx          createRoot + BrowserRouter
  App.jsx           daftar route, banner CTA per route, varian footer
  index.css         token warna, focus ring, badge placeholder
  pages/            satu file per halaman
  components/       Header, Footer, Logo, CtaBanner, WhatsAppButton, ui, Icons, Seo, CopyrightYear
  data/             site, services, portfolio, insights, tentang, cta
public/
  icon.svg          logo dan favicon
  icon-32.png
  icon-192.png      apple-touch-icon
```

## Halaman

Enam: Beranda, Tentang, Layanan, Portofolio, Insight, Kontak. Route tidak dikenal masuk ke
`src/pages/NotFoundPage.jsx`.

Layanan dan Kontak tidak punya hero, keduanya langsung masuk ke konten. Karena tidak ada
hero, `SectionHead` dipakai dengan `as="h1"` supaya tiap halaman tetap punya satu H1.

Banner CTA penutup dipasang di `src/App.jsx`, bukan di tiap halaman, supaya judul per rute
disimpan di satu tempat: `src/data/cta.js`.

## Branch

`main` yang ke-deploy ke Vercel.

Ada enam branch `page/*`, satu per halaman, isinya sama persis dengan `main`:

| Branch | Halaman |
| --- | --- |
| `page/beranda` | Beranda |
| `page/tentang-kami` | Tentang Kami |
| `page/layanan` | Layanan |
| `page/portofolio` | Portofolio |
| `page/insight` | Insight / Blog |
| `page/kontak` | Kontak |

Branch `page/*` tidak ikut deploy. Kalau mau tiap branch punya preview sendiri, aktifkan
Preview Deployments di Vercel.

Branch `backup/*` hanya ada di lokal, tidak pernah di-push.

## Menambah halaman

1. `src/pages/NamaPage.jsx`, export default satu komponen.
2. Panggil `<Seo title="..." description="..." />` di dalamnya.
3. Daftarkan route di `src/App.jsx`. Kalau perlu menu, tambah juga di `navLinks` pada
   `src/data/site.js`.
4. Tambah key di `ctaByPath` (`src/App.jsx`) dan isi tiga slide di `src/data/cta.js`.

## Sejauh ini

Tampilan masih grayscale: hitam, putih, abu. Warna brand belum masuk, jadi semua warna
berada di `:root` pada `src/index.css`. Waktu brand guideline masuk, ganti variabel di sana
dan seluruh situs ikut berubah tanpa menyentuh komponen.

Hijau cuma dipakai di logo dan favicon. Di `public/icon.svg` warnanya ditulis sebagai hex,
bukan `var()`, karena file itu berdiri sendiri tanpa CSS halaman.

Kontras dihitung, bukan dikira-kira:

| Token | Nilai | Rasio ke putih |
| --- | --- | --- |
| `--ink` | #111111 | 18.9:1 |
| `--muted` | #595959 | 7.0:1 |
| `--tag-ink` | #404040 | 9.0:1 ke atas `--tag-bg` #efefef |
| `--field` | #8f8f8f | 3.2:1, dipakai buat border control form |
| `--brand-ink` | #ffffff | 5.5:1 ke atas hijau #047857 |

`--line` #d9d9d9 lebih terang dari sengaja karena cuma pemisah section dan tidak membawa teks.

## Yang belum ada

Tombol `Baca Selengkapnya` di Insight dan `Unduh Company Profile` di Tentang masih mengarah ke
email karena naskah dan berkasnya belum ada. Form kontak dan berlangganan sudah validasi isian,
lalu berhenti dengan pesan jujur. Pengiriman nyata menunggu pilihan layanan form.

Detail halaman studi kasus, detail artikel, dan halaman Kebijakan Privasi, Syarat & Ketentuan,
serta Karier belum dibuat. Wireframe cuma berisi enam halaman.

## Data yang perlu

Nilai di `src/data/site.js` yang belum dipastikan ditandai `TBD` dan punya flag boolean:
`emailVerified`, `waNumberVerified`, `phoneVerified`, `addressVerified`. Set `true` begitu
data asli masuk. Elemen ber-`data-placeholder` dapat badge kecil bertuliskan belum diverifikasi,
jadi data contoh tidak pernah tampil seolah-olah fakta.

Daftar lengkap ada di [docs/DATA-YANG-DIBUTUHKAN.md](docs/DATA-YANG-DIBUTUHKAN.md).
Spesifikasi desain ada di [docs/DESAIN.md](docs/DESAIN.md).

## Catatan

`CopyrightYear` pakai `new Date().getFullYear()`, jadi tahun copyright tidak perlu di-update
manual.

Logo ada di satu tempat: `src/components/Logo.jsx`. Navbar, footer, dan favicon pakai sumber
yang sama. Kalau logo berubah, perbarui ketiga-duanya.
