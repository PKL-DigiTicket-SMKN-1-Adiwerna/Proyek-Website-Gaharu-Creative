import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, Section } from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { site, links } from "../data/site.js";
import { linksFor, useSite } from "../lib/useSite.js";
import { getContent } from "../lib/contentStore.js";
import { services as staticServices } from "../data/services.js";
import { angkaBeranda as staticAngka, portfolioItems as staticKarya, testimonials as staticTestimonials } from "../data/portfolio.js";
import { api, adaptHomeServices, adaptPortfolioItems, adaptTestimonials } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";
import { useT } from "../lib/i18n.js";
import RekamJejak from "../components/RekamJejak.jsx";

const title = `${site.name}: Branding, Konten, Media Sosial, Iklan, dan Produk Digital`;
const description =
  "Gaharu Creative mengerjakan branding, produksi konten, pengelolaan media sosial, iklan berbayar, dan produk digital untuk UMKM, korporat, dan instansi. Mendampingi bisnis sejak 2016.";

/* Kepala section: nomor kecil, judul rata kiri, satu baris catatan, tautan kanan.
 * Tidak dipusatkan, supaya tidak terasa template. */
function Kepala({ nomor, judul, catatan, tautan }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-700 tabular-nums">
          {nomor}
        </p>
        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          {judul}
        </h2>
        {catatan ? <p className="mt-3 text-base leading-relaxed text-muted">{catatan}</p> : null}
      </div>
      {tautan ? (
        <Link
          to={tautan.to}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          {tautan.label}
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}

function KaryaCard({ item, ukuran }) {
  const t = useT();
  const span = { besar: "lg:col-span-7", sedang: "lg:col-span-5", lebar: "lg:col-span-12" }[ukuran];
  const lebarBody = ukuran === "lebar";
  const ratio = {
    besar: "aspect-[16/10]",
    sedang: "aspect-[16/10] lg:aspect-[4/5]",
    lebar: "aspect-[16/9] lg:aspect-auto lg:min-h-[14rem]",
  }[ukuran];

  return (
    <article className={`${span} min-w-0`}>
      <Link
        to={`/portofolio/${item.slug}`}
        className={`group flex h-full overflow-hidden rounded-lg border border-line bg-paper transition-colors hover:border-brand-700 ${
          lebarBody ? "flex-col lg:flex-row" : "flex-col"
        }`}
      >
        <div
          className={`overflow-hidden border-line ${lebarBody ? "lg:w-2/5 lg:border-r border-b lg:border-b-0" : "border-b"} ${ratio}`}
        >
          <img
            src={item.image}
            alt={item.gambarAlt || item.proyek}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-subtle">
              {t(item.tag)}
            </span>
            {item.contoh ? <span className="rounded-sm bg-tag px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-tag-ink">{t("Contoh")}</span> : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink group-hover:text-brand-700 sm:text-xl">
            {item.proyek}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted">
            {item.disiplin.map((d, i) => (
              <span key={d} className="inline-flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">·</span> : null}
                {d}
              </span>
            ))}
          </p>
          <p className="mt-auto border-t border-line pt-3 text-sm font-semibold tabular-nums text-brand-700">
            {item.resultDraft}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default function HomePage() {
  const t = useT();
  /* Tautan WhatsApp ikut setelan situs dari panel admin. */
  const wa = linksFor(useSite());
  const { data: homeApi } = useApi(() => api.home(), null);
  const { data: apiTestimonials } = useApi(() => api.testimonials().then((j) => ({ data: adaptTestimonials(j.data) })), staticTestimonials);
  const { data: apiHomeServices } = useApi(() => api.services().then((j) => ({ data: adaptHomeServices(j.data) })), null);
  const { data: apiHomeStats } = useApi(() => api.stats().then((j) => ({ data: j.data })), null);
  const { data: apiHomePortfolio } = useApi(() => api.portfolio().then((j) => ({ data: adaptPortfolioItems(j.data) })), null);

  const csServices = getContent("services");
  const csStats = getContent("stats");
  const apiServicesArr = (apiHomeServices && Array.isArray(apiHomeServices) && apiHomeServices.length) ? apiHomeServices : null;
  const services = (apiServicesArr)
    ? apiServicesArr.map((s) => {
        const st = staticServices.find((x) => x.slug === s.slug);
        return st ? { ...st, ...s, icon: s.icon || st.icon, title: s.title || st.title, short: s.short || st.short, tag: s.tag || st.tag } : s;
      })
    : (homeApi && Array.isArray(homeApi.services && homeApi.services.items) && homeApi.services.items.length)
    ? adaptHomeServices(homeApi.services.items).map((s) => {
        const st = staticServices.find((x) => x.slug === s.slug);
        return st ? { ...st, ...s, icon: s.icon || st.icon, title: s.title || st.title, short: s.short || st.short, tag: s.tag || st.tag } : s;
      })
    : (csServices && csServices.length ? csServices : staticServices);

  const apiStatsArr = (apiHomeStats && Array.isArray(apiHomeStats) && apiHomeStats.length) ? apiHomeStats : null;
  const angkaBeranda = (apiStatsArr)
    ? apiStatsArr.map((it) => ({ nilai: it.value, arti: it.suffix ? `${it.label} ${it.suffix}`.trim() : it.label }))
    : (homeApi && homeApi.stats && Array.isArray(homeApi.stats.items) && homeApi.stats.items.length)
    ? homeApi.stats.items.map((it) => ({ nilai: it.value, arti: it.suffix ? `${it.label} ${it.suffix}`.trim() : it.label }))
    : (csStats && csStats.length ? csStats.map((it) => ({ nilai: it.value, arti: it.label })) : staticAngka);

  const apiPortfolioArr = (apiHomePortfolio && Array.isArray(apiHomePortfolio) && apiHomePortfolio.length) ? apiHomePortfolio : null;
  const karyaApi = (apiPortfolioArr)
    ? apiPortfolioArr
    : (homeApi && homeApi.featuredPortfolio && Array.isArray(homeApi.featuredPortfolio.items) && homeApi.featuredPortfolio.items.length)
    ? adaptPortfolioItems(homeApi.featuredPortfolio.items)
    : null;
  const karya = (karyaApi && karyaApi.length ? karyaApi : staticKarya.slice(0, 3));
  const [utama, kedua, ketiga] = karya.length >= 3 ? karya : [staticKarya[0], staticKarya[1], staticKarya[2]];

  const testimonials = (apiTestimonials && apiTestimonials.length ? apiTestimonials : staticTestimonials);

  return (
    <>
      <Seo title={title} description={description} path="/" />

      {/* 1. Hero editorial: rata kiri, satu foto bingkai menyatu (keputusan CeO). */}
      <section className="border-b border-line bg-paper">
        <Container className="py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-7">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-normal text-brand-700 sm:tracking-widest">
                <span>{site.name}</span>
                <span aria-hidden="true" className="hidden h-px w-8 bg-line sm:block" />
                <span className="text-subtle">{t("Sejak")} {site.founded}</span>
              </p>
              <h1 className="mt-5 max-w-[22ch] text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {t("Merek yang rapi, kerja yang")} <span className="text-brand-700">{t("kelihatan angkanya.")}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {t("Satu tim untuk branding, produksi konten, media sosial, iklan berbayar, dan produk digital, dari riset sampai laporan berjalan.")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={wa.konsultasi} kind="primary">
                  {t("Konsultasi Gratis")}
                </Button>
                <Button to={links.portofolio} kind="secondary">
                  {t("Lihat Portofolio")}
                </Button>
              </div>
              <ul className="mt-8 grid gap-x-6 gap-y-2 border-t border-line pt-5 text-sm leading-relaxed text-muted sm:grid-cols-3">
                {[
                  t("Satu alur kerja dari strategi sampai eksekusi"),
                  t("Pelaporan berkala, bukan laporan tebal"),
                  t("Tanpa biaya konsultasi awal"),
                ].map((item, i) => (
                  <li
                    key={item}
                    className={`${
                      i > 0 ? "sm:border-l sm:border-line sm:pl-4" : "sm:pl-0"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <figure className="overflow-hidden rounded-3xl border border-line bg-paper">
                <div className="aspect-[3/2] overflow-hidden border-b border-line">
                  <div data-parallax="1" className="h-full w-full">
                    <img
                      src="/Beranda.webp"
                      alt={t("Tim Gaharu Creative sedang bekerja di depan monitor")}
                      width={1400}
                      height={933}
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full scale-110 object-cover object-center"
                    />
                  </div>
                </div>
                <figcaption className="p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-subtle">
                    {t("Yang dikerjakan")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t("Brand, konten, media sosial, iklan berbayar, produk digital.")}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Band angka: satu band besar ala Clickbait. */}
      <section className="bg-brand-900 py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">
              {t("Angka resmi, bukan hiasan")}
            </h2>
            <p className="text-xs uppercase tracking-widest text-brand-100">
              {t("Dari data resmi perusahaan")}
            </p>
          </div>
          <dl className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {angkaBeranda.map((a) => (
              <div key={a.arti} className="border-t border-brand-100/30 pt-4">
                <dt className="text-3xl font-bold tabular-nums tracking-tight text-brand-ink sm:text-4xl">
                  {t(a.nilai)}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-100">{t(a.arti)}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 2b. Rekam jejak (komponen bersama, real names). */}
      <RekamJejak />

      {/* 3. Layanan editorial bernomor, ala WPP. */}
      <Section id="layanan">
        <Kepala
          judul={t("Yang kami kerjakan")}
          catatan={`${services.length} ${t("layanan. Diambil satu saja bisa, digabung juga bisa.")}`}
          tautan={{ to: links.layanan, label: t("Semua layanan") }}
        />
        <div className="mt-8 border-t border-line">
          {services.map((service, i) => (
            <article key={service.slug}>
              <Link
                to={`/layanan/${service.slug}`}
                className="group flex min-h-11 items-start gap-4 border-b border-line py-5 transition-colors hover:bg-brand-50/60 sm:gap-8"
              >
                <span className="w-8 shrink-0 pt-1 text-sm font-semibold tabular-nums text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-xl font-semibold tracking-tight text-ink group-hover:text-brand-700 sm:text-2xl">
                      {service.title}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-subtle">
                      {t(service.tag)}
                    </span>
                  </span>
                  <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-muted">
                    {t(service.short)}
                  </span>
                </span>
                <Icon name={service.icon} className="mt-1 hidden h-6 w-6 shrink-0 text-brand-700 sm:block" />
                <Icon name="arrowRight" className="mt-2 h-4 w-4 shrink-0 text-subtle group-hover:text-brand-700" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* 4. Portofolio gambar-led, ala Creativeans. */}
      <Section id="portofolio" className="bg-mint" divider>
        <Kepala
          judul={t("Pekerjaan yang pernah kami tangani")}
          catatan={t("Nama proyek, angka hasil, dan gambar di bawah masih contoh, menunggu portofolio asli.")}
          tautan={{ to: links.portofolio, label: t("Semua pekerjaan") }}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="rounded-sm bg-tag px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-tag-ink">
            {t("Contoh")}
          </span>
          <span>
            {t('Semua data portofolio di sini dummy, menunggu portofolio asli. Cara menggantinya ada di satu file data portofolio: ubah isi datanya, lalu set tanda "contoh" ke false.')}
            {/* jalur file untuk pengelola: src/data/portfolio.js */}
          </span>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          <KaryaCard item={utama} ukuran="besar" />
          <KaryaCard item={kedua} ukuran="sedang" />
          <KaryaCard item={ketiga} ukuran="lebar" />
        </div>
      </Section>

      {/* 6. Testimoni: hanya render saat data disetujui. */}
      {testimonials.length ? (
        <Section divider className="bg-mint">
          <Kepala
            judul={t("Apa kata mereka yang sudah bekerja sama")}
            catatan={t("Testimoni yang tayang sudah disetujui pemilik bisnis.")}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-lg border border-line bg-paper p-6"
              >
                <p className="text-base leading-relaxed text-ink">“{t.quote}”</p>
                <footer className="mt-4 text-sm text-muted">
                  <span className="font-semibold text-ink">{t.name}</span>
                  {t.company ? <span className="text-subtle"> · {t.company}</span> : null}
                </footer>
              </blockquote>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
