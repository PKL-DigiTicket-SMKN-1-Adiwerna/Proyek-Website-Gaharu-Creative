import { useState, useEffect } from "react";
import { adminApi } from "../lib/adminApi";
import { fileToWebP } from "./ImageUpload.jsx";
import { MITRA_LOGOS } from "../data/klien.js";

/* Halaman kelola mitra (dinding logo di section Rekam Jejak).
 * Logo bisa dipilih dari berkas yang sudah ada di public/logos/klien, diisi URL
 * sendiri, atau upload (konversi WebP data URL, sama seperti halaman lain).
 */
function toForm(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "",
    slug: row.slug || "",
    category: row.category === "swasta" ? "swasta" : "pemerintah",
    logoPath: row.logo_path || row.logoPath || "",
    sortOrder: row.sort_order ?? row.sortOrder ?? 0,
    published: row.is_published ?? row.isPublished ?? 1,
  };
}
function toDto(form) {
  return {
    name: form.name,
    slug: form.slug || undefined,
    category: form.category,
    logo_path: form.logoPath || undefined,
    sort_order: Number(form.sortOrder) || 0,
    is_published: form.published ? 1 : 0,
    locale: "id",
  };
}

const KOSONG = { name: "", slug: "", category: "pemerintah", logoPath: "", sortOrder: 999, published: 1 };

export default function AdminClientsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [unggah, setUnggah] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true); setError("");
      try {
        const res = await adminApi.listClients("id");
        setItems((res?.data || []).map(toForm));
      } catch (e) { setError(e?.message || "Gagal memuat data."); }
      finally { setLoading(false); }
    })();
  }, []);

  const simpan = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (form.id) {
        const res = await adminApi.updateClient(form.id, toDto(form));
        setItems((prev) => prev.map((it) => (it.id === form.id ? toForm(res?.data) : it)));
      } else {
        const res = await adminApi.createClient(toDto(form));
        setItems((prev) => [...prev, toForm(res?.data)]);
      }
      setForm(null);
    } catch (e) { setError(e?.message || "Gagal menyimpan."); }
    finally { setSaving(false); }
  };
  const hapus = async (id) => {
    if (!confirm("Hapus mitra ini dari dinding logo?")) return;
    try { await adminApi.deleteClient(id); setItems((prev) => prev.filter((it) => it.id !== id)); }
    catch (e) { setError(e?.message || "Gagal menghapus."); }
  };
  const gantiLogo = async (ev) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    setUnggah(true);
    try {
      const dataUrl = await fileToWebP(file, 640, 0.9);
      setForm((f) => ({ ...f, logoPath: dataUrl }));
    } catch (e) { setError(e?.message || "Gagal mengonversi gambar."); }
    finally { setUnggah(false); if (ev.target) ev.target.value = ""; }
  };

  const pratinjau = form?.logoPath || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mitra dan Logo</h1>
          <p className="mt-1 text-sm text-slate-500">Dinding logo pada section Rekam Jejak. Urutan kecil tampil lebih dulu.</p>
        </div>
        <button onClick={() => setForm({ ...KOSONG })} className="rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900">+ Tambah</button>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

      {form && (
        <form onSubmit={simpan} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input placeholder="Nama institusi" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <input placeholder="Slug (opsional, contoh: bri)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="pemerintah">Kementerian dan Lembaga Pemerintah</option>
              <option value="swasta">Perusahaan Swasta dan BUMN</option>
            </select>
            <input type="number" placeholder="Urutan" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <select
              value={MITRA_LOGOS.some((m) => m.logo === form.logoPath) ? form.logoPath : ""}
              onChange={(e) => setForm({ ...form, logoPath: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
            >
              <option value="">Pilih berkas logo yang sudah ada…</option>
              {MITRA_LOGOS.map((m) => (
                <option key={m.slug} value={m.logo}>{m.name} ({m.file})</option>
              ))}
            </select>
            <input placeholder="Atau URL/logo data URL" value={form.logoPath.startsWith("data:") ? "" : form.logoPath} onChange={(e) => setForm({ ...form, logoPath: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2" />
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <span className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-slate-600">
                {unggah ? "Mengonversi…" : "Upload gambar"}
                <input type="file" accept="image/*" className="sr-only" onChange={gantiLogo} />
              </span>
              <span className="text-xs text-slate-500">Gambar dikonversi ke WebP; PNG/SVG asli sebaiknya ditaruh di public/logos/klien lewat repo.</span>
            </label>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked ? 1 : 0 })} />
              Tampilkan di situs
            </label>
          </div>
          {pratinjau && (
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <img src={pratinjau} alt="" className="h-10 w-auto object-contain" />
              <span className="break-all text-xs text-slate-500">{pratinjau.slice(0, 80)}</span>
            </div>
          )}
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan"}</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {loading ? <div className="px-5 py-8 text-sm text-slate-500">Memuat…</div> : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">Logo</th>
                <th className="px-5 py-3 text-left">Nama</th>
                <th className="px-5 py-3 text-left">Kelompok</th>
                <th className="px-5 py-3 text-left">Urutan</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t border-slate-100">
                  <td className="px-5 py-3">
                    <img src={it.logoPath} alt="" className="h-8 w-auto max-w-24 object-contain" loading="lazy" />
                  </td>
                  <td className="px-5 py-3 font-medium">{it.name}</td>
                  <td className="px-5 py-3">{it.category === "swasta" ? "Swasta dan BUMN" : "Pemerintah"}</td>
                  <td className="px-5 py-3">{it.sortOrder}</td>
                  <td className="px-5 py-3">{it.published ? "Tampil" : "Sembunyi"}</td>
                  <td className="space-x-2 px-5 py-3 text-right">
                    <button onClick={() => setForm({ ...it })} className="text-brand-700 hover:underline">Edit</button>
                    <button onClick={() => hapus(it.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">Belum ada data.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
