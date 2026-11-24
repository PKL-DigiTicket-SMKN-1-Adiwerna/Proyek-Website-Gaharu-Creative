import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";
import ProyekLainnya from "../components/ProyekLainnya.jsx";
import { useT } from "../lib/i18n.js";

export default function PortofolioKorporatPage() {
  const t = useT();
  return (
    <div className="bg-paper text-ink min-h-screen font-sans">
      <Seo title={t("Korporat: Gaharu Cloud Launch")} description={t("Studi kasus lengkap peluncuran platform Gaharu Cloud B2B bersama Gaharu Creative.")} />

      <section className="bg-gradient-to-b from-brand-50 to-paper py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="hover:text-button transition-colors">{t("Portofolio")}</Link>
            <span>/</span>
            <span className="text-button font-bold">{t("Korporat: Gaharu Cloud Launch")}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-600 text-button text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  {t("KORPORAT • B2B CLOUD PLATFORM")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                {t("Peluncuran Platform Gaharu Cloud B2B Bersama Gaharu Creative")}
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Gaharu Cloud Solutions merupakan penyedia platform SaaS dan infrastruktur cloud korporat. Gaharu Creative hadir memberikan layanan digital product development launch, performance marketing, digital branding, dan B2B lead generation selama 4 bulan (Februari-Mei 2026).")}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line text-xs text-muted">
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Kategori")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("Korporat")}</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Periode")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("Februari-Mei 2026")}</span>
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
                  src="/Beranda-Portofolio(Gaharu Cloud).webp"
                  alt={t("Gaharu Cloud Launch")}
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
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("RINGKASAN PROYEK & KLIEN")}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">{t("Tentang Proyek Gaharu Cloud")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Gaharu Cloud Solutions merupakan penyedia platform SaaS dan infrastruktur cloud korporat. Gaharu Creative hadir memberikan layanan digital product development launch, performance marketing, digital branding, dan B2B lead generation selama 4 bulan (Februari-Mei 2026) dengan fokus utama menghadirkan solusi digital untuk kebutuhan bisnis korporat skala menengah hingga enterprise.")}
              </p>
            </div>

            {/* Tantangan */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("TANTANGAN BISNIS")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Kendala Awareness & Konversi B2B")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Sebelum berkolaborasi, Gaharu Cloud menghadapi kendala kesadaran merek yang masih rendah di kalangan pengambil keputusan IT (CTO/IT Manager). Selain itu, kampanye mandiri mereka menghasilkan biaya akuisisi lead yang sangat mahal dengan tingkat konversi rendah serta pesan digital branding yang belum menonjol di pasar B2B technology.")}
              </p>
            </div>

            {/* Solusi & Strategi */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("SOLUSI & STRATEGI")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Strategi Peluncuran Produk B2B")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Gaharu Creative merancang strategi peluncuran produk B2B berbasis data. Langkah ini meliputi penguatan digital branding dan materi edukasi B2B seperti whitepaper, pembuatan landing page beroptimasi konversi yang terintegrasi CRM, serta eksekusi kampanye performance marketing multi-channel menggunakan LinkedIn Ads dan Google Search Ads berbasis segmentasi profesional IT secara presisi.")}
              </p>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-button font-extrabold text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="check" className="h-4 w-4" /></span>
                <h3>{t("Peran dan Pekerjaan Gaharu")}</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted pt-1">
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> {t("Penguatan digital branding dan materi edukasi B2B seperti whitepaper.")}</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> {t("Pembuatan landing page beroptimasi konversi yang terintegrasi CRM.")}</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> {t("Eksekusi kampanye performance marketing multi-channel menggunakan LinkedIn Ads dan Google Search Ads.")}</li>
              </ul>
            </div>

            {/* Hasil Nyata & Testimoni */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("HASIL NYATA & TESTIMONI")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Dampak Kinerja dan Apresiasi Klien")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Strategi terpadu ini sukses menghasilkan lebih dari 450 qualified B2B leads dan menekan Cost Per Lead (CPL) hingga -52%. Kampanye ini juga meraih peningkatan konversi dari demo ke trial sebesar 35%, serta mencatatkan 4.2x ROI pada nilai potensi proyek (pipeline value). Chief Marketing Officer Gaharu Cloud, Maya Rosalia, menyampaikan bahwa pendampingan Gaharu Creative sebagai konsultan digital marketing membuat peluncuran produk digital ini menjadi salah satu strategi B2B paling sukses dan terukur bagi perusahaan mereka.")}
              </p>
              <blockquote className="border-l-4 border-button pl-4 italic text-muted text-sm leading-relaxed mt-4">
                &ldquo;{t("Pendampingan Gaharu Creative sebagai konsultan digital marketing membuat peluncuran produk digital ini menjadi salah satu strategi B2B paling sukses dan terukur bagi perusahaan kami.")}&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-ink mt-2">{t("Maya Rosalia, Chief Marketing Officer Gaharu Cloud")}</p>
            </div>

          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Gaharu Cloud.webp" alt={t("Dokumentasi 1")} loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Gaharu Cloud (Tentang Proyek).webp" alt={t("Dokumentasi 2")} loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
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
              {t("Positioning dan key message platform cloud.")}
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Materi thought leadership dan studi kasus B2B.")}
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Kampanye iklan terarah untuk segmen enterprise.")}
            </li>
          </ul>

          <div className="text-center space-y-1 max-w-md mx-auto">
            <span className="text-xs font-bold text-button uppercase tracking-widest">{t("METRIK KINERJA TERUKUR")}</span>
            <h2 className="text-2xl font-extrabold text-ink">{t("Ringkasan Dampak Bisnis")}</h2>
            <p className="text-xs text-subtle">{t("Pencapaian nyata dari pelaksanaan strategi peluncuran korporat B2B.")}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">450+</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("QUALIFIED B2B LEADS")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">-52%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("COST PER LEAD (CPL)")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">35%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("DEMO KE TRIAL")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">4.2x</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("ROI PIPELINE")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="text-2xl font-extrabold text-ink">{t("Proyek Lainnya")}</h2>
            <Link to="/portofolio" className="text-xs font-bold text-button hover:underline">
              {t("Lihat Semua Portofolio →")}
            </Link>
          </div>

          <ProyekLainnya slug="korporat-gaharu-cloud" />
        </div>
      </section>
    </div>
  );
}
