import { Section, Kepala, Tag } from "./ui.jsx";
import { rekamJejak, penghargaan, MITRA_LOGOS } from "../data/klien.js";
import { api, adaptClients } from "../lib/api.js";
import { useApi } from "../lib/useApi.js";

/* Section rekam jejak: kalimat pengantar, dinding logo mitra, dan daftar
 * penghargaan. Dipakai di Beranda dan Tentang supaya narasinya konsisten.
 *
 * Logo dibaca dari backend (/public/clients) dan jatuh ke MITRA_LOGOS kalau
 * backend tidak menjawab. Dimensi diambil dari berkas statis lewat peta STATIS
 * supaya tinggi sel tidak melompat saat logo muncul (hindari CLS).
 */
const STATIS = new Map(MITRA_LOGOS.map((m) => [m.slug, m]));

const KELOMPOK = [
  { key: "pemerintah", label: "Kementerian dan Lembaga Pemerintah" },
  { key: "swasta", label: "Perusahaan Swasta dan BUMN" },
];

function LogoSel({ item }) {
  const acuan = STATIS.get(item.slug);
  const lebar = item.width || (acuan ? acuan.width : undefined);
  const tinggi = item.height || (acuan ? acuan.height : undefined);
  return (
    <li className="flex min-h-[96px] items-center justify-center bg-paper p-4 sm:min-h-[112px] sm:p-5">
      <img
        src={item.logo}
        alt={item.alt || item.name}
        title={item.name}
        width={lebar}
        height={tinggi}
        loading="lazy"
        decoding="async"
        className="h-auto max-h-10 w-auto max-w-[78%] object-contain sm:max-h-12"
      />
    </li>
  );
}

export default function RekamJejak({ withHead = true }) {
  const { data } = useApi(
    () => api.clients().then((json) => ({ data: adaptClients(json.data) })),
    MITRA_LOGOS,
  );
  const logos = Array.isArray(data) && data.length > 0 ? data : MITRA_LOGOS;

  return (
    <Section divider className="bg-lav-50">
      {withHead ? (
        <Kepala
          nomor="Rekam jejak"
          judul={rekamJejak.title}
          catatan="Daftar institusi yang telah berkolaborasi dengan kami."
        />
      ) : null}

      <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-line bg-paper p-6 sm:p-8">
        <Tag>Mitra Strategis</Tag>
        <p className="mt-4 text-base leading-relaxed text-muted">{rekamJejak.intro}</p>
      </div>

      <div className="mt-10 space-y-10">
        {KELOMPOK.map((grup) => {
          const isi = logos.filter((m) => (m.category || "pemerintah") === grup.key);
          if (isi.length === 0) return null;
          return (
            <div key={grup.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold tracking-tight text-ink sm:text-lg">{grup.label}</h3>
                <p className="text-sm text-muted">{isi.length} institusi</p>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {isi.map((item) => (
                  <LogoSel key={item.slug || item.name} item={item} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
          Penghargaan dan Rekognisi Internasional
        </h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {penghargaan.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-line bg-paper p-4 text-sm font-semibold leading-relaxed text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}