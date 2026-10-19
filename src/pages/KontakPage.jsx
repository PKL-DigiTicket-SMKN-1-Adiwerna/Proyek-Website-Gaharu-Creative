import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import {
  Button,
  IconCircle,
  ImageBlock,
  Section,
  Kepala,
  Tag,
} from "../components/ui.jsx";
import { site, links, waBase } from "../data/site.js";
import { kontakInfo, inquiryServices as staticInquiryServices } from "../data/cta.js";
import { api } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";

const title = "Kontak";
const description = "Hubungi Gaharu Creative lewat WhatsApp resmi atau formulir konsultasi. Lihat juga kebijakan privasi kami."

/* kontak = kanal balasan calon klien. Audit staging 12 Okt 2026 (temuan C02: tanpa
 * kolom ini, inquiry tidak bisa ditindaklanjuti kalau nomor tidak ikut terkirim.
 */
const emptyForm = { nama: "", perusahaan: "", kontak: "", layanan: "", pesan: "" };

/* Tanpa hero, langsung dari section Hubungi Kami. Form di kiri, kartu Area
 * Kontak di kanan, lalu Informasi Kontak dan Peta.
 */
export default function KontakPage() {
  const { data: apiContact } = useApi(() => api.contact(), null);
  const inquiryServices = (apiContact && Array.isArray(apiContact.serviceOptions) && apiContact.serviceOptions.length)
    ? apiContact.serviceOptions.map((s) => s.label || s.value)
    : staticInquiryServices;

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");

  const field = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
    if (state === "error") setState("idle");
  };

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.nama.trim()) next.nama = "Nama lengkap belum diisi.";
    if (!form.kontak.trim()) next.kontak = "Nomor WhatsApp atau email belum diisi.";
    if (!form.layanan) next.layanan = "Pilih salah satu layanan.";
    if (!form.pesan.trim()) next.pesan = "Ceritakan singkat kebutuhan proyek Anda.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      setState("error");
      return;
    }

    setErrors({});
    setState("sending");

    const idempotencyKey = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
    const serviceSlug = (apiContact && Array.isArray(apiContact.serviceOptions))
      ? (apiContact.serviceOptions.find((s) => (s.label || s.value) === form.layanan)?.value || form.layanan)
      : form.layanan;

    const payload = {
      fullName: form.nama.trim(),
      company: form.perusahaan.trim() || null,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.kontak.trim()) ? form.kontak.trim() : null,
      phone: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.kontak.trim()) ? null : form.kontak.trim(),
      serviceInterest: serviceSlug,
      message: form.pesan.trim(),
      locale: "id",
      consent: true,
      sourcePage: "/kontak",
    };

    try {
      const json = await api.submitInquiry(payload, idempotencyKey);
      if (json && json.data) {
        setState("sent");
        setForm(emptyForm);
        return;
      }
    } catch {
      // backend tidak tersedia: lanjut ke WhatsApp
    }

    const isi = [
      "Halo Gaharu Creative, saya ingin konsultasi.",
      "",
      `Nama: ${form.nama.trim()}`,
      form.perusahaan.trim() ? `Perusahaan: ${form.perusahaan.trim()}` : null,
      `Kontak balasan: ${form.kontak.trim()}`,
      form.layanan ? `Layanan: ${form.layanan}` : null,
      "",
      form.pesan.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.open(`${waBase}?text=${encodeURIComponent(isi)}`, "_blank", "noopener");
    setState("sent");
    setForm(emptyForm);
  };

  const infoHref = (kind) => (kind === "whatsapp" ? links.whatsapp : kind === "email" ? links.mail : null);

  return (
    <>
      <Seo title={title} description={description} />

      <Section id="hubungi" className="border-b border-brand-100 bg-paper">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-700">
            Hubungi kami
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Hubungi Kami
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Isi form di bawah atau hubungi lewat kanal yang tersedia. Tim kami merespons di hari kerja.
          </p>
        </div>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div
            id="form-kontak"
            className="scroll-mt-24 rounded-lg border border-line bg-paper p-6 sm:p-8"
          >
            <Kepala
              nomor="Form"
              judul="Form Kontak"
              catatan="Isi data berikut, lalu pesan diteruskan ke WhatsApp tim kami."
            />

            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={submit} noValidate>
              <div>
                <label htmlFor="nama" className="block text-sm font-semibold text-ink">
                  Nama Lengkap <span aria-hidden="true">*</span>
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
                  placeholder="Nama perusahaan / institusi"
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink placeholder:text-muted"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="kontak" className="block text-sm font-semibold text-ink">
                  WhatsApp atau Email untuk Balasan <span aria-hidden="true">*</span>
                </label>
                <input
                  id="kontak"
                  name="kontak"
                  type="text"
                  required
                  autoComplete="tel"
                  value={form.kontak}
                  onChange={(e) => field("kontak", e.target.value)}
                  placeholder="Contoh: 08xx xxxx xxxx atau nama@email.com"
                  aria-invalid={errors.kontak ? "true" : undefined}
                  aria-describedby={errors.kontak ? "kontak-error" : "kontak-help"}
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink placeholder:text-muted"
                />
                <p id="kontak-help" className="mt-2 text-xs text-muted">
                  Dipakai hanya untuk membalas kebutuhan proyek Anda.
                </p>
                {errors.kontak ? (
                  <p id="kontak-error" className="mt-2 text-sm font-semibold text-ink">
                    {errors.kontak}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="layanan" className="block text-sm font-semibold text-ink">
                  Layanan Digital <span aria-hidden="true">*</span>
                </label>
                <select
                  id="layanan"
                  name="layanan"
                  required
                  value={form.layanan}
                  onChange={(e) => field("layanan", e.target.value)}
                  aria-invalid={errors.layanan ? "true" : undefined}
                  aria-describedby={errors.layanan ? "layanan-error" : "layanan-help"}
                  className="mt-2 min-h-11 w-full rounded-md border border-field bg-paper px-4 py-3 text-base text-ink"
                >
                  <option value="">Pilih layanan yang dibutuhkan</option>
                  {inquiryServices.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <p id="layanan-help" className="mt-2 text-xs text-muted">
                  Pilihan diambil dari lima layanan resmi kami. Pilih &quot;Belum tahu&quot; kalau
                  Anda ingin kami merekomendasikan lebih dulu.
                </p>
                {errors.layanan ? (
                  <p id="layanan-error" className="mt-2 text-sm font-semibold text-ink">
                    {errors.layanan}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="pesan" className="block text-sm font-semibold text-ink">
                  Pesan <span aria-hidden="true">*</span>
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

              {state === "sent" ? (
                <p
                  role="status"
                  className="rounded-md border border-dashed border-line bg-block p-4 text-sm leading-relaxed text-ink sm:col-span-2"
                >
                  Pesan sudah disiapkan di tab WhatsApp. Kalau tab tidak terbuka, hubungi langsung
                  nomor {site.waDisplay}.
                </p>
              ) : null}

              <div className="rounded-md border border-line bg-block p-4 sm:col-span-2">
                <p className="text-sm font-semibold text-ink">Alur pengiriman form ini</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-muted">
                  <li>Isi kolom wajib di atas, lalu tekan tombol kirim di bawah.</li>
                  <li>
                    WhatsApp terbuka di tab baru dengan isi pesan yang sudah tersusun dari isian Anda.
                  </li>
                  <li>
                    Tekan kirim di WhatsApp supaya pesan benar-benar masuk ke tim kami. Situs ini
                    tidak menyimpan isian form di server, jadi tidak ada pesan yang terkirim sendiri.
                  </li>
                </ol>
              </div>

              <div className="flex flex-col items-center gap-3 sm:col-span-2">
                <Button kind="primary" type="submit" className="w-full sm:w-auto">
                  Kirim lewat WhatsApp
                </Button>
                <p className="text-xs leading-relaxed text-muted">
                  Dengan mengirim pesan, Anda setuju data isian ini dipakai untuk menanggapi
                  permintaan Anda. Detailnya ada di{" "}
                  <Link to="/kebijakan-privasi" className="font-semibold text-ink underline decoration-line underline-offset-2 hover:decoration-brand-600">
                    Kebijakan Privasi
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>

          <aside className="rounded-lg border border-line bg-paper p-6">
            <Tag>Bentuk komunikasi cepat</Tag>
            <h2 className="mt-4 text-lg font-bold text-ink">Area Kontak</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Cara tercepat lewat WhatsApp. Isi form di sebelah kiri, atau chat langsung ke nomor
              resmi kami.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">Respon hari kerja</p>
            <div className="mt-5 space-y-3 border-t border-line pt-5 text-sm text-muted">
              <p>{site.hours}</p>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {site.waDisplay}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="informasi-kontak" divider className="bg-block">
        <Kepala
          nomor="02 / Kontak"
          judul="Informasi Kontak"
          catatan="Hubungi kami melalui kanal berikut atau datang langsung sesuai jam operasional."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kontakInfo.map((item) => (
            <article key={item.title} className="rounded-lg border border-line bg-paper p-5">
              <IconCircle name={item.icon} className="mb-4" />
              <h2 className="text-sm font-bold text-ink">{item.title}</h2>
              {item.verified && item.href ? (
                <a
                  href={infoHref(item.href)}
                  {...(item.href === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-2 inline-flex min-h-6 items-center text-sm text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.verified ? item.value : "Belum tersedia"}
                </p>
              )}
              {item.note ? <p className="mt-2 text-xs text-muted">{item.note}</p> : null}
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Baru WhatsApp dan jam operasional yang sudah resmi dari perusahaan. Email dan alamat
          kantor belum dikonfirmasi, jadi sengaja tidak dicantumkan supaya tidak ada data contoh
          yang tayang.
        </p>
      </Section>

      <Section id="peta" divider>
        <Kepala
          nomor="03 / Peta"
          judul="Peta"
          catatan="Lokasi kantor dan area layanan."
        />
        <div className="mt-10">
          <ImageBlock
            label="Peta Google Maps"
            hint="Placeholder: alamat kantor belum dikonfirmasi, jadi peta belum ditanam."
            ratio="aspect-[16/7]"
          />
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          Kami melayani klien di seluruh Indonesia; pertemuan bisa lewat panggilan video atau
          kunjungan sesuai kesepakatan.
        </p>
      </Section>
    </>
  );
}
