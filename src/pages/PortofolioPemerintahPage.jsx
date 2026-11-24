import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";
import ProyekLainnya from "../components/ProyekLainnya.jsx";
import { useT } from "../lib/i18n.js";

export default function PortofolioPemerintahPage() {
  const t = useT();
  return (
    <div className="bg-paper text-ink min-h-screen font-sans">
      <Seo title={t("Studi Kasus: Program Literasi Digital")} description={t("Studi kasus lengkap kampanye informasi publik Literasi Digital bersama Gaharu Creative dan Kemenkominfo.")} />

      <section className="bg-gradient-to-b from-brand-50 to-paper py-12 sm:py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="hover:text-button transition-colors">{t("Portofolio")}</Link>
            <span>/</span>
            <span className="text-button font-bold">{t("Pemerintah: Literasi Digital")}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="w-full lg:w-7/12 space-y-5">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-600 text-button text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  {t("PEMERINTAH • KAMPANYE INFORMASI PUBLIK")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                {t("Literasi Digital: Kampanye Informasi Publik Berbasis Micro-Learning")}
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Kementerian Komunikasi dan Informatika (Kemenkominfo) berkolaborasi dengan Gaharu Creative untuk menjalankan kampanye edukasi publik dan manajemen konten media sosial selama 5 bulan (Maret-Juli 2026).")}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line text-xs text-muted">
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Kategori")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("Pemerintah")}</span>
                </div>
                <div>
                  <span className="block text-subtle font-semibold uppercase tracking-wider text-[11px]">{t("Periode")}</span>
                  <span className="font-bold text-ink mt-0.5 block">{t("Maret-Juli 2026")}</span>
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
                  src="/Proyek Literasi Digital Pemerintah.webp"
                  alt={t("Literasi Digital")}
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
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">{t("Tentang Program Literasi Digital")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Kementerian Komunikasi dan Informatika (Kemenkominfo) berkolaborasi dengan Gaharu Creative untuk menjalankan kampanye edukasi publik dan manajemen konten media sosial selama 5 bulan (Maret-Juli 2026). Proyek ini berfokus pada penyebaran informasi, peningkatan kesadaran keamanan siber dasar, serta edukasi etika berinternet secara masif bagi masyarakat umum.")}
              </p>
            </div>

            {/* Tantangan */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("TANTANGAN BISNIS")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Kendala Penyampaian Informasi Publik")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Sebelumnya, penyampaian informasi terkait edukasi digital cenderung kaku, berformat formal, dan sulit dipahami oleh masyarakat awam. Kendala utamanya adalah rendahnya tingkat keterikatan (engagement rate) pada konten media sosial resmi, tingginya angka penyebaran hoaks, serta belum optimalnya distribusi pesan ke berbagai kelompok usia di seluruh wilayah Indonesia.")}
              </p>
            </div>

            {/* Solusi & Strategi */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("SOLUSI & STRATEGI")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Strategi Komunikasi Publik Ramah Publik")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Gaharu Creative merancang strategi komunikasi digital yang ramah publik dan terstruktur. Langkah ini meliputi pemetaan narasi visual berbasis mikro-konten (infografis interaktif, video animasi pendek, dan komik edukatif), pengelolaan distribusi saluran media sosial terpadu, serta pelaksanaan kampanye sosialisasi program pemerintah menggunakan tagar tematik yang relevan dengan tren percakapan warga net.")}
              </p>
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-button font-extrabold text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800"><Icon name="check" className="h-4 w-4" /></span>
                <h3>{t("Peran dan Pekerjaan Gaharu")}</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted pt-1">
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> {t("Pemetaan narasi visual berbasis mikro-konten (infografis interaktif, video animasi pendek, dan komik edukatif).")}</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> {t("Pengelolaan distribusi saluran media sosial terpadu secara konsisten.")}</li>
                <li className="flex items-start gap-2.5"><span className="text-button font-bold">•</span> {t("Pelaksanaan kampanye sosialisasi program pemerintah menggunakan tagar tematik yang relevan.")}</li>
              </ul>
            </div>

            {/* Hasil Nyata & Testimoni */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-button uppercase tracking-widest">{t("HASIL NYATA & TESTIMONI")}</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">{t("Dampak Kampanye dan Testimoni")}</h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                {t("Strategi terpadu ini berhasil menjangkau lebih dari 5.8 juta impression lintas platform digital dengan peningkatan engagement rate hingga +240%. Kampanye ini juga menghasilkan lebih dari 120.000 partisipan yang menyelesaikan modul edukasi singkat, serta memicu ribuan share organik pada konten pencegahan hoaks. Perwakilan Koordinator Tim Literasi Digital menyatakan bahwa pendekatan kreatif Gaharu Creative mampu menyulap materi publik yang rumit menjadi konten yang menarik, komunikatif, dan berdampak nyata bagi pemahaman masyarakat.")}
              </p>
              <blockquote className="border-l-4 border-button pl-4 italic text-muted text-sm leading-relaxed mt-4">
                &ldquo;{t("Pendekatan kreatif Gaharu Creative mampu menyulap materi publik yang rumit menjadi konten yang menarik, komunikatif, dan berdampak nyata bagi pemahaman masyarakat.")}&rdquo;
              </blockquote>
              <p className="text-xs font-bold text-ink mt-2">{t("Perwakilan Koordinator Tim Literasi Digital")}</p>
            </div>

          </div>

          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Literasi Digital.webp" alt={t("Dokumentasi 1")} loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-line bg-block shadow-sm">
              <img src="/Portofolio-Literasi Digital(Tentang Proyek).webp" alt={t("Dokumentasi 2")} loading="lazy" decoding="async" className="w-full h-44 object-cover object-center" />
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
              {t("Strategi konten edukasi publik dan infografis interaktif.")}
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Panduan materi micro-learning yang mudah dipahami.")}
            </li>
            <li className="rounded-2xl border border-line bg-paper p-5 text-sm leading-relaxed text-muted">
              {t("Kampanye media sosial terstruktur lintas demografi.")}
            </li>
          </ul>

          <div className="text-center space-y-1 max-w-md mx-auto">
            <span className="text-xs font-bold text-button uppercase tracking-widest">{t("METRIK KINERJA TERUKUR")}</span>
            <h2 className="text-2xl font-extrabold text-ink">{t("Ringkasan Dampak Bisnis")}</h2>
            <p className="text-xs text-subtle">{t("Pencapaian nyata dari pelaksanaan kampanye informasi publik.")}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">{t("5.8 Juta")}</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("TOTAL IMPRESSION")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">+240%</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("ENGAGEMENT RATE")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">120K+</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("PARTISIPAN MODUL")}</p>
            </div>
            <div className="bg-paper rounded-2xl p-5 border border-line shadow-sm text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-button">{t("Ribuan")}</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">{t("SHARE ORGANIK")}</p>
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

          <ProyekLainnya slug="pemerintah-literasi-digital" />
        </div>
      </section>
    </div>
  );
}
