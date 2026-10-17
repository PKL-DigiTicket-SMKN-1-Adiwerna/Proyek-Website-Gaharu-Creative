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
import { Icon } from "../components/Icons.jsx";
import { site, links } from "../data/site.js";
import {
  tentangIntro,
  ceritaCards,
  missionGoals,
  values,
  team,
  legality,
} from "../data/tentang.js";

const title = "Tentang Kami | Agensi Digital 360 Gaharu Creative";
const description =
  "Gaharu Creative adalah agensi digital 360 yang menangani strategi, identitas merek, konten, dan pemasaran digital sejak 2016.";

export default function TentangPage() {
  return (
    <>
      <Seo title={title} description={description} />

      {/* Hero: dua kolom, latar gradasi mint (DESAIN.md bagian 2.1) */}
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-paper">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-800">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-800" />
                Tentang Gaharu Creative
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
                Gaharu <span className="text-brand-700">Creative</span>
                <br />
                Agensi digital 360 berbasis di Indonesia
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Kami menangani strategi, produksi, dan pengukuran dalam satu alur kerja, dengan hasil yang bisa diperiksa bersama tim Anda.
              </p>
              <div className="mt-8">
                <Button href={links.konsultasi} kind="primary">
                  Konsultasi Gratis
                </Button>
              </div>
            </div>

            {/* Gambar hero memakai /Tentang Kami.webp. Bingkainya satu lapis saja,
             * mengikuti pola kartu di beranda: border tipis, tanpa bayangan besar
             * (DESAIN.md 2.4), dan rasio dikunci supaya tinggi tidak melompat saat
             * gambar selesai dimuat. */}
            <div className="group relative overflow-hidden rounded-2xl border border-line transition-colors duration-300 hover:border-brand-600">
              <div className="aspect-[3/2]">
                {/* Lapisan parallax ringan pada gambar hero. */}
                <div data-parallax="1" className="h-full w-full">
                  <img
                    src="/Tentang Kami.webp"
                    alt="Tim Gaharu Creative"
                    width={1966}
                    height={1313}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full scale-110 object-cover object-center transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ringkasan Dedikasi */}
      <Section divider>
        <div className="group rounded-2xl border border-line bg-block p-6 text-center transition-all duration-300 hover:border-brand-600 hover:shadow-lg sm:p-10">
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
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-center transition-transform duration-700 group-"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Cerita Kami</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Perjalanan dimulai sejak {site.founded} sebagai tim kecil yang mendampingi UMKM, lalu berkembang menjadi tim yang menangani korporasi dan instansi publik.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={links.whatsapp}
                kind="secondary"
                title="Berkas company profile belum tersedia untuk diunduh, jadi permintaan diarahkan ke WhatsApp."
              >
                Minta Company Profile
              </Button>
              <Button to={links.layanan} kind="primary">
                Lihat Layanan
              </Button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {ceritaCards.map((item) => (
                <article key={item.title} className="rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:border-brand-600 hover:shadow-md">
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
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
      <Section divider className="bg-lav-50">
        <SectionHead
          title="Misi dan Tujuan"
          subtitle="Dua arah yang saling melengkapi: bagaimana kami bekerja (misi) dan apa yang ingin dicapai (tujuan) melalui eksekusi strategi digital marketing terpadu."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {missionGoals.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-xl border border-line bg-paper p-6 transition-all duration-300 hover:border-brand-600 hover:shadow-md">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href={links.konsultasi} kind="primary" className="shadow-md transition-transform">
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
            <article key={item.title} className="rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:border-brand-600 hover:shadow-md">
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Tim Inti */}
      <Section divider className="bg-lav-50">
        <SectionHead
          title="Tim Inti"
          subtitle="Peran kunci yang memastikan kualitas strategi, kreativitas, pemasaran digital, dan teknis berjalan seimbang."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((item) => (
            <article
              key={item.role}
              className="rounded-2xl border border-line bg-paper p-5 text-center"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-800"
              >
                <Icon name="team" className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.role}</h3>
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
            <article key={item.title} className="flex gap-4 rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:border-brand-600 hover:shadow-md">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
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