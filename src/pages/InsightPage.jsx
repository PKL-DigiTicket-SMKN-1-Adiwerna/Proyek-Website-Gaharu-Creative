import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import {
  Button,
  Container,
  FilterChip,
  IconCircle,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { links, waBase } from "../data/site.js";
import { insightCategories, posts, insightsDraftOnly } from "../data/insights.js";

const title = "Insight: Artikel Strategi Digital";
const description = "Artikel, panduan, dan studi kasus seputar strategi pertumbuhan digital dari Gaharu Creative.";

export default function InsightPage() {
  const [active, setActive] = useState("semua");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const visible = useMemo(
    () => (active === "semua" ? posts : posts.filter((post) => post.category === active)),
    [active]
  );

  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("invalid");
      return;
    }
    /* Tidak ada layanan buletin otomatis di balik form ini, jadi permintaan
     * diteruskan ke WhatsApp supaya tidak ada klaim "terdaftar" yang tidak benar. */
    const pesan = `Halo Gaharu Creative, saya ingin menerima artikel Insight di email: ${value}`;
    window.open(`${waBase}?text=${encodeURIComponent(pesan)}`, "_blank", "noopener");
    setStatus("sent");
  };

  return (
    <div className="bg-white text-ink font-sans min-h-screen">
      <Seo title={title} description={description} />

      {/* HERO SECTION */}
      <section className="border-b border-line bg-gradient-to-b from-brand-50 to-paper">
        <Container className="py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-800">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-800" />
              PANDUAN & STRATEGI DIGITAL
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Insight & Artikel
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Catatan praktis dan pembacaan tren digital untuk membantu keputusan pemasaran Anda.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button to={links.portofolio} kind="secondary">
                Lihat Portofolio
              </Button>
              <Button href={links.konsultasi} kind="primary">
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FILTER KATEGORI */}
      <Section divider>
        <SectionHead
          title="Filter Kategori"
          subtitle="Pilih kategori untuk melihat artikel yang relevan dengan fokus bisnis Anda."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {insightCategories.map((item) => (
            <FilterChip
              key={item.key}
              active={active === item.key}
              onClick={() => setActive(item.key)}
            >
              <IconCircle name={item.icon} size="sm" />
              {item.label}
            </FilterChip>
          ))}
        </div>
      </Section>

      {/* DAFTAR ARTIKEL */}
      <Section divider className="bg-block/60">
        <SectionHead
          title="Artikel Terbaru"
          subtitle="Pilihan artikel dari Gaharu Creative untuk membantu strategi dan eksekusi digital Anda."
        />
        <p aria-live="polite" className="mt-4 text-center text-xs font-semibold text-muted uppercase tracking-wider">
          Menampilkan {visible.length} dari {posts.length} artikel
        </p>

        {visible.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-field bg-white p-8 text-center shadow-sm">
            <p className="text-base font-bold text-ink">Belum ada artikel di kategori ini</p>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Naskah untuk kategori ini sedang dalam tahap penyusunan. Silakan cek kategori lainnya.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:border-brand-600"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Tag>{post.tag || post.category}</Tag>
                    <span className="text-[11px] font-medium text-subtle">{post.dateLabel || "2026"}</span>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-line aspect-[16/9] bg-chip mb-4">
                    <img
                      src={post.image || "/Beranda-Visual.webp"}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group- transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-base font-bold leading-snug text-ink group-hover:text-button transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/insight/${post.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-block py-2.5 px-4 text-xs font-bold text-muted transition-all hover:border-button hover:bg-button hover:text-white"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {insightsDraftOnly ? (
          <p className="mt-8 text-center text-xs text-subtle">
            Daftar artikel diperbarui saat naskahnya selesai ditulis.
          </p>
        ) : null}
      </Section>

      {/* FORM BERLANGGANAN */}
      <Section divider>
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight text-ink">Berlangganan Insight Terbaru</h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
            Kirim alamat email Anda, kami catat untuk pengiriman artikel berikutnya lewat WhatsApp atau email.
          </p>

          <form className="mt-6 space-y-3" onSubmit={submit} noValidate>
            <div>
              <label htmlFor="email-insight" className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                Email Anda
              </label>
              <input
                id="email-insight"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="nama@perusahaan.com"
                className="w-full rounded-xl border border-field bg-white px-4 py-3 text-sm text-ink placeholder:text-subtle focus:border-button focus:outline-none focus:ring-1 focus:ring-button"
              />
            </div>

            {status === "invalid" && (
              <p role="alert" className="text-xs font-bold text-danger-600">
                Format email belum benar. Periksa kembali tanda @ dan domain email Anda.
              </p>
            )}

            {status === "sent" && (
              <p role="status" className="text-xs font-bold text-brand-700">
                Permintaan Anda diteruskan ke WhatsApp kami. Balas pesannya supaya email {email} masuk daftar kiriman.
              </p>
            )}

            <p className="text-xs leading-relaxed text-muted">
              Tombol di bawah membuka WhatsApp dengan pesan berisi alamat email Anda. Tekan kirim
              di WhatsApp supaya permintaan benar-benar sampai ke tim kami.
            </p>

            <Button kind="primary" className="w-full" type="submit">
              Berlangganan Sekarang
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-subtle">
            <Icon name="shield" className="h-4 w-4 text-button" />
            Kami menjamin kerahasiaan email Anda tanpa spam.
          </p>
        </div>
      </Section>
    </div>
  );
}