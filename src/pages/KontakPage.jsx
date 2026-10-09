import { useState } from "react";
import { Seo } from "../components/Seo.jsx";
import {
  Button,
  Container,
  IconCircle,
  ImageBlock,
  Section,
  SectionHead,
  Tag,
} from "../components/ui.jsx";
import { site, links } from "../data/site.js";
import { kontakInfo, inquiryServices } from "../data/cta.js";

const title = "Kontak";
const description = "Hubungi Gaharu Creative untuk konsultasi gratis, penawaran, atau diskusi kebutuhan.";

const emptyForm = { nama: "", perusahaan: "", layanan: "", pesan: "" };

export default function KontakPage() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");

  const field = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
    if (state === "error") setState("idle");
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.nama.trim()) next.nama = "Nama lengkap belum diisi.";
    if (!form.pesan.trim()) next.pesan = "Ceritakan singkat kebutuhan proyek Anda.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setState("error");
      return;
    }

    setErrors({});
    // Kirim data menunggu penyedia form dipilih. Jangan mengaku terkirim.
    setState("blocked");
  };

  const infoHref = (kind) => (kind === "whatsapp" ? links.whatsapp : kind === "email" ? links.mail : null);

  return (
    <>
      <Seo title={title} description={description} />

      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{site.name}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Agency 360 untuk strategi, desain, dan pengembangan digital.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={links.layanan} kind="secondary">
                Lihat Layanan
              </Button>
              <Button to="#form-kontak" kind="primary">
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section id="hubungi" divider>
        <SectionHead
          label="Hubungi Kami"
          title="Mulai dari percakapan singkat"
          subtitle="Isi form di bawah atau hubungi lewat kanal yang tersedia. Tim kami merespons di hari kerja."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kontakInfo.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper p-5">
              <IconCircle name={item.icon} className="mb-4" />
              <h2 className="text-sm font-bold text-ink">{item.title}</h2>
              {item.href ? (
                <a
                  href={infoHref(item.href)}
                  {...(item.href === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-2 inline-block text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.value}</p>
              )}
            </article>
          ))}
        </div>
        <p data-placeholder="Nomor dan alamat masih contoh wireframe" className="mt-6 text-sm text-muted">
          WhatsApp dan alamat di atas adalah contoh dari wireframe. Data resmi menunggu konfirmasi
          klien sebelum halaman ini dibuka untuk publik.
        </p>
      </Section>

      <Section id="form-kontak" divider className="bg-block">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-lg border border-line bg-paper p-6 sm:p-8">
            <SectionHead
              align="left"
              title="Form Kontak"
              subtitle="Isi data berikut untuk menghubungi Gaharu Creative."
            />

            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={submit} noValidate>
              <div>
                <label htmlFor="nama" className="block text-sm font-semibold text-ink">
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.nama}
                  onChange={(e) => field("nama", e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  aria-invalid={errors.nama ? "true" : undefined}
                  aria-describedby={errors.nama ? "nama-error" : undefined}
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink placeholder:text-muted"
                />
                {errors.nama ? (
                  <p id="nama-error" className="mt-2 text-sm font-semibold text-ink">
                    {errors.nama}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="perusahaan" className="block text-sm font-semibold text-ink">
                  Perusahaan
                </label>
                <input
                  id="perusahaan"
                  name="perusahaan"
                  type="text"
                  autoComplete="organization"
                  value={form.perusahaan}
                  onChange={(e) => field("perusahaan", e.target.value)}
                  placeholder="Nama perusahaan atau institusi"
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink placeholder:text-muted"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="layanan" className="block text-sm font-semibold text-ink">
                  Layanan Digital
                </label>
                <select
                  id="layanan"
                  name="layanan"
                  value={form.layanan}
                  onChange={(e) => field("layanan", e.target.value)}
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink"
                >
                  <option value="">Pilih layanan yang dibutuhkan</option>
                  {inquiryServices.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-muted">
                  Mis. Branding, Website, UI/UX, Pengembangan, Digital Campaign.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="pesan" className="block text-sm font-semibold text-ink">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  required
                  rows={5}
                  value={form.pesan}
                  onChange={(e) => field("pesan", e.target.value)}
                  placeholder="Ceritakan kebutuhan proyek Anda (tujuan, timeline, dan detail singkat)"
                  aria-invalid={errors.pesan ? "true" : undefined}
                  aria-describedby={errors.pesan ? "pesan-error" : "pesan-help"}
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink placeholder:text-muted"
                />
                <p id="pesan-help" className="mt-2 text-xs text-muted">
                  Contoh: Ingin website company profile dengan fitur lead form, target rilis akhir
                  bulan.
                </p>
                {errors.pesan ? (
                  <p id="pesan-error" className="mt-2 text-sm font-semibold text-ink">
                    {errors.pesan}
                  </p>
                ) : null}
              </div>

              {state === "error" ? (
                <p role="alert" className="text-sm font-semibold text-ink sm:col-span-2">
                  Ada kolom yang belum lengkap. Perbaiki tulisan di atas kolom terkait, lalu kirim lagi.
                </p>
              ) : null}

              {state === "blocked" ? (
                <p
                  role="status"
                  data-placeholder="Pengiriman belum aktif"
                  className="rounded-md border border-dashed border-line bg-block p-4 text-sm leading-relaxed text-ink sm:col-span-2"
                >
                  Pemeriksaan kolom sudah lolos. Pesan Anda tersimpan di layar ini tapi belum terkirim,
                  karena layanan form belum dipasang dan nomor kontak resmi belum dikonfirmasi. Pakai
                  WhatsApp atau email di bagian atas halaman untuk mengirim sekarang.
                </p>
              ) : null}

              <div className="flex justify-center sm:col-span-2">
                <Button kind="primary" type="submit" className="w-full sm:w-auto">
                  Kirim Pesan
                </Button>
              </div>
            </form>
          </div>

          <aside className="rounded-lg border border-line bg-paper p-6">
            <Tag>Bentuk komunikasi cepat</Tag>
            <h2 className="mt-4 text-lg font-bold text-ink">Area Kontak</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Silakan isi form di sebelah kiri. Tim kami akan merespons secepatnya (hari kerja).
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">Respon hari kerja</p>
            <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm text-muted">
              <p>{site.hours}</p>
              <p>{site.address}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="peta" divider>
        <SectionHead
          title="Peta"
          subtitle="Lokasi kantor dan area layanan."
        />
        <div className="mt-10">
          <ImageBlock
            label="Peta Google Maps"
            hint="Placeholder: alamat kantor belum dikonfirmasi, jadi peta belum ditanam."
            ratio="aspect-[16/7]"
          />
        </div>
        <p className="mt-6 text-sm text-muted">
          Kami melayani klien di seluruh Indonesia; pertemuan bisa lewat panggilan video atau
          kunjungan sesuai kesepakatan.
        </p>
      </Section>
    </>
  );
}
