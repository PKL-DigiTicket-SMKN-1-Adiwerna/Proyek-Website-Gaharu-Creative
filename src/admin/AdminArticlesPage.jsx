import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";

function toForm(row) {
  return {
    id: row.id,
    title: row.title || "",
    category: "Branding",
    status: row.is_published ? "published" : "draft",
    excerpt: row.excerpt || "",
    content: row.body || "",
    cover: row.cover_path || "",
    published_at: row.published_at ? row.published_at.slice(0, 10) : "",
  };
}
function toDto(form) {
  return {
    title: form.title,
    slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    excerpt: form.excerpt,
    body: form.content,
    cover_path: form.cover,
    cover_alt: form.title,
    is_published: form.status === "published",
    published_at: form.status === "published" ? (form.published_at || new Date().toISOString().slice(0, 10)) : null,
    locale: "id",
  };
}

export default function AdminArticlesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await adminApi.listArticles("id");
      setItems((res.data || []).map(toForm));
    } catch (e) { setError(e?.message || "Gagal memuat data."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (form.id) {
        const res = await adminApi.updateArticle(form.id, toDto(form));
        setItems((prev) => prev.map((it) => (it.id === form.id ? toForm(res.data) : it)));
      } else {
        const res = await adminApi.createArticle(toDto(form));
        setItems((prev) => [toForm(res.data), ...prev]);
      }
      setForm(null);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };
  const remove = async (id) => {
    if (!confirm("Hapus artikel ini?")) return;
    try { await adminApi.deleteArticle(id); setItems((prev) => prev.filter((it) => it.id !== id)); }
    catch (e) { setError(e?.message || "Gagal menghapus."); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Artikel / Insight</h1>
        <button onClick={() => setForm({ title: "", category: "Branding", status: "draft", excerpt: "", content: "", cover: "", published_at: null })} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-900">+ Tambah</button>
      </div>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
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
            <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan"}</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? <div className="px-5 py-8 text-sm text-slate-500">Memuat…</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-5 py-3">Cover</th>
                <th className="text-left px-5 py-3">Judul</th>
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
                  <td className="px-5 py-3">{it.status}</td>
                  <td className="px-5 py-3 text-slate-500">{it.published_at || "-"}</td>
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
