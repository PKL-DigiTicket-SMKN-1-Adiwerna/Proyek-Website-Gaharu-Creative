import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { IconCircle } from "../components/ui.jsx";
import { links } from "../data/site.js";
import { segments, portfolioItems } from "../data/portfolio.js";

const title = "Portofolio – Gaharu Creative";
const description =
  "Studi kasus, hasil, dan karya terbaru. Transformasi digital terukur yang melipatgandakan dampak bisnis bagi ekosistem UMKM, korporasi, hingga institusi publik di Indonesia.";

export default function PortofolioPage() {
  const [active, setActive] = useState("semua");

  // Membatasi secara presisi tepat 3 proyek utama
  const visible = useMemo(() => {
    const filtered =
      active === "semua"
        ? portfolioItems
        : portfolioItems.filter((item) => item.segment === active);
    return filtered.slice(0, 3);
  }, [active]);

  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen">
      <Seo title={title} description={description} />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white py-16 sm:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/60 text-[#007A55] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#007A55] animate-pulse" />
                  KARYA TERPILIH & EKSEKUSI NYATA
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Portofolio
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Studi kasus, hasil, dan karya terbaru. Transformasi digital terukur yang melipatgandakan dampak bisnis bagi ekosistem UMKM, korporasi, hingga institusi publik di Indonesia.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={links.konsultasi}
                  className="bg-[#007A55] hover:bg-emerald-800 text-white font-bold px-7 py-3 rounded-full text-sm transition-all shadow-md hover:scale-105"
                >
                  Ajukan Konsultasi →
                </Link>
                <Link
                  to={links.layanan}
                  className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold px-7 py-3 rounded-full text-sm transition-all shadow-sm hover:scale-105 flex items-center gap-1.5"
                >
                  Lihat Layanan →
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs">
                <span className="text-slate-500 font-semibold uppercase tracking-widest text-[10px]">PINTAS:</span>
                <div className="flex flex-wrap gap-2">
                  {segments.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActive(item.key)}
                      className={`px-4 py-1.5 rounded-full font-semibold transition-all text-xs ${
                        active === item.key
                          ? "bg-[#007A55] text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
                <img
                  src="/Beranda.webp"
                  alt="Portofolio Gaharu Creative"
                  className="w-full aspect-[4/3] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION FILTER CEPAT */}
      <section className="bg-slate-50/80 py-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold text-[#007A55] uppercase tracking-widest">NAVIGASI FOKUS</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Filter Cepat</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Pilih kategori untuk melihat studi kasus yang relevan dengan skala kebutuhan dan model objektif instansi Anda.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {segments.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(item.key)}
                  className={`group relative text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    active === item.key
                      ? "bg-white border-[#007A55] ring-2 ring-[#007A55]/20 shadow-lg"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007A55] flex items-center justify-center font-bold">
                      <IconCircle name={item.icon} className="bg-transparent border-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.detail}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDI KASUS TERBARU (Satu klik membuka halaman detail statis) */}
      <section id="studi-kasus" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#007A55] uppercase tracking-widest">HASIL NYATA & DAMPAK BISNIS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Studi Kasus Terbaru</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Klik kartu proyek di bawah ini untuk melihat strategi dan hasil detail proyek secara utuh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((item) => {
              let imageSrc = item.image || "/Beranda-Portofolio(UMKM E-Commerce).webp";
              let metric1 = { label: "NEW LEADS", val: "+180%" };
              let metric2 = { label: "OMZET NAIK", val: "2.4x" };

              if (item.slug?.includes("cloud")) {
                metric1 = { label: "TOTAL REACH", val: "1.2M" };
                metric2 = { label: "B2B LEADS", val: "450+" };
              } else if (item.slug?.includes("literasi")) {
                metric1 = { label: "ENGAGEMENT", val: "92%" };
                metric2 = { label: "INDEKS KEPUASAN", val: "4.8/5" };
              }

              return (
                <Link
                  key={item.slug}
                  to={`/portofolio/${item.slug}`}
                  className="group bg-white text-slate-800 rounded-3xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                      <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-[#007A55] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm uppercase">
                        {item.tag || item.segment}
                      </span>
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 space-y-2.5">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#007A55] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {item.summary || item.result}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="text-base font-extrabold text-[#007A55]">{metric1.val}</p>
                        <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">{metric1.label}</p>
                      </div>
                      <div className="border-l border-emerald-200 pl-2">
                        <p className="text-base font-extrabold text-[#007A55]">{metric2.val}</p>
                        <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">{metric2.label}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}