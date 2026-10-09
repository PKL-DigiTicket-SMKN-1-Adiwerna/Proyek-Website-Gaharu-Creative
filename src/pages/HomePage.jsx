import { Link } from "react-router-dom";
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
import { Icon } from "../components/Icons.jsx";
import { site, links } from "../data/site.js";
import { services } from "../data/services.js";
import { featuredWork, stats, clientLogos, testimonials } from "../data/portfolio.js";

const title = site.name;
const description =
  "Gaharu Creative, konsultan dan eksekutor 360 digital agency sejak 2020. Branding, content, social media, performance marketing, dan digital product development.";

export default function HomePage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* Hero: H1 nama brand, tagline, dua tombol, gambar kanan (DESAIN.md 4.1). */}
      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Sejak {site.founded}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {site.name}
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{site.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to={links.portofolio} kind="secondary">
                  Lihat Portofolio
                </Button>
                <Button to={links.konsultasi} kind="primary">
                  Konsultasi Gratis
                </Button>
              </div>
            </div>
            <ImageBlock
              label="Gambar utama"
              hint="Placeholder wireframe, visual layanan 360 belum dibuat."
            />
          </div>
        </Container>
      </section>

      {/* Dua kartu horizontal: teks pengantar di kiri, visual di kanan. */}
      <Section divider>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-line bg-paper p-6 sm:p-8">
            <Tag>360 Digital Agency</Tag>
            <h2 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink">
              Partner Digital 360 untuk Pertumbuhan Bisnis Anda
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Kami membantu bisnis dari strategi hingga eksekusi: branding, konten, social media,
              performance marketing, dan pengembangan produk digital agar hasilnya terukur dan
              berkelanjutan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to={links.konsultasi} kind="primary">
                Konsultasi Gratis
              </Button>
              <Button to={links.portofolio} kind="secondary">
                Lihat Portofolio
              </Button>
            </div>
          </article>
          <ImageBlock
            label="Visual layanan menyeluruh"
            hint="Placeholder: kolase tim dan kanal digital."
            ratio="aspect-[16/10]"
          />
        </div>
      </Section>

      <Section id="layanan-utama" divider className="bg-block">
        <SectionHead
          label="Layanan"
          title="5 Layanan Utama"
          subtitle="Layanan yang saling terhubung untuk pertumbuhan bisnis Anda."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={links.portofolio} kind="secondary">
            Lihat Portofolio
          </Button>
          <Button to={links.konsultasi} kind="primary">
            Konsultasi Gratis
          </Button>
        </div>

        {/* Grid 3 kartu di atas, 2 kartu lebih lebar di baris kedua. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((svc) => (
            <ServiceCard key={svc.slug} service={svc} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {services.slice(3).map((svc) => (
            <ServiceCard key={svc.slug} service={svc} wide />
          ))}
        </div>
      </Section>

      <Section divider>
        <SectionHead
          title="Sejak 2020, fokus pada hasil yang konsisten"
          subtitle="Ringkasan pencapaian Gaharu Creative."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              data-placeholder="Angka dari wireframe, belum diverifikasi"
              className="rounded-lg border border-line bg-paper p-6 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-bold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section divider className="bg-block">
        <SectionHead
          title="Dipercaya oleh berbagai klien di seluruh Indonesia"
          subtitle="Placeholder logo klien, monokrom."
        />
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          {clientLogos.map((name) => (
            <li key={name} className="flex items-center gap-2 text-muted">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper">
                <Icon name="store" className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">{name}</span>
            </li>
          ))}
        </ul>
        <p data-placeholder="Nama klien belum dikirim" className="mt-8 text-center text-sm text-muted">
          Logo di atas placeholder. Nama klien asli menyusul.
        </p>
      </Section>

      <Section id="portofolio-unggulan" divider>
        <SectionHead
          title="Portofolio Unggulan"
          subtitle="Contoh proyek berdasarkan kategori industri."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={links.konsultasi} kind="primary">
            Konsultasi Gratis
          </Button>
          <Button to={links.portofolio} kind="secondary">
            Lihat Portofolio
          </Button>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featuredWork.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper p-5">
              <Tag>{item.tag}</Tag>
              <ImageBlock label="Gambar proyek" ratio="aspect-[16/9]" className="mt-4" />
              <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
              <p data-placeholder="Hasil belum diverifikasi" className="mt-3 text-sm text-muted">
                {item.result}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section divider className="bg-block">
        <SectionHead
          title="Testimoni Klien"
          subtitle="Pengalaman klien terhadap kerja sama dengan Gaharu Creative."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              data-placeholder={item.verified ? undefined : "Testimoni belum diverifikasi"}
              className="rounded-lg border border-line bg-paper p-6 lg:col-span-3"
            >
              <blockquote className="text-base leading-relaxed text-muted">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-line bg-block text-xs text-muted"
                >
                  Foto
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{item.name}</span>
                  <span className="block text-sm text-muted">{item.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}

/* Kartu vertikal: ikon, tag, judul, deskripsi. Versi `wide` dipakai untuk dua
 * kartu di baris kedua dan menaruh ikon di kiri. */
function ServiceCard({ service, wide = false }) {
  return (
    <article
      className={`rounded-lg border border-line bg-paper p-6 transition-colors hover:border-ink ${
        wide ? "flex gap-6" : ""
      }`}
    >
      <IconCircle name={service.icon} className={wide ? "" : "mb-4"} />
      <div className={wide ? "min-w-0 flex-1" : ""}>
        <Tag>{service.tag}</Tag>
        <h3 className="mt-3 text-lg font-bold text-ink">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.short}</p>
        <Link
          to={`/layanan#${service.slug}`}
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Lihat detail
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
