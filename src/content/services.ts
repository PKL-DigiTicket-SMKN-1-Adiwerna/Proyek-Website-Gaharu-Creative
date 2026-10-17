import { Service } from "@/lib/types";

export const servicesData: Service[] = [
  {
    slug: "branding",
    title: "Branding yang Membangun Identitas Bisnis yang Kuat",
    subtitle: "Solusi Identitas Bisnis",
    badge: "Branding & Creative Strategy",
    description:
      "Membantu merancang logo, sistem visual, dan tone of voice yang memikat untuk meningkatkan kredibilitas instan di benak audiens sasaran.",
    problems: [
      {
        title: "Identitas Tidak Konsisten",
        desc: "Tampilan visual dan pesan berubah-ubah sehingga membingungkan audiens.",
      },
      {
        title: "Kalah Bersaing di Pasar",
        desc: "Produk/layanan bagus tapi kurang berkarakter dibandingkan kompetitor.",
      },
      {
        title: "Brand Awareness Rendah", desc: "Sulit diingat dan kurang dipercaya oleh calon konsumen potensial.",
      },
    ],
    deliverables: [
      { title: "Logo System", tag: "Visual Identity", desc: "Sistem identitas visual adaptif untuk berbagai media cetak dan digital." },
      { title: "Brand Guidelines", tag: "Standardization", desc: "Dokumentasi standar penggunaan aset visual dan panduan gaya komunikasi." },
      { title: "Brand Assets", tag: "Collateral", desc: "Desain kartu nama, kop surat, hingga elemen pendukung promosi." },
    ],
    workflow: [
      { step: "01", title: "Discovery", desc: "Riset awal audiens, kompetitor, dan posisi pasar." },
      { step: "02", title: "Strategy", desc: "Perancangan fondasi strategi branding dan konsep awal." },
      { step: "03", title: "Design", desc: "Eksekusi visual logo, warna, tipografi, dan elemen brand." },
      { step: "04", title: "Delivery", desc: "Serah terima master file beserta panduan Brand Guidelines." },
    ],
    faqs: [
      { question: "Berapa lama proses pengerjaan branding?", answer: "Proses pengerjaan biasanya memakan waktu sekitar 3 sampai 6 minggu tergantung pada kompleksitas kebutuhan." },
      { question: "Apakah bisa mengajukan revisi?", answer: "Ya, kami menyediakan sesi revisi terstruktur pada setiap tahapan persetujuan." },
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing Berbasis Data dan Hasil",
    subtitle: "Iklan & Akuisisi Terukur",
    badge: "Performance Marketing",
    description:
      "Strategi akuisisi berbasis corong presisi (funnel tracking) di Meta, Google, dan TikTok dengan optimasi Cost Per Acquisition (CPA) yang efisien.",
    problems: [
      { title: "Budget Iklan Terbuang", desc: "Biaya iklan tinggi tanpa hasil penjualan atau leads yang jelas." },
      { title: "Targeting Tidak Tepat", desc: "Iklan tidak menjangkau calon pembeli yang memiliki niat beli tinggi." },
      { title: "Tracking Buruk", desc: "Tidak ada data akurat untuk mengukur Return on Ad Spend (ROAS)." },
    ],
    deliverables: [
      { title: "Meta & Google Ads", tag: "Paid Traffic", desc: "Setup dan optimasi kampanye iklan berkinerja tinggi." },
      { title: "Funnel Tracking", tag: "Analytics", desc: "Pemasangan piksel dan analisis konversi terintegrasi." },
      { title: "Reporting Dashboard", tag: "Report", desc: "Laporan performa harian/mingguan yang transparan." },
    ],
    workflow: [
      { step: "01", title: "Audit & Setup", desc: "Analisis akun iklan dan pemasangan tracking pixel." },
      { step: "02", title: "Funnel Strategy", desc: "Perancangan alur kualifikasi audiens dari awareness hingga konversi." },
      { step: "03", title: "Optimization", desc: "Pengujian A/B testing materi iklan dan pengelolaan budget." },
      { step: "04", title: "Scale Up", desc: "Meningkatkan anggaran pada materi iklan dengan ROAS terbaik." },
    ],
    faqs: [
      { question: "Berapa minimal budget iklan yang direkomendasikan?", answer: "Budget disesuaikan dengan target bisnis Anda, kami membantu menentukan alokasi paling efektif." },
    ],
  },
  {
    slug: "digital-product-development",
    title: "Solusi Digital untuk Kebutuhan Bisnis Anda",
    subtitle: "Web & Custom Software",
    badge: "Digital Product Development",
    description:
      "Rekayasa perangkat lunak adaptif, mulai dari landing page konversi tinggi hingga sistem platform internal/SaaS yang tangguh.",
    problems: [
      { title: "Website Ketinggalan Zaman", desc: "Performa lambat dan tidak responsif di perangkat mobile." },
      { title: "Navigasi Sulit", desc: "Pengalaman pengguna buruk sehingga calon pembeli keluar dari website." },
      { title: "Sistem Tidak Scalable", desc: "Platform sulit dikembangkan seiring bertambahnya jumlah pengguna." },
    ],
    deliverables: [
      { title: "Landing Page & Web App", tag: "Development", desc: "Website modern dengan waktu muat cepat dan SEO friendly." },
      { title: "Design System", tag: "UI/UX", desc: "Antarmuka intuitif yang disesuaikan dengan kebutuhan pengguna." },
      { title: "API Integration", tag: "Backend", desc: "Integrasi sistem pembayaran, CRM, dan tools pihak ketiga." },
    ],
    workflow: [
      { step: "01", title: "Discovery", desc: "Riset kebutuhan pengguna dan spesifikasi teknis." },
      { step: "02", title: "UI/UX Design", desc: "Pembuatan wireframe dan prototipe interaktif." },
      { step: "03", title: "Development", desc: "Koding bersih berbasis Next.js/React dan arsitektur modern." },
      { step: "04", title: "Testing & Launch", desc: "Uji coba bebas bug dan peluncuran sistem ke publik." },
    ],
    faqs: [
      { question: "Berapa lama estimasi pengerjaan website?", answer: "Landing page biasanya selesai dalam 1-2 minggu, sedangkan sistem web/SaaS membutuhkan 4-8 minggu." },
    ],
  },
  {
    slug: "content",
    title: "Konten Digital yang Relevan dan Menarik",
    subtitle: "Multimedia & Narrative Studio",
    badge: "Content Creation",
    description:
      "Produksi multimedia berselera tinggi yang memadukan estetika sinematik dengan narasi persuasif terukur.",
    problems: [
      { title: "Konten Kurang Menarik", desc: "Kualitas visual standar yang tidak memikat perhatian audiens." },
      { title: "Pesan Tidak Sampai", desc: "Pesan promosi terlalu jualan dan kurang memberikan value." },
      { title: "Tidak Konsisten", desc: "Jadwal tayang konten tidak teratur karena kendala produksi." },
    ],
    deliverables: [
      { title: "Content Calendar", tag: "Planning", desc: "Perencanaan ide dan jadwal rilis konten bulanan." },
      { title: "Short-Form Video", tag: "Reels / TikTok", desc: "Video editan kreatif untuk tingkatkan daya jangkau." },
      { title: "Visual Assets", tag: "Design", desc: "Desain grafis feed, banner, dan materi promosi digital." },
    ],
    workflow: [
      { step: "01", title: "Research", desc: "Analisis tren dan preferensi konten audiens." },
      { step: "02", title: "Production", desc: "Proses shooting video dan pembuatan desain grafis." },
      { step: "03", title: "Editing", desc: "Penyuntingan suara, warna, dan penambahan animasi." },
      { step: "04", title: "Publishing", desc: "Penjadwalan tayang dan analisis performa konten." },
    ],
    faqs: [
      { question: "Apakah tim Gaharu menyediakan tim shooting?", answer: "Ya, kami memiliki tim produksi lengkap termasuk videografer, fotografer, dan editor." },
    ],
  },
  {
    slug: "social-media",
    title: "Kelola Social Media dengan Strategi yang Terarah",
    subtitle: "Management & Engagement",
    badge: "Social Media Management",
    description:
      "Aktivasi interaksi harian, kolaborasi KOL, serta manajemen persona media sosial terpadu untuk membangun komunitas setia.",
    problems: [
      { title: "Engagement Rendah", desc: "Jumlah pengikut banyak tetapi sedikit interaksi pada postingan." },
      { title: "Format Tidak Sesuai", desc: "Tampilan postingan acak-acakan tanpa karakter visual jelas." },
      { title: "Respon Lambat", desc: "Komentar dan pertanyaan calon pembeli sering tidak terbalas." },
    ],
    deliverables: [
      { title: "Full Management", tag: "End-to-End", desc: "Pengelolaan penuh dari perencanaan ide hingga upload." },
      { title: "KOL Activation", tag: "Influencer", desc: "Kolaborasi dengan influencer yang relevan dengan target audiens." },
      { title: "Community Care", tag: "Interaction", desc: "Manajemen balasan komentar dan pesan masuk (DM)." },
    ],
    workflow: [
      { step: "01", title: "Audit & Strategy", desc: "Evaluasi performa akun media sosial saat ini." },
      { step: "02", title: "Content Plan", desc: "Penyusunan gaya bahasa (tone of voice) dan jadwal posting." },
      { step: "03", title: "Execution", desc: "Produksi visual dan pengelolaan interaksi harian." },
      { step: "04", title: "Evaluation", desc: "Laporan pertumbuhan follower dan keterlibatan audiens." },
    ],
    faqs: [
      { question: "Platform media sosial apa saja yang dikelola?", answer: "Kami mengelola Instagram, TikTok, LinkedIn, YouTube Shorts, dan Facebook." },
    ],
  },
];