import { useParams, Link } from "react-router-dom";
import { posts } from "../data/insights.js";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, Section, Tag } from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { links } from "../data/site.js";

/* Jumlah artikel terkait yang ditampilkan di bawah halaman artikel. */
const RELATED_COUNT = 2;

/* Kolom baca satu ukuran di semua layar: 768px, ditengahkan di Container. */
const COL = "mx-auto w-full max-w-3xl";

function artikelTerkait(post) {
  const lain = posts.filter((item) => item.slug !== post.slug);
  const serumacam = lain.filter((item) => item.category === post.category);
  const lainLagi = lain.filter((item) => item.category !== post.category);
  return [...serumacam, ...lainLagi].slice(0, RELATED_COUNT);
}

/* Halaman artikel. Menampilkan isi artikel jika sudah ada naskahnya,
 * atau pesan "Naskah menyusul" jika belum.
 * Urutan bagian bawah: Artikel terkait, lalu box CTA (WhatsApp & daftar artikel).
 * Kolom baca satu ukuran di semua layar supaya margin kiri dan kanan sama rata.
 */
export default function InsightDetailPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  const terkait = post ? artikelTerkait(post) : [];

  if (!post) {
    return (
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold text-ink">Artikel tidak ditemukan</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Artikel dengan alamat tersebut belum ada di daftar Insight kami.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/insight" kind="primary">
              Lihat semua artikel
            </Button>
            <Button href={links.konsultasi} kind="secondary">
              Tanya lewat WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Seo title={`${post.title} | Gaharu Creative`} description={post.excerpt} />

      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-paper">
        <Container className="py-12 sm:py-16">
          <div className={COL}>
            <nav aria-label="Breadcrumb" className="text-xs text-subtle">
              <Link to="/" className="inline-flex min-h-6 items-center hover:text-brand-700">
                Beranda
              </Link>
              <span className="px-2">›</span>
              <Link to="/insight" className="inline-flex min-h-6 items-center hover:text-brand-700">
                Insight
              </Link>
              <span className="px-2">›</span>
              <span className="text-ink">{post.tag}</span>
            </nav>

            <div className="mt-6">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800">
                {post.tag}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">{post.excerpt}</p>
              <p className="mt-4 text-xs text-subtle">
                Tim Gaharu Creative · {post.dateLabel}
              </p>
            </div>

            {post.image ? (
              <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  width={post.imageWidth}
                  height={post.imageHeight}
                  loading="eager"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover object-center"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Section>
        <div className={COL}>
          {/* Jika naskah artikel sudah ada, tampilkan isinya di bagian atas */}
          {post.content && (
            <div
              className="mb-10 text-base text-muted"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Artikel terkait: dua artikel lain, yang sekategori didahulukan. */}
          {terkait.length > 0 ? (
            <div className="mb-10 border-t border-line pt-8">
              <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Artikel terkait
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {terkait.map((item) => (
                  <article
                    key={item.slug}
                    className="group flex flex-col rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand-600"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <Tag>{item.tag || item.category}</Tag>
                      <span className="text-[11px] font-medium text-subtle">
                        {item.dateLabel || "2026"}
                      </span>
                    </div>
                    <div className="mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-line bg-chip">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          width={item.imageWidth}
                          height={item.imageHeight}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex h-full w-full items-center justify-center bg-mint"
                        >
                          <Icon name="doc" className="h-7 w-7 text-brand-700" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold leading-snug text-ink transition-colors group-hover:text-button">
                      <Link to={`/insight/${item.slug}`} className="block py-1.5">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
                      {item.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {/* Box CTA (WhatsApp & Lihat artikel lain) tetap selalu tampil di semua artikel */}
          <div className="rounded-lg border border-line bg-block p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
              {post.content ? "Diskusi Lebih Lanjut" : "Naskah menyusul"}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {post.content
                ? "Apakah Anda ingin menerapkan strategi di atas untuk bisnis Anda? Diskusi langsung dengan tim kami untuk mendapatkan solusi yang spesifik."
                : "Isi lengkap artikel ini sedang ditulis. Kalau Anda butuh pembahasan untuk kasus bisnis Anda sekarang, tanyakan langsung supaya bisa dibahas dengan konteks Anda."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={links.konsultasi} kind="primary">
                Tanya lewat WhatsApp
              </Button>
              <Button to="/insight" kind="secondary">
                Semua artikel Insight
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}