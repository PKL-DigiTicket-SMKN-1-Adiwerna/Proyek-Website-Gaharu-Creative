/*
 * Banner CTA penutup di atas footer (DESAIN.md 3.3). Wireframe menuliskan
 * satu judul per halaman dengan indikator tiga titik, jadi isi slide per
 * halaman dikumpulkan di sini dan dipakai komponen CtaBanner.
 */
export const ctaSlides = {
  beranda: [
    {
      title: "Siap Mengembangkan Bisnis Anda?",
      detail: "Ceritakan target Anda, kami balas dengan gambaran langkah dan prioritas yang masuk akal.",
      actions: [
        { label: "Konsultasi Gratis", kind: "primary", href: "/kontak" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
    {
      title: "Butuh audit kanal digital?",
      detail: "Kami tinjau konten, iklan, dan kanal sosial yang sudah jalan sebelum menambah anggaran baru.",
      actions: [
        { label: "Ajukan Konsultasi", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
    {
      title: "Punya deadline peluncuran?",
      detail: "Untuk produk atau kampanye dengan tanggal rilis tetap, kami susun alur kerja terbalik dari tenggat.",
      actions: [
        { label: "Minta Penawaran", kind: "primary", href: "/kontak" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
  ],
  layanan: [
    {
      title: "Diskusikan Kebutuhan Anda",
      detail: "Ceritakan masalahnya, kami usulkan layanan yang benar-benar diperlukan, tidak termasuk sisanya.",
      actions: [
        { label: "Konsultasi Gratis", kind: "primary", href: "/kontak" },
        { label: "Minta Penawaran", kind: "secondary", href: "/kontak" },
      ],
    },
    {
      title: "Belum tahu layanan mana yang cocok?",
      detail: "Kirim deskripsi singkat bisnis Anda, kami bantu petakan titik awal yang paling berdampak.",
      actions: [
        { label: "Ajukan Konsultasi", kind: "primary", href: "/kontak" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
    {
      title: "Roadmap 360 untuk tim Anda",
      detail: "Urutan kerja antar layanan kami pecah jadi tahap yang bisa dijalankan bertahap.",
      actions: [
        { label: "Minta Penawaran", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
  ],
  portofolio: [
    {
      title: "Punya Proyek Serupa?",
      detail: "Gaharu Creative dapat membantu dari strategi 360, produksi konten, hingga optimasi performa berbasis data agar hasilnya jelas dan terukur.",
      actions: [
        { label: "Ajukan Konsultasi", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
    {
      title: "Ingin angka yang bisa dilacak?",
      detail: "Setiap kampanye kami jalankan dengan metrik yang disepakati sebelum budget dikeluarkan.",
      actions: [
        { label: "Konsultasi Gratis", kind: "primary", href: "/kontak" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
    {
      title: "Kategori industri kami beda-beda",
      detail: "UMKM, korporat, dan layanan publik punya ukuran sukses yang berbeda. Kami sesuaikan lebih dulu.",
      actions: [
        { label: "Minta Penawaran", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
  ],
  tentang: [
    {
      title: "Siap Bekerja Sama?",
      detail: "Ceritakan kebutuhan Anda. Tim Gaharu Creative akan merespons dengan analisis awal dan rekomendasi langkah berikutnya.",
      actions: [
        { label: "Konsultasi Gratis", kind: "primary", href: "/kontak" },
        { label: "Minta Penawaran", kind: "secondary", href: "/kontak" },
      ],
    },
    {
      title: "Ingin kenalan dengan timnya dulu?",
      detail: "Konsultasi pertama dipakai untuk mendengar kebutuhan Anda, tanpa keharusan lanjut ke kontrak.",
      actions: [
        { label: "Ajukan Konsultasi", kind: "primary", href: "/kontak" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
    {
      title: "Perlu dokumen kerja sama?",
      detail: "Skema kerja, ruang lingkup, dan ketentuan layanan bisa kami kirim sebelum mulai proyek.",
      actions: [
        { label: "Minta Dokumen Legal", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
  ],
  insight: [
    {
      title: "Mau dibantu terjemahkan insight-nya?",
      detail: "Artikel di halaman ini arah umum. Untuk kasus bisnis Anda, diskusi langsung lebih cepat sampai ke solusi.",
      actions: [
        { label: "Konsultasi Gratis", kind: "primary", href: "/kontak" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
    {
      title: "Belum dapat ide untuk kuartal depan?",
      detail: "Kami bantu susun kalender konten dan rencana kampanye yang bisa dijaga tim Anda.",
      actions: [
        { label: "Minta Penawaran", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
    {
      title: "Butuh bahan internal?",
      detail: "Workshop singkat untuk tim marketing biasanya mempercepat keputusan yang menggantung.",
      actions: [
        { label: "Ajukan Konsultasi", kind: "primary", href: "/kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
  ],
  kontak: [
    {
      title: "Berkomitmen Tumbuh Bersama",
      detail: "Form di atas sudah cukup untuk memulai. Kami balas di hari kerja dengan pertanyaan lanjutan atau usulan jadwal.",
      actions: [
        { label: "Isi Form Kontak", kind: "primary", href: "#form-kontak" },
        { label: "Lihat Layanan", kind: "secondary", href: "/layanan" },
      ],
    },
    {
      title: "Lebih suka ngobrol langsung?",
      detail: "Konsultasi via WhatsApp biasanya lebih cepat untuk kasus yang sudah punya bahan kampanye.",
      actions: [
        { label: "Hubungi via WhatsApp", kind: "primary", href: "whatsapp" },
        { label: "Lihat Portofolio", kind: "secondary", href: "/portofolio" },
      ],
    },
    {
      title: "Kirim kebutuhan dalam bentuk dokumen",
      detail: "Kalau brief Anda sudah panjang, kami minta waktu membacanya sebelum memberi angka penawaran.",
      actions: [
        { label: "Kirim lewat Email", kind: "primary", href: "email" },
        { label: "Minta Penawaran", kind: "secondary", href: "/kontak" },
      ],
    },
  ],
};

export const kontakInfo = [
  {
    icon: "chat",
    title: "WhatsApp",
    value: "+62 812-3456-7890",
    href: "whatsapp",
    verified: false,
  },
  { icon: "mail", title: "Email", value: "halo@gaharucreative.co.id", href: "email", verified: false },
  { icon: "pin", title: "Alamat", value: "Jl. Contoh No. 12, Jakarta Selatan", href: null, verified: false },
  { icon: "clock", title: "Jam Operasional", value: "Senin sampai Jumat, 09.00 sampai 17.00 WIB", href: null, verified: true },
];

/* Pilihan layanan di form kontak, mengikuti DESAIN.md 4.6 dan lima layanan utama. */
export const inquiryServices = [
  "Branding",
  "Content",
  "Social Media",
  "Performance Marketing",
  "Digital Product Development",
  "Belum tahu, butuh rekomendasi",
];
