import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../lib/adminApi";
import ImageUpload from "./ImageUpload.jsx";
import {
  INPUT,
  BTN_UTAMA,
  BTN_KEDUA,
  Field,
  Pesan,
  PreviewKartu,
  StatusPill,
  slugify,
} from "./components/FormKit.jsx";

const tanggal = (iso) =>
  iso ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso)) : "";

function toForm(row) {
  return {
    id: row.id,
    title: row.title || "",
    slug: row.slug || "",
    slugManual: true,
    ringkasan: row.excerpt || "",
    isi: row.body || "",
    gambar: row.cover_path || "",
    terbit: Boolean(row.is_published),
    terbitPada: row.published_at || "",
  };
}

function kosong() {
  return {
    id: "",
    title: "",
    slug: "",
    slugManual: false,
    ringkasan: "",
    isi: "",
    gambar: "",
    terbit: false,
    terbitPada: "",
  };
}

function toDto(f) {
  return {
    title: f.title.trim(),
    slug: f.slug.trim(),
    excerpt: f.ringkasan.trim(),
    body: f.isi.trim(),
    cover_path: f.gambar || "",
    cover_alt: f.title.trim(),
    is_published: f.terbit,
    locale: "id",
  };
}

function cekForm(f) {
  if (!f.title.trim()) return "Judul artikel wajib diisi.";
  if (f.title.trim().length < 5) return "Judul minimal 5 karakter.";
  if (!f.slug.trim()) return "Slug wajib diisi.";
  if (!/^[a-z0-9-]+$/.test(f.slug.trim())) return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
  if (f.ringkasan.trim().length < 10) return "Ringkasan minimal 10 karakter supaya kartu insight tidak kosong.";
  if (f.isi.trim().length < 20) return "Isi artikel minimal 20 karakter.";
  return "";
}

export default function AdminArticlesPage() {
  const [items, setItems] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");
  const [info, setInfo] = useState("");
  const [form, setForm] = useState(null);
  const [menyimpan, setMenyimpan] = useState(false);
  const [cari, setCari] = useState("");
  const [filter, setFilter] = useState("semua");

  const muat = async (senyap = false) => {
    if (!senyap) setMemuat(true);
    setGalat("");
    try {
      const res = await adminApi.listArticles("id");
      setItems((res?.data || []).map(toForm));
    } catch (e) {
      setGalat(e?.message || "Gagal memuat data.");
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => { (async () => { await muat(); })(); }, []);

  const buka = (it) => {
    setGalat(""); setInfo("");
    setForm(it ? { ...it } : kosong());
  };

  const ubahJudul = (nilai) =>
    setForm((f) => ({ ...f, title: nilai, slug: f.slugManual ? f.slug : slugify(nilai) }));

  const simpan = async (e) => {
    e.preventDefault();
    const salah = cekForm(form);
    if (salah) { setGalat(salah); setInfo(""); return; }
    setMenyimpan(true); setGalat(""); setInfo("");
    try {
      if (form.id) await adminApi.updateArticle(form.id, toDto(form));
      else await adminApi.createArticle(toDto(form));
      setInfo(form.id ? `Artikel "${form.title.trim()}" diperbarui.` : `Artikel "${form.title.trim()}" ditambahkan.`);
      setForm(null);
      await muat(true);
    } catch (err) {
      setGalat(err?.message || "Gagal menyimpan artikel.");
    } finally {
      setMenyimpan(false);
    }
  };

  const hapus = async (it) => {
    if (!confirm(`Hapus artikel "${it.title}"?`)) return;
    setGalat(""); setInfo("");
    try {
      await adminApi.deleteArticle(it.id);
      setItems((prev) => prev.filter((x) => x.id !== it.id));
      setInfo(`Artikel "${it.title}" dihapus.`);
    } catch (e) {
      setGalat(e?.message || "Gagal menghapus.");
    }
  };

  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return items
      .filter((it) => (filter === "terbit" ? it.terbit : filter === "draf" ? !it.terbit : true))
      .filter((it) => !q || [it.title, it.slug, it.ringkasan].join(" ").toLowerCase().includes(q));
  }, [items, cari, filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Artikel / Insight</h1>
          <p className="text-sm text-slate-500">
            {items.length} artikel, {items.filter((it) => it.terbit).length} terbit. Terbaru tampil lebih dulu.
          </p>
        </div>
        <button onClick={() => buka(null)} className={BTN_UTAMA}>Tambah artikel</button>
      </div>

      <Pesan jenis="gagal">{galat}</Pesan>
      <Pesan>{info}</Pesan>

      {form && (
        <form onSubmit={simpan} className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">{form.id ? "Ubah artikel" : "Artikel baru"}</h2>
              <p className="text-xs text-slate-500">Tanggal terbit diisi otomatis oleh sistem saat artikel diterbitkan.</p>
            </div>
            <button type="button" onClick={() => setForm(null)} className="text-sm text-slate-500 hover:text-slate-800">Tutup</button>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Judul dan alamat</legend>
                <Field label="Judul" wajib>
                  <input className={INPUT} value={form.title} onChange={(e) => ubahJudul(e.target.value)} placeholder="Contoh: Tiga Tanda Merek Anda Perlu Diperbarui" />
                </Field>
                <Field label="Slug" wajib hint="Alamat /insight/slug. Ikut judul sampai Anda menyuntingnya sendiri.">
                  <input
                    className={INPUT}
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value), slugManual: true })}
                    placeholder="tiga-tanda-merek-perlu-diperbarui"
                  />
                </Field>
                <Field label="Ringkasan" wajib hint="Tampil di kartu insight dan pratinjau berbagi.">
                  <textarea className={INPUT} rows={3} value={form.ringkasan} onChange={(e) => setForm({ ...form, ringkasan: e.target.value })} />
                </Field>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Isi artikel</legend>
                <Field label="Isi" wajib hint={`${form.isi.trim().length} karakter. Pisahkan paragraf dengan satu baris kosong.`}>
                  <textarea className={INPUT} rows={12} value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} />
                </Field>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="h-4 w-4" checked={form.terbit} onChange={(e) => setForm({ ...form, terbit: e.target.checked })} />
                  Terbitkan di situs publik
                </label>
              </fieldset>
            </div>

            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Pratinjau kartu</p>
              <PreviewKartu
                gambar={form.gambar}
                tag="Insight"
                judul={form.title}
                ringkasan={form.ringkasan}
                meta={form.terbit ? `Terbit ${tanggal(form.terbitPada) || "hari ini"}` : "Belum terbit"}
              />
              <ImageUpload
                label="Gambar cover"
                value={form.gambar}
                onChange={(v) => setForm({ ...form, gambar: v })}
                hint="Rasio 16:10 paling rapi. Berkas besar dikecilkan otomatis."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4">
            <button type="submit" disabled={menyimpan} className={BTN_UTAMA}>
              {menyimpan ? "Menyimpan..." : form.id ? "Simpan perubahan" : "Simpan artikel"}
            </button>
            <button type="button" onClick={() => setForm(null)} className={BTN_KEDUA}>Batal</button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <input
          className={`${INPUT} sm:max-w-xs`}
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari judul artikel"
          aria-label="Cari artikel"
        />
        <select className={`${INPUT} sm:w-40`} value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Saring status">
          <option value="semua">Semua status</option>
          <option value="terbit">Terbit</option>
          <option value="draf">Draf</option>
        </select>
      </div>

      {memuat ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">Memuat artikel...</div>
      ) : tersaring.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">
          {items.length === 0 ? "Belum ada artikel. Mulai dengan tombol Tambah artikel." : "Tidak ada artikel yang cocok dengan pencarian."}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tersaring.map((it) => (
            <article key={it.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {it.gambar ? (
                <img src={it.gambar} alt="" className="aspect-[16/10] w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-50 text-xs text-slate-400">Tanpa cover</div>
              )}
              <div className="space-y-1.5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill terbit={it.terbit} />
                  <span className="text-[11px] text-slate-400">{it.terbitPada ? `Terbit ${tanggal(it.terbitPada)}` : "Belum terbit"}</span>
                </div>
                <h3 className="font-semibold leading-snug text-slate-900">{it.title}</h3>
                <p className="line-clamp-2 text-xs text-slate-500">{it.ringkasan}</p>
                <p className="text-[11px] text-slate-400">/{it.slug}</p>
                <div className="flex gap-3 pt-1 text-sm">
                  <button onClick={() => buka(it)} className="text-brand-700 hover:underline">Ubah</button>
                  <button onClick={() => hapus(it)} className="text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}