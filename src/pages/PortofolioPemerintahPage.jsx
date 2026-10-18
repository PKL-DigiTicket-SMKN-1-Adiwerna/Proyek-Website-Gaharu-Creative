import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";

export default function PortofolioPemerintahPage() {
  return (
    <div className="bg-white text-ink min-h-screen font-sans">
      <Seo title="Studi Kasus: Program Literasi Digital" description="Studi kasus lengkap kampanye informasi publik Literasi Digital bersama Gaharu Creative dan Kemenkominfo." />

      <section className="bg-gradient-to-b from-brand-50 to-paper py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="hover:text-button transition-colors">Portofolio</Link>
            <span>/</span>
            <span className="text-button font-bold">Pemerintah: Literasi Digital</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-600 text-button text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  PEMERINTAH • KAMPANYE INFORMASI PUBLIK
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                Literasi Digital: Kampanye Informasi Publik Berbasis Micro-Learning
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Kementerian Komunikasi dan Informatika (Kemenkominfo) berkolaborasi dengan Gaharu Creative untuk menjalankan kampanye edukasi publik dan manajemen konten media sosial selama 5 bulan (Maret-Juli 2026).
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line text-xs text-muted">
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">Kategori</span>
                  <span className="font-bold text-ink mt-0.5 block">Pemerintah</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">Periode</span>
                  <span className="font-bold text-ink mt-0.5 block">Maret-Juli 2026</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">Lokasi</span>
                  <span className="font-bold text-ink mt-0.5 block">Indonesia</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="rounded-2xl overflow-hidden border border-line shadow-md bg-chip">
                <img
                  src="/Proyek Literasi Digital Pemerintah.webp"
                  alt="Literasi Digital"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto aspect-[4/3] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-7/12 space-y-8">
            
            {/* Ringkasan Proyek & Klien */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-button uppercase tracking-widest">RINGKASAN PROYEK & KLIEN</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Tentang Program Literasi Digital</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Kementerian Komunikasi dan Informatika (Kemenkominfo) berkolaborasi dengan Gaharu Creative untuk menjalankan kampanye edukasi publik dan manajemen konten media sosial selama 5 bulan (Maret-Juli 2026). Proyek ini berfokus pada penyebaran informasi, peningkatan kesadaran keamanan siber dasar, serta edukasi etika berinternet secara masif bagi masyarakat umum.
              </p>
            </div>

            {/* Tantangan */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">TANTANGAN BISNIS</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Kendala Penyampaian Informasi Publik</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Sebelumnya, penyampaian informasi terkait edukasi digital cenderung kaku, berformat formal, dan sulit dipahami oleh masyarakat awam. Kendala utamanya adalah rendahnya tingkat keterikatan (engagement rate) pada konten media sosial resmi, tingginya angka penyebaran hoaks, serta belum optimalnya distribusi pesan ke berbagai kelompok usia di seluruh wilayah Indonesia.
              </p>
            </div>

            {/* Solusi & Strategi */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">SOLUSI & STRATEGI</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Strategi Komunikasi Publik Ramah Publik</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Gaharu Creative merancang strategi komunikasi digital yang ramah publik dan terstruktur. Langkah ini meliputi pemetaan narasi visual berbasis mikro-konten (infografis interaktif, video animasi pendek, dan komik edukatif), pengelolaan distribusi saluran media sosial terpadu, serta pelaksanaan kampanye sosialisasi program pemerintah menggunakan tagar tematik yang relevan dengan tren percakapan warga net.
              </p>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-button font-extrabold text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="check" className="h-4 w-4" /></span>
                <h3>Peran dan Pekerjaan Gaharu</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted pt-1">
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> Pemetaan narasi visual berbasis mikro-konten (infografis interaktif, video animasi pendek, dan komik edukatif).</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> Pengelolaan distribusi saluran media sosial terpadu secara konsisten.</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> Pelaksanaan kampanye sosialisasi program pemerintah menggunakan tagar tematik yang relevan.</li>
              </ul>
            </div>

            {/* Hasil Nyata & Testimoni */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">HASIL NYATA & TESTIMONI</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Dampak Kampanye dan Testimoni</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Strategi terpadu ini berhasil menjangkau lebih dari 5.8 juta impression lintas platform digital dengan peningkatan engagement rate hingga +240%. Kampanye ini juga menghasilkan lebih dari 120.000 partisipan yang menyelesaikan modul edukasi singkat, serta memicu ribuan share organik pada konten pencegahan hoaks. Perwakilan Koordinator Tim Literasi Digital menyatakan bahwa pendekatan kreatif Gaharu Creative mampu menyulap materi publik yang rumit menjadi konten yang menarik, komunikatif, dan berdampak nyata bagi pemahaman masyarakat.
              </p>
              <blockquote className="border-l-4 border-button pl-4 italic text-muted text-sm leading-relaxed mt-4">
                &ldquo;Pendekatan kreatif Gaharu Creative mampu menyulap materi publik yang rumit menjadi konten yang menarik, komunikatif, dan berdampak nyata bagi pemahaman masyarakat.&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-ink mt-2">Perwakilan Koordinator Tim Literasi Digital</p>
            </div>

          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Literasi Digital.webp" alt="Dokumentasi 1" loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Literasi Digital(Tentang Proyek).webp" alt="Dokumentasi 2" loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUTPUT DAN CAKUPAN KERJA + RINGKASAN DAMPAK (metrik dari Zimeism) */}
      <section className="py-12 bg-block border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-button uppercase tracking-widest">HASIL KERJA YANG DISERAHKAN</span>
            <h2 className="text-2xl font-extrabold text-ink">Output dan Cakupan Kerja</h2>
            <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-2xl">
              Berikut yang diserahkan tim kami pada proyek ini.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              Strategi konten edukasi publik dan infografis interaktif.
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              Panduan materi micro-learning yang mudah dipahami.
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              Kampanye media sosial terstruktur lintas demografi.
            </li>
          </ul>

          <div className="text-center space-y-1 max-w-md mx-auto">
            <span className="text-xs font-bold text-button uppercase tracking-widest">METRIK KINERJA TERUKUR</span>
            <h2 className="text-2xl font-extrabold text-ink">Ringkasan Dampak Bisnis</h2>
            <p className="text-xs text-subtle">Pencapaian nyata dari pelaksanaan kampanye informasi publik.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">5.8 Juta</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">TOTAL IMPRESSION</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">+240%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">ENGAGEMENT RATE</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">120K+</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">PARTISIPAN MODUL</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">Ribuan</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">SHARE ORGANIK</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="text-2xl font-extrabold text-ink">Proyek Lainnya</h2>
            <Link to="/portofolio" className="text-xs font-bold text-button hover:underline">
              Lihat Semua Portofolio →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/portofolio/umkm-ecommerce-lokal" className="group bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md hover:border-brand-600 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-chip">
                  <img src="/Beranda-Portofolio(UMKM E-Commerce).webp" alt="E-Commerce Lokal" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-ink text-sm group-hover:text-button">UMKM: E-Commerce Lokal</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">Mendorong penjualan dan pertumbuhan bisnis.</p>
              </div>
              <span className="text-xs font-bold text-button mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <Link to="/portofolio/korporat-gaharu-cloud" className="group bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md hover:border-brand-600 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-chip">
                  <img src="/Beranda-Portofolio(Gaharu Cloud).webp" alt="Gaharu Cloud Launch" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-ink text-sm group-hover:text-button">Korporat: Gaharu Cloud Launch</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">Penguatan awareness dan penanganan pipeline B2B.</p>
              </div>
              <span className="text-xs font-bold text-button mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 flex flex-col justify-between text-center space-y-4">
              <div className="space-y-2 my-auto">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="doc" className="h-5 w-5" /></span>
                <h3 className="font-bold text-ink text-base">Kembali ke Seluruh Portofolio</h3>
                <p className="text-xs text-muted leading-relaxed">Jelajahi lebih banyak studi kasus hasil kerja tim Gaharu.</p>
              </div>
              <Link to="/portofolio" className="bg-button text-white font-bold py-2.5 px-5 rounded-lg text-xs hover:bg-brand-700 transition-all shadow-sm">
                ← Daftar Portofolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}