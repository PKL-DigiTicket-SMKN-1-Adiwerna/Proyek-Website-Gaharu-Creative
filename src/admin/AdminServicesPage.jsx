import { useState } from "react";
import { MOCK_SERVICES } from "./mockData.js";

export default function AdminServicesPage() {
  const [items, setItems] = useState(MOCK_SERVICES);
  const [form, setForm] = useState(null); // null | {id?, title, slug, category, status}

  const save = (e) => {
    e.preventDefault();
    if (form.id) {
      setItems((prev) => prev.map((it) => (it.id === form.id ? { ...it, ...form, updated_at: new Date().toISOString().slice(0, 10) } : it)));
    } else {
      setItems((prev) => [
        { id: `svc-${Date.now()}`, ...form, updated_at: new Date().toISOString().slice(0, 10) },
        ...prev,
      ]);
    }
    setForm(null);
  };

  const remove = (id) => {
    if (!confirm("Hapus layanan ini?")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Layanan</h1>
        <button
          onClick={() => setForm({ title: "", slug: "", category: "Branding", status: "draft" })}
          className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-900"
        >
          + Tambah
        </button>
      </div>

      {form && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder="Judul"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option>Branding</option>
              <option>Web</option>
              <option>Konten</option>
              <option>Digital</option>
              <option>Konsultasi</option>
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="draft">Draf</option>
              <option value="published">Terbit</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold">
              Simpan
            </button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Judul</th>
              <th className="text-left px-5 py-3">Kategori</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Diperbarui</th>
              <th className="text-right px-5 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-slate-100">
                <td className="px-5 py-3 font-medium">{it.title}</td>
                <td className="px-5 py-3">{it.category}</td>
                <td className="px-5 py-3">{it.status}</td>
                <td className="px-5 py-3 text-slate-500">{it.updated_at}</td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button
                    onClick={() => setForm({ id: it.id, title: it.title, slug: it.slug, category: it.category, status: it.status })}
                    className="text-brand-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button onClick={() => remove(it.id)} className="text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
