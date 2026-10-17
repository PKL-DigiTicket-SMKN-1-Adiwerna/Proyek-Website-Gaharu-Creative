import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";

export default function PortofolioKorporatPage() {
  return (
    <div className="bg-white text-ink min-h-screen font-sans">
      <Seo title="Korporat: Gaharu Cloud Launch | Gaharu Creative" description="Studi kasus peluncuran platform Gaharu Cloud B2B." />

      <section className="bg-gradient-to-b from-brand-50 to-paper py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="hover:text-button transition-colors">Portofolio</Link>
            <span>/</span>
            <span className="text-button font-bold">Korporat: Gaharu Cloud Launch</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-600 text-button text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  KORPORAT • B2B CLOUD PLATFORM
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                Korporat Gaharu Cloud Launch: Penanganan Pipeline B2B dan Thought Leadership
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Strategi peluncuran Gaharu Cloud berbasis positioning tepercaya untuk meningkatkan keterlibatan B2B, kredibilitas industri, dan penanganan prospek berkualitas.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line text-xs text-muted">
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[10px]">Kategori</span>
                  <span className="font-bold text-ink mt-0.5 block">Korporat</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[10px]">Periode</span>
                  <span className="font-bold text-ink mt-0.5 block">2026</span>
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
                  src="/Beranda-Portofolio(Gaharu Cloud).webp"
                  alt="Gaharu Cloud Launch"
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
          <div className="w-full lg:w-7/12 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">PENDEKATAN STRATEGIS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Konteks dan Tantangan</h2>
              <p className="text-muted text-sm leading-relaxed">
                Gaharu Cloud merupakan solusi infrastruktur digital enterprise. Peluncurannya membutuhkan kredibilitas tinggi, edukasi pasar terstruktur, dan strategi perolehan lead B2B yang presisi.
              </p>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-button font-extrabold text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="check" className="h-4 w-4" /></span>
                <h3>Peran dan Pekerjaan Gaharu</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted pt-1">
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> Penyusunan positioning dan key message spesifik platform cloud.</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> Penerbitan materi thought leadership & studi B2B.</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> Peluncuran kampanye iklan terarah untuk segmen enterprise.</li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Gaharu Cloud.webp" alt="Dokumentasi 1" loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Gaharu Cloud (Tentang Proyek).webp" alt="Dokumentasi 2" loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUTPUT DAN CAKUPAN KERJA */}
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
              Positioning dan key message platform cloud.
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              Materi thought leadership dan studi kasus B2B.
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              Kampanye iklan terarah untuk segmen enterprise.
            </li>
          </ul>

          <p className="text-xs text-subtle">
            Angka hasil proyek belum tayang karena masih menunggu konfirmasi pemilik proyek.
          </p>
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
                  <img src="/Beranda-Portofolio(UMKM E-Commerce).webp" alt="E-Commerce Lokal" loading="lazy" decoding="async" className="w-full h-full object-cover group- transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-ink text-sm group-hover:text-button">UMKM: E-Commerce Lokal</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">Mendorong penjualan dan pertumbuhan bisnis.</p>
              </div>
              <span className="text-xs font-bold text-button mt-4 block">Lihat Detail Proyek →</span>
            </Link>

            <Link to="/portofolio/pemerintah-literasi-digital" className="group bg-white rounded-2xl border border-line overflow-hidden shadow-sm hover:shadow-md hover:border-brand-600 transition-all p-4 flex flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-xl mb-3 aspect-[16/10] bg-chip">
                  <img src="/Proyek Literasi Digital Pemerintah.webp" alt="Literasi Digital" loading="lazy" decoding="async" className="w-full h-full object-cover group- transition-transform duration-300" />
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