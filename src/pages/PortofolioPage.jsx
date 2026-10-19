import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";
import { IconCircle, Kepala } from "../components/ui.jsx";
import { links } from "../data/site.js";
import { segments, portfolioItems } from "../data/portfolio.js";

const title = "Portofolio";
const description =
  "Studi kasus, hasil, dan karya terbaru. Transformasi digital terukur yang melipatgandakan dampak bisnis bagi ekosistem UMKM, korporasi, hingga institusi publik di Indonesia.";

export default function PortofolioPage() {
  const [active, setActive] = useState("semua");
  const labelAktif = segments.find((item) => item.key === active)?.label ?? "Semua";

  // Membatasi secara presisi tepat 3 proyek utama
  const visible = useMemo(() => {
    const filtered =
      active === "semua"
        ? portfolioItems
        : portfolioItems.filter((item) => item.segment === active);
    return filtered.slice(0, 3);
  }, [active]);

  return (
    <div className="bg-white text-ink font-sans min-h-screen">
      <Seo title={title} description={description} />

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-brand-50 to-paper py-16 sm:py-24 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-100 border border-brand-100 text-button text-xs font-semibold px-4 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-button " />
                  KARYA TERPILIH & EKSEKUSI NYATA
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-tight">
                Portofolio
              </h1>

              <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                Studi kasus, hasil, dan karya terbaru. Transformasi digital terukur yang melipatgandakan dampak bisnis bagi ekosistem UMKM, korporasi, hingga institusi publik di Indonesia.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={links.konsultasi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-button hover:bg-brand-800 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all shadow-md "
                >
                  Ajukan Konsultasi →
                </a>
                <Link
                  to={links.layanan}
                  className="bg-white hover:bg-block border border-field text-ink font-bold px-7 py-3 rounded-lg text-sm transition-all shadow-sm  flex items-center gap-1.5"
                >
                  Lihat Layanan →
                </Link>
              </div>

            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-line">
                <img
                  src="/Beranda.webp"
                  alt="Portofolio Gaharu Creative"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION FILTER CEPAT */}
      <section className="bg-block/80 py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <Kepala
                nomor="01 / Filter"
                judul="Filter Cepat"
                catatan="Pilih kategori untuk melihat studi kasus yang relevan dengan skala kebutuhan dan model objektif instansi Anda."
              />
            </div>

            <div
              role="group"
              aria-label="Filter kategori portofolio"
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {segments.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={active === item.key}
                  aria-controls="studi-kasus"
                  onClick={() => setActive(item.key)}
                  className={`group relative text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    active === item.key
                      ? "bg-white border-button ring-2 ring-button/20 shadow-lg"
                      : "bg-white border-line hover:border-field hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-button flex items-center justify-center font-bold">
                      <IconCircle name={item.icon} className="bg-transparent border-0" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-base">{item.label}</h3>
                    <p className="text-xs text-muted leading-relaxed mt-1">{item.detail}</p>
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
          <Kepala
            nomor="02 / Studi kasus"
            judul="Studi Kasus Terbaru"
            catatan="Klik kartu proyek untuk melihat strategi dan hasil detail proyek."
          />
          <p aria-live="polite" className="mt-4 text-xs font-semibold uppercase tracking-wider text-button">
            Menampilkan {visible.length} dari {portfolioItems.length} studi kasus kategori {labelAktif}
          </p>
          <p className="text-xs text-subtle">
            Angka hasil per proyek belum ditampilkan karena masih menunggu konfirmasi pemilik proyek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((item) => {
              let imageSrc = item.image || "/Beranda-Portofolio(UMKM E-Commerce).webp";
              /* Angka hasil per proyek belum dikonfirmasi pemilik proyek, jadi
               * tidak ada angka yang dirender di kartu listing (aturan R-17). */

              return (
                <Link
                  key={item.slug}
                  to={`/portofolio/${item.slug}`}
                  className="group bg-white text-ink rounded-3xl overflow-hidden border border-line transition-all duration-300 hover:border-brand-600 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative overflow-hidden aspect-[16/10] bg-chip">
                      <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-button text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm uppercase">
                        {item.tag || item.segment}
                      </span>
                      <img
                        src={imageSrc}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-"
                      />
                    </div>

                    <div className="p-6 space-y-2.5">
                      <h3 className="text-base sm:text-lg font-extrabold text-ink group-hover:text-button transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                      Lihat studi kasus
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </span>
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