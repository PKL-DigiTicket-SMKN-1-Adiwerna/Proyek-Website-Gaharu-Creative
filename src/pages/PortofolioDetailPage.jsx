import { useParams, Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import { Icon } from "../components/Icons.jsx";
import { Button, Container, Kepala, Section, Tag } from "../components/ui.jsx";
import { portfolioItems } from "../data/portfolio.js";
import { api, adaptPortfolioItem } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";
import { linksFor, useSite } from "../lib/useSite.js";
import ProyekLainnya from "../components/ProyekLainnya.jsx";
import { bacaStudiKasus } from "../lib/studiKasus.js";
import { useT } from "../lib/i18n.js";

/* Gambar cadangan kalau berkas sampul hilang atau gagal dimuat. Penanda di
 * dataset mencegah perulangan onError saat gambar cadangan ikut gagal. */
function gantiGambar(e) {
  const img = e.currentTarget;
  if (img.dataset.fallback === "1") return;
  img.dataset.fallback = "1";
  img.src = "/Beranda.webp";
}

function barisMeta(item, t) {
  return [
    { label: t("Kategori"), nilai: item.industry || item.tag },
    { label: t("Klien"), nilai: item.clientName },
    { label: t("Periode"), nilai: item.projectDate },
  ].filter((row) => row.nilai);
}

/* Halaman detail studi kasus. Data diambil dari API per slug; kalau API kosong
 * atau gagal, dipakai tiga studi kasus statis di src/data/portfolio.js supaya
 * tautan lama tetap hidup.
 */
export default function PortofolioDetailPage() {
  const t = useT();
  /* Tautan WhatsApp ikut setelan situs. */
  const wa = linksFor(useSite());
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
          <p className="text-base text-muted">{t("Memuat studi kasus...")}</p>
        </Section>
      );
    }
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-ink">{t("Studi kasus tidak ditemukan")}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {t("Studi kasus dengan alamat tersebut belum ada di daftar portofolio kami. Mungkin tautannya sudah berubah atau proyeknya belum kami publikasikan.")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/portofolio" kind="primary">
              {t("Lihat semua studi kasus")}
            </Button>
            <Button href={wa.konsultasi} kind="secondary">
              {t("Tanya lewat WhatsApp")}
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  const meta = barisMeta(item, t);
  const hasil = item.resultBadge || item.resultDraft || "";
  const sampul = item.image || "/Beranda.webp";
  const alt = item.imageAlt || item.gambarAlt || item.title;
  /* Bagian dari kolom "Isi detail" di panel admin: paragraf, kartu output,
   * kartu metrik, dan kutipan testimoni mengikuti penanda di src/lib/studiKasus.js. */
  const bagian = bacaStudiKasus(item.body);

  return (
    <>
      <Seo title={`${item.title} | Gaharu Creative`} description={item.summary || ""} />

      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-paper">
        <Container className="py-10 sm:py-14">
          <nav aria-label={t("Breadcrumb")} className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/portofolio" className="inline-flex min-h-6 items-center hover:text-brand-700">
              {t("Portofolio")}
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
            judul={t("Isi studi kasus")}
            catatan={bagian.length ? t("Ditulis oleh tim Gaharu Creative.") : null}
          />

          {hasil ? (
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-ink">{hasil}</p>
            </div>
          ) : null}

          {bagian.length ? (
            <div className="mt-8 space-y-10">
              {bagian.map((blok, i) => (
                <div key={i} className="space-y-3">
                  {blok.judul ? (
                    <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{blok.judul}</h2>
                  ) : null}

                  {blok.paragraf.map((teks, j) => (
                    <p key={j} className="text-base leading-relaxed text-muted">
                      {teks}
                    </p>
                  ))}

                  {blok.poin.length ? (
                    <ul className="grid gap-4 pt-1 sm:grid-cols-2">
                      {blok.poin.map((teks, j) => (
                        <li key={j} className="rounded-2xl border border-line bg-block p-5 text-sm leading-relaxed text-muted">
                          {teks}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {blok.metrik.length ? (
                    <div className="grid grid-cols-2 gap-4 pt-1 lg:grid-cols-4">
                      {blok.metrik.map((angka, j) => (
                        <div key={j} className="space-y-1 rounded-2xl border border-line bg-paper p-5 text-center shadow-sm">
                          <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">{angka.nilai}</p>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted">{angka.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {blok.kutipan.map((teks, j) => (
                    <blockquote key={j} className="border-l-4 border-brand-600 pl-4 text-sm italic leading-relaxed text-muted">
                      &ldquo;{teks}&rdquo;
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-line bg-block p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
                {t("Uraian menyusul")}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {t("Uraian lengkap studi kasus ini belum diisi. Kalau Anda ingin tahu proses dan hasilnya secara detail, tanyakan langsung supaya bisa dibahas dengan konteks kebutuhan Anda.")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={wa.konsultasi} kind="primary">
                  {t("Tanya lewat WhatsApp")}
                </Button>
                <Button to="/portofolio" kind="secondary">
                  {t("Semua studi kasus")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Semua proyek lain ikut ditampilkan, bukan hanya beberapa. */}
      <Section divider>
        <Kepala
          judul={t("Proyek lainnya")}
          catatan={t("Studi kasus lain dari tim Gaharu Creative.")}
          tautan={{ to: "/portofolio", label: t("Semua portofolio") }}
        />
        <div className="mt-10">
          <ProyekLainnya slug={item.slug} />
        </div>
      </Section>
    </>
  );
}
