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
import { Icon } from "../components/Icons.jsx";
import { links } from "../data/site.js";
import { insightCategories, posts, insightsDraftOnly } from "../data/insights.js";

const title = "Insight";
const description = "Artikel seputar pertumbuhan digital dari Gaharu Creative.";

export default function InsightPage() {
  const [active, setActive] = useState("semua");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const visible = useMemo(
    () => (active === "semua" ? posts : posts.filter((post) => post.category === active)),
    [active]
  );

  /* Berlangganan belum punya layanan email. Form tetap bisa diuji, tapi
   * tidak mengirim ke mana-mana dan bilang begitu di layarnya. */
  const submit = (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("invalid");
      return;
    }
    setStatus("pending");
  };

  return (
    <>
      <Seo title={title} description={description} />

      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Insight</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Artikel terbaru seputar pertumbuhan digital.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={links.portofolio} kind="secondary">
                Lihat Portofolio
              </Button>
              <Button to={links.konsultasi} kind="primary">
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section divider>
        <SectionHead
          title="Filter Kategori"
          subtitle="Pilih kategori untuk melihat artikel yang relevan."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {insightCategories.map((item) => (
            <FilterChip key={item.key} active={active === item.key} onClick={() => setActive(item.key)}>
              <IconCircle name={item.icon} size="sm" />
              {item.label}
            </FilterChip>
          ))}
        </div>
      </Section>

      <Section divider className="bg-block">
        <SectionHead
          title="Artikel Unggulan"
          subtitle="Pilihan artikel dari Gaharu Creative untuk membantu strategi dan eksekusi digital Anda."
        />
        <p aria-live="polite" className="mt-6 text-center text-sm text-muted">
          Menampilkan {visible.length} dari {posts.length} artikel.
        </p>

        {visible.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-lg border border-dashed border-line bg-paper p-6 text-center">
            <p className="text-base font-bold text-ink">Belum ada artikel di kategori ini</p>
            <p className="mt-2 text-sm text-muted">
              Naskah untuk kategori ini belum masuk antrean tulis. Kategori lain sudah punya bahan.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {visible.map((post) => (
              <article key={post.slug} className="rounded-lg border border-line bg-paper p-5">
                <Tag>{post.tag}</Tag>
                <ImageBlock label="Sampul artikel" ratio="aspect-[16/9]" className="mt-4" />
                <h3 className="mt-4 text-base font-bold leading-snug text-ink">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted">{post.dateLabel}</p>
                <Button
                  href={links.mail}
                  kind="secondary"
                  className="mt-5 w-full"
                  title="Naskah belum ditulis, kirim email kalau ingin minta ringkasannya."
                >
                  Baca Selengkapnya
                </Button>
              </article>
            ))}
          </div>
        )}

        {insightsDraftOnly ? (
          <p data-placeholder="Judul dari wireframe" className="mt-8 text-center text-sm text-muted">
            Judul di atas masih outline dari wireframe, naskah belum ditulis.
          </p>
        ) : null}
      </Section>

      <Section divider>
        <div className="mx-auto max-w-xl rounded-lg border border-line bg-paper p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-ink">Berlangganan Insight Terbaru</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Dapatkan artikel, panduan, dan update strategi digital langsung ke email Anda.
          </p>

          <form className="mt-6 space-y-3" onSubmit={submit} noValidate>
            <label htmlFor="email-insight" className="block text-sm font-semibold text-ink">
              Email
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
              aria-describedby="email-insight-bantu"
              className="min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink placeholder:text-muted"
            />
            <p id="email-insight-bantu" className="text-xs text-muted">
              Contoh: nama@perusahaan.com
            </p>
            {status === "invalid" ? (
              <p role="alert" className="text-sm font-semibold text-ink">
                Format email belum benar. Periksa tanda @ dan nama domain.
              </p>
            ) : null}
            {status === "pending" ? (
              <p role="status" className="text-sm font-semibold text-ink">
                Layanan berlangganan belum aktif. Alamat {email} belum terkirim ke daftar mana pun.
              </p>
            ) : null}
            <Button kind="primary" className="w-full" type="submit">
              Berlangganan
            </Button>
            <p className="text-xs text-muted">
              Form ini terhubung ke penyedia email setelah tim memilih layanannya.
            </p>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted">
            <Icon name="shield" className="h-4 w-4" />
            Kami tidak membagikan alamat email ke pihak lain.
          </p>
        </div>
      </Section>
    </>
  );
}
