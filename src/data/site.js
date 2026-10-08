/*
 * Konfigurasi situs. Nilai di bawah yang belum dikonfirmasi klien ditandai
 * `TBD` dan tidak boleh dipublikasikan sampai diganti. Lihat
 * docs/DATA-YANG-DIBUTUHKAN.md untuk daftar lengkap.
 */
export const site = {
  name: "Gaharu Creative",
  tagline: "Partner digital 360° untuk bisnis yang ingin tumbuh.",
  founded: 2020,
  description:
    "Gaharu Creative adalah digital agency 360° di Semarang. Branding, content, social media, performance marketing, dan digital product development untuk UMKM, korporasi, dan mitra pemerintah.",
  keywords: [
    "digital agency Semarang",
    "branding agency Semarang",
    "social media management Semarang",
    "jasa digital marketing",
    "web development agency Semarang",
  ],

  // TBD: nomor WhatsApp resmi belum dikirim. Jangan buka form kontak
  // publik sebelum diisi, nomor asal akan replied-kan ke orang yang salah.
  waNumber: "6281234567890",
  waNumberVerified: false,

  // TBD: domain resmi belum dikonfirmasi. halo@gaharucreative.com dicadangkan.
  email: "halo@gaharucreative.com",
  emailVerified: false,

  // TBD: nama jalan dan nomor telepon tidak pernah diberikan brief.
  phone: "",
  address: "Semarang, Jawa Tengah",
  addressVerified: false,
  hours: "Senin sampai Jumat, 09.00 sampai 18.00 WIB",

  socials: [
    { label: "Instagram", href: "https://instagram.com/gaharucreative", verified: false },
    { label: "LinkedIn", href: "https://linkedin.com/company/gaharucreative", verified: false },
    { label: "Facebook", href: "https://facebook.com/gaharucreative", verified: false },
  ],

  // TBD: bentuk badan usaha dan NIB belum dikirim.
  legal: {
    company: "Gaharu Creative",
    legalNote: "Bentuk badan usaha dan NIB menunggu konfirmasi klien.",
  },
};
