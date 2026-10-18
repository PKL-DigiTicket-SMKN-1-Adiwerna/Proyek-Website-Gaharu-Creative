/* Nilai yang belum dikonfirmasi klien ditandai verified: false dan tampil dengan
 * badge "belum diverifikasi". Bentuk data ada di src/data/types.js.
 */
export const site = {
  name: "Gaharu Creative",
  tagline: "Konsultan dan Eksekutor 360 Digital Agency",
  founded: 2016,
  description:
    "Gaharu Creative membantu bisnis dari strategi sampai eksekusi: branding, konten, social media, performance marketing, dan pengembangan produk digital.",
  keywords: [
    "digital agency Indonesia",
    "branding agency",
    "social media management",
    "jasa digital marketing",
    "digital product development",
  ],

  // Nomor resmi dari perusahaan, dikirim 14 Okt 2026.
  waNumber: "6289605177985",
  waDisplay: "+62 896-0517-7985",
  waNumberVerified: true,
  waMessage: "Halo Gaharu Creative, saya ingin konsultasi gratis.",

  /* Audit staging 12 Okt 2026 (temuan C01: nilai contoh dilarang tayang. Field yang
   * belum dikonfirmasi disimpan null supaya tidak bisa bocor ke halaman; bukan
   * cuma dihapus labelnya. Isi kembali setelah klien mengirim data resmi.
   */
  email: null,
  emailVerified: false,

  phone: null,
  phoneVerified: false,

  address: null,
  addressVerified: false,

  /* Satu sumber kebenaran jam kerja. Footer dan halaman Kontak membaca dari
   * sini supaya tidak ada dua versi jam yang berbeda. */
  hours: "Senin sampai Jumat, 09.00 sampai 17.00 WIB",
  hoursVerified: false,

  /* Basis URL kanonik. Diisi lewat VITE_SITE_URL saat build produksi supaya
   * canonical tidak pernah menunjuk ke domain staging. */
  url: ((import.meta.env && import.meta.env.VITE_SITE_URL) || "").replace(/\/$/, ""),

  /* Tautan sosial resmi belum dikonfirmasi, jadi belum dipasang. */
  socials: [
    { label: "Instagram", href: null, verified: false },
    { label: "LinkedIn", href: null, verified: false },
    { label: "YouTube", href: null, verified: false },
  ],

  legal: {
    company: "Gaharu Creative",
    legalNote: "Bentuk badan usaha dan NIB menunggu konfirmasi klien.",
  },
};

/* Base wa.me tanpa pesan, supaya pemanggil bisa menempel pesan sendiri
 * (?text=) tanpa menabrak pesan bawaan.
 */
export const waBase = `https://wa.me/${site.waNumber}`;
const waLink = `${waBase}?text=${encodeURIComponent(site.waMessage)}`;

/* Ajakan konsultasi dan penawaran langsung ke WhatsApp resmi. Tombol yang butuh
 * konteks form tetap mengarah ke halaman Kontak.
 */
export const links = {
  konsultasi: waLink,
  penawaran: waLink,
  portofolio: "/portofolio",
  layanan: "/layanan",
  kontak: "/kontak",
  whatsapp: waLink,
  /* Email resmi belum dikonfirmasi, jadi tautan email juga belum ada. */
  mail: site.emailVerified && site.email ? `mailto:${site.email}` : null,
};

export const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Tentang" },
  { to: "/layanan", label: "Layanan" },
  { to: "/portofolio", label: "Portofolio" },
  { to: "/insight", label: "Insight" },
  { to: "/kontak", label: "Kontak" },
];

/* Tautan legal di footer. Yang sudah punya halaman memakai `to` (jadi tautan
 * biasa); yang belum punya halaman memakai `state: "belum tersedia"` supaya
 * tidak ada tautan mati saat diklik.
 */
export const footerExtraLinks = [
  { label: "Kebijakan Privasi", to: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", state: "belum tersedia" },
  { label: "Peta Situs", state: "belum tersedia" },
];

/* Daftar layanan footer sekarang menunjuk ke halaman layanan yang benar-benar
 * ada, bukan nama yang tidak punya halaman (mis. "SEO & Growth Analytics").
 */
export const footerServices = [
  { label: "Branding", to: "/layanan/branding" },
  { label: "Content", to: "/layanan/konten" },
  { label: "Social Media", to: "/layanan/social-media" },
  { label: "Performance Marketing", to: "/layanan/performance-marketing" },
  { label: "Digital Product Development", to: "/layanan/pengembangan-produk-digital" },
];

export const clientLanguages = [
  { code: "ID", label: "Bahasa Indonesia", available: true },
  { code: "EN", label: "English", available: false },
];
