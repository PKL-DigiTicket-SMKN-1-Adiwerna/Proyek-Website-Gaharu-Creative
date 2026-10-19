import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, IconCircle, Section, Kepala } from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { links } from "../data/site.js";
import { services, whyChooseUs } from "../data/services.js";

/* Daftar layanan mengikuti DESAIN.md v2 bagian 5.2: header halaman, grid 3 + 2
 * kartu, lalu alasan memilih. Tiap kartu memuat kategori, ringkasan masalah yang
 * biasa terjadi, deskripsi singkat, dan daftar deliverables. Semua tautan
 * mengarah ke halaman detail yang benar-benar ada.
 */
const title = "Jasa Digital Marketing & Agensi Kreatif Terbaik Semarang";
const description =
  "Gaharu Creative menyediakan solusi terpadu: jasa digital marketing, digital branding, kelola sosial media, performance marketing, hingga pembuatan website di Semarang.";

export default function LayananPage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* Header halaman */}
      <section className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-700">
              Solusi digital terpadu
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              5 Layanan Utama Jasa Digital Marketing
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Lima solusi terpadu yang saling terhubung untuk mengakselerasi penjualan online dan pertumbuhan bisnis Anda secara sistematis dan berkelanjutan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={links.konsultasi} kind="primary">
                Konsultasi Gratis
              </Button>
              <Button to="/kontak" kind="secondary">
                Minta Penawaran
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid layanan: 3 kartu di baris pertama, 2 kartu lebih lebar di baris kedua */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {services.slice(3).map((service) => (
            <ServiceCard key={service.slug} service={service} wide />
          ))}
        </div>
      </Section>

      {/* Kenapa memilih Gaharu */}
      <Section className="bg-mint">
        <Kepala
          nomor="02 / Kenapa kami"
          judul="Kenapa Memilih Gaharu Creative"
          catatan="Pendekatan berbasis data yang memastikan strategi jelas, eksekusi rapi, dan dampak pemasaran digital dapat diukur secara transparan."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div key={item.title}>
              <IconCircle name={item.icon} />
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function ServiceCard({ service, wide = false }) {
  const problem = service.problems?.[0];

  return (
    <article
      id={service.slug}
      className="flex flex-col rounded-lg border border-line bg-paper p-6 scroll-mt-24"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-md bg-chip px-3 py-1 text-xs font-semibold uppercase tracking-widest text-chip-ink">
          {service.tag}
        </span>
        <Icon name="arrowUpRight" className="h-5 w-5 text-brand-700" />
      </div>

      {/* Area visual: latar mint, isinya nama layanan dan ikonnya */}
      <Link
        to={`/layanan/${service.slug}`}
        className="mt-4 flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl bg-mint p-6 text-center"
      >
        <IconCircle name={service.icon} />
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-800">
          {service.tag}
        </span>
      </Link>

      <h3 className="mt-5 text-lg font-semibold text-ink">
        <Link to={`/layanan/${service.slug}`} className="inline-flex min-h-6 items-center hover:text-brand-700">
          {service.title}
        </Link>
      </h3>

      {problem ? (
        <div className="mt-3 rounded-lg bg-danger-50 p-3">
          <p className="text-xs font-semibold text-danger-600">
            Masalah yang sering muncul: <span className="font-normal text-muted">{problem.title}</span>
          </p>
        </div>
      ) : null}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{service.short}</p>

      {service.deliverables?.length ? (
        <div className={wide ? "mt-6 border-t border-line pt-4" : "mt-6 border-t border-line pt-4"}>
          <p className="text-xs font-semibold uppercase tracking-widest text-subtle">
            Yang Anda terima
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {service.deliverables.slice(0, wide ? 5 : 4).map((item) => (
              <li
                key={item.title}
                className="rounded-md bg-chip px-2.5 py-1 text-xs font-medium text-chip-ink"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}