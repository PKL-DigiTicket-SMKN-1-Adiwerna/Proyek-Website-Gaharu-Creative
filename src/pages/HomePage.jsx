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

/* Urutan section mengikuti DESAIN.md v2 bagian 5.1: hero, dua kartu fondasi,
 * lima layanan, statistik, rekam jejak mitra, portofolio unggulan, testimoni,
 * lalu band CTA yang dipasang dari App.jsx.
 *
 * Angka yang tampil hanya angka resmi perusahaan (tahun berdiri, jumlah usaha,
 * jumlah mitra). Angka hasil proyek tidak ditampilkan sebelum dikonfirmasi.
 */
const title = `${site.name} | Agensi Digital 360 di Indonesia`;
const description =
  "Gaharu Creative membantu bisnis dari strategi sampai eksekusi: branding, konten, social media, performance marketing, dan pengembangan produk digital sejak 2016.";

export default function HomePage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* 1. Hero */}
      <section className="border-b border-line bg-gradient-to-b from-lav-50 to-paper">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-800">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-800" />
                Konsultan dan eksekutor 360 digital agency
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Gaharu <span className="text-brand-700">Creative</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Kami mengerjakan strategi, konten, iklan, dan produk digital dalam satu alur kerja,
                dengan angka yang disepakati sejak awal untuk enterprise, instansi, dan UMKM di
                Indonesia.
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
                {["Satu alur kerja dari strategi sampai eksekusi", "Pelaporan berkala, bukan laporan tebal", "Tanpa biaya konsultasi awal"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2">
                      <IconCircle name="check" size="sm" />
                      <span className="text-sm leading-relaxed text-muted">{item}</span>
                    </li>
                  )
                )}
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
      <Section className="bg-lav-50">
        <SectionHead
          label="360 DIGITAL AGENCY"
          title="Partner digital 360 untuk pertumbuhan bisnis Anda"
          subtitle="Solusi tanpa sekat, dari audit dan riset, narasi identitas merek, sampai konversi multi-kanal yang terukur."
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
          title="5 Layanan Utama"
          subtitle="Layanan yang saling terhubung untuk pertumbuhan bisnis Anda secara berkesinambungan."
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
      <Section className="bg-lav-50">
        <SectionHead
          title="Sejak 2016, fokus pada hasil yang bisa diperiksa"
          subtitle="Ringkasan rekam jejak yang kami cantumkan untuk publik. Angka lain kami buka saat sesi konsultasi."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {(stats || []).map((item) => (
            <div key={item.label} className="rounded-2xl border border-line bg-paper p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-subtle">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-brand-700">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <RekamJejak />

      {/* 5. Portofolio unggulan */}
      <Section>
        <SectionHead
          title="Portofolio Unggulan"
          subtitle="Studi kasus peningkatan performa bisnis di segmen UMKM, korporat, dan instansi publik."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {(featuredWork || []).map((item) => (
            <Link
              key={item.slug || item.title}
              to={`/portofolio/${item.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-brand-600"
            >
              <Tag>{item.tag}</Tag>
              <div className="mt-4 overflow-hidden rounded-xl border border-line">
                <img
                  src={item.image || "/Portofolio.webp"}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink group-hover:text-brand-700">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                Baca studi kasus
                <Icon name="arrowRight" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. Testimoni: hanya dirender kalau ada testimoni yang sudah disetujui
          pemilik bisnis (audit staging 12 Okt 2026, temuan C03). */}
      {testimonials?.length ? (
        <Section className="bg-lav-50">
          <SectionHead
            label="APRESIASI KLIEN"
            title="Testimoni Klien"
            subtitle="Pengalaman pemangku kepentingan yang bekerja sama dengan tim Gaharu Creative."
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
    </>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-brand-600">
      <div className="flex items-start justify-between gap-4">
        <Tag>{service.tag}</Tag>
        <IconCircle name={service.icon} size="sm" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">
        <Link to={`/layanan/${service.slug}`} className="hover:text-brand-700">
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.short}</p>
      <Link
        to={`/layanan/${service.slug}`}
        className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        Pelajari detail
        <Icon name="arrowRight" className="h-4 w-4" />
      </Link>
    </article>
  );
}
