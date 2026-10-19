import { useParams, Link } from "react-router-dom";
import { posts } from "../data/insights.js";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, Section } from "../components/ui.jsx";
import { links } from "../data/site.js";

/* Halaman artikel. Menampilkan isi artikel jika sudah ada naskahnya, 
 * atau pesan "Naskah menyusul" jika belum.
 * Box CTA (WhatsApp & Lihat artikel lain) tetap ditampilkan di bagian bawah semua artikel.
 */
export default function InsightDetailPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

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

          <div className="mt-6 max-w-3xl">
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
            <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl border border-line">
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
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl">
          {/* Jika naskah artikel sudah ada, tampilkan isinya di bagian atas */}
          {post.content && (
            <div
              className="mb-10 text-base text-muted"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

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
                Lihat artikel lain
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}