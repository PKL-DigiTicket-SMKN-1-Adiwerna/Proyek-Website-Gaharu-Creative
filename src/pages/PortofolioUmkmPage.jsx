import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";
import ProyekLainnya from "../components/ProyekLainnya.jsx";
import { useT } from "../lib/i18n.js";

export default function PortofolioUmkmPage() {
  const t = useT();
  return (
    <div className="bg-paper text-ink min-h-screen font-sans">
      <Seo title={t("Studi Kasus: Kopi Nusantara 360")} description={t("Studi kasus lengkap strategi digital marketing, digital branding, dan performance marketing untuk PT Kopi Nusantara Indonesia bersama Gaharu Creative.")} />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-brand-50 to-paper py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="hover:text-button transition-colors">{t("Portofolio")}</Link>
            <span>/</span>
            <span className="text-button font-bold">{t("UMKM: E-Commerce Lokal")}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-600 text-button text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  {t("UMKM • F&B & RETAIL E-COMMERCE")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                {t("UMKM E-Commerce Lokal: Mendorong Penjualan dan Pertumbuhan Bisnis lewat Strategi Digital")}
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("PT Kopi Nusantara Indonesia merupakan brand F&B dan retail e-commerce yang memproduksi biji kopi premium dari petani lokal. Gaharu Creative hadir memberikan layanan digital branding, performance marketing, social media management, dan web development selama 6 bulan (Januari-Juni 2026) dengan fokus utama menerapkan strategi digital marketing untuk UMKM kuliner agar berkembang dari skala lokal ke nasional.")}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line text-xs text-muted">
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Kategori")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("UMKM • F&B")}</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Periode")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("Januari-Juni 2026")}</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Lokasi")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("Indonesia")}</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <div className="rounded-2xl overflow-hidden border border-line shadow-md bg-chip">
                <img
                  src="/Beranda-Portofolio(UMKM E-Commerce).webp"
                  alt={t("Studi Kasus: Kopi Nusantara 360")}
                  fetchPriority="high"
                  decoding="async"
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
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("RINGKASAN PROYEK & KLIEN")}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">{t("Tentang Kopi Nusantara")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("PT Kopi Nusantara Indonesia merupakan brand F&B dan retail e-commerce yang memproduksi biji kopi premium dari petani lokal. Gaharu Creative hadir memberikan layanan digital branding, performance marketing, social media management, dan web development selama 6 bulan (Januari-Juni 2026) dengan fokus utama menerapkan strategi digital marketing untuk UMKM kuliner agar berkembang dari skala lokal ke nasional.")}
              </p>
            </div>

            {/* Tantangan */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("TANTANGAN BISNIS")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Kendala Pasar dan Performa Iklan")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Sebelum berkolaborasi, Kopi Nusantara menghadapi kendala jangkauan pasar yang terbatas karena masih bergantung pada toko fisik lokal. Selain itu, iklan digital mandiri mereka menghasilkan tingkat konversi yang rendah dengan biaya akuisisi tinggi, serta identitas visual brand yang belum konsisten untuk bersaing di pasar kopi premium.")}
              </p>
            </div>

            {/* Solusi & Strategi */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("SOLUSI & STRATEGI")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Pendekatan 360°")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Gaharu Creative merancang strategi digital marketing 360°. Langkah ini meliputi penguatan digital branding melalui penyegaran visual dan tone of voice media sosial, revamp website dengan optimasi konversi agar pengunjung mudah melakukan checkout/order WhatsApp, serta eksekusi kampanye performance marketing multi-channel menggunakan Meta Ads dan TikTok Ads berbasis skema funneling terstruktur.")}
              </p>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-button font-extrabold text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="check" className="h-4 w-4" /></span>
                <h3>{t("Peran dan Pekerjaan Gaharu")}</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted pt-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-button font-bold">•</span>
                  <span>{t("Penguatan digital branding melalui penyegaran visual dan tone of voice media sosial.")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-button font-bold">•</span>
                  <span>{t("Revamp website dengan optimasi konversi agar pengunjung mudah melakukan checkout/order WhatsApp.")}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-button font-bold">•</span>
                  <span>{t("Eksekusi kampanye performance marketing multi-channel menggunakan Meta Ads dan TikTok Ads berbasis skema funneling terstruktur.")}</span>
                </li>
              </ul>
            </div>

            {/* Hasil Nyata & Testimoni */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("HASIL NYATA & TESTIMONI")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Dampak dan Testimoni Pimpinan")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Strategi terpadu ini sukses menghasilkan peningkatan omzet penjualan online hingga +320% dan mencapai 3.8x Return on Ad Spend (ROAS). Kampanye ini juga meraih 2.5 juta total reach organik maupun berbayar, serta berhasil memangkas biaya akuisisi pelanggan (CPA) sebesar -45%. Founder & CEO Kopi Nusantara, Budi Santoso, menyampaikan bahwa kerja sama ini menjadi titik balik pertumbuhan brand mereka berkat eksekusi visual yang rapi dan strategi iklan yang berdampak langsung pada omzet.")}
              </p>
              <blockquote className="border-l-4 border-button pl-4 italic text-muted text-sm leading-relaxed mt-4">
                &ldquo;{t("Kerja sama ini menjadi titik balik pertumbuhan brand kami berkat eksekusi visual yang rapi dan strategi iklan yang berdampak langsung pada omzet.")}&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-ink mt-2">{t("Budi Santoso, Founder & CEO Kopi Nusantara")}</p>
            </div>

          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-UMKM E-Commerce lokal.webp" alt={t("Dokumentasi Kopi Nusantara 1")} loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-UMKM E-Commerce(Tentang Proyek).webp" alt={t("Dokumentasi Kopi Nusantara 2")} loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUTPUT DAN CAKUPAN KERJA + RINGKASAN DAMPAK (metrik dari Zimeism) */}
      <section className="py-12 bg-block border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-button uppercase tracking-widest">{t("HASIL KERJA YANG DISERAHKAN")}</span>
            <h2 className="text-2xl font-extrabold text-ink">{t("Output dan Cakupan Kerja")}</h2>
            <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-2xl">
              {t("Berikut yang diserahkan tim kami pada proyek ini.")}
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Katalog produk dan struktur halaman toko daring.")}
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Materi dan kalender konten media sosial harian.")}
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Kampanye iklan berbayar dengan pemantauan harian.")}
            </li>
          </ul>

          <div className="text-center space-y-1 max-w-md mx-auto">
            <span className="text-xs font-bold text-button uppercase tracking-widest">{t("METRIK KINERJA TERUKUR")}</span>
            <h2 className="text-2xl font-extrabold text-ink">{t("Ringkasan Dampak Bisnis")}</h2>
            <p className="text-xs text-subtle">{t("Pencapaian nyata dari pelaksanaan strategi digital marketing 360°.")}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">+320%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("OMZET PENJUALAN")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">3.8x</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("ROAS")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">{t("2.5 Juta")}</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("TOTAL REACH")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">-45%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("BIAYA CPA")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROYEK LAINNYA */}
      <section className="py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="text-2xl font-extrabold text-ink">{t("Proyek Lainnya")}</h2>
            <Link to="/portofolio" className="text-xs font-bold text-button hover:underline">
              {t("Lihat Semua Portofolio →")}
            </Link>
          </div>

          <ProyekLainnya slug="umkm-ecommerce-lokal" />
        </div>
      </section>
    </div>
  );
}
