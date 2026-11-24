import { Seo } from "../components/Seo.jsx";
import { Button, Container, Section, Kepala } from "../components/ui.jsx";
import { site } from "../data/site.js";
import { linksFor, useSite } from "../lib/useSite.js";
import { useT } from "../lib/i18n.js";

/* Kebijakan privasi ditulis sebatas apa yang benar-benar terjadi di situs ini.
 * Tidak ada klaim tentang layanan yang belum dipakai: formulir kontak di situs
 * ini tidak mengirim data ke server, dan tidak ada skrip analitik pihak ketiga
 * yang dimuat. Kalau nanti ada layanan form atau analitik yang benar-benar
 * dipasang, bagian "Formulir kontak" dan "Cookie" di bawah harus diperbarui.
 *
 * Email resmi belum dikonfirmasi perusahaan, jadi kanal yang dicantumkan hanya
 * WhatsApp resmi. Jangan menaruh alamat email contoh di halaman ini.
 */

const PEMBARUAN = "18 Oktober 2026";

const BAGIAN = [
  {
    judul: "Data yang kami terima",
    isi: [
      "Saat Anda menghubungi kami, data yang sampai ke tim kami hanya data yang Anda kirim sendiri:",
      "Isi formulir kontak: nama, nama usaha bila diisi, nomor WhatsApp atau email untuk balasan, layanan yang diminati, dan uraian kebutuhan Anda.",
      "Pesan yang Anda kirim lewat WhatsApp resmi, termasuk lampiran yang Anda lampirkan sendiri.",
      "Catatan akses teknis di penyedia hosting: alamat IP, jenis perangkat, peramban, halaman yang dibuka, dan jam akses. Catatan ini dipakai untuk keamanan dan mengetahui gangguan, bukan untuk menilai orang per orang.",
    ],
    catatan:
      "Situs ini tidak meminta data sensitif seperti nomor rekening, nomor identitas, atau kata sandi. Sebaiknya jangan kirimkan data semacam itu lewat formulir maupun WhatsApp.",
  },
  {
    judul: "Untuk apa data itu dipakai",
    isi: [
      "Membalas pertanyaan Anda dan menyusun penawaran yang sesuai dengan kebutuhan yang Anda ceritakan.",
      "Menindaklanjuti kerja sama yang sedang atau pernah berjalan.",
      "Mengetahui pertanyaan yang sering muncul supaya isi situs bisa diperbaiki.",
    ],
    catatan:
      "Data Anda tidak dipakai untuk iklan pihak ketiga dan tidak dijual kepada pihak mana pun.",
  },
  {
    judul: "Formulir kontak dan WhatsApp",
    isi: [
      "Formulir di halaman Kontak tidak terhubung ke server kami. Ketika Anda menekan tombol kirim, situs hanya menyusun isi pesan dari isian Anda lalu membuka WhatsApp di tab baru.",
      "Pesan benar-benar sampai ke tim kami setelah Anda menekan tombol kirim di WhatsApp. Isian yang belum Anda kirim di WhatsApp tidak tersimpan di mana pun, termasuk di peramban Anda.",
    ],
    catatan:
      "Alur ini dipilih supaya tidak ada klaim terkirim palsu: pesan dianggap sampai hanya kalau Anda sendiri yang mengirimkannya di WhatsApp. Kalau Anda ingin mengirim lewat email, tunggu halaman ini diperbarui dengan email resmi yang sudah dikonfirmasi.",
  },
  {
    judul: "Cookie dan penyimpanan di peramban",
    isi: [
      "Situs ini tidak memasang cookie iklan, cookie pelacak, maupun skrip analitik pihak ketiga.",
      "Situs ini juga tidak menyimpan data pribadi Anda di penyimpanan peramban.",
    ],
    catatan:
      "WhatsApp adalah layanan pihak ketiga. Setelah percakapan berpindah ke WhatsApp, kebijakan privasi aplikasi itu yang berlaku atas pesan Anda.",
  },
  {
    judul: "Siapa saja yang bisa melihat data Anda",
    isi: [
      "Tim Gaharu Creative yang menangani permintaan Anda.",
      "Penyedia hosting tempat situs ini dijalankan, yang menyimpan catatan akses server.",
      "Pihak berwenang, hanya bila ada kewajiban hukum yang mengharuskannya.",
    ],
    catatan:
      "Di luar tiga hal itu, data Anda tidak kami bagikan.",
  },
  {
    judul: "Berapa lama data disimpan",
    isi: [
      "Percakapan dan data kontak disimpan selama proses konsultasi atau kerja sama masih berjalan.",
      "Setelah tidak diperlukan lagi, datanya dihapus dari perangkat dan kanal kerja kami.",
    ],
    catatan:
      "Catatan akses di sisi hosting mengikuti retensi default penyedia layanan.",
  },
  {
    judul: "Hak Anda atas data sendiri",
    isi: [
      "Meminta salinan data yang kami simpan tentang Anda.",
      "Meminta perbaikan bila ada data yang salah.",
      "Meminta penghapusan data dan berhenti dihubungi.",
    ],
    catatan:
      "Sampaikan permintaan lewat WhatsApp resmi. Kami tanggapi di hari kerja sesuai jam layanan di halaman Kontak.",
  },
  {
    judul: "Perubahan kebijakan ini",
    isi: [
      "Isi halaman ini bisa berubah bila layanan situs berubah, misalnya ketika formulir mulai terhubung ke server atau ketika email resmi sudah dikonfirmasi.",
      "Setiap perubahan ditandai dengan tanggal pembaruan di awal halaman.",
    ],
    catatan: null,
  },
];

export default function KebijakanPrivasiPage() {
  const t = useT();
  /* Nomor WhatsApp yang tampil dan ditautkan ikut setelan situs. */
  const situs = useSite();
  const wa = linksFor(situs);
  return (
    <>
      <Seo
        title={t("Kebijakan Privasi")}
        description={`${t("Keterangan tentang data yang diterima")} ${site.name} ${t("lewat formulir kontak dan WhatsApp resmi, cara pemakaiannya, lama simpan, dan cara mengajukan hak Anda.")}`}
      />

      <Section className="border-b border-brand-100 bg-brand-50">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("Dokumen resmi")}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t("Kebijakan Privasi")}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {t("Halaman ini menjelaskan data apa yang kami terima dari pengunjung situs")}{" "}
              {site.name},{" "}
              {t("untuk apa data itu dipakai, berapa lama disimpan, dan bagaimana Anda mengajukan hak Anda. Ditulis sesuai apa yang benar-benar berjalan di situs ini, tanpa janji layanan yang belum kami pasang.")}
            </p>
            <p className="mt-4 text-sm text-muted">
              {t("Terakhir diperbarui:")} {t(PEMBARUAN)}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container className="py-14 sm:py-16">
          <Kepala
            nomor={t("Kebijakan")}
            judul={t("Hal yang perlu Anda ketahui sebelum menghubungi kami")}
            catatan={t("Isi kebijakan privasi situs Gaharu Creative.")}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {BAGIAN.map((bagian, index) => (
              <article
                key={bagian.judul}
                className="rounded-2xl border border-line bg-paper p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold text-ink sm:text-xl">
                  <span className="text-muted">{index + 1}. </span>
                  {t(bagian.judul)}
                </h2>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                  {bagian.isi.map((kalimat) => (
                    <li key={kalimat} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      <span>{t(kalimat)}</span>
                    </li>
                  ))}
                </ul>
                {bagian.catatan ? (
                  <p className="mt-4 rounded-md border border-dashed border-line bg-block p-4 text-sm leading-relaxed text-ink">
                    {t(bagian.catatan)}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-brand-50">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-paper p-6 sm:p-8">
            <h2 className="text-lg font-bold text-ink sm:text-xl">{t("Mengajukan permintaan atau pertanyaan")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {t("Satu-satunya kanal resmi yang sudah dikonfirmasi perusahaan adalah WhatsApp")}{" "}
              <span className="font-semibold text-ink">{situs.waDisplay || situs.waNumber}</span>
              {t(". Email dan alamat kantor belum dikonfirmasi, jadi sengaja tidak dicantumkan di sini.")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={wa.whatsapp}
                kind="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Hubungi via WhatsApp")}
              </Button>
              <Button to="/kontak" kind="secondary">
                {t("Halaman Kontak")}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
