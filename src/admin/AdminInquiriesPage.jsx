import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../lib/adminApi";
import AdminInquiryDetail, { STATUS_INQUIRY, StatusPill } from "./AdminInquiryDetail.jsx";

const labelStatus = (s) => (STATUS_INQUIRY.find((x) => x.value === s) || {}).label || s;
const waktu = (iso) =>
  iso
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso))
    : "-";

export default function AdminInquiriesPage() {
  const [items, setItems] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");
  const [info, setInfo] = useState("");
  const [cari, setCari] = useState("");
  const [filter, setFilter] = useState("semua");
  const [aktifId, setAktifId] = useState("");
  const [menyimpan, setMenyimpan] = useState(false);

  const muat = async () => {
    setMemuat(true);
    setGalat("");
    try {
      const res = await adminApi.listInquiries();
      setItems(res?.data || []);
    } catch (e) {
      setGalat(e?.message || "Gagal memuat inquiry.");
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => { (async () => { await muat(); })(); }, []);

  // Satu jalur simpan untuk status maupun catatan, supaya daftar dan panel tidak
  // pernah menampilkan data berbeda dari yang tersimpan di server.
  const ubah = async (id, patch) => {
    setMenyimpan(true); setGalat(""); setInfo("");
    try {
      const res = await adminApi.updateInquiry(id, patch);
      const data = res?.data;
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...(data || patch) } : it)));
      setInfo(patch.status ? `Status ${labelStatus(patch.status).toLowerCase()} tersimpan.` : "Catatan internal tersimpan.");
      return true;
    } catch (e) {
      setGalat(e?.message || "Gagal menyimpan perubahan.");
      return false;
    } finally {
      setMenyimpan(false);
    }
  };

  const buka = (it) => {
    setAktifId(it.id);
    // Inquiry baru otomatis ditandai dibaca saat dibuka, sekali saja.
    if (it.status === "new") ubah(it.id, { status: "read" });
  };

  const jumlah = useMemo(
    () => items.reduce((acc, it) => ({ ...acc, [it.status]: (acc[it.status] || 0) + 1 }), {}),
    [items]
  );

  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return items
      .filter((it) => filter === "semua" || it.status === filter)
      .filter(
        (it) =>
          !q ||
          [it.full_name, it.email, it.company, it.phone, it.message, it.reference_code, it.service_interest]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(q)
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [items, cari, filter]);

  const aktif = items.find((it) => it.id === aktifId) || null;

  const chip = (value, label, n) => {
    const aktifChip = filter === value;
    return (
      <button
        key={value}
        onClick={() => setFilter(value)}
        className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
          aktifChip
            ? "border-brand-800 bg-brand-800 text-white"
            : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        {label}
        <span className={`ml-1.5 text-xs ${aktifChip ? "text-white/80" : "text-slate-400"}`}>{n}</span>
      </button>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiry</h1>
          <p className="text-sm text-slate-500">
            {items.length} pesan masuk, {jumlah.new || 0} belum dibaca. Diurutkan dari yang terbaru.
          </p>
        </div>
        <button
          onClick={muat}
          disabled={memuat}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {memuat ? "Memuat..." : "Muat ulang"}
        </button>
      </div>

      {galat && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          <span className="flex-1">{galat}</span>
          <button onClick={muat} className="rounded-lg border border-red-300 px-2 py-1 text-xs font-semibold hover:bg-red-100">
            Coba lagi
          </button>
        </div>
      )}
      {info && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
          {info}
        </div>
      )}

      <div className="space-y-3">
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:max-w-sm"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari nama, email, isi pesan, atau kode"
          aria-label="Cari inquiry"
        />
        <div className="flex flex-wrap gap-2">
          {chip("semua", "Semua", items.length)}
          {STATUS_INQUIRY.map((s) => chip(s.value, s.label, jumlah[s.value] || 0))}
        </div>
      </div>

      {memuat ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl border border-slate-200 bg-slate-50" />
          ))}
        </div>
      ) : tersaring.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">
          {items.length === 0
            ? "Belum ada pesan masuk."
            : "Tidak ada inquiry yang cocok dengan pencarian atau filter ini."}
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {tersaring.map((it) => (
            <button
              key={it.id}
              onClick={() => buka(it)}
              className={`w-full rounded-xl border bg-white p-4 text-left transition hover:border-brand-700 ${
                it.id === aktifId ? "border-brand-700" : "border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={it.status} />
                <span className="text-[11px] font-semibold text-slate-400">{it.reference_code || "-"}</span>
                <span className="ml-auto text-[11px] text-slate-400">{waktu(it.created_at)}</span>
              </div>
              <p className="mt-1.5 font-semibold text-slate-900">
                {it.full_name}
                {it.company ? <span className="font-normal text-slate-500"> · {it.company}</span> : null}
              </p>
              <p className="text-xs text-slate-500">{[it.email, it.phone].filter(Boolean).join(" · ")}</p>
              {it.service_interest ? (
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {it.service_interest}
                </span>
              ) : null}
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{it.message}</p>
            </button>
          ))}
        </div>
      )}

      {aktif && (
        <AdminInquiryDetail
          key={aktif.id}
          item={aktif}
          menyimpan={menyimpan}
          onUbah={(patch) => ubah(aktif.id, patch)}
          onTutup={() => setAktifId("")}
        />
      )}
    </div>
  );
}