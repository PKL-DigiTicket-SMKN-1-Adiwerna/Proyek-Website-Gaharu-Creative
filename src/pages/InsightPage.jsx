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
import { links } from "../data/site.js";
import { insightCategories, posts, insightsDraftOnly } from "../data/insights.js";

const title = "Insight – Gaharu Creative";
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
    setStatus("success");
  };

  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen">
      <Seo title={title} description={description} />

      {/* HERO SECTION */}
      <section className="border-b border-emerald-200/60 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white">
        <Container className="py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/60 text-[#007A55] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#007A55] animate-pulse" />
              PANDUAN & STRATEGI DIGITAL
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              Insight & Artikel
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Pikiran, panduan praktis, dan tren strategi digital marketing terkini untuk melipatgandakan dampak bisnis Anda.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button to={links.portofolio} kind="secondary" className="rounded-full">
                Lihat Portofolio
              </Button>
              <Button href={links.konsultasi} kind="primary" className="rounded-full bg-[#007A55] hover:bg-emerald-800">
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
      <Section divider className="bg-slate-50/60">
        <SectionHead
          title="Artikel Terbaru"
          subtitle="Pilihan artikel dari Gaharu Creative untuk membantu strategi dan eksekusi digital Anda."
        />
        <p aria-live="polite" className="mt-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Menampilkan {visible.length} dari {posts.length} artikel
        </p>

        {visible.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-bold text-slate-900">Belum ada artikel di kategori ini</p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Naskah untuk kategori ini sedang dalam tahap penyusunan. Silakan cek kategori lainnya.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Tag>{post.tag || post.category}</Tag>
                    <span className="text-[11px] font-medium text-slate-400">{post.dateLabel || "2026"}</span>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-100 aspect-[16/9] bg-slate-100 mb-4">
                    <img
                      src={post.image || "/Beranda-Visual.webp"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-base font-bold leading-snug text-slate-900 group-hover:text-[#007A55] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/insight/${post.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-bold text-slate-700 transition-all hover:border-[#007A55] hover:bg-[#007A55] hover:text-white"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {insightsDraftOnly ? (
          <p className="mt-8 text-center text-xs text-slate-400">
            Daftar artikel terus diperbarui setiap minggu.
          </p>
        ) : null}
      </Section>

      {/* FORM BERLANGGANAN */}
      <Section divider>
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Berlangganan Insight Terbaru</h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
            Dapatkan artikel, panduan, dan update strategi digital teruji langsung ke email Anda.
          </p>

          <form className="mt-6 space-y-3" onSubmit={submit} noValidate>
            <div>
              <label htmlFor="email-insight" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
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
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#007A55] focus:outline-none focus:ring-1 focus:ring-[#007A55]"
              />
            </div>

            {status === "invalid" && (
              <p role="alert" className="text-xs font-bold text-red-600">
                Format email belum benar. Periksa kembali tanda @ dan domain email Anda.
              </p>
            )}

            {status === "success" && (
              <p role="status" className="text-xs font-bold text-[#007A55]">
                Terima kasih! Email {email} berhasil terdaftar dalam antrean buletin kami.
              </p>
            )}

            <Button kind="primary" className="w-full bg-[#007A55] hover:bg-emerald-800 rounded-xl" type="submit">
              Berlangganan Sekarang
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Icon name="shield" className="h-4 w-4 text-[#007A55]" />
            Kami menjamin kerahasiaan email Anda tanpa spam.
          </p>
        </div>
      </Section>
    </div>
  );
}