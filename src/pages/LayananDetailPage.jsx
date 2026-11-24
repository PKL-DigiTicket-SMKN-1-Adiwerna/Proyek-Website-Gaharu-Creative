import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { services as staticServices } from "../data/services.js";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, IconCircle, Section, Kepala } from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { api, adaptServiceDetail } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";
import { linksFor, useSite } from "../lib/useSite.js";
import { useT } from "../lib/i18n.js";

/* Satu template untuk semua layanan (DESAIN.md v2 bagian 5.3). Section yang
 * datanya kosong tidak dirender sama sekali, jadi tidak ada blok kosong di
 * halaman layanan yang belum lengkap isinya.
 *
 * Lima layanan lama memakai data statis yang lengkap. Layanan yang dibuat dari
 * panel admin tidak ada di data statis, jadi isinya diambil dari API dan
 * dibentuk oleh adaptServiceDetail dengan bagian yang sama.
 *
 * Angka klaim tidak ditampilkan. Grafik KPI di halaman performance marketing
 * diberi keterangan "contoh tampilan" supaya tidak dibaca sebagai hasil klien.
 */
export default function LayananDetailPage() {
  const t = useT();
  /* Tautan WhatsApp ikut setelan situs. */
  const wa = linksFor(useSite());
  const { slug } = useParams();
  const statis = staticServices.find((item) => item.slug === slug) || null;
  const { data, loading } = useApi(
    () =>
      statis
        ? Promise.resolve({ data: statis })
        : api.service(slug).then((j) => ({ data: adaptServiceDetail(j.data) })),
    null,
    [slug]
  );
  const service = data || statis;
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    if (loading) {
      return (
        <Section>
          <p className="text-base text-muted">{t("Memuat layanan...")}</p>
        </Section>
      );
    }
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-ink">{t("Layanan tidak ditemukan")}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {t("Alamat yang Anda buka tidak cocok dengan layanan yang kami sediakan.")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/layanan" kind="primary">
              {t("Lihat semua layanan")}
            </Button>
            <Button href={wa.konsultasi} kind="secondary">
              {t("Tanya lewat WhatsApp")}
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <>
      <Seo
        title={`${service.title} | ${"Gaharu Creative"}`}
        description={service.short}
      />

      {/* 1. Hero: dua kolom, latar gradasi mint (DESAIN.md 2.1) */}
      <section className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-700">
                {t(service.hero.eyebrow)}
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                {service.hero.titleBefore}
                <span className="text-brand-700">{service.hero.accent}</span>
                {service.hero.titleAfter}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {service.hero.lede}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={wa.konsultasi} kind="primary">
                  {t(service.hero.primary.label)}
                </Button>
                <Button to={service.hero.secondary.to} kind="secondary">
                  {t(service.hero.secondary.label)}
                </Button>
              </div>

              {service.highlights?.length ? (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li key={item.value} className="flex items-start gap-3">
                      <IconCircle name="check" size="sm" />
                      <span className="text-sm leading-relaxed text-muted">
                        <span className="block font-semibold text-ink">{t(item.value)}</span>
                        {t(item.label)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Panel ringkas layanan: latar mint, isinya label kategori dan ringkasan */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-md">
              <div className="rounded-xl bg-mint p-8 text-center">
                <IconCircle name={service.icon} className="mx-auto" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-brand-800">
                  {t(service.tag)}
                </p>
                <p className="mt-2 text-lg font-bold text-ink">{service.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t(service.short)}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Masalah yang sering terjadi */}
      {service.problems?.length ? (
        <Section className="bg-lav-50">
          <Kepala
            judul={t("Yang biasanya menghambat")}
            catatan={`${t("Tiga kondisi yang paling sering muncul sebelum klien memakai layanan")} ${service.title}.`}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {service.problems.map((problem) => (
              <article key={problem.title} className="rounded-2xl border border-line bg-paper p-6">
                <h3 className="text-lg font-semibold text-ink">{t(problem.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{problem.body}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 3. Solusi */}
      {service.solutions?.length ? (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div>
              <Kepala
                judul={t("Solusi yang kami kerjakan")}
                catatan={t("Setiap bagian punya keluaran yang jelas, jadi progresnya bisa diperiksa.")}
              />
              {service.quote ? (
                <div className="mt-8 rounded-2xl bg-brand-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                    {t(service.quote.label)}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{service.quote.body}</p>
                </div>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {service.solutions.map((solution) => (
                <article key={solution.title} className="rounded-2xl border border-line bg-paper p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                    {t(solution.label)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{t(solution.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{solution.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {/* 4. KPI: hanya performance marketing, dan ditandai sebagai contoh tampilan */}
      {service.kpi?.cards?.length ? (
        <Section className="bg-lav-50">
          <Kepala
            judul={t("Indikator kinerja utama")}
            catatan={service.kpi.caption}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.kpi.cards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-line bg-paper p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <h3 className="text-base font-semibold text-ink">{t(card.title)}</h3>
                    <p className="text-xs text-subtle">{t(card.subtitle)}</p>
                  </div>
                  <span className="rounded-full bg-chip px-3 py-1 text-xs font-semibold text-chip-ink">
                    {t(card.badge)}
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-around gap-3" aria-hidden="true">
                  {card.bars.map((label, index) => (
                    <span key={label} className="flex flex-col items-center gap-2">
                      <span
                        className={`w-8 rounded-t-md ${
                          index === card.bars.length - 1 ? "h-16 bg-brand-700" : "h-10 bg-line"
                        }`}
                      />
                      <span className="text-xs text-subtle">{t(label)}</span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 5. Deliverables */}
      {service.deliverables?.length ? (
        <Section>
          <Kepala
            judul={t("Hasil yang Anda terima")}
            catatan={t("Setiap keluaran diserahkan dalam format yang bisa langsung dipakai tim Anda.")}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <article key={item.title} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                <h3 className="text-lg font-semibold text-ink">{t(item.title)}</h3>
                {item.body ? (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                ) : null}
                {item.chip ? (
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-chip px-3 py-1.5 text-xs font-semibold text-chip-ink">
                    <Icon name="doc" className="h-4 w-4" />
                    {t(item.chip)}
                  </span>
                ) : null}
              </article>
            ))}
          </div>
          {service.qualityNote ? (
            <p className="mt-8 rounded-2xl bg-brand-700 p-6 text-base leading-relaxed text-white">
              {t(service.qualityNote)}
            </p>
          ) : null}
        </Section>
      ) : null}

      {/* 6. Workflow */}
      {service.steps?.length ? (
        <Section className="bg-lav-50">
          <Kepala
            judul={t("Cara kami mengerjakannya")}
            catatan={t("Urutan kerja yang sama untuk setiap proyek, supaya Anda tahu posisi pekerjaan kapan saja.")}
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {service.steps.map((step) => (
              <li key={step.title} className="rounded-2xl border border-line bg-paper p-6">
                <p className="text-sm font-bold text-brand-600">{t(step.label)}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{t(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {/* 7. FAQ */}
      {service.faqs?.length ? (
        <Section>
          <Kepala
            judul={`${t("Pertanyaan seputar")} ${service.title}`}
            catatan={t("Jawaban singkat untuk pertanyaan yang paling sering masuk.")}
          />
          <div className="mt-8 space-y-3">
            {service.faqs.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.q} className="overflow-hidden rounded-xl border border-line bg-paper">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left text-base font-semibold text-ink"
                  >
                    <span>{faq.q}</span>
                    <Icon
                      name="chevronDown"
                      className={`h-5 w-5 shrink-0 text-brand-700 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open ? (
                    <div className="border-t border-line p-4 text-sm leading-relaxed text-muted">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            {t("Pertanyaan lain?")}{" "}
            <a
              href={wa.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              {t("Hubungi tim kami lewat WhatsApp")}
            </a>
            .
          </p>
        </Section>
      ) : null}

      {/* 8. Band CTA penutup */}
      <Section>
        <div className="rounded-3xl bg-[linear-gradient(120deg,var(--brand-800)_0%,var(--brand-900)_100%)] px-6 py-12 text-center sm:px-12">
          <span className="inline-flex items-center rounded-full border border-white/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            {t(service.cta.eyebrow)}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
            {t(service.cta.title)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            {service.cta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={wa.konsultasi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-paper px-6 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              {t(service.cta.primary)}
            </a>
            <Link
              to="/layanan"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/50 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("Lihat layanan lain")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
