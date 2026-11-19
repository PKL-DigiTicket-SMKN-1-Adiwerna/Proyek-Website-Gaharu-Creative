import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";
import { Seo } from "../components/Seo.jsx";
import { Container, IconCircle, Kepala } from "../components/ui.jsx";
import { links } from "../data/site.js";
import { segments as staticSegments, portfolioItems as staticItems } from "../data/portfolio.js";
import { api, adaptPortfolioCategories, adaptPortfolioItems } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";

const title = "Portofolio";
const description =
  "Studi kasus, hasil, dan karya terbaru. Transformasi digital terukur yang melipatgandakan dampak bisnis bagi ekosistem UMKM, korporasi, hingga institusi publik di Indonesia.";

export default function PortofolioPage() {
  const { data: apiCats } = useApi(() => api.portfolioCategories().then((j) => ({ data: adaptPortfolioCategories(j.data) })), staticSegments);
  const { data: apiItems } = useApi(() => api.portfolio().then((j) => ({ data: adaptPortfolioItems(j.data) })), staticItems);
  const segments = (apiCats && apiCats.length ? apiCats : staticSegments);
  const portfolioItems = (apiItems && apiItems.length ? apiItems : staticItems);
  const [active, setActive] = useState("semua");
  const [tampilSemua, setTampilSemua] = useState(false);
  const labelAktif = segments.find((item) => item.key === active)?.label ?? "Semua";

  /* category_id -> slug dari daftar kategori, supaya baris yang dibuat dari panel
   * admin tetap masuk kategori yang benar walau kolom industry-nya kosong. */
  const segmenPerId = useMemo(() => {
    const peta = new Map();
    (apiCats || []).forEach((c) => {
      if (c.id && c.slug) peta.set(c.id, c.slug);
    });
    return peta;
  }, [apiCats]);

  const { filtered, visible } = useMemo(() => {
    const segmen = (item) => (item.categoryId && segmenPerId.get(item.categoryId)) || item.segment;
    const hasil =
      active === "semua"
        ? portfolioItems
        : portfolioItems.filter((item) => segmen(item) === active);
    return { filtered: hasil, visible: tampilSemua ? hasil : hasil.slice(0, 3) };
  }, [active, portfolioItems, tampilSemua, segmenPerId]);

  /* Setelah chip dipilih, hasilnya di bawah layar (khususnya di HP) sehingga
   * pengguna mengira filter tidak bekerja. Gulir ke daftar hasil. */
  const tampilkanHasil = () => {
    const el = document.getElementById("studi-kasus");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sisa = filtered.length - visible.length;

  return (
    <div className="bg-white text-ink font-sans min-h-screen">
      <Seo title={title} description={description} />

      {/* 1. HERO SECTION */}
      <section className="border-b border-line bg-paper">
        <Container className="py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-7">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-normal text-brand-700 sm:tracking-widest">
                <span>Karya terpilih</span>
                <span aria-hidden="true" className="hidden h-px w-8 bg-line sm:block" />
                <span className="text-subtle">Studi kasus nyata</span>
              </p>
              <h1 className="mt-5 max-w-[22ch] text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Portofolio
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Studi kasus, hasil, dan karya terbaru. Transformasi digital terukur yang melipatgandakan dampak bisnis bagi ekosistem UMKM, korporat, hingga institusi publik di Indonesia.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={links.konsultasi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-button hover:bg-brand-800 text-white font-bold px-7 py-3 rounded-lg text-sm transition-all shadow-md"
                >
                  Ajukan Konsultasi →
                </a>
                <Link
                  to={links.layanan}
                  className="bg-white hover:bg-block border border-field text-ink font-bold px-7 py-3 rounded-lg text-sm transition-all shadow-sm flex items-center gap-1.5"
                >
                  Lihat Layanan →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="overflow-hidden rounded-3xl border border-line bg-paper">
                <div className="aspect-[3/2] overflow-hidden border-b border-line">
                  <img
                    src="/Beranda.webp"
                    alt="Portofolio Gaharu Creative"
                    width={1400}
                    height={933}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SECTION FILTER CEPAT */}
      <section className="bg-block/80 py-16 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <Kepala
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
                  onClick={() => {
                    setActive(item.key);
                    setTampilSemua(false);
                    tampilkanHasil();
                  }}
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
      <section id="studi-kasus" className="scroll-mt-20 bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Kepala
            judul="Studi Kasus Terbaru"
            catatan="Klik kartu proyek untuk melihat strategi dan hasil detail proyek."
          />
          <p aria-live="polite" className="mt-4 text-xs font-semibold uppercase tracking-wider text-button">
            Menampilkan {visible.length} dari {filtered.length} studi kasus kategori {labelAktif}
          </p>
          <p className="text-xs text-subtle">
            Angka hasil per proyek belum ditampilkan karena masih menunggu konfirmasi pemilik proyek.
          </p>

          {filtered.length === 0 ? (
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-field bg-white p-8 text-center shadow-sm">
              <p className="text-base font-bold text-ink">Belum ada studi kasus di kategori ini</p>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Karya untuk kategori {labelAktif} sedang disiapkan. Pilih kategori lain atau lihat semua studi kasus.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActive("semua");
                  setTampilSemua(false);
                }}
                className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-line bg-block px-4 text-xs font-bold text-muted transition-all hover:border-button hover:bg-button hover:text-white"
              >
                Lihat semua studi kasus
              </button>
            </div>
          ) : (
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
          )}

          {filtered.length > 3 && (
            <div className="flex justify-center">
              <button
                type="button"
                aria-expanded={tampilSemua}
                aria-controls="studi-kasus"
                onClick={() => setTampilSemua((nilai) => !nilai)}
                className="border border-field bg-white hover:bg-block text-ink font-bold px-7 py-3 rounded-lg text-sm transition-all shadow-sm"
              >
                {tampilSemua ? "Tampilkan lebih ringkas" : `Selengkapnya (${sisa} lagi)`}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}