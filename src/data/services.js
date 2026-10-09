/*
 * Lima layanan utama. Bentuk kartu mengikuti DESAIN.md 4.2: setiap kartu
 * memuat Problem, Solusi, dan Deliverables.
 *
 * field `process` dan `outcome` dipakai nanti saat halaman detail layanan
 * dibuat, jadi untuk sekarang tidak dirender.
 */
export const services = [
  {
    slug: "branding",
    tag: "Strategi",
    title: "Branding",
    short: "Identitas merek, strategi positioning, dan panduan komunikasi.",
    problem: "Identitas brand belum jelas.",
    solution: "Bangun brand yang kuat dan konsisten.",
    deliverables: ["Logo", "Visual identity", "Brand guidelines"],
    icon: "brand",
    process: [
      { title: "Riset dan positioning", detail: "Wawancara dengan tim, analisis pasar, dan pemetaan kompetitor." },
      { title: "Konsep", detail: "Arah visual dan verbal disetujui lebih dulu sebelum masuk detail eksekusi." },
      { title: "Pengembangan aset", detail: "Logo, warna, tipografi, dan sistem visual yang saling menyambung." },
      { title: "Serah terima", detail: "File siap pakai plus panduan singkat agar brand tetap konsisten." },
    ],
    outcome: "Brand yang tampil sama di semua kanal, dari iklan sampai balasan chat.",
  },
  {
    slug: "content",
    tag: "Kreatif",
    title: "Content",
    short: "Perencanaan konten, produksi, dan optimasi untuk tiap tahap funnel.",
    problem: "Konten tidak berkualitas dan tidak relevan.",
    solution: "Buat konten yang relevan, menarik, dan konsisten.",
    deliverables: ["Social media content", "Copywriting", "Visual content"],
    icon: "content",
    process: [
      { title: "Riset audiens", detail: "Memahami siapa yang membeli, apa yang mereka khawatirkan, dan bahasa yang mereka pakai." },
      { title: "Ide dan naskah", detail: "Topik diambil dari keluhan yang paling sering muncul, bukan dari daftar ide generik." },
      { title: "Produksi", detail: "Fotografi, video, dan penulisan naskah dalam satu alur kerja." },
      { title: "Evaluasi", detail: "Performa tiap topik ditinjau untuk menentukan arah konten berikutnya." },
    ],
    outcome: "Audiens yang paham produk dan sudah siap bicara dengan tim Anda.",
  },
  {
    slug: "social-media",
    tag: "Engagement",
    title: "Social Media",
    short: "Kampanye organik, kalender konten, dan pengelolaan komunitas.",
    problem: "Social media tidak dikelola secara efektif.",
    solution: "Kelola dengan strategi dan ritme yang tepat.",
    deliverables: ["Content planning", "Publishing", "Engagement"],
    icon: "social",
    process: [
      { title: "Audit kanal", detail: "Menilai apa yang sudah berjalan dan apa yang kehilangan audiens." },
      { title: "Kalender konten", detail: "Ritme posting yang bisa dijaga tim, bukan target yang berhenti di minggu kedua." },
      { title: "Interaksi", detail: "Balasan komentar dan pesan pribadi masuk dalam alur kerja harian." },
      { title: "Laporan", detail: "Pertumbuhan follower dibaca bersama kualitas interaksi, bukan sendirian." },
    ],
    outcome: "Kanal yang hidup terus dengan bahasa yang jelas dan konsisten.",
  },
  {
    slug: "performance-marketing",
    tag: "Terukur",
    title: "Performance Marketing",
    short: "Iklan berbayar berbasis data untuk leads, penjualan, dan retensi.",
    problem: "Iklan tidak menghasilkan performa yang terukur.",
    solution: "Advertising berbasis data untuk mencapai target bisnis.",
    deliverables: ["Campaign strategy", "Ads optimization", "Reporting"],
    icon: "chart",
    process: [
      { title: "Target dan metrik", detail: "Kesepakatan angka yang dipakai menilai sukses sebelum budget jalan." },
      { title: "Struktur kampanye", detail: "Segmentasi audiens, penawaran, dan kanal dipilih sesuai tahap funnel." },
      { title: "Optimasi", detail: "Aset dan penempatan dibaca tiap pekan dan diubah kalau angkanya turun." },
      { title: "Reporting", detail: "Laporan berisi keputusan yang diambil, bukan hanya tangkapan layar dashboard." },
    ],
    outcome: "Biaya per leads yang bisa dijelaskan dan anggaran yang tidak terbuang.",
  },
  {
    slug: "digital-product-development",
    tag: "Produk",
    title: "Digital Product Development",
    short: "Pengembangan produk digital, landing page, dan optimasi pengalaman pengguna.",
    problem: "Bisnis membutuhkan produk digital yang efektif.",
    solution: "Kembangkan produk digital yang berguna dan scalable.",
    deliverables: ["Website", "Web application", "Digital platform"],
    icon: "code",
    process: [
      { title: "Discovery", detail: "Memahami alur kerja dan masalah yang paling sering dikeluhkan pengguna." },
      { title: "Desain dan arsitektur", detail: "Wireframe, alur pengguna, dan keputusan teknis." },
      { title: "Pengembangan", detail: "Kode, integrasi, dan pengujian." },
      { title: "Peluncuran", detail: "Deploy, monitoring, dan pelatihan tim internal." },
    ],
    outcome: "Produk digital yang cepat, stabil, dan mudah dirawat tim sendiri.",
  },
];

/* DESAIN.md 4.2 "Kenapa Memilih Gaharu": empat poin, masing-masing punya
 * label kecil di bawah judul. */
export const whyChooseUs = [
  {
    icon: "team",
    title: "Tim Berpengalaman",
    label: "Kolaborasi strategi hingga eksekusi",
    detail: "Proses berjalan dengan alur kerja yang jelas dan komunikasi yang responsif.",
  },
  {
    icon: "chart",
    title: "Strategi Berbasis Data",
    label: "Keputusan dari insight",
    detail: "Kami menyelaraskan tujuan bisnis dengan metrik yang relevan untuk tiap tahap.",
  },
  {
    icon: "tech",
    title: "Teknologi Terdepan",
    label: "Alat dan praktik yang tepat",
    detail: "Menggunakan pendekatan modern untuk mempercepat produksi dan memaksimalkan performa.",
  },
  {
    icon: "target",
    title: "Hasil Terukur",
    label: "Transparansi progres",
    detail: "Pelaporan dan evaluasi membantu Anda melihat dampak dari setiap program.",
  },
];
