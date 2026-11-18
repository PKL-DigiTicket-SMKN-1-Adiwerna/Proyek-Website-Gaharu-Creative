import { useEffect, useState } from "react";

// Harus sama dengan enum `inquiry_status` di Supabase.
export const STATUS_INQUIRY = [
  { value: "new", label: "Baru", warna: "border-brand-100 bg-brand-50 text-brand-800" },
  { value: "read", label: "Dibaca", warna: "border-slate-200 bg-slate-100 text-slate-600" },
  { value: "replied", label: "Dibalas", warna: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { value: "in_progress", label: "Diproses", warna: "border-amber-200 bg-amber-50 text-amber-700" },
  { value: "won", label: "Deal", warna: "border-emerald-300 bg-emerald-100 text-emerald-800" },
  { value: "lost", label: "Batal", warna: "border-rose-200 bg-rose-50 text-rose-700" },
  { value: "spam", label: "Spam", warna: "border-slate-300 bg-slate-200 text-slate-600" },
];

export function StatusPill({ status }) {
  const s = STATUS_INQUIRY.find((x) => x.value === status) || STATUS_INQUIRY[0];
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold ${s.warna}`}>
      {s.label}
    </span>
  );
}

const waktu = (iso) =>
  iso
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso))
    : "-";

/* Panel detail inquiry. Semua perubahan status dan catatan dikirim ke API lewat onUbah. */
export default function AdminInquiryDetail({ item, onUbah, onTutup, menyimpan }) {
  const [catatan, setCatatan] = useState(item.internal_notes || "");

  // Panel menutup seluruh layar: kunci scroll halaman di belakangnya supaya
  // tidak muncul dua scrollbar bersarang.
  useEffect(() => {
    const asal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = asal; };
  }, []);

  const namaDepan = (item.full_name || "").split(" ")[0] || "Bapak/Ibu";
  const template = [
    `Halo ${namaDepan},`,
    "",
    "Terima kasih sudah menghubungi Gaharu Creative. Kami sudah membaca pesan Anda dan akan membalas dengan detail dalam 1x24 jam kerja.",
    "",
    "---",
    `Pesan Anda (${item.reference_code || "-"}):`,
    `"${item.message || ""}"`,
  ].join("\n");

  const mailto = item.email
    ? `mailto:${item.email}?subject=${encodeURIComponent(`Balasan Gaharu Creative ${item.reference_code || ""}`)}&body=${encodeURIComponent(template)}`
    : "";
  const nomorWa = (item.phone || "").replace(/[^0-9]/g, "").replace(/^0/, "62");
  const waLink = nomorWa ? `https://wa.me/${nomorWa}?text=${encodeURIComponent(template)}` : "";

  const baris = [
    ["Email", item.email],
    ["Telepon", item.phone],
    ["Perusahaan", item.company],
    ["Layanan diminati", item.service_interest],
    ["Anggaran", item.budget_range],
    ["Halaman asal", item.source_page],
    ["Sumber", [item.utm_source, item.utm_medium, item.utm_campaign].filter(Boolean).join(" / ")],
    ["Bahasa", item.locale],
    ["Masuk", waktu(item.created_at)],
    ["Diperbarui", waktu(item.updated_at)],
  ].filter(([, v]) => v);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40" onClick={onTutup}>
      <div
        className="flex h-full w-full max-w-xl flex-col bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Detail inquiry ${item.reference_code || ""}`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{item.reference_code || "Tanpa kode"}</p>
            <h2 className="truncate text-lg font-bold text-slate-900">{item.full_name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <StatusPill status={item.status} />
              <span>{waktu(item.created_at)}</span>
            </div>
          </div>
          <button onClick={onTutup} className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
            Tutup
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Pesan</h3>
            <p className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-800">
              {item.message || "(kosong)"}
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Kontak dan sumber</h3>
            <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[150px_minmax(0,1fr)]">
              {baris.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="break-words text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Balas cepat</h3>
            <div className="flex flex-wrap gap-2">
              {mailto ? (
                <a href={mailto} className="rounded-lg bg-brand-800 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900">
                  Balas lewat email
                </a>
              ) : null}
              {waLink ? (
                <a href={waLink} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Balas lewat WhatsApp
                </a>
              ) : null}
              {!mailto && !waLink ? <p className="text-sm text-slate-400">Tidak ada email atau telepon untuk dibalas.</p> : null}
            </div>
            <p className="mt-2 text-xs text-slate-400">Tautan membuka aplikasi email atau WhatsApp dengan pesan yang sudah terisi.</p>
          </section>

          <section>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="inquiry-status">Status</label>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <select
                id="inquiry-status"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={item.status}
                disabled={menyimpan}
                onChange={(e) => onUbah({ status: e.target.value })}
              >
                {STATUS_INQUIRY.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              {menyimpan ? <span className="text-xs text-slate-500">Menyimpan...</span> : null}
            </div>
          </section>

          <section>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="inquiry-catatan">Catatan internal</label>
            <textarea
              id="inquiry-catatan"
              rows={3}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Hanya terlihat oleh tim, tidak dikirim ke pengirim."
            />
            <button
              type="button"
              disabled={menyimpan || catatan === (item.internal_notes || "")}
              onClick={() => onUbah({ internal_notes: catatan })}
              className="mt-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Simpan catatan
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}