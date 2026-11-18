import { useParams, Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { Icon } from "../components/Icons.jsx";
import { Button, Container, Kepala, Section, Tag } from "../components/ui.jsx";
import { links } from "../data/site.js";
import { portfolioItems } from "../data/portfolio.js";
import { api, adaptPortfolioItem } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";

/* Gambar cadangan kalau berkas sampul hilang atau gagal dimuat. Penanda di
 * dataset mencegah perulangan onError saat gambar cadangan ikut gagal. */
function gantiGambar(e) {
  const img = e.currentTarget;
  if (img.dataset.fallback === "1") return;
  img.dataset.fallback = "1";
  img.src = "/Beranda.webp";
}

function barisMeta(item) {
  return [
    { label: "Kategori", nilai: item.industry || item.tag },
    { label: "Klien", nilai: item.clientName },
    { label: "Periode", nilai: item.projectDate },
  ].filter((row) => row.nilai);
}

/* Halaman detail studi kasus. Data diambil dari API per slug; kalau API kosong
 * atau gagal, dipakai tiga studi kasus statis di src/data/portfolio.js supaya
 * tautan lama tetap hidup.
 */
export default function PortofolioDetailPage() {
  const { slug } = useParams();
  const { data, loading } = useApi(
    () => api.portfolioItem(slug).then((j) => ({ data: adaptPortfolioItem(j.data) })),
    null,
    [slug]
  );

  const statis = portfolioItems.find((p) => p.slug === slug) || null;
  const item = data || statis;

  if (!item) {
    if (loading) {
      return (
        <Section>
          <p className="text-base text-muted">Memuat studi kasus...</p>
        </Section>
      );
    }
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-ink">Studi kasus tidak ditemukan</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Studi kasus dengan alamat tersebut belum ada di daftar portofolio kami. Mungkin
            tautannya sudah berubah atau proyeknya belum kami publikasikan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/portofolio" kind="primary">
              Lihat semua studi kasus
            </Button>
            <Button href={links.konsultasi} kind="secondary">
              Tanya lewat WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const meta = barisMeta(item);
  const hasil = item.resultBadge || item.resultDraft || "";
  const sampul = item.image || "/Beranda.webp";
  const alt = item.imageAlt || item.gambarAlt || item.title;
  const paragraf = (item.body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <Seo title={`${item.title} | Gaharu Creative`} description={item.summary || ""} />

      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-paper">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="inline-flex min-h-6 items-center hover:text-brand-700">
              Portofolio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{item.title}</span>
          </nav>

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {item.industry || item.tag ? (
                <Tag className="uppercase tracking-wider">{item.industry || item.tag}</Tag>
              ) : null}

              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {item.title}
              </h1>

              {item.summary ? (
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{item.summary}</p>
              ) : null}

              {meta.length ? (
                <dl className="mt-6 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
                  {meta.map((row) => (
                    <div key={row.label}>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-bold text-ink">{row.nilai}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-line bg-chip shadow-md">
                <img
                  src={sampul}
                  alt={alt}
                  onError={gantiGambar}
                  decoding="async"
                  fetchPriority="high"
                  className="aspect-[4/3] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="mx-auto w-full max-w-3xl">
          <Kepala
            nomor="01 / Uraian"
            judul="Isi studi kasus"
            catatan={paragraf.length ? "Ditulis oleh tim Gaharu Creative." : null}
          />

          {hasil ? (
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-ink">{hasil}</p>
            </div>
          ) : null}

          {paragraf.length ? (
            <div className="mt-8 space-y-5">
              {paragraf.map((teks, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {teks}
                </p>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-line bg-block p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                Uraian menyusul
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Uraian lengkap studi kasus ini belum diisi. Kalau Anda ingin tahu proses dan
                hasilnya secara detail, tanyakan langsung supaya bisa dibahas dengan konteks
                kebutuhan Anda.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={links.konsultasi} kind="primary">
                  Tanya lewat WhatsApp
                </Button>
                <Button to="/portofolio" kind="secondary">
                  Semua studi kasus
                </Button>
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}