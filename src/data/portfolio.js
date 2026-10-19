/* Sumber tunggal untuk angka dan portofolio yang tampil di Beranda.
 *
 * Catatan permintaan (Pa Rizqi, 19 Okt 2026): angka hasil pekerjaan dan gambar
 * portofolio masih contoh, nanti diganti portofolio asli. Semuanya ada di file
 * ini. Cara menggantinya:
 *   1. ganti `proyek`, `summary`, `disiplin`, `resultDraft`, `image` pada item,
 *   2. set `contoh: false` pada item yang sudah jadi data asli,
 *   3. penanda "Contoh" di halaman hilang sendiri, tanpa menyentuh kode tampilan.
 *
 * Empat angka di band gelap Beranda diambil dari data resmi perusahaan
 * (site.js dan klien.js) dan dihitung dari daftar, bukan diketik manual, supaya
 * tidak ada angka yang tertinggal saat daftarnya bertambah.
 */
import { site } from "./site.js";
import { jumlahMitra, penghargaan } from "./klien.js";

export const segments = [
  { key: "semua", label: "Semua", icon: "layers", detail: "Seluruh portofolio proyek dari segmen UMKM, Korporat, hingga Pemerintah." },
  { key: "umkm", label: "UMKM", icon: "building", detail: "Fokus pada peningkatan visibilitas, perolehan qualified leads, dan percepatan penjualan bisnis lokal." },
  { key: "korporat", label: "Korporat", icon: "building", detail: "Strategi kampanye berskala luas, omnichannel positioning, dan konten terintegrasi enterprise B2B/B2C." },
  { key: "pemerintah", label: "Pemerintah", icon: "landmark", detail: "Kampanye layanan publik berbasis edukasi dengan pendekatan komunikasi yang transparan, jelas, dan terukur." },
];

/* Band angka di Beranda. Semua dari data resmi: tahun berdiri dari site.js,
 * jumlah mitra dan penghargaan dihitung dari daftar di klien.js. Angka
 * "25.000+" diambil dari kalimat pengantar rekam jejak yang dikirim perusahaan
 * 14 Okt 2026.
 */
export const angkaBeranda = [
  { nilai: `Sejak ${site.founded}`, arti: "Mendampingi bisnis dari riset sampai tayang" },
  { nilai: "25.000+", arti: "Usaha yang sudah didampingi" },
  { nilai: `${jumlahMitra}`, arti: "Mitra kementerian, BUMN, dan perusahaan" },
  { nilai: `${penghargaan.length}`, arti: "Penghargaan nasional dan internasional" },
];

export const portfolioItems = [
  {
    slug: "umkm-ecommerce-lokal",
    title: "UMKM: E-Commerce Lokal",
    tag: "UMKM",
    segment: "umkm",
    proyek: "UMKM e-commerce lokal, dari konten harian sampai iklan",
    disiplin: ["Produksi Konten", "Iklan Berbayar"],
    summary:
      "Kampanye konten digital terpadu & performa ads harian yang mendorong peningkatan penjualan dan jangkauan bisnis online.",
    resultDraft: "Omzet 2.4x, leads naik 180%",
    image: "/Beranda-Portofolio(UMKM E-Commerce).webp",
    gambarAlt: "Contoh tampilan pekerjaan e-commerce untuk UMKM lokal",
    contoh: true,
  },
  {
    slug: "korporat-gaharu-cloud",
    title: "Korporat: Gaharu Cloud Launch",
    tag: "Korporat",
    segment: "korporat",
    proyek: "Meluncurkan produk cloud ke pembeli B2B",
    disiplin: ["Strategi Merek", "Thought Leadership", "Iklan Berbayar"],
    summary:
      "Penguatan awareness dan penanganan pipeline B2B melalui strategi thought leadership dan performance ads.",
    resultDraft: "1,2 juta impresi, 450 leads B2B",
    image: "/Beranda-Portofolio(Gaharu Cloud).webp",
    gambarAlt: "Contoh tampilan pekerjaan peluncuran produk cloud",
    contoh: true,
  },
  {
    slug: "pemerintah-literasi-digital",
    title: "Pemerintah: Literasi Digital",
    tag: "Pemerintah",
    segment: "pemerintah",
    proyek: "Kampanye literasi digital lintas kelompok usia",
    disiplin: ["Desain Informasi", "Produksi Konten"],
    summary:
      "Kampanye informasi publik berbasis micro-learning dan konten infografis interaktif lintas demografi.",
    resultDraft: "Keterlibatan 92%, kepuasan 4,8 dari 5",
    image: "/Proyek Literasi Digital Pemerintah.webp",
    gambarAlt: "Contoh tampilan kampanye literasi digital untuk instansi",
    contoh: true,
  },
];

export const featuredWork = portfolioItems;

/* Alias lama, tetap diekspor supaya kode yang masih membacanya tidak rusak.
 * Sumber angka resmi ada di `angkaBeranda` (lebih lengkap). */
export const stats = [
  { label: "Tahun Berdiri", value: `Sejak ${site.founded}` },
  { label: "Usaha Terbantu", value: "25.000+ Usaha" },
  { label: "Mitra Strategis", value: `${jumlahMitra} Institusi` },
];

/* Testimoni yang tayang harus sudah disetujui pemilik bisnis. Belum ada yang
 * disetujui, jadi daftarnya kosong dan section "Kata klien" di Beranda tidak
 * dirender sama sekali (audit staging 12 Okt 2026, temuan C03: sembunyikan
 * blok yang belum siap, jangan cuma hapus label peringatannya).
 * Contoh lama disimpan sebagai draft supaya tidak hilang.
 */
export const testimonials = [];

export const testimonialsDraft = [
  {
    name: "Budi Santoso",
    company: "Pemilik UMKM Kuliner",
    quote: "Gaharu Creative berhasil meningkatkan penjualan toko online kami secara signifikan.",
    approved: false,
  },
];
