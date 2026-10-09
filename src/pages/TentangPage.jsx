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
import {
  tentangIntro,
  ceritaCards,
  missionGoals,
  values,
  team,
  legality,
} from "../data/tentang.js";

const title = "Tentang";
const description =
  "Gaharu Creative, agensi digital 360 yang berdiri sejak 2020: strategi, desain, pengembangan, dan pemasaran.";

export default function TentangPage() {
  return (
    <>
      <Seo title={title} description={description} />

      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{site.name}</h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                Agensi Digital 360, berbasis di Indonesia.
              </p>
              <div className="mt-8">
                <Button to={links.konsultasi} kind="primary">
                  Konsultasi Gratis
                </Button>
              </div>
            </div>
            <ImageBlock label="Foto tim" hint="Placeholder wireframe, foto asli belum dikirim." />
          </div>
        </Container>
      </section>

      <Section divider>
        <div className="rounded-lg border border-line bg-block p-6 text-center sm:p-10">
          <Tag>{tentangIntro.subtitle}</Tag>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {tentangIntro.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {tentangIntro.description}
          </p>
        </div>
      </Section>

      <Section divider>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ImageBlock
            label="Ilustrasi perjalanan"
            hint="Placeholder gambar kecil kiri."
            ratio="aspect-[4/3]"
          />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Cerita Kami</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Perjalanan dimulai sejak {site.founded}, berkembang menjadi tim yang fokus pada hasil
              dan kolaborasi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={links.mail}
                kind="secondary"
                title="Company profile belum tersedia, kirim email untuk memintanya."
              >
                Unduh Company Profile
              </Button>
              <Button to={links.layanan} kind="primary">
                Lihat Layanan
              </Button>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {ceritaCards.map((item) => (
                <article key={item.title} className="rounded-lg border border-line bg-paper p-5">
                  <h3 className="text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section divider className="bg-block">
        <SectionHead
          title="Misi dan Tujuan"
          subtitle="Dua arah yang saling melengkapi: bagaimana kami bekerja (misi) dan apa yang ingin dicapai (tujuan)."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {missionGoals.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-lg border border-line bg-paper p-6">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button to={links.konsultasi} kind="primary">
            Diskusikan Kebutuhan Anda
          </Button>
        </div>
      </Section>

      <Section divider>
        <SectionHead
          title="Nilai Perusahaan"
          subtitle="Prinsip kerja yang menuntun setiap proyek, dari perencanaan sampai pengukuran hasil."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper p-5">
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section divider className="bg-block">
        <SectionHead
          title="Tim Inti"
          subtitle="Peran kunci yang memastikan kualitas strategi, kreativitas, pemasaran, dan teknis berjalan seimbang."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((item) => (
            <article
              key={item.role}
              className="rounded-lg border border-line bg-paper p-5 text-center"
            >
              <span
                data-placeholder="Foto belum dikirim"
                aria-hidden="true"
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-line bg-block text-xs text-muted"
              >
                Foto
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{item.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Wireframe hanya memuat peran, belum ada nama dan foto anggota tim.
        </p>
      </Section>

      <Section divider>
        <SectionHead
          title="Legalitas"
          subtitle="Dokumen dan informasi penting untuk meningkatkan kepercayaan dalam kerja sama."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {legality.map((item) => (
            <article key={item.title} className="flex gap-4 rounded-lg border border-line bg-paper p-5">
              <IconCircle name={item.icon} />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <p data-placeholder="Badan usaha dan NIB belum dikonfirmasi" className="mt-6 text-sm text-muted">
          {site.legal.legalNote}
        </p>
      </Section>
    </>
  );
}
