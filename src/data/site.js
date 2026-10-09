/*
 * Konfigurasi situs. Nilai yang belum dikonfirmasi klien ditandai
 * `verified: false` dan tampil di layar dengan badge "belum diverifikasi".
 *
 * DESAIN.md bagian 6 mencatat data kontak belum seragam antar halaman
 * wireframe (empat versi email, tiga versi telepon). Sampai klien mengirim
 * satu daftar resmi, nilai di bawah dipakai di seluruh situs dan tidak boleh
 * ditulis ulang per halaman.
 *
 * Bentuk data dicatat di src/data/types.js.
 */
export const site = {
  name: "Gaharu Creative",
  tagline: "Konsultan dan Eksekutor 360 Digital Agency",
  founded: 2020,
  description:
    "Gaharu Creative membantu bisnis dari strategi sampai eksekusi: branding, konten, social media, performance marketing, dan pengembangan produk digital.",
  keywords: [
    "digital agency Indonesia",
    "branding agency",
    "social media management",
    "jasa digital marketing",
    "digital product development",
  ],

  // TBD: nomor WhatsApp resmi belum dikirim. Angka di bawah contoh dari
  // wireframe dan akan mengirim pesan ke nomor yang salah kalau dipakai.
  waNumber: "6281234567890",
  waDisplay: "+62 812-3456-7890",
  waNumberVerified: false,
  waMessage: "Halo Gaharu Creative, saya ingin konsultasi gratis.",

  // TBD: DESAIN.md memakai empat versi email. Ditahan sampai klien memilih.
  email: "halo@gaharucreative.co.id",
  emailVerified: false,

  phone: "(021) 0000 0000",
  phoneVerified: false,

  // TBD: alamat kantor belum pernah dikirim, wireframe menulis "Contoh".
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

/* Tautan yang dipakai tombol di seluruh situs. Semuanya menunjuk ke
 * halaman atau kanal yang benar-benar ada. */
export const links = {
  konsultasi: "/kontak",
  penawaran: "/kontak",
  portofolio: "/portofolio",
  layanan: "/layanan",
  whatsapp: `https://wa.me/${site.waNumber}?text=${encodeURIComponent(site.waMessage)}`,
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

/* DESAIN.md 3.2: tautan tambahan hanya muncul di footer Portofolio dan
 * Kontak. Halaman lain memakai footer ringkas. */
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
