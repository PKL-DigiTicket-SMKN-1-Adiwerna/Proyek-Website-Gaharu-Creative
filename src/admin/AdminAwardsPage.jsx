import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";

/* Halaman kelola penghargaan. Daftar memakai kartu (bukan tabel lebar) supaya
 * tetap enak dibaca di ponsel; pencarian dan penyaringan status dilakukan di
 * sisi klien karena jumlah barisnya sedikit.
 */
function toForm(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title || "",
    issuer: row.issuer || "",
    year: row.year ?? "",
    description: row.description || "",
    imagePath: row.image_path || "",
    imageAlt: row.image_alt || "",
    sortOrder: row.sort_order ?? 0,
    published: row.is_published ?? true,
  };
}

function toDto(form) {
  const year = String(form.year ?? "").trim();
  return {
    title: form.title.trim(),
    issuer: form.issuer.trim() || null,
    year: year === "" ? null : Number(year),
    description: form.description.trim() || null,
    image_path: form.imagePath || null,
    image_alt: form.imageAlt.trim() || null,
    sort_order: Number(form.sortOrder) || 0,
    is_published: !!form.published,
    locale: "id",
  };
}

const KOSONG = { title: "", issuer: "", year: "", description: "", imagePath: "", imageAlt: "", sortOrder: 0, published: true };

/** Pesan galat dari backend bisa berupa array (hasil validasi DTO). */
function pesan(e, bawaan) {
  const m = e?.data?.message;
  if (Array.isArray(m) && m.length) return m.join(" ");
  return e?.message || bawaan;
}

export default function AdminAwardsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [cari, setCari] = useState("");
  const [status, setStatus] = useState("semua");

  useEffect(() => {
    (async () => {
      setLoading(true); setError("");
      try {
        const res = await adminApi.listAwards("id");
        setItems((res?.data || []).map(toForm));
      } catch (e) { setError(pesan(e, "Gagal memuat daftar penghargaan.")); }
      finally { setLoading(false); }
    })();
  }, []);

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return items.filter((it) => {
      if (status === "terbit" && !it.published) return false;
      if (status === "draf" && it.published) return false;
      if (!q) return true;
      return `${it.title} ${it.issuer} ${it.description}`.toLowerCase().includes(q);
    });
  }, [items, cari, status]);

  const simpan = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      if (form.id) {
        const res = await adminApi.updateAward(form.id, toDto(form));
        setItems((prev) => prev.map((it) => (it.id === form.id ? toForm(res?.data) : it)));
      } else {
        const res = await adminApi.createAward(toDto(form));
        setItems((prev) => [...prev, toForm(res?.data)]);
      }
      setForm(null);
    } catch (e) { setError(pesan(e, "Gagal menyimpan penghargaan.")); }
    finally { setSaving(false); }
  };

  const hapus = async (it) => {
    if (!confirm(`Hapus penghargaan "${it.title}"?`)) return;
    setError("");
    try {
      await adminApi.deleteAward(it.id);
      setItems((prev) => prev.filter((x) => x.id !== it.id));
    } catch (e) { setError(pesan(e, "Gagal menghapus penghargaan.")); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Penghargaan</h1>
          <p className="mt-1 text-sm text-slate-500">Urutan kecil tampil lebih dulu. Hanya penghargaan berstatus terbit yang muncul di situs.</p>
        </div>
        <button
          onClick={() => { setError(""); setForm({ ...KOSONG }); }}
          className="w-full whitespace-nowrap rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 sm:w-auto"
        >
          Tambah penghargaan
        </button>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
      )}

      {form && (
        <form onSubmit={simpan} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-900">{form.id ? "Ubah penghargaan" : "Penghargaan baru"}</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Judul</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Contoh: Juara 1 Desain Kemasan"
                required
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Penerbit</span>
              <input
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Contoh: Kementerian Pariwisata"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Tahun</span>
              <input
                type="number"
                inputMode="numeric"
                min="1900"
                max="2100"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="2024"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium text-slate-700">Urutan</span>
              <input
                type="number"
                inputMode="numeric"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm md:col-span-2">
              <span className="mb-1 block font-medium text-slate-700">Deskripsi</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Keterangan singkat penghargaan"
              />
            </label>
            <div className="md:col-span-2">
              <ImageUpload label="Gambar penghargaan" value={form.imagePath} onChange={(v) => setForm({ ...form, imagePath: v })} />
            </div>
            <label className="text-sm md:col-span-2">
              <span className="mb-1 block font-medium text-slate-700">Teks alternatif gambar</span>
              <input
                value={form.imageAlt}
                onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Kosongkan untuk memakai judul"
              />
            </label>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input type="checkbox" checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Terbitkan di situs
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={saving} className="rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
            <button type="button" onClick={() => setForm(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">Batal</button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari judul, penerbit, atau deskripsi"
          className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm sm:max-w-sm"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm sm:w-48">
          <option value="semua">Semua status</option>
          <option value="terbit">Terbit</option>
          <option value="draf">Belum terbit</option>
        </select>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">Memuat...</div>
      ) : tampil.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-400">
          {items.length === 0 ? "Belum ada penghargaan." : "Tidak ada penghargaan yang cocok dengan pencarian."}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {tampil.map((it) => (
            <li key={it.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex gap-3">
                {it.imagePath ? (
                  <img src={it.imagePath} alt={it.imageAlt || it.title} className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 px-1 text-center text-[11px] leading-tight text-slate-400">Tanpa gambar</div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{it.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${it.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                      {it.published ? "Terbit" : "Belum terbit"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {[it.issuer, it.year].filter(Boolean).join(" - ") || "Penerbit dan tahun belum diisi"}
                  </p>
                  {it.description && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{it.description}</p>}
                  <p className="mt-2 text-xs text-slate-500">Urutan {it.sortOrder}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-sm">
                <button onClick={() => { setError(""); setForm({ ...it }); }} className="text-brand-700 hover:underline">Ubah</button>
                <button onClick={() => hapus(it)} className="text-red-600 hover:underline">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}