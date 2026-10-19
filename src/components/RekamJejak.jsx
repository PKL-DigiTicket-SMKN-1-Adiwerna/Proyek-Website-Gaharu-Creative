import { Section, Kepala, Tag } from "./ui.jsx";
import { Icon } from "../components/Icons.jsx";
import { rekamJejak, mitraGroups, penghargaan } from "../data/klien.js";

/* Section rekam jejak: kalimat pengantar, daftar mitra per kelompok, dan daftar
 * penghargaan. Dipakai di Beranda dan Tentang supaya narasinya konsisten.
 */
export default function RekamJejak({ withHead = true }) {
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

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {mitraGroups.map((group) => (
          <article key={group.key} className="rounded-lg border border-line bg-paper p-6">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fill text-ink"
              >
                <Icon name={group.icon} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-ink">{group.label}</h3>
                <p className="mt-1 text-sm text-muted">{group.items.length} institusi</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 border-t border-line pt-5">
              {group.items.map((name) => (
                <li key={name} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-button" />
                  <span className="min-w-0">{name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
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