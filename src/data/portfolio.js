import { jumlahMitra } from "./klien.js";

export const segments = [
  { key: "semua", label: "Semua", icon: "🌐", detail: "Seluruh portofolio proyek dari segmen UMKM, Korporat, hingga Pemerintah." },
  { key: "umkm", label: "UMKM", icon: "🏪", detail: "Fokus pada peningkatan visibilitas, perolehan qualified leads, dan percepatan penjualan bisnis lokal." },
  { key: "korporat", label: "Korporat", icon: "🏢", detail: "Strategi kampanye berskala luas, omnichannel positioning, dan konten terintegrasi enterprise B2B/B2C." },
  { key: "pemerintah", label: "Pemerintah", icon: "🏛️", detail: "Kampanye layanan publik berbasis edukasi dengan pendekatan komunikasi yang transparan, jelas, dan terukur." },
];

export const portfolioItems = [
  {
    slug: "umkm-ecommerce-lokal",
    title: "UMKM: E-Commerce Lokal",
    tag: "UMKM",
    segment: "umkm",
    summary: "Kampanye konten digital terpadu & performa ads harian yang mendorong peningkatan penjualan dan jangkauan bisnis online.",
    result: "Peningkatan omzet 2.4x dan pertumbuhan leads hingga +180%.",
    image: "/Beranda-Portofolio(UMKM E-Commerce).webp",
  },
  {
    slug: "korporat-gaharu-cloud",
    title: "Korporat: Gaharu Cloud Launch",
    tag: "Korporat",
    segment: "korporat",
    summary: "Penguatan awareness dan penanganan pipeline B2B melalui strategi thought leadership dan performance ads.",
    result: "Jangkauan total 1.2M+ impresi dan 450+ qualified B2B leads.",
    image: "/Beranda-Portofolio(Gaharu Cloud).webp",
  },
  {
    slug: "pemerintah-literasi-digital",
    title: "Pemerintah: Literasi Digital",
    tag: "Pemerintah",
    segment: "pemerintah",
    summary: "Kampanye informasi publik berbasis micro-learning dan konten infografis interaktif lintas demografi.",
    result: "Tingkat engagement 92% dengan indeks kepuasan publik 4.8/5.",
    image: "/Proyek Literasi Digital Pemerintah.webp",
  },
];

export const featuredWork = portfolioItems;

export const stats = [
  { label: "Tahun Berdiri", value: "Sejak 2016" },
  { label: "Usaha Terbantu", value: "25.000+ Usaha" },
  { label: "Mitra Strategis", value: `${jumlahMitra} Institusi` },
];

export const testimonials = [
  {
    name: "Budi Santoso",
    company: "Pemilik UMKM Kuliner",
    quote: "Gaharu Creative berhasil meningkatkan penjualan toko online kami secara signifikan.",
  },
];