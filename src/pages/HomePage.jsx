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
import { portfolioItems as featuredWork, stats, testimonials } from "../data/portfolio.js";
import RekamJejak from "../components/RekamJejak.jsx";

const title = `${site.name} – Digital Agency Partner & Agensi Kreatif Indonesia`;
const description =
  "Gaharu Creative adalah digital agency & agensi kreatif terpercaya sejak 2020. Kami menyediakan layanan digital marketing, digital branding, jasa pembuatan website, hingga performance marketing untuk UMKM dan Enterprise.";

export default function HomePage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* 1. Hero dengan gradasi hijau/emerald */}
      <section className="border-b border-emerald-200 bg-emerald-50">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-800">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-800" />
                KONSULTAN &amp; EKSEKUTOR 360° DIGITAL AGENCY
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                <font color="#047857">Gaharu Creative</font><br />
                Digital Agency Partner untuk Skala Bisnis Anda
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Kami adalah digital agency dan agensi kreatif yang membantu brand Anda tumbuh lewat
                solusi pemasaran digital holistik, eksekusi visual presisi, hingga optimasi
                performa berbasis data terukur untuk enterprise, instansi, serta UMKM di Indonesia.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={links.konsultasi} kind="primary">
                  Konsultasi Gratis
                </Button>
                <Button to={links.portofolio} kind="secondary">
                  Lihat Portofolio
                </Button>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Satu alur kerja dari strategi sampai eksekusi",
                  "Pelaporan berkala, bukan laporan tebal",
                  "Tanpa biaya konsultasi awal",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <IconCircle name="check" size="sm" />
                    <span className="text-sm leading-relaxed text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pilihan CeO: satu bingkai menyatu. Foto di atas, keterangan di
                         * bawah dalam kartu yang sama, dipisah garis tipis. Bingkai ganda
                         * dan bayangan besar tidak dipakai (DESAIN.md 2.4). */}
                        <div className="overflow-hidden rounded-3xl border border-line bg-paper">
                          <div className="aspect-[3/2] overflow-hidden border-b border-line">
                            <div data-parallax="1" className="h-full w-full">
                              <img
                                src="/Beranda.webp"
                                alt="Tim Gaharu Creative sedang bekerja di depan monitor"
                                width={1913}
                                height={1275}
                                className="h-full w-full scale-110 object-cover object-center"
                              />
                            </div>
                          </div>
                          <div className="p-5">
                            <Tag>Solusi Digital Terpadu</Tag>
                            <p className="mt-3 text-balance text-sm leading-relaxed text-muted">
                              Dari strategi sampai eksekusi terintegrasi, dalam satu tim yang sama.
                            </p>
                          </div>
                        </div>
                      </div>
        </Container>
      </section>

      {/* 2. Dua kartu fondasi */}
      <Section className="bg-emerald-50/50">
        <SectionHead
          label="360 DIGITAL AGENCY"
          title="Partner Digital Marketing 360° untuk Pertumbuhan Bisnis Anda"
          subtitle="Dari tahap riset mendalam, penetapan digital branding, pembuatan ekosistem kanal digital, hingga eksekusi strategi pemasaran digital multi-channel yang terukur untuk mengkonversi audiens menjadi pelanggan setia."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <Tag>360 Digital Agency</Tag>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-ink">
              Satu tim untuk strategi sampai eksekusi
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Kami mendampingi bisnis dari perumusan strategi di hulu sampai eksekusi di hilir:
              arsitektur branding, produksi konten lintas kanal, penataan media sosial, optimasi
              iklan berbayar, dan perakitan produk digital.
            </p>
          </article>

          <div className="overflow-hidden rounded-2xl border border-line bg-paper">
            <img
              src="/Beranda-Visual.webp"
              alt="Kolase pekerjaan tim Gaharu Creative"
              className="aspect-[16/10] w-full object-cover object-center"
            />
          </div>
        </div>
      </Section>

      {/* 3. Lima layanan utama */}
      <Section>
        <SectionHead
          label="LAYANAN"
          title="5 Layanan Digital Marketing Utama"
          subtitle="Layanan pemasaran digital terpadu yang saling terhubung untuk pertumbuhan bisnis Anda secara berkelanjutan."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {services.slice(3).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* 4. Statistik resmi perusahaan */}
      <Section className="bg-emerald-50/50">
        <SectionHead
          title="Sejak 2020 – Berfokus pada Hasil Nyata dan Pertumbuhan Komprehensif"
          subtitle="Didedikasikan sebagai agensi kreatif berpengalaman yang mendampingi setiap tahap eksekusi digital branding hingga peluncuran aset digital berkinerja tinggi."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {(stats || []).map((item) => (
            <div key={item.label} className="rounded-2xl border border-line bg-paper p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-subtle">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-emerald-700">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <RekamJejak />

      {/* 5. Portofolio unggulan */}
      <Section>
        <SectionHead
          title="Portofolio Unggulan – Bukti Hasil Nyata Strategi Digital Marketing"
          subtitle="Eksplorasi studi kasus transformasi digital marketing untuk UMKM, korporat, hingga instansi pemerintah dalam meningkatkan penjualan online."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(featuredWork || []).map((item) => (
            <Link
              key={item.slug || item.title}
              to={`/portofolio/${item.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-emerald-600"
            >
              <Tag>{item.tag}</Tag>
              <div className="mt-4 overflow-hidden rounded-xl border border-line">
                <img
                  src={item.image || "/Portofolio.webp"}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink group-hover:text-emerald-700">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Baca studi kasus
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. Testimoni Klien */}
      {testimonials?.length ? (
        <Section className="bg-emerald-50/50">
          <SectionHead
            label="APRESIASI KLIEN"
            title="Testimoni Klien"
            subtitle="Apresiasi klien atas eksekusi strategi pemasaran digital dan pendampingan bisnis dari tim kami."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-2xl border border-line bg-paper p-6">
                <blockquote className="text-base leading-relaxed text-muted">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block text-sm font-semibold text-ink">{item.name}</span>
                  <span className="block text-sm text-muted">{item.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {/* 7. Banner CTA Penutup */}
      <Section divider>
        <div className="relative overflow-hidden rounded-2xl border border-emerald-950/30 bg-[linear-gradient(135deg,#10b981_0%,#047857_45%,#065f46_100%)] p-8 text-center text-white shadow-[0_24px_45px_-15px_rgba(4,120,87,0.55)] sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Siap Membangun dan Mengembangkan Bisnis Digital Anda?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-emerald-50">
            Mulai langkah transformasi bisnis digital Anda bersama tim ahli Gaharu Creative. Dapatkan sesi konsultasi gratis tanpa komitmen awal untuk memetakan pertumbuhan brand Anda.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button to={links.portofolio} kind="secondary" className="bg-white/15 text-white hover:bg-white/25">
              Lihat Portofolio
            </Button>
            <Button href={links.konsultasi} kind="primary" className="bg-white text-emerald-900 hover:bg-emerald-50">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-emerald-600">
      <div className="flex items-start justify-between gap-4">
        <Tag>{service.tag}</Tag>
        <IconCircle name={service.icon} size="sm" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">
        <Link to={`/layanan/${service.slug}`} className="hover:text-emerald-700">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.short}</p>
      <Link
        to={`/layanan/${service.slug}`}
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
      >
        Pelajari detail
        <Icon name="arrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}