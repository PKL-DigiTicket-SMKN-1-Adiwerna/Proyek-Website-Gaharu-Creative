import { useState } from "react";
import { useContent } from "../lib/contentStore.js";
import ImageUpload from "./ImageUpload.jsx";

const DEFAULTS = [
  { id: "svc-1", slug: "brand-identity", title: "Identitas Merek", category: "Branding", status: "published", description: "Pembangunan identitas merek yang konsisten.", image: "" },
  { id: "svc-2", slug: "web-design", title: "Desain Web", category: "Web", status: "published", description: "Website company profile dan toko online.", image: "" },
  { id: "svc-3", slug: "social-media", title: "Media Sosial", category: "Konten", status: "draft", description: "Pengelolaan konten media sosial.", image: "" },
];

export default function AdminServicesPage() {
  const [items, setItems] = useContent("services", DEFAULTS);
  const [form, setForm] = useState(null);

  const save = (e) => {
    e.preventDefault();
    if (form.id) {
      setItems(items.map((it) => (it.id === form.id ? { ...it, ...form } : it)));
    } else {
      setItems([{ id: `svc-${Date.now()}`, ...form }, ...items]);
    }
    setForm(null);
  };

  const remove = (id) => {
    if (!confirm("Hapus layanan ini?")) return;
    setItems(items.filter((it) => it.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Layanan</h1>
        <button
          onClick={() => setForm({ title: "", slug: "", category: "Branding", status: "draft", description: "", image: "" })}
          className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-900"
        >
          + Tambah
        </button>
      </div>

      {form && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option>Branding</option><option>Web</option><option>Konten</option><option>Digital</option><option>Konsultasi</option>
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="draft">Draf</option><option value="published">Terbit</option>
            </select>
          </div>
          <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <ImageUpload label="Gambar layanan" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
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
              <th className="text-left px-5 py-3">Gambar</th>
              <th className="text-left px-5 py-3">Judul</th>
              <th className="text-left px-5 py-3">Kategori</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-right px-5 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-slate-100">
                <td className="px-5 py-3">
                  {it.image ? <img src={it.image} alt="" className="h-10 w-10 rounded object-cover" /> : <span className="text-slate-300 text-xs">-</span>}
                </td>
                <td className="px-5 py-3 font-medium">{it.title}</td>
                <td className="px-5 py-3">{it.category}</td>
                <td className="px-5 py-3">{it.status}</td>
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
