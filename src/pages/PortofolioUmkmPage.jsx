import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";

export default function PortofolioUmkmPage() {
  return (
    <div className="bg-white text-ink min-h-screen font-sans">
      <Seo title="Studi Kasus: Kopi Nusantara 360 | Gaharu Creative" description="Studi kasus lengkap strategi digital marketing, digital branding, dan performance marketing untuk PT Kopi Nusantara Indonesia bersama Gaharu Creative." />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-brand-50 to-paper py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="hover:text-button transition-colors">Portofolio</Link>
            <span>/</span>
            <span className="text-button font-bold">UMKM: E-Commerce Lokal</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-600 text-button text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  UMKM • F&B & RETAIL E-COMMERCE
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                UMKM E-Commerce Lokal: Mendorong Penjualan dan Pertumbuhan Bisnis lewat Strategi Digital
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                PT Kopi Nusantara Indonesia merupakan brand F&B dan retail e-commerce yang memproduksi biji kopi premium dari petani lokal. Gaharu Creative hadir memberikan layanan digital branding, performance marketing, social media management, dan web development selama 6 bulan (Januari–Juni 2026) dengan fokus utama menerapkan strategi digital marketing untuk UMKM kuliner agar berkembang dari skala lokal ke nasional.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line text-xs text-muted">
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[10px]">Kategori</span>
                  <span className="font-bold text-ink mt-0.5 block">UMKM • F&B</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[10px]">Periode</span>
                  <span className="font-bold text-ink mt-0.5 block">Januari–Juni 2026</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[10px]">Lokasi</span>
                  <span className="font-bold text-ink mt-0.5 block">Indonesia</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="rounded-2xl overflow-hidden border border-line shadow-md bg-chip">
                <img
                  src="/Beranda-Portofolio(UMKM E-Commerce).webp"
                  alt="Studi Kasus: Kopi Nusantara 360"
                  className="w-full h-auto aspect-[4/3] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG PROYEK, TANTANGAN, SOLUSI, & TESTIMONI */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-7/12 space-y-8">
            
            {/* Ringkasan Proyek & Klien */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-button uppercase tracking-widest">RINGKASAN PROYEK & KLIEN</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Tentang Kopi Nusantara</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                PT Kopi Nusantara Indonesia merupakan brand F&B dan retail e-commerce yang memproduksi biji kopi premium dari petani lokal. Gaharu Creative hadir memberikan layanan digital branding, performance marketing, social media management, dan web development selama 6 bulan (Januari–Juni 2026) dengan fokus utama menerapkan strategi digital marketing untuk UMKM kuliner agar berkembang dari skala lokal ke nasional.
              </p>
            </div>

            {/* Tantangan */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">TANTANGAN BISNIS</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Kendala Pasar dan Performa Iklan</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Sebelum berkolaborasi, Kopi Nusantara menghadapi kendala jangkauan pasar yang terbatas karena masih bergantung pada toko fisik lokal. Selain itu, iklan digital mandiri mereka menghasilkan tingkat konversi yang rendah dengan biaya akuisisi tinggi, serta identitas visual brand yang belum konsisten untuk bersaing di pasar kopi premium.
              </p>
            </div>

            {/* Solusi & Strategi */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">SOLUSI & STRATEGI</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Pendekatan Holistik 360°</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Gaharu Creative merancang strategi digital marketing holistik 360°. Langkah ini meliputi penguatan digital branding melalui penyegaran visual dan tone of voice media sosial, revamp website dengan optimasi konversi agar pengunjung mudah melakukan checkout/order WhatsApp, serta eksekusi kampanye performance marketing multi-channel menggunakan Meta Ads dan TikTok Ads berbasis skema funneling terstruktur.
              </p>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-button font-extrabold text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="check" className="h-4 w-4" /></span>
                <h3>Poin Utama Solusi & Strategi</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted pt-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-button font-bold">•</span>
                  <span>Penguatan digital branding melalui penyegaran visual dan tone of voice media sosial.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-button font-bold">•</span>
                  <span>Revamp website dengan optimasi konversi agar pengunjung mudah melakukan checkout/order WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-button font-bold">•</span>
                  <span>Eksekusi kampanye performance marketing multi-channel menggunakan Meta Ads dan TikTok Ads berbasis skema funneling terstruktur.</span>
                </li>
              </ul>
            </div>

            {/* Hasil Nyata & Testimoni */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">HASIL NYATA & TESTIMONI</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Dampak dan Testimoni Pimpinan</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Strategi terpadu ini sukses menghasilkan peningkatan omzet penjualan online hingga +320% dan mencapai 3.8x Return on Ad Spend (ROAS). Kampanye ini juga meraih 2.5 juta total reach organik maupun berbayar, serta berhasil memangkas biaya akuisisi pelanggan (CPA) sebesar -45%. Founder & CEO Kopi Nusantara, Budi Santoso, menyampaikan bahwa kerja sama ini menjadi titik balik pertumbuhan brand mereka berkat eksekusi visual yang rapi dan strategi iklan yang berdampak langsung pada omzet.
              </p>
              <blockquote className="border-l-4 border-button pl-4 italic text-muted text-sm leading-relaxed mt-4">
                &ldquo;Kerja sama ini menjadi titik balik pertumbuhan brand kami berkat eksekusi visual yang rapi dan strategi iklan yang berdampak langsung pada omzet.&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-ink mt-2">— Budi Santoso (Founder & CEO Kopi Nusantara)</p>
            </div>

          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-UMKM E-Commerce lokal.webp" alt="Dokumentasi Kopi Nusantara 1" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-UMKM E-Commerce(Tentang Proyek).webp" alt="Dokumentasi Kopi Nusantara 2" className="w-full h-44 object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. RINGKASAN DAMPAK */}
      <section className="py-12 bg-block border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1 max-w-md mx-auto">
            <span className="text-xs font-bold text-button uppercase tracking-widest">METRIK KINERJA TERUKUR</span>
            <h2 className="text-2xl font-extrabold text-ink">Ringkasan Dampak Bisnis</h2>
            <p className="text-xs text-subtle">Pencapaian nyata dari pelaksanaan strategi digital marketing 360°.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">+320%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">OMZET PENJUALAN</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">3.8x</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">ROAS</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">2.5 Juta</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">TOTAL REACH</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">-45%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">BIAYA CPA</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROYEK LAINNYA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="text-2xl font-extrabold text-ink">Proyek Lainnya</h2>
            <Link to="/portofolio" className="text-xs font-bold text-button hover:underline">
              Lihat Semua Portofolio →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/portofolio/korporat-gaharu-cloud" className="group bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md hover:border-brand-600 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-chip">
                  <img src="/Beranda-Portofolio(Gaharu Cloud).webp" alt="Gaharu Cloud Launch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-ink text-sm group-hover:text-button">Korporat: Gaharu Cloud Launch</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">Penguatan awareness dan penanganan pipeline B2B.</p>
              </div>
              <span className="text-xs font-bold text-button mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <Link to="/portofolio/pemerintah-literasi-digital" className="group bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md hover:border-brand-600 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-chip">
                  <img src="/Proyek Literasi Digital Pemerintah.webp" alt="Literasi Digital" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-ink text-sm group-hover:text-button">Pemerintah: Literasi Digital</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">Kampanye informasi publik berbasis micro-learning.</p>
              </div>
              <span className="text-xs font-bold text-button mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 flex flex-col justify-between text-center space-y-4">
              <div className="space-y-2 my-auto">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="doc" className="h-5 w-5" /></span>
                <h3 className="font-bold text-ink text-base">Kembali ke Seluruh Portofolio</h3>
                <p className="text-xs text-muted leading-relaxed">Jelajahi lebih banyak studi kasus dan rekam jejak hasil kerja tim Gaharu.</p>
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