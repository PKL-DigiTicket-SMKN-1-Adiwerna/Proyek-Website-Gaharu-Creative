import { useState, useEffect } from "react";
import { adminFetch } from "../lib/adminApi";

const STATUS_LABEL = {
  new: "Baru",
  read: "Dibaca",
  replied: "Dibalas",
  in_progress: "Diproses",
  won: "Selesai",
  lost: "Batal",
  spam: "Spam",
};

function Kartu({ label, total, catatan }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="text-xs uppercase tracking-widest text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-bold text-brand-800">{total}</div>
      {catatan && <div className="mt-1 text-xs text-slate-500">{catatan}</div>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await adminFetch("/admin/dashboard?locale=id");
      setData(res?.data ?? null);
    } catch (e) {
      setData(null);
      setError(e?.message || "Gagal memuat angka dasbor.");
    } finally { setLoading(false); }
  };
  useEffect(() => { (async () => { await load(); })(); }, []);

  const d = data || {};
  const recent = d.recent_inquiries || [];
  const cards = [
    { label: "Layanan", total: d.services_total, catatan: `${d.services_published ?? 0} tayang` },
    { label: "Portofolio", total: d.portfolio_total, catatan: `${d.portfolio_published ?? 0} tayang` },
    { label: "Artikel", total: d.articles_total, catatan: `${d.articles_published ?? 0} tayang` },
    { label: "Mitra", total: d.clients_total, catatan: `${d.clients_published ?? 0} tayang` },
    { label: "Inquiry", total: d.inquiries_total, catatan: `${d.inquiries_new ?? 0} baru` },
    { label: "Statistik", total: d.stats_total, catatan: `${d.stats_published ?? 0} tayang` },
    { label: "Tim", total: d.team_total, catatan: "" },
    { label: "Penghargaan", total: d.awards_total, catatan: "" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Dasbor</h1>
        <button
          onClick={load}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? "Memuat..." : "Muat ulang"}
        </button>
      </div>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error} Angka tidak ditampilkan supaya tidak menyesatkan.
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Kartu
            key={c.label}
            label={c.label}
            total={loading && !data ? "..." : (c.total ?? 0)}
            catatan={data ? c.catatan : ""}
          />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 font-semibold text-slate-800">Inquiry terbaru</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-5 py-3">Nama</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Layanan</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium">{r.full_name}</td>
                  <td className="px-5 py-3 text-slate-500">{r.email}</td>
                  <td className="px-5 py-3">{r.service_interest}</td>
                  <td className="px-5 py-3">{STATUS_LABEL[r.status] || r.status}</td>
                </tr>
              ))}
              {!loading && recent.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">Belum ada inquiry.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
