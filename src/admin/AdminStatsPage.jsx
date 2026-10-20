import { useState } from "react";
import { useContent } from "../lib/contentStore.js";

const DEFAULTS = [
  { id: "st-1", label: "Proyek selesai", value: "120" },
  { id: "st-2", label: "Klien aktif", value: "45" },
  { id: "st-3", label: "Tahun berpengalaman", value: "8" },
];

export default function AdminStatsPage() {
  const [items, setItems] = useContent("stats", DEFAULTS);
  const [form, setForm] = useState(null);

  const save = (e) => {
    e.preventDefault();
    if (form.id) setItems(items.map((it) => (it.id === form.id ? { ...it, ...form } : it)));
    else setItems([{ id: "st-" + Date.now(), ...form }, ...items]);
    setForm(null);
  };
  const remove = (id) => { if (!confirm("Hapus statistik ini?")) return; setItems(items.filter((it) => it.id !== id)); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Statistik (angka band)</h1>
        <button onClick={() => setForm({ label: "", value: "" })} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-900">+ Tambah</button>
      </div>
      {form && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Label (mis. Proyek selesai)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <input placeholder="Nilai (mis. 120)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold">Simpan</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr><th className="text-left px-5 py-3">Label</th><th className="text-left px-5 py-3">Nilai</th><th className="text-right px-5 py-3">Aksi</th></tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-slate-100">
                <td className="px-5 py-3 font-medium">{it.label}</td>
                <td className="px-5 py-3">{it.value}</td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button onClick={() => setForm({ ...it })} className="text-brand-700 hover:underline">Edit</button>
                  <button onClick={() => remove(it.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
