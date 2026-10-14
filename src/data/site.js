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

  // Ada beberapa versi email di catatan awal, ditahan sampai klien memilih satu.
  email: "halo@gaharucreative.co.id",
  emailVerified: false,

  phone: "(021) 0000 0000",
  phoneVerified: false,

  // Alamat kantor belum dikirim.
  address: "Jl. Contoh No. 12, Jakarta Selatan",
  addressVerified: false,

  hours: "Senin sampai Jumat, 09.00 sampai 17.00 WIB",

  socials: [
    { label: "Instagram", href: "https://instagram.com/gaharucreative", verified: false },
    { label: "LinkedIn", href: "https://linkedin.com/company/gaharucreative", verified: false },
    { label: "X", href: "https://x.com/gaharucreative", verified: false },
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
  mail: `mailto:${site.email}`,
};

export const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Tentang" },
  { to: "/layanan", label: "Layanan" },
  { to: "/portofolio", label: "Portofolio" },
  { to: "/insight", label: "Insight" },
  { to: "/kontak", label: "Kontak" },
];

/* Tautan ini hanya muncul di footer Portofolio dan Kontak. */
export const footerExtraLinks = [
  { label: "Kebijakan Privasi", state: "belum tersedia" },
  { label: "Syarat & Ketentuan", state: "belum tersedia" },
  { label: "Karier", state: "belum tersedia" },
];

export const footerServices = [
  "Branding",
  "Content",
  "Social Media",
  "Performance Marketing",
  "Digital Product Development",
];

export const clientLanguages = [
  { code: "ID", label: "Bahasa Indonesia", available: true },
  { code: "EN", label: "English", available: false },
];
