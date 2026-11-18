// Potongan UI yang dipakai bersama form konten admin supaya kolom, pratinjau
// kartu, dan pesan simpan terlihat sama di halaman Layanan, Artikel, Portofolio.
import { IconCircle } from "../../components/ui.jsx";

export const INPUT =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700";
export const BTN_UTAMA =
  "rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 disabled:opacity-60";
export const BTN_KEDUA =
  "rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50";

export function slugify(teks = "") {
  return String(teks)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function Field({ label, wajib = false, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
        {wajib ? <span className="text-red-600">*</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function Pesan({ jenis = "sukses", children }) {
  if (!children) return null;
  const gaya =
    jenis === "gagal"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";
  return (
    <div className={`rounded-lg border px-3 py-2 text-sm ${gaya}`} role={jenis === "gagal" ? "alert" : "status"}>
      {children}
    </div>
  );
}

export function StatusPill({ terbit }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
        terbit
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-100 text-slate-600"
      }`}
    >
      {terbit ? "Terbit" : "Draf"}
    </span>
  );
}

/* Tiruan kartu publik: dipakai supaya penulis melihat hasil akhir sambil mengisi form. */
export function PreviewKartu({ gambar, ikon, tag, judul, ringkasan, meta }) {
  const label = tag ? (
    <span className="inline-block rounded-full bg-tag px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-tag-ink">
      {tag}
    </span>
  ) : null;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {ikon ? (
        <div className="flex items-center gap-3 px-4 pt-4">
          <IconCircle name={ikon} />
          {label}
        </div>
      ) : gambar ? (
        <img src={gambar} alt="" className="aspect-[16/10] w-full object-cover" />
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-fill text-xs text-subtle">
          Belum ada gambar
        </div>
      )}
      <div className="space-y-1.5 p-4">
        {ikon ? null : label}
        <h3 className="text-base font-semibold leading-snug text-ink">{judul || "Judul belum diisi"}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {ringkasan || "Ringkasan belum diisi."}
        </p>
        {meta ? <p className="pt-1 text-xs text-subtle">{meta}</p> : null}
      </div>
    </div>
  );
}