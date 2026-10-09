import { Seo } from "../components/Seo.jsx";
import {
  Button,
  Container,
  IconCircle,
  ImageBlock,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { site, links } from "../data/site.js";
import { services, whyChooseUs } from "../data/services.js";

const title = "Layanan";
const description =
  "Branding, content, social media, performance marketing, dan digital product development dalam satu sistem 360.";

/* Kartu layanan format Problem, Solusi, Deliverables (DESAIN.md 4.2). */
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
          <h3 className="mt-2 text-xl font-bold text-ink">{service.title}</h3>
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

export default function LayananPage() {
  return (
    <>
      <Seo title={title} description={description} />

      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{site.name}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={links.portofolio} kind="secondary">
                Lihat Portofolio
              </Button>
              <Button to={links.konsultasi} kind="primary">
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section divider>
        <SectionHead
          label="Layanan Kami"
          title="Layanan yang saling terhubung"
          subtitle="Gaharu Creative membantu bisnis bertumbuh melalui solusi digital yang terencana dan dieksekusi secara menyeluruh, dari strategi hingga hasil yang terukur."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={links.portofolio} kind="secondary">
            Lihat Portofolio
          </Button>
          <Button to={links.penawaran} kind="primary">
            Minta Penawaran
          </Button>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper p-6 sm:p-8">
            <IconCircle name="layers" className="mb-4" />
            <h2 className="text-xl font-bold text-ink">Satu sistem, bukan lima pekerjaan terpisah</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Layanan 360 dirancang agar branding, konten, pengelolaan sosial media, iklan berbayar,
              dan pengembangan produk digital bekerja sebagai satu sistem, menghasilkan konsistensi
              dan performa yang bisa dipantau.
            </p>
            <p className="mt-4">
              <Tag>360 Digital Agency</Tag>
            </p>
          </article>
          <ImageBlock
            label="Diagram 360"
            hint="Placeholder: Brand, Konten, Sosial, Iklan, Produk."
            ratio="aspect-[16/10]"
          />
        </div>
      </Section>

      <Section id="layanan" divider className="bg-block">
        <SectionHead
          title="5 Layanan Utama"
          subtitle="Lima layanan yang saling terhubung untuk mendorong pertumbuhan bisnis Anda."
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

      <Section divider>
        <SectionHead
          title="Kenapa Memilih Gaharu"
          subtitle="Pendekatan yang memastikan strategi jelas, eksekusi rapi, dan dampak dapat diukur."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={links.portofolio} kind="secondary">
            Lihat Portofolio
          </Button>
          <Button to={links.penawaran} kind="primary">
            Minta Penawaran
          </Button>
        </div>
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
