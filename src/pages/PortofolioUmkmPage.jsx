import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export default function PortofolioUmkmPage() {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      <Seo title="UMKM: E-Commerce Lokal – Gaharu Creative" description="Studi kasus strategi digital marketing untuk UMKM E-Commerce Lokal." />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-emerald-50/80 via-slate-50 to-white py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/portofolio" className="hover:text-[#007A55] transition-colors">Portofolio</Link>
            <span>/</span>
            <span className="text-[#007A55] font-bold">UMKM: E-Commerce Lokal</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 text-[#007A55] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#007A55] animate-pulse" />
                  UMKM • RETAIL & E-COMMERCE
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                UMKM: E-Commerce Lokal – Mendorong Penjualan dan Pertumbuhan Bisnis melalui Strategi Digital
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Strategi digital terpadu untuk membantu bisnis lokal memperluas jangkauan, meningkatkan penjualan, dan membangun kehadiran brand yang lebih kuat di kanal online.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Kategori</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">UMKM</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Tahun</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">2026</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Lokasi</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">Indonesia</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                <img
                  src="/Beranda-Portofolio(UMKM E-Commerce).webp"
                  alt="UMKM E-Commerce Lokal"
                  className="w-full h-auto aspect-[4/3] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG PROYEK & SOLUSI */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-7/12 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#007A55] uppercase tracking-widest">PENDEKATAN STRATEGIS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tentang Proyek</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Program akselerasi bisnis lokal berbasis e-commerce ini bertujuan untuk meningkatkan kesadaran merek, memperluas jangkauan pasar, dan mendorong konversi penjualan secara berkelanjutan melalui integrasi media sosial dan performance ads.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-[#007A55] font-extrabold text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[#007A55] text-xs font-bold">✓</span>
                <h3>Solusi yang Kami Berikan</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#007A55] font-bold">•</span>
                  <span>Optimasi katalog produk dan arsitektur e-commerce terarah.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#007A55] font-bold">•</span>
                  <span>Optimasi iklan berbayar terukur untuk percepatan penjualan harian.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#007A55] font-bold">•</span>
                  <span>Manajemen media sosial harian dengan konsistensi materi.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <img src="/Portofolio-UMKM E-Commerce lokal.webp" alt="Dokumentasi 1" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
              <img src="/Portofolio-UMKM E-Commerce(Tentang Proyek).webp" alt="Dokumentasi 2" className="w-full h-44 object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. RINGKASAN DAMPAK */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1 max-w-md mx-auto">
            <span className="text-xs font-bold text-[#007A55] uppercase tracking-widest">METRIK KINERJA TERUKUR</span>
            <h2 className="text-2xl font-extrabold text-slate-900">Ringkasan Dampak Bisnis</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#007A55]">+180%</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">NEW LEADS</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#007A55]">2.4x</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">OMZET NAIK</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#007A55]">45K</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">FOLLOWERS</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#007A55]">4.6x</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">ENGAGEMENT</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROYEK LAINNYA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900">Proyek Lainnya</h2>
            <Link to="/portofolio" className="text-xs font-bold text-[#007A55] hover:underline">
              Lihat Semua Portofolio →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/portofolio/korporat-gaharu-cloud" className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-slate-100">
                  <img src="/Beranda-Portofolio(Gaharu Cloud).webp" alt="Gaharu Cloud Launch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#007A55]">Korporat: Gaharu Cloud Launch</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">Penguatan awareness dan penanganan pipeline B2B.</p>
              </div>
              <span className="text-xs font-bold text-[#007A55] mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <Link to="/portofolio/pemerintah-literasi-digital" className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-slate-100">
                  <img src="/Proyek Literasi Digital Pemerintah.webp" alt="Literasi Digital" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#007A55]">Pemerintah: Literasi Digital</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">Kampanye informasi publik berbasis micro-learning.</p>
              </div>
              <span className="text-xs font-bold text-[#007A55] mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 flex flex-col justify-between text-center space-y-4">
              <div className="space-y-2 my-auto">
                <span className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-[#007A55] flex items-center justify-center font-bold text-base">📁</span>
                <h3 className="font-bold text-slate-900 text-base">Kembali ke Seluruh Portofolio</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Jelajahi lebih banyak studi kasus dan rekam jejak hasil kerja tim Gaharu.</p>
              </div>
              <Link to="/portofolio" className="bg-[#007A55] text-white font-bold py-2.5 px-5 rounded-full text-xs hover:bg-emerald-700 transition-all shadow-sm">
                ← Daftar Portofolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}