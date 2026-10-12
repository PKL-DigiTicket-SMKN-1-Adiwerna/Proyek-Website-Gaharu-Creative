/* Nama proyek, angka, dan hasil belum dikonfirmasi klien, jadi setiap item
 * ditandai verified: false dan tampil dengan badge. Ganti dengan proyek nyata
 * sebelum rilis.
 */
export const segments = [
  {
    key: "semua",
    label: "Semua",
    icon: "search",
    detail: "Menampilkan seluruh proyek 360 yang pernah dikerjakan.",
  },
  {
    key: "umkm",
    label: "UMKM",
    icon: "store",
    detail: "Fokus pada peningkatan visibilitas, leads, dan penjualan untuk bisnis lokal.",
  },
  {
    key: "korporat",
    label: "Korporat",
    icon: "building",
    detail: "Strategi kampanye dan konten terintegrasi untuk brand berskala lebih besar.",
  },
  {
    key: "pemerintah",
    label: "Pemerintah",
    icon: "landmark",
    detail: "Kampanye layanan publik dengan pendekatan komunikasi yang jelas dan terukur.",
  },
];

export const portfolioItems = [
  {
    slug: "kopi-nusantara-360",
    segment: "umkm",
    tag: "UMKM",
    title: "Kopi Nusantara 360",
    summary: "Dari kampanye digital hingga optimasi konversi untuk meningkatkan pembelian.",
    services: ["Content", "Performance Marketing"],
    verified: false,
  },
  {
    slug: "gaharu-cloud-launch",
    segment: "korporat",
    tag: "Korporat",
    title: "Gaharu Cloud Launch",
    summary: "Penguatan awareness dan penanganan funnel dari iklan ke lead.",
    services: ["Branding", "Performance Marketing"],
    verified: false,
  },
  {
    slug: "program-literasi-digital",
    segment: "pemerintah",
    tag: "Pemerintah",
    title: "Program Literasi Digital",
    summary: "Kampanye informasi berbasis konten dan distribusi kanal yang terukur.",
    services: ["Content", "Social Media"],
    verified: false,
  },
  {
    slug: "skincare-lokal-go-online",
    segment: "umkm",
    tag: "UMKM",
    title: "Skincare Lokal Go-Online",
    summary: "Perencanaan konten, optimasi performa, dan strategi retargeting.",
    services: ["Social Media", "Performance Marketing"],
    verified: false,
  },
  {
    slug: "rebranding-kampanye-q2",
    segment: "korporat",
    tag: "Korporat",
    title: "Rebranding Kampanye Q2",
    summary: "Rangkaian aset kreatif dan strategi kampanye multikanal.",
    services: ["Branding", "Content"],
    verified: false,
  },
  {
    slug: "layanan-publik-mobile",
    segment: "pemerintah",
    tag: "Pemerintah",
    title: "Layanan Publik Mobile",
    summary: "Komunikasi layanan publik dengan fokus edukasi dan adopsi.",
    services: ["Digital Product Development"],
    verified: false,
  },
];

/* Tiga proyek sorotan untuk Beranda. */
export const featuredWork = [
  {
    segment: "umkm",
    tag: "UMKM",
    title: "Kampanye konten dan iklan untuk meningkatkan penjualan",
    result: "Hasil: leads dan transaksi meningkat",
    verified: false,
  },
  {
    segment: "korporat",
    tag: "Korporat",
    title: "Rebranding dan strategi komunikasi multi channel",
    result: "Hasil: awareness naik dan pipeline lebih berkualitas",
    verified: false,
  },
  {
    segment: "pemerintah",
    tag: "Pemerintah",
    title: "Penguatan layanan digital dan optimasi landing page",
    result: "Hasil: kinerja layanan membaik dan adopsi meningkat",
    verified: false,
  },
];

/* Angka pencapaian belum ada sumbernya. */
export const stats = [
  { label: "Tahun Berdiri", value: "Sejak 2020", note: true },
  { label: "Klien", value: "100+ Klien", note: true },
  { label: "Proyek", value: "500+ Proyek", note: true },
];

/* Logo klien belum dikirim. */
export const clientLogos = [
  "Logo Klien 1",
  "Logo Klien 2",
  "Logo Klien 3",
  "Logo Klien 4",
  "Logo Klien 5",
];

/* Testimoni belum ada identitas pemberi. */
export const testimonials = [
  {
    name: "Nama Klien",
    company: "Perusahaan atau Instansi",
    quote:
      "Gaharu Creative membantu kami menyusun strategi 360 yang jelas dan dieksekusi dengan rapi. Hasilnya terlihat dari meningkatnya kualitas leads dan konsistensi performa kampanye. Komunikasinya juga responsif sejak tahap perencanaan sampai evaluasi.",
    verified: false,
  },
];
