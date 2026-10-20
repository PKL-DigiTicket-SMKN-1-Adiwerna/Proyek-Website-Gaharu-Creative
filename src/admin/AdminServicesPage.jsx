import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";

const CATEGORIES = ["Branding", "Web", "Konten", "Digital", "Konsultasi"];

function toForm(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.name || "",
    slug: row.slug || "",
    category: row.tag || "Branding",
    status: row.is_published ? "published" : "draft",
    description: row.short_desc || "",
    image: row.icon || "",
  };
}
function toDto(form) {
  return {
    slug: form.slug,
    tag: form.category,
    name: form.title,
    short_desc: form.description,
    icon: form.image,
    is_published: form.status === "published",
    locale: "id",
  };
}

export default function AdminServicesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.listServices("id");
      setItems((res?.data || []).map(toForm));
    } catch (e) {
      setError(e?.message || "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (form.id) {
        const res = await adminApi.updateService(form.id, toDto(form));
        setItems((prev) => prev.map((it) => (it.id === form.id ? toForm(res?.data) : it)));
      } else {
        const res = await adminApi.createService(toDto(form));
        setItems((prev) => [toForm(res?.data), ...prev]);
      }
      setForm(null);
    } catch (e) {
      setError(e?.message || "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Hapus layanan ini?")) return;
    try {
      await adminApi.deleteService(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      setError(e?.message || "Gagal menghapus.");
    }
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
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      {form && (
        <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Judul" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="draft">Draf</option><option value="published">Terbit</option>
            </select>
          </div>
          <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          <ImageUpload label="Gambar layanan" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan"}</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="px-5 py-8 text-sm text-slate-500">Memuat…</div>
        ) : (
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
              {items.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-400">Belum ada data.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
