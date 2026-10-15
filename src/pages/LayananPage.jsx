import { Seo } from "../components/Seo.jsx";
import {
  Button,
  IconCircle,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { links } from "../data/site.js";
import { services, whyChooseUs } from "../data/services.js";

const title = "Jasa Digital Marketing & Agensi Kreatif Terbaik Semarang";
const description =
  "Gaharu Creative menyediakan solusi terpadu: jasa digital marketing, digital branding, kelola sosial media, performance marketing, hingga pembuatan website di Semarang.";

/* Kartu layanan: Problem, Solusi, Deliverables. */
function ServiceBlock({ service }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-24 rounded-lg border border-line bg-paper p-6 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <IconCircle name={service.icon} />
        <div className="min-w-0">
          <Tag>{service.tag}</Tag>
          <h2 className="mt-2 text-xl font-bold text-ink">{service.title}</h2>
        </div>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-line bg-block p-4">
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted">Problem</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink">{service.problem}</dd>
        </div>
        <div className="rounded-md border border-line bg-block p-4">
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted">Solusi</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink">{service.solution}</dd>
        </div>
        <div className="rounded-md border border-line bg-block p-4">
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted">Deliverables</dt>
          <dd className="mt-2">
            <ul className="space-y-1 text-sm leading-relaxed text-ink">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-muted">{service.short}</p>
    </article>
  );
}

/* Tanpa hero, langsung dari 5 Layanan Utama. */
export default function LayananPage() {
  return (
    <>
      <Seo title={title} description={description} />

      <Section id="layanan">
        <SectionHead
          as="h1"
          title="5 Layanan Jasa Digital Marketing Utama"
          subtitle="Lima solusi terpadu yang saling terhubung untuk mengakselerasi penjualan online dan pertumbuhan bisnis Anda di Semarang dan Indonesia."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={links.konsultasi} kind="primary">
            Konsultasi Gratis
          </Button>
          <Button to={links.penawaran} kind="secondary">
            Minta Penawaran
          </Button>
        </div>
        <div className="mt-10 grid gap-5">
          {services.map((service) => (
            <ServiceBlock key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section divider className="bg-block">
        <SectionHead
          title="Kenapa Memilih Gaharu Creative"
          subtitle="Pendekatan berbasis data yang memastikan strategi jelas, eksekusi rapi, dan dampak pemasaran digital dapat diukur secara transparan."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {whyChooseUs.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-lg border border-line bg-paper p-6">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}