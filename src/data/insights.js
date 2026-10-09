/*
 * Artikel Insight. Isi dari DESAIN.md 4.5, judul dan ringkasan masih contoh
 * wireframe. DESAIN.md 6.11: tanggal di wireframe cuma bulan, di sini
 * dilengkapi tahun agar tidak ambigu.
 */
export const insightCategories = [
  { key: "semua", label: "Semua", icon: "layers" },
  { key: "digital-marketing", label: "Digital Marketing", icon: "chart" },
  { key: "branding", label: "Branding", icon: "brand" },
  { key: "teknologi", label: "Teknologi", icon: "tech" },
];

export const posts = [
  {
    slug: "strategi-digital-marketing-umkm-2025",
    category: "digital-marketing",
    tag: "Digital Marketing",
    title: "Strategi Digital Marketing untuk UMKM di 2025",
    excerpt:
      "Panduan menyusun strategi yang fokus pada target funnel dan pengukuran yang jelas.",
    date: "2025-09",
    dateLabel: "September 2025",
    verified: false,
  },
  {
    slug: "brand-identity-yang-kuat",
    category: "branding",
    tag: "Branding",
    title: "Cara Meningkatkan Brand Identity yang Kuat untuk Bisnis Anda",
    excerpt:
      "Langkah membangun identitas merek yang konsisten dari positioning sampai visual dan tone of voice.",
    date: "2025-08",
    dateLabel: "Agustus 2025",
    verified: false,
  },
  {
    slug: "tren-teknologi-digital-2025",
    category: "teknologi",
    tag: "Teknologi",
    title: "Tren Teknologi Digital yang Akan Mempengaruhi Bisnis di 2025",
    excerpt:
      "Pemetaan teknologi yang relevan untuk efisiensi proses, personalisasi, dan pertumbuhan.",
    date: "2025-07",
    dateLabel: "Juli 2025",
    verified: false,
  },
];

/* Artikel belum ditulis, jadi daftar di atas adalah outline dari wireframe. */
export const insightsDraftOnly = true;
