import { useParams, Link } from "react-router-dom";
import { posts } from "../data/insights.js";
import { Seo } from "../components/Seo.jsx";
import { Button, Container, Section } from "../components/ui.jsx";
import { links } from "../data/site.js";

/* Halaman artikel. Naskah lengkap ketiga artikel belum ditulis, jadi yang
 * tampil baru judul dan ringkasan, disertai keterangan bahwa naskahnya sedang
 * disiapkan. Tidak ada paragraf isi yang dikarang supaya tidak jadi konten
 * template (audit: konten harus dari data nyata atau diberi keterangan jelas).
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
            <Link to="/" className="hover:text-brand-700">
              Beranda
            </Link>
            <span className="px-2">›</span>
            <Link to="/insight" className="hover:text-brand-700">
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
        </Container>
      </section>

      <Section>
        <div className="max-w-3xl">
          <div className="rounded-lg border border-line bg-block p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
              Naskah menyusul
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Isi lengkap artikel ini sedang ditulis. Kalau Anda butuh pembahasan untuk kasus
              bisnis Anda sekarang, tanyakan langsung supaya bisa dibahas dengan konteks Anda.
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
