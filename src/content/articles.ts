export interface Article {
  slug: string;
  title: string;
  category: "Digital Marketing" | "Branding" | "Teknologi";
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
    }[];
  };
}

export const articlesData: Article[] = [
  {
    slug: "strategi-digital-marketing-umkm",
    title: "Strategi Digital Marketing untuk UMKM: Panduan Memulai dari Nol",
    category: "Digital Marketing",
    date: "20 Mar 2025",
    author: "Growth Team Gaharu",
    readTime: "5 min baca",
    summary: "Panduan menyusun anggaran iklan yang efisien dan pemilihan kanal prioritas untuk hasil maksimal.",
    content: {
      intro: "Di era bisnis modern, ekosistem digital membuka peluang besar bagi UMKM untuk menjangkau audiens secara presisi dan efisien.",
      sections: [
        {
          heading: "Mengapa Digital Marketing Penting untuk UMKM?",
          body: "Dengan pemasaran digital, bisnis skala kecil dapat bersaing secara sejajar dengan perusahaan besar melalui segmentasi target yang terukur.",
        },
        {
          heading: "Tentukan Target Pasar yang Tepat",
          body: "Pahami persona pembeli ideal Anda sebelum mengalokasikan anggaran iklan di platform digital.",
        },
      ],
    },
  },
  {
    slug: "cara-meningkatkan-brand-identity",
    title: "Cara Meningkatkan Brand Identity agar Bisnis Lebih Mudah Dikenali",
    category: "Branding",
    date: "18 Mar 2025",
    author: "Creative Direction",
    readTime: "6 min baca",
    summary: "Langkah membangun diferensiasi visual dan tone of voice yang melekat di benak konsumen.",
    content: {
      intro: "Brand identity bukan sekadar logo, melainkan persepsi menyeluruh yang dibangun dalam setiap titik sentuh konsumen.",
      sections: [
        {
          heading: "Mengapa Brand Identity Penting bagi Bisnis?",
          body: "Identitas yang kuat membangun kepercayaan instan dan membedakan bisnis Anda dari para pesaing di pasar.",
        },
        {
          heading: "Kenali Karakter dan Nilai Utama",
          body: "Tentukan pilar komunikasi dan standar visual yang konsisten di semua media operasional.",
        },
      ],
    },
  },
  {
    slug: "tren-teknologi-digital-2025",
    title: "Tren Teknologi Digital yang Perlu Diperhatikan Bisnis di Era Modern",
    category: "Teknologi",
    date: "15 Mar 2025",
    author: "Tech Lab Division",
    readTime: "8 min baca",
    summary: "Pemetaan teknologi web modern, otomasi, dan analitik berbasis data untuk akselerasi performa.",
    content: {
      intro: "Perkembangan teknologi digital terus menguba tata cara bisnis berinteraksi dengan pelanggan dan mengelola efisiensi internal.",
      sections: [
        {
          heading: "Hanfaatkan Artificial Intelligence & Otomasi",
          body: "Integrasi sistem cerdas dapat mempercepat alur kerja serta meningkatkan personalisasi pengalaman pengguna.",
        },
        {
          heading: "Gunakan Cloud Computing & Keamanan Digital",
          body: "Infrastruktur cloud yang tangguh memastikan operasional dapat diakses kapan saja dengan perlindungan data maksimal.",
        },
      ],
    },
  },
];