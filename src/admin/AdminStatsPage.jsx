import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";

function toForm(row) {
  return { id: row.id, label: row.label || "", value: row.value || "", suffix: row.suffix || "" };
}
function toDto(form) {
  return { label: form.label, value: form.value, suffix: form.suffix || null, locale: "id" };
}

export default function AdminStatsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await adminApi.listStats("id");
      setItems((res.data || []).map(toForm));
    } catch (e) { setError(e?.message || "Gagal memuat data."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (form.id) {
        const res = await adminApi.updateStat(form.id, toDto(form));
        setItems((prev) => prev.map((it) => (it.id === form.id ? toForm(res.data) : it)));
      } else {
        const res = await adminApi.createStat(toDto(form));
        setItems((prev) => [toForm(res.data), ...prev]);
      }
      setForm(null);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };
  const remove = async (id) => {
    if (!confirm("Hapus statistik ini?")) return;
    try { await adminApi.deleteStat(id); setItems((prev) => prev.filter((it) => it.id !== id)); }
    catch (e) { setError(e?.message || "Gagal menghapus."); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Statistik (angka band)</h1>
        <button onClick={() => setForm({ label: "", value: "", suffix: "" })} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-900">+ Tambah</button>
      </div>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      {form && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Label (mis. Proyek selesai)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <input placeholder="Nilai (mis. 120)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <input placeholder="Suffix (mis. +)" value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan"}</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? <div className="px-5 py-8 text-sm text-slate-500">Memuat…</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="text-left px-5 py-3">Label</th><th className="text-left px-5 py-3">Nilai</th><th className="text-left px-5 py-3">Suffix</th><th className="text-right px-5 py-3">Aksi</th></tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-medium">{it.label}</td>
                  <td className="px-5 py-3">{it.value}</td>
                  <td className="px-5 py-3">{it.suffix}</td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button onClick={() => setForm({ ...it })} className="text-brand-700 hover:underline">Edit</button>
                    <button onClick={() => remove(it.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">Belum ada data.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
