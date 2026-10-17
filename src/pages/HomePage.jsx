import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import {
  Button,
  Container,
  IconCircle,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { site, links } from "../data/site.js";
import { services } from "../data/services.js";

// Menggunakan portfolioItems (disepadankan dengan data di src/data/portfolio.js)
import { portfolioItems as featuredWork, stats, testimonials } from "../data/portfolio.js";
import RekamJejak from "../components/RekamJejak.jsx";

const title = `${site.name} – Digital Agency Partner & Agensi Kreatif Indonesia`;
const description =
  "Gaharu Creative adalah digital agency & agensi kreatif terpercaya sejak 2016. Kami menyediakan layanan digital marketing, digital branding, jasa pembuatan website, hingga performance marketing untuk UMKM dan Enterprise.";

export default function HomePage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* Hero Section dengan Efek Gradient Backdrop & Image Zoom */}
      <section className="relative overflow-hidden border-b border-emerald-200 bg-gradient-to-b from-emerald-100/60 via-emerald-50 to-white">
        {/* Dekorasi Glow Blur Belakang */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

        <Container className="relative z-10 py-14 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                KONSULTAN &amp; EKSEKUTOR 360° DIGITAL AGENCY
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-tight">
                <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-900 bg-clip-text text-transparent">
                  Gaharu Creative
                </span>
                <br />
                Digital Agency Partner untuk Skala Bisnis Anda
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                Kami adalah digital agency dan agensi kreatif yang membantu brand Anda tumbuh lewat
                solusi pemasaran digital holistik, eksekusi visual presisi, hingga optimasi
                performa berbasis data terukur untuk enterprise, instansi, serta UMKM di Indonesia.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to={links.portofolio} kind="secondary" className="shadow-sm transition-transform hover:-translate-y-0.5">
                  Lihat Portofolio
                </Button>
                <Button href={links.konsultasi} kind="primary" className="shadow-md shadow-emerald-600/20 transition-transform hover:-translate-y-0.5">
                  Konsultasi Gratis
                </Button>
              </div>
            </div>

            {/* Visual Hero */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-2 shadow-xl shadow-emerald-900/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-emerald-900/10">
              <div className="overflow-hidden rounded-xl">
                {/* Lapisan parallax: gambar sedikit lebih besar dari bingkai lalu
                    digeser halus saat scroll, jadi tepinya tidak pernah kosong. */}
                <div data-parallax="1" className="h-full w-full">
                  <img
                    src="/Beranda.webp"
                    alt="Gaharu Creative - Digital Agency Partner"
                    className="h-full w-full scale-110 object-cover object-center transition-transform duration-700 group-hover:scale-[1.15]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Pengantar */}
      <Section divider>
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="group rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:border-emerald-300 hover:shadow-lg sm:p-8">
            <Tag>360 Digital Agency</Tag>
            <h2 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink group-hover:text-emerald-700 transition-colors">
              Partner Digital Marketing 360° untuk Pertumbuhan Bisnis Anda
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Dari tahap riset mendalam, penetapan digital branding, pembuatan ekosistem kanal
              digital, hingga eksekusi strategi pemasaran digital multi-channel yang terukur
              untuk mengkonversi audiens menjadi pelanggan setia.
            </p>
          </article>

          <div className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition-all duration-300 hover:shadow-md">
            <img
              src="/Beranda-Visual.webp"
              alt="Visual Layanan Menyeluruh Gaharu Creative"
              className="aspect-[16/10] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* Layanan Utama */}
      <Section id="layanan-utama" divider className="bg-block">
        <SectionHead
          label="Layanan"
          title="5 Layanan Digital Marketing Utama"
          subtitle="Layanan pemasaran digital terpadu yang saling terhubung untuk pertumbuhan bisnis Anda secara berkelanjutan."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((svc) => (
            <ServiceCard key={svc.slug} service={svc} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {services.slice(3).map((svc) => (
            <ServiceCard key={svc.slug} service={svc} wide />
          ))}
        </div>
      </Section>

      {/* Statistik */}
      <Section divider>
        <SectionHead
          title="Sejak 2016 – Berfokus pada Hasil Nyata dan Pertumbuhan Komprehensif"
          subtitle="Didedikasikan sebagai agensi kreatif berpengalaman yang mendampingi setiap tahap eksekusi digital branding hingga peluncuran aset digital berkinerja tinggi."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {(stats || []).map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl border border-line bg-paper p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted transition-colors group-hover:text-emerald-700">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-extrabold text-ink transition-transform duration-300 group-hover:scale-110">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <RekamJejak />

      {/* Portofolio Unggulan (Dapat Diklik ke Detail Statis) */}
      <Section id="portofolio-unggulan" divider>
        <SectionHead
          title="Portofolio Unggulan – Bukti Hasil Nyata Strategi Digital Marketing"
          subtitle="Eksplorasi studi kasus transformasi digital marketing untuk UMKM, korporat, hingga instansi pemerintah dalam meningkatkan penjualan online."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(featuredWork || []).map((item) => {
            let imageSrc = item.image || "/Portofolio.webp";

            return (
              <Link
                key={item.slug || item.title}
                to={`/portofolio/${item.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl"
              >
                <div>
                  <Tag>{item.tag}</Tag>
                  <div className="mt-4 overflow-hidden rounded-xl border border-line/60">
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="aspect-[16/9] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink transition-colors group-hover:text-emerald-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.summary || item.result}</p>
                </div>
                <span className="mt-4 text-xs font-bold text-emerald-700 group-hover:underline">
                  Lihat Studi Kasus →
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Testimoni Klien */}
      <Section divider className="bg-block">
        <SectionHead
          title="Testimoni Klien"
          subtitle="Apresiasi klien atas eksekusi strategi pemasaran digital dan pendampingan bisnis dari tim kami."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(testimonials || []).map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <blockquote className="text-base leading-relaxed text-muted italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img
                  src="/icon-192.png"
                  alt={item.name}
                  className="h-12 w-12 rounded-full border border-emerald-200 object-cover shadow-sm"
                />
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

function ServiceCard({ service, wide = false }) {
  return (
    <article
      className={`group rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg ${
        wide ? "flex gap-6" : ""
      }`}
    >
      <IconCircle name={service.icon} className={`${wide ? "" : "mb-4"} transition-transform duration-300 group-hover:scale-110`} />
      <div className={wide ? "min-w-0 flex-1" : ""}>
        <Tag>{service.tag}</Tag>
        <h3 className="mt-3 text-lg font-bold text-ink group-hover:text-emerald-700 transition-colors">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.short}</p>
        <Link
          to={`/layanan#${service.slug}`}
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 group/link"
        >
          Lihat detail
          <Icon name="arrowRight" className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}