import { Seo } from "../components/Seo.jsx";
import RekamJejak from "../components/RekamJejak.jsx";
import {
  Button,
  Container,
  IconCircle,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { site, links } from "../data/site.js";
import {
  tentangIntro,
  ceritaCards,
  missionGoals,
  values,
  team,
  legality,
} from "../data/tentang.js";

const title = "Tentang Kami – Konsultan Digital Marketing Semarang & Agensi Kreatif";
const description =
  "Gaharu Creative adalah konsultan digital marketing & agensi kreatif terpercaya di Semarang sejak 2016: strategi, digital branding, pembuatan website, dan pemasaran digital.";

export default function TentangPage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* Hero Section dengan Efek Gradient, Glow, dan Gambar Utama */}
      <section className="relative overflow-hidden border-b border-emerald-200 bg-gradient-to-b from-emerald-100/60 via-emerald-50 to-white">
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <Container className="relative z-10 py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                TENTANG GAHARU CREATIVE
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-900 bg-clip-text text-transparent">
                  Gaharu Creative
                </span>
                <br />
                Konsultan Digital Marketing Semarang
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                Agensi kreatif dan konsultan digital marketing 360 berbasis di Semarang dan Indonesia yang berfokus pada pertumbuhan bisnis secara terukur.
              </p>
              <div className="mt-8">
                <Button href={links.konsultasi} kind="primary" className="shadow-md shadow-emerald-600/20 transition-transform hover:-translate-y-0.5">
                  Konsultasi Gratis
                </Button>
              </div>
            </div>

            {/* Gambar Hero Menggunakan /Tentang Kami.webp */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-white p-2 shadow-xl shadow-emerald-900/5 transition-shadow duration-500 hover:shadow-2xl">
              <div className="overflow-hidden rounded-xl">
                {/* Lapisan parallax ringan pada gambar hero. */}
                <div data-parallax="1" className="h-full w-full">
                  <img
                    src="/Tentang Kami.webp"
                    alt="Tim Gaharu Creative"
                    className="h-full w-full scale-110 object-cover object-center transition-transform duration-700 group-hover:scale-[1.15]"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ringkasan Dedikasi */}
      <Section divider>
        <div className="group rounded-2xl border border-line bg-block p-6 text-center transition-all duration-300 hover:border-emerald-300 hover:shadow-lg sm:p-10">
          <Tag>{tentangIntro.subtitle}</Tag>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {tentangIntro.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {tentangIntro.description}
          </p>
        </div>
      </Section>

      {/* Cerita Kami */}
      <Section divider>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Gambar Cerita Kami Menggunakan /Tentang Kami-Cerita Kami.webp */}
          <div className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-md transition-all duration-300 hover:shadow-xl">
            <img
              src="/Tentang Kami-Cerita Kami.webp"
              alt="Perjalanan Gaharu Creative"
              className="aspect-[4/3] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Cerita Kami</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Perjalanan dimulai sejak {site.founded} sebagai agensi kreatif dan konsultan digital marketing Semarang, berkembang menjadi tim yang fokus pada hasil dan kolaborasi strategis.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={links.mail}
                kind="secondary"
                title="Company profile belum tersedia, kirim email untuk memintanya."
                className="transition-transform hover:-translate-y-0.5"
              >
                Unduh Company Profile
              </Button>
              <Button to={links.layanan} kind="primary" className="transition-transform hover:-translate-y-0.5">
                Lihat Layanan
              </Button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {ceritaCards.map((item) => (
                <article key={item.title} className="rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <RekamJejak />

      {/* Misi dan Tujuan */}
      <Section divider className="bg-block">
        <SectionHead
          title="Misi dan Tujuan"
          subtitle="Dua arah yang saling melengkapi: bagaimana kami bekerja (misi) dan apa yang ingin dicapai (tujuan) melalui eksekusi strategi digital marketing terpadu."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {missionGoals.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href={links.konsultasi} kind="primary" className="shadow-md transition-transform hover:-translate-y-0.5">
            Diskusikan Kebutuhan Anda
          </Button>
        </div>
      </Section>

      {/* Nilai Perusahaan */}
      <Section divider>
        <SectionHead
          title="Nilai Perusahaan"
          subtitle="Prinsip kerja yang menuntun setiap proyek digital branding, dari perencanaan sampai pengukuran hasil."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((item) => (
            <article key={item.title} className="rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Tim Inti */}
      <Section divider className="bg-block">
        <SectionHead
          title="Tim Inti"
          subtitle="Peran kunci yang memastikan kualitas strategi, kreativitas, pemasaran digital, dan teknis berjalan seimbang."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((item) => (
            <article
              key={item.role}
              className="group rounded-2xl border border-line bg-paper p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-emerald-200 bg-emerald-50 p-3 shadow-sm">
                <img
                  src="/icon-192.png"
                  alt={item.role}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink group-hover:text-emerald-700 transition-colors">{item.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Legalitas */}
      <Section divider>
        <SectionHead
          title="Legalitas"
          subtitle="Dokumen dan informasi penting untuk meningkatkan kepercayaan dalam kerja sama."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {legality.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          {site.legal.legalNote}
        </p>
      </Section>
    </>
  );
}