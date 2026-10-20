import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";

export default function AdminInquiriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.listInquiries();
      setItems(res?.data || []);
    } catch (e) {
      setError(e?.message || "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    try {
      const res = await adminApi.updateInquiry(id, { status });
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...res?.data } : it)));
    } catch (e) {
      setError(e?.message || "Gagal memperbarui status.");
    }
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Inquiry</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">Semua status</option>
          <option value="new">Baru</option>
          <option value="in_progress">Diproses</option>
          <option value="done">Selesai</option>
        </select>
      </div>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="px-5 py-8 text-sm text-slate-500">Memuat…</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-5 py-3">Nama</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Layanan</th>
                <th className="text-left px-5 py-3">Pesan</th>
                <th className="text-left px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((it) => (
                <tr key={it.id} className="border-t border-slate-100 align-top">
                  <td className="px-5 py-3 font-medium">{it.full_name}</td>
                  <td className="px-5 py-3 text-slate-500">{it.email}</td>
                  <td className="px-5 py-3">{it.service_interest}</td>
                  <td className="px-5 py-3 max-w-xs">{it.message}</td>
                  <td className="px-5 py-3">
                    <select
                      value={it.status}
                      onChange={(e) => setStatus(it.id, e.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                    >
                      <option value="new">Baru</option>
                      <option value="in_progress">Diproses</option>
                      <option value="done">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">Belum ada data.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
