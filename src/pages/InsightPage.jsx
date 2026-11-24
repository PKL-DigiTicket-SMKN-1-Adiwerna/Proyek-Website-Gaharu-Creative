import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import {
  Button,
  Container,
  FilterChip,
  IconCircle,
  Section,
  Kepala,
  Tag,
} from "../components/ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { links } from "../data/site.js";
import { insightCategories as staticCategories, posts as staticPosts, insightsDraftOnly } from "../data/insights.js";
import { api, adaptArticleCategories, adaptArticles } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";
import { linksFor, useSite, waHrefDenganPesan } from "../lib/useSite.js";
import { useT } from "../lib/i18n.js";

const title = "Insight: Artikel Strategi Digital";
const description = "Artikel, panduan, dan studi kasus seputar strategi pertumbuhan digital dari Gaharu Creative.";

export default function InsightPage() {
  const t = useT();
  /* Nomor WhatsApp untuk buletin dan tombol konsultasi ikut setelan situs. */
  const situs = useSite();
  const wa = linksFor(situs);
  const { data: apiCats } = useApi(() => api.articleCategories().then((j) => ({ data: adaptArticleCategories(j.data) })), staticCategories);
  const { data: apiPosts } = useApi(() => api.articles().then((j) => ({ data: adaptArticles(j.data) })), staticPosts);
  const insightCategories = (apiCats && apiCats.length ? apiCats : staticCategories);
  const posts = (apiPosts && apiPosts.length ? apiPosts : staticPosts);
  const [active, setActive] = useState("semua");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const visible = useMemo(
    () => (active === "semua" ? posts : posts.filter((post) => post.category === active)),
    [active, posts]
  );

  /* Sama seperti halaman Portofolio: gulirkan daftar artikel ke layar supaya
   * perubahan filter terlihat, terutama di HP. */
  const pilihKategori = (key) => {
    setActive(key);
    const el = document.getElementById("daftar-artikel");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
    window.open(waHrefDenganPesan(situs, pesan), "_blank", "noopener");
    setStatus("sent");
  };

  return (
    <div className="bg-paper text-ink font-sans min-h-screen">
      <Seo title={title} description={description} />

      {/* HERO SECTION */}
      <section className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-700">
              {t("Panduan & strategi digital")}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {t("Insight & Artikel")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {t("Catatan praktis dan pembacaan tren digital untuk membantu keputusan pemasaran Anda.")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={links.portofolio} kind="secondary">
                {t("Lihat Portofolio")}
              </Button>
              <Button href={wa.konsultasi} kind="primary">
                {t("Konsultasi Gratis")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FILTER KATEGORI */}
      <Section divider>
        <Kepala
          judul={t("Filter Kategori")}
          catatan={t("Pilih kategori untuk melihat artikel yang relevan dengan fokus bisnis Anda.")}
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {insightCategories.map((item) => (
            <FilterChip
              key={item.key}
              active={active === item.key}
              onClick={() => pilihKategori(item.key)}
            >
              <IconCircle name={item.icon} size="sm" />
              {t(item.label)}
            </FilterChip>
          ))}
        </div>
      </Section>

      {/* DAFTAR ARTIKEL */}
      <Section id="daftar-artikel" divider className="bg-block/60">
        <Kepala
          judul={t("Artikel Terbaru")}
          catatan={t("Pilihan artikel dari Gaharu Creative untuk membantu strategi dan eksekusi digital Anda.")}
        />
        <p aria-live="polite" className="mx-auto mt-4 max-w-3xl text-center text-xs font-semibold text-muted uppercase tracking-wider">
          {t("Menampilkan {n} dari {m} artikel").replace("{n}", visible.length).replace("{m}", posts.length)}
        </p>

        {visible.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-field bg-paper p-8 text-center shadow-sm">
            <p className="text-base font-bold text-ink">{t("Belum ada artikel di kategori ini")}</p>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              {t("Naskah untuk kategori ini sedang dalam tahap penyusunan. Silakan cek kategori lainnya.")}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <Link
                key={post.slug}
                to={`/insight/${post.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-paper p-5 transition-all duration-300 hover:border-brand-600"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Tag>{t(post.tag || post.category)}</Tag>
                    <span className="text-[11px] font-medium text-subtle">{post.dateLabel || "2026"}</span>
                  </div>

                  <div className="mb-4 aspect-[16/9] overflow-hidden rounded-xl border border-line bg-chip">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        width={post.imageWidth}
                        height={post.imageHeight}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center bg-mint"
                      >
                        <Icon name="doc" className="h-8 w-8 text-brand-700" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-base font-bold leading-snug text-ink group-hover:text-button transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6">
                  {/* Kartu seluruhnya sudah berupa tautan; ini hanya penanda visual. */}
                  <span
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-block py-2.5 px-4 text-xs font-bold text-muted transition-all group-hover:border-button group-hover:bg-button group-hover:text-white"
                  >
                    {t("Baca Selengkapnya")} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {insightsDraftOnly ? (
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-subtle">
            {t("Daftar artikel diperbarui saat naskahnya selesai ditulis.")}
          </p>
        ) : null}
      </Section>

      {/* FORM BERLANGGANAN */}
      <Section divider>
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-paper p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight text-ink">{t("Berlangganan Insight Terbaru")}</h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
            {t("Kirim alamat email Anda, kami catat untuk pengiriman artikel berikutnya lewat WhatsApp atau email.")}
          </p>

          <form className="mt-6 space-y-3" onSubmit={submit} noValidate>
            <div>
              <label htmlFor="email-insight" className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                {t("Email Anda")}
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
                placeholder={t("nama@perusahaan.com")}
                className="w-full rounded-xl border border-field bg-paper px-4 py-3 text-sm text-ink placeholder:text-subtle focus:border-button focus:outline-none focus:ring-1 focus:ring-button"
              />
            </div>

            {status === "invalid" && (
              <p role="alert" className="text-xs font-bold text-danger-600">
                {t("Format email belum benar. Periksa kembali tanda @ dan domain email Anda.")}
              </p>
            )}

            {status === "sent" && (
              <p role="status" className="text-xs font-bold text-brand-700">
                {t("Permintaan Anda diteruskan ke WhatsApp kami. Balas pesannya supaya email {email} masuk daftar kiriman.").replace("{email}", email)}
              </p>
            )}

            <p className="text-xs leading-relaxed text-muted">
              {t("Tombol di bawah membuka WhatsApp dengan pesan berisi alamat email Anda. Tekan kirim di WhatsApp supaya permintaan benar-benar sampai ke tim kami.")}
            </p>

            <Button kind="primary" className="w-full" type="submit">
              {t("Berlangganan Sekarang")}
            </Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-subtle">
            <Icon name="shield" className="h-4 w-4 text-button" />
            {t("Kami menjamin kerahasiaan email Anda tanpa spam.")}
          </p>
        </div>
      </Section>
    </div>
  );
}