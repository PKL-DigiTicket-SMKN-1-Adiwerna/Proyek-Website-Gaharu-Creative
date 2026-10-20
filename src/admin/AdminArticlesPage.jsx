import { useState } from "react";
import { useContent } from "../lib/contentStore.js";
import ImageUpload from "./ImageUpload.jsx";

const DEFAULTS = [
  { id: "art-1", title: "Membangun Merek yang Konsisten", category: "Branding", status: "published", excerpt: "Ringkasan artikel.", content: "Isi artikel lengkap.", cover: "", published_at: "2026-10-10" },
];

export default function AdminArticlesPage() {
  const [items, setItems] = useContent("articles", DEFAULTS);
  const [form, setForm] = useState(null);

  const save = (e) => {
    e.preventDefault();
    const payload = { ...form, published_at: form.status === "published" ? (form.published_at || new Date().toISOString().slice(0, 10)) : null };
    if (form.id) setItems(items.map((it) => (it.id === form.id ? { ...it, ...payload } : it)));
    else setItems([{ id: `art-${Date.now()}`, ...payload }, ...items]);
    setForm(null);
  };
  const remove = (id) => { if (!confirm("Hapus artikel ini?")) return; setItems(items.filter((it) => it.id !== id)); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Artikel / Insight</h1>
        <button onClick={() => setForm({ title: "", category: "Branding", status: "draft", excerpt: "", content: "", cover: "", published_at: null })} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-900">+ Tambah</button>
      </div>
      {form && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option>Branding</option><option>Digital</option><option>Konten</option><option>Web</option>
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="draft">Draf</option><option value="published">Terbit</option>
            </select>
          </div>
          <textarea placeholder="Ringkasan (excerpt)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <textarea placeholder="Isi artikel" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <ImageUpload label="Gambar cover" value={form.cover} onChange={(v) => setForm({ ...form, cover: v })} />
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold">Simpan</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Cover</th>
              <th className="text-left px-5 py-3">Judul</th>
              <th className="text-left px-5 py-3">Kategori</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Terbit</th>
              <th className="text-right px-5 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-slate-100">
                <td className="px-5 py-3">{it.cover ? <img src={it.cover} alt="" className="h-10 w-10 rounded object-cover" /> : <span className="text-slate-300 text-xs">-</span>}</td>
                <td className="px-5 py-3 font-medium">{it.title}</td>
                <td className="px-5 py-3">{it.category}</td>
                <td className="px-5 py-3">{it.status}</td>
                <td className="px-5 py-3 text-slate-500">{it.published_at || "-"}</td>
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
