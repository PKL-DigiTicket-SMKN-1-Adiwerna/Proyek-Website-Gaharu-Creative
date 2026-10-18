import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../data/services.js";
import { links } from "../data/site.js";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, IconCircle, Section, SectionHead } from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";

/* Satu template untuk kelima layanan (DESAIN.md v2 bagian 5.3). Section yang
 * datanya kosong tidak dirender sama sekali, jadi tidak ada blok kosong di
 * halaman layanan yang belum lengkap isinya.
 *
 * Angka klaim tidak ditampilkan. Grafik KPI di halaman performance marketing
 * diberi keterangan "contoh tampilan" supaya tidak dibaca sebagai hasil klien.
 */
export default function LayananDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  const [openFaq, setOpenFaq] = useState(0);

  if (!service) {
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-ink">Layanan tidak ditemukan</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Alamat yang Anda buka tidak cocok dengan layanan yang kami sediakan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/layanan" kind="primary">
              Lihat semua layanan
            </Button>
            <Button href={links.konsultasi} kind="secondary">
              Tanya lewat WhatsApp
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
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-paper">
        <Container className="py-14 sm:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-800">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-800" />
                {service.hero.eyebrow}
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                {service.hero.titleBefore}
                <span className="text-brand-700">{service.hero.accent}</span>
                {service.hero.titleAfter}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {service.hero.lede}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={links.konsultasi} kind="primary">
                  {service.hero.primary.label}
                </Button>
                <Button to={service.hero.secondary.to} kind="secondary">
                  {service.hero.secondary.label}
                </Button>
              </div>

              {service.highlights?.length ? (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li key={item.value} className="flex items-start gap-3">
                      <IconCircle name="check" size="sm" />
                      <span className="text-sm leading-relaxed text-muted">
                        <span className="block font-semibold text-ink">{item.value}</span>
                        {item.label}
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
                  {service.tag}
                </p>
                <p className="mt-2 text-lg font-bold text-ink">{service.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.short}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Masalah yang sering terjadi */}
      {service.problems?.length ? (
        <Section className="bg-lav-50">
          <SectionHead
            align="left"
            label="MASALAH YANG SERING TERJADI"
            title="Yang biasanya menghambat"
            subtitle={`Tiga kondisi yang paling sering muncul sebelum klien memakai layanan ${service.title}.`}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {service.problems.map((problem) => (
              <article key={problem.title} className="rounded-2xl border border-line bg-paper p-6">
                <h3 className="text-lg font-semibold text-ink">{problem.title}</h3>
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
              <SectionHead
                align="left"
                label="SOLUSI & KERANGKA KERJA"
                title="Solusi yang kami kerjakan"
                subtitle="Setiap bagian punya keluaran yang jelas, jadi progresnya bisa diperiksa."
              />
              {service.quote ? (
                <div className="mt-8 rounded-2xl bg-brand-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                    {service.quote.label}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{service.quote.body}</p>
                </div>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {service.solutions.map((solution) => (
                <article key={solution.title} className="rounded-2xl border border-line bg-paper p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                    {solution.label}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{solution.title}</h3>
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
          <SectionHead
            align="left"
            label="METRIK YANG DIPANTAU"
            title="Indikator kinerja utama"
            subtitle={service.kpi.caption}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.kpi.cards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-line bg-paper p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <h3 className="text-base font-semibold text-ink">{card.title}</h3>
                    <p className="text-xs text-subtle">{card.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-chip px-3 py-1 text-xs font-semibold text-chip-ink">
                    {card.badge}
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
                      <span className="text-xs text-subtle">{label}</span>
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
          <SectionHead
            align="left"
            label="DELIVERABLES"
            title="Hasil yang Anda terima"
            subtitle="Setiap keluaran diserahkan dalam format yang bisa langsung dipakai tim Anda."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <article key={item.title} className="flex flex-col rounded-2xl border border-line bg-paper p-6">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                {item.chip ? (
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-chip px-3 py-1.5 text-xs font-semibold text-chip-ink">
                    <Icon name="doc" className="h-4 w-4" />
                    {item.chip}
                  </span>
                ) : null}
              </article>
            ))}
          </div>
          {service.qualityNote ? (
            <p className="mt-8 rounded-2xl bg-brand-700 p-6 text-base leading-relaxed text-white">
              {service.qualityNote}
            </p>
          ) : null}
        </Section>
      ) : null}

      {/* 6. Workflow */}
      {service.steps?.length ? (
        <Section className="bg-lav-50">
          <SectionHead
            align="left"
            label="TAHAPAN KERJA"
            title="Cara kami mengerjakannya"
            subtitle="Urutan kerja yang sama untuk setiap proyek, supaya Anda tahu posisi pekerjaan kapan saja."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {service.steps.map((step) => (
              <li key={step.title} className="rounded-2xl border border-line bg-paper p-6">
                <p className="text-sm font-bold text-brand-600">{step.label}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      {/* 7. FAQ */}
      {service.faqs?.length ? (
        <Section>
          <SectionHead
            align="left"
            label="FAQ"
            title={`Pertanyaan seputar ${service.title}`}
            subtitle="Jawaban singkat untuk pertanyaan yang paling sering masuk."
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
            Pertanyaan lain?{" "}
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              Hubungi tim kami lewat WhatsApp
            </a>
            .
          </p>
        </Section>
      ) : null}

      {/* 8. Band CTA penutup */}
      <Section>
        <div className="rounded-3xl bg-[linear-gradient(120deg,var(--brand-800)_0%,var(--brand-900)_100%)] px-6 py-12 text-center sm:px-12">
          <span className="inline-flex items-center rounded-full border border-white/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            {service.cta.eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
            {service.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            {service.cta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={links.konsultasi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-paper px-6 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              {service.cta.primary}
            </a>
            <Link
              to="/layanan"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/50 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Lihat layanan lain
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
