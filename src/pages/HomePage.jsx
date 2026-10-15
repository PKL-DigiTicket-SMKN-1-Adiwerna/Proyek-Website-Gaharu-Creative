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
import { featuredWork, stats, testimonials } from "../data/portfolio.js";
import RekamJejak from "../components/RekamJejak.jsx";

const title = `${site.name} – Digital Agency Partner & Agensi Kreatif Indonesia`;
const description =
  "Gaharu Creative adalah digital agency & agensi kreatif terpercaya sejak 2020. Kami menyediakan layanan digital marketing, digital branding, jasa pembuatan website, hingga performance marketing untuk UMKM dan Enterprise.";

export default function HomePage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* Hero: nama brand, tagline, dua tombol, gambar kanan. */}
      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                KONSULTAN & EKSEKUTOR 360° DIGITAL AGENCY
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                <font color="#047857">Gaharu Creative</font><br></br> 
                  Digital Agency Partner untuk Skala Bisnis Anda
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                Kami adalah digital agency dan agensi kreatif yang membantu brand Anda tumbuh lewat
                solusi pemasaran digital holistik, eksekusi visual presisi, hingga optimasi
                performa berbasis data terukur untuk enterprise, instansi, serta UMKM di Indonesia.
              </p>
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
              hint="Visual layanan 360 belum dibuat."
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
              Partner Digital Marketing 360° untuk Pertumbuhan Bisnis Anda
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Dari tahap riset mendalam, penetapan digital branding, pembuatan ekosistem kanal
              digital, hingga eksekusi strategi pemasaran digital multi-channel yang terukur
              untuk mengkonversi audiens menjadi pelanggan setia.
            </p>
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
          title="5 Layanan Digital Marketing Utama"
          subtitle="Layanan pemasaran digital terpadu yang saling terhubung untuk pertumbuhan bisnis Anda secara berkelanjutan."
        />
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
          title="Sejak 2020 – Berfokus pada Hasil Nyata dan Pertumbuhan Komprehensif"
          subtitle="Didedikasikan sebagai agensi kreatif berpengalaman yang mendampingi setiap tahap eksekusi digital branding hingga peluncuran aset digital berkinerja tinggi."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              data-placeholder="Angka belum diverifikasi"
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

      <RekamJejak />

      <Section id="portofolio-unggulan" divider>
        <SectionHead
          title="Portofolio Unggulan – Bukti Hasil Nyata Strategi Digital Marketing"
          subtitle="Eksplorasi studi kasus transformasi digital marketing untuk UMKM, korporat, hingga instansi pemerintah dalam meningkatkan penjualan online."
        />
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
          subtitle="Apresiasi klien atas eksekusi strategi pemasaran digital dan pendampingan bisnis dari tim kami."
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-line bg-block text-xs text-muted"
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

/* Kartu vertikal: ikon, tag, judul, deskripsi. Versi wide menaruh ikon di kiri. */
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
          <Icon name="arrowRight" className="h-5 w-5" />
        </Link>
      </div>
    </article>
  );
}