import { useEffect, useState } from "react";
import { adminApi } from "../lib/adminApi";
import { INPUT, BTN_UTAMA, BTN_KEDUA, Field, Pesan, StatusPill, slugify } from "./components/FormKit.jsx";

/* Dua jenis kategori memakai bentuk data dan endpoint yang sama, jadi satu halaman
   dengan pemilih jenis. Kategori baru langsung muncul sebagai chip filter di situs. */
const JENIS = {
  portofolio: {
    label: "Portofolio",
    list: adminApi.listPortfolioCategories,
    create: adminApi.createPortfolioCategory,
    update: adminApi.updatePortfolioCategory,
    remove: adminApi.deletePortfolioCategory,
  },
  artikel: {
    label: "Artikel",
    list: adminApi.listArticleCategories,
    create: adminApi.createArticleCategory,
    update: adminApi.updateArticleCategory,
    remove: adminApi.deleteArticleCategory,
  },
};

const kosong = (urutan) => ({ id: "", name: "", slug: "", slugManual: false, description: "", urutan, terbit: true });

function toForm(row) {
  return {
    id: row.id,
    name: row.name || "",
    slug: row.slug || "",
    slugManual: true,
    description: row.description || "",
    urutan: row.sort_order ?? 0,
    terbit: Boolean(row.is_published),
  };
}

function toDto(f) {
  return {
    name: f.name.trim(),
    slug: f.slug.trim(),
    description: f.description.trim(),
    sort_order: Number(f.urutan) || 0,
    is_published: f.terbit,
    locale: "id",
  };
}

export default function AdminCategoriesPage() {
  const [jenis, setJenis] = useState("portofolio");
  const [items, setItems] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");
  const [info, setInfo] = useState("");
  const [form, setForm] = useState(null);
  const [menyimpan, setMenyimpan] = useState(false);
  const api = JENIS[jenis];

  const muat = async (senyap = false) => {
    if (!senyap) setMemuat(true);
    setGalat("");
    try {
      const res = await api.list("id");
      setItems((res?.data || []).map(toForm));
    } catch (e) {
      setGalat(e?.message || "Gagal memuat kategori.");
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => { (async () => { setForm(null); setInfo(""); await muat(); })(); }, [jenis]); // eslint-disable-line react-hooks/exhaustive-deps

  const urutanBerikut = () => items.reduce((m, it) => Math.max(m, Number(it.urutan) || 0), 0) + 1;

  const simpan = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) { setGalat("Nama kategori minimal 2 karakter."); setInfo(""); return; }
    setMenyimpan(true); setGalat(""); setInfo("");
    try {
      if (form.id) await api.update(form.id, toDto(form));
      else await api.create(toDto(form));
      setInfo(`Kategori "${form.name.trim()}" ${form.id ? "diperbarui" : "ditambahkan"}.`);
      setForm(null);
      await muat(true);
    } catch (err) {
      setGalat(err?.message || "Gagal menyimpan kategori.");
    } finally {
      setMenyimpan(false);
    }
  };

  const hapus = async (it) => {
    if (!confirm(`Hapus kategori "${it.name}"?`)) return;
    setGalat(""); setInfo("");
    try {
      await api.remove(it.id);
      setInfo(`Kategori "${it.name}" dihapus.`);
      await muat(true);
    } catch (e) {
      setGalat(e?.message || "Gagal menghapus kategori.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kategori</h1>
          <p className="text-sm text-slate-500">
            {items.length} kategori {api.label.toLowerCase()}. Chip filter di situs publik ikut daftar ini.
          </p>
        </div>
        <button onClick={() => { setGalat(""); setInfo(""); setForm(kosong(urutanBerikut())); }} className={BTN_UTAMA}>
          Tambah kategori
        </button>
      </div>

      <div className="flex gap-2">
        {Object.entries(JENIS).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setJenis(k)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${jenis === k ? "bg-brand-800 text-white" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <Pesan jenis="gagal">{galat}</Pesan>
      <Pesan>{info}</Pesan>

      {form && (
        <form onSubmit={simpan} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">{form.id ? "Ubah kategori" : "Kategori baru"}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nama" wajib>
              <input
                className={INPUT}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slugManual ? form.slug : slugify(e.target.value) })}
                placeholder="Contoh: UMKM Digital"
              />
            </Field>
            <Field label="Slug" wajib hint="Dipakai untuk filter dan alamat. Ikut nama sampai Anda menyuntingnya.">
              <input
                className={INPUT}
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value), slugManual: true })}
              />
            </Field>
            <Field label="Deskripsi" hint="Teks pendek yang tampil pada chip filter.">
              <input className={INPUT} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Field>
            <Field label="Urutan tampil" hint="Angka kecil tampil lebih dulu.">
              <input type="number" min="0" className={INPUT} value={form.urutan} onChange={(e) => setForm({ ...form, urutan: e.target.value })} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" className="h-4 w-4" checked={form.terbit} onChange={(e) => setForm({ ...form, terbit: e.target.checked })} />
            Tampilkan di situs publik
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={menyimpan} className={BTN_UTAMA}>{menyimpan ? "Menyimpan..." : "Simpan"}</button>
            <button type="button" onClick={() => setForm(null)} className={BTN_KEDUA}>Batal</button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-slate-200 bg-white">
        {memuat ? (
          <p className="px-5 py-8 text-center text-sm text-slate-400">Memuat kategori...</p>
        ) : items.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-400">Belum ada kategori. Tambahkan supaya chip filter muncul di situs.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((it) => (
              <li key={it.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{it.name}</span>
                    <StatusPill terbit={it.terbit} />
                  </div>
                  <div className="text-xs text-slate-500">/{it.slug} · urutan {it.urutan}{it.description ? ` · ${it.description}` : ""}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setGalat(""); setInfo(""); setForm({ ...it }); }} className={BTN_KEDUA}>Ubah</button>
                  <button onClick={() => hapus(it)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50">Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
