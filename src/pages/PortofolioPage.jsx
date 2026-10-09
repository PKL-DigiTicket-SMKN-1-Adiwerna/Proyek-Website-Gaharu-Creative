import { useMemo, useState } from "react";
import { Seo } from "../components/Seo.jsx";
import {
  Button,
  Container,
  FilterChip,
  IconCircle,
  ImageBlock,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { links } from "../data/site.js";
import { segments, portfolioItems } from "../data/portfolio.js";

const title = "Portofolio";
const description = "Studi kasus, hasil, dan karya terbaru Gaharu Creative.";

export default function PortofolioPage() {
  const [active, setActive] = useState("semua");

  const visible = useMemo(
    () => (active === "semua" ? portfolioItems : portfolioItems.filter((item) => item.segment === active)),
    [active]
  );

  return (
    <>
      <Seo title={title} description={description} />

      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Portofolio</h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                Studi kasus, hasil, dan karya terbaru.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to={links.layanan} kind="secondary">
                  Lihat Layanan
                </Button>
                <Button to={links.konsultasi} kind="primary">
                  Ajukan Konsultasi
                </Button>
              </div>
              <div
                role="group"
                aria-label="Filter kategori portofolio"
                className="mt-7 flex flex-wrap gap-2"
              >
                {segments.map((item) => (
                  <FilterChip
                    key={item.key}
                    active={active === item.key}
                    onClick={() => setActive(item.key)}
                  >
                    {item.label}
                  </FilterChip>
                ))}
              </div>
            </div>
            <ImageBlock label="Karya unggulan" hint="Placeholder gambar dari wireframe." />
          </div>
        </Container>
      </section>

      <Section divider>
        <SectionHead
          title="Filter Cepat"
          subtitle="Pilih kategori untuk melihat studi kasus yang relevan."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {segments.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              aria-pressed={active === item.key}
              className={`flex min-h-11 items-start gap-4 rounded-lg border p-5 text-left transition-colors ${
                active === item.key
                  ? "border-ink bg-block"
                  : "border-field bg-paper hover:border-ink"
              }`}
            >
              <IconCircle name={item.icon} />
              <span className="min-w-0">
                <span className="block text-base font-bold text-ink">{item.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{item.detail}</span>
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section id="studi-kasus" divider className="bg-block">
        <SectionHead
          title="Studi Kasus Terbaru"
          subtitle="6 proyek pilihan dengan KPI terukur. Silakan klik untuk melihat detail."
        />
        <p aria-live="polite" className="mt-6 text-center text-sm text-muted">
          Menampilkan {visible.length} dari {portfolioItems.length} proyek
          {active === "semua" ? "" : ` kategori ${segments.find((s) => s.key === active).label}`}.
        </p>

        {visible.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-lg border border-dashed border-line bg-paper p-6 text-center">
            <p className="text-base font-bold text-ink">Belum ada proyek di kategori ini</p>
            <p className="mt-2 text-sm text-muted">
              Studi kasus untuk kategori ini belum disusun. Kirim pesan lewat halaman kontak kalau
              Anda ingin melihat contoh yang paling mendekati.
            </p>
            <Button to={links.konsultasi} kind="secondary" className="mt-5">
              Hubungi Kami
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <article
                key={item.slug}
                className="rounded-lg border border-line bg-paper p-5 transition-colors hover:border-ink"
              >
                <Tag>{item.tag}</Tag>
                <ImageBlock label="Gambar proyek" ratio="aspect-[16/9]" className="mt-4" />
                <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.services.map((name) => (
                    <li
                      key={name}
                      className="rounded-sm border border-line px-2 py-1 text-xs text-muted"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
                <p
                  data-placeholder="Studi kasus belum diverifikasi"
                  className="mt-4 text-xs leading-relaxed text-muted"
                >
                  Detail angka dan hasil menyusul setelah klien menyetujui publikasi.
                </p>
              </article>
            ))}
          </div>
        )}
      </Section>

    </>
  );
}
