import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../lib/adminApi";
import { api } from "../lib/api.js";
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

function toForm(row) {
  return {
    id: row.id,
    title: row.title || "",
    slug: row.slug || "",
    slugManual: true,
    ringkasan: row.summary || "",
    isi: row.body || "",
    client: row.client_name || "",
    // kategori = id baris portfolio_categories; label = nama kategori yang dikirim
    // sebagai industry supaya kartu publik tetap punya tulisan kategori.
    kategoriId: row.category_id || "",
    label: row.industry || "",
    badgeHasil: row.result_badge || "",
    tanggal: row.project_date ? String(row.project_date).slice(0, 10) : "",
    urutan: row.sort_order ?? 0,
    terbit: Boolean(row.is_published),
    gambar: row.cover_path || "",
  };
}

function kosong(urutan) {
  return {
    id: "",
    title: "",
    slug: "",
    slugManual: false,
    ringkasan: "",
    isi: "",
    client: "",
    kategoriId: "",
    label: "",
    badgeHasil: "",
    tanggal: "",
    urutan,
    terbit: false,
    gambar: "",
  };
}

function toDto(f, daftarKategori = []) {
  return {
    title: f.title.trim(),
    slug: f.slug.trim(),
    client_name: f.client.trim(),
    // category_id yang benar; industry diisi nama kategori pilihan supaya label kartu
    // dan chip filter publik cocok. "Tanpa kategori" mengirim keduanya kosong/null.
    category_id: f.kategoriId || null,
    industry: f.label || daftarKategori.find((k) => k.id === f.kategoriId)?.name || "",
    result_badge: f.badgeHasil.trim(),
    summary: f.ringkasan.trim(),
    body: f.isi.trim(),
    project_date: f.tanggal || null,
    sort_order: Number(f.urutan) || 0,
    cover_path: f.gambar || "",
    cover_alt: f.title.trim(),
    is_published: f.terbit,
    locale: "id",
  };
}

function cekForm(f) {
  if (!f.title.trim()) return "Judul wajib diisi.";
  if (f.title.trim().length < 3) return "Judul minimal 3 karakter.";
  if (!f.slug.trim()) return "Slug wajib diisi.";
  if (!/^[a-z0-9-]+$/.test(f.slug.trim())) return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
  if (f.ringkasan.trim().length < 10) return "Ringkasan minimal 10 karakter supaya kartu publik tidak kosong.";
  return "";
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");
  const [info, setInfo] = useState("");
  const [form, setForm] = useState(null);
  const [menyimpan, setMenyimpan] = useState(false);
  const [cari, setCari] = useState("");
  const [filter, setFilter] = useState("semua");
  const [daftarKategori, setDaftarKategori] = useState([]);

  // Kategori nyata diambil sekali dari endpoint publik supaya category_id yang
  // dikirim form sama dengan chip filter di situs. Gagal memuat tidak menghalangi
  // simpan: pilihan "Tanpa kategori" tetap tersedia.
  useEffect(() => {
    (async () => {
      try {
        const res = await api.portfolioCategories();
        setDaftarKategori((res?.data || []).filter((c) => c && c.id));
      } catch { void 0; }
    })();
  }, []);

  const muat = async (senyap = false) => {
    if (!senyap) setMemuat(true);
    setGalat("");
    try {
      const res = await adminApi.listPortfolio("id");
      setItems((res?.data || []).map(toForm));
    } catch (e) {
      setGalat(e?.message || "Gagal memuat data.");
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => { (async () => { await muat(); })(); }, []);

  // Urutan baru = sesudah urutan terbesar. Tanpa ini item baru memakai sort_order 0
  // yang sama dengan item lama, sehingga kartu baru tampak menggantikan kartu lama.
  const urutanBerikut = () => items.reduce((maks, it) => Math.max(maks, Number(it.urutan) || 0), 0) + 1;

  const buka = (it) => {
    setGalat(""); setInfo("");
    setForm(it ? { ...it } : kosong(urutanBerikut()));
  };

  const ubahJudul = (nilai) =>
    setForm((f) => ({ ...f, title: nilai, slug: f.slugManual ? f.slug : slugify(nilai) }));

  const simpan = async (e) => {
    e.preventDefault();
    const salah = cekForm(form);
    if (salah) { setGalat(salah); setInfo(""); return; }
    setMenyimpan(true); setGalat(""); setInfo("");
    try {
      if (form.id) await adminApi.updatePortfolio(form.id, toDto(form, daftarKategori));
      else await adminApi.createPortfolio(toDto(form, daftarKategori));
      setInfo(form.id ? `Portofolio "${form.title.trim()}" diperbarui.` : `Portofolio "${form.title.trim()}" ditambahkan.`);
      setForm(null);
      await muat(true);
    } catch (err) {
      setGalat(err?.message || "Gagal menyimpan portofolio.");
    } finally {
      setMenyimpan(false);
    }
  };

  const hapus = async (it) => {
    if (!confirm(`Hapus portofolio "${it.title}"?`)) return;
    setGalat(""); setInfo("");
    try {
      await adminApi.deletePortfolio(it.id);
      setItems((prev) => prev.filter((x) => x.id !== it.id));
      setInfo(`Portofolio "${it.title}" dihapus.`);
    } catch (e) {
      setGalat(e?.message || "Gagal menghapus.");
    }
  };

  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return items
      .filter((it) => (filter === "terbit" ? it.terbit : filter === "draf" ? !it.terbit : true))
      .filter((it) => !q || [it.title, it.client, it.label, it.slug].join(" ").toLowerCase().includes(q))
      .sort((a, b) => (Number(a.urutan) || 0) - (Number(b.urutan) || 0) || a.title.localeCompare(b.title));
  }, [items, cari, filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portofolio</h1>
          <p className="text-sm text-slate-500">
            {items.length} portofolio, {items.filter((it) => it.terbit).length} terbit. Urutan kecil tampil lebih dulu di situs.
          </p>
        </div>
        <button onClick={() => buka(null)} className={BTN_UTAMA}>Tambah portofolio</button>
      </div>

      <Pesan jenis="gagal">{galat}</Pesan>
      <Pesan>{info}</Pesan>

      {form && (
        <form onSubmit={simpan} className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">{form.id ? "Ubah portofolio" : "Portofolio baru"}</h2>
              <p className="text-xs text-slate-500">Isi kolom bertanda bintang, pratinjau di kanan mengikuti kartu publik.</p>
            </div>
            <button type="button" onClick={() => setForm(null)} className="text-sm text-slate-500 hover:text-slate-800">Tutup</button>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Konten utama</legend>
                <Field label="Judul" wajib>
                  <input className={INPUT} value={form.title} onChange={(e) => ubahJudul(e.target.value)} placeholder="Contoh: Katalog Online UMKM Batik" />
                </Field>
                <Field label="Slug" wajib hint="Dipakai di alamat /portofolio/slug. Ikut judul sampai Anda menyuntingnya sendiri.">
                  <input
                    className={INPUT}
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value), slugManual: true })}
                    placeholder="katalog-online-umkm-batik"
                  />
                </Field>
                <Field label="Ringkasan kartu" wajib hint="Satu sampai dua kalimat, tampil di bawah judul kartu.">
                  <textarea className={INPUT} rows={3} value={form.ringkasan} onChange={(e) => setForm({ ...form, ringkasan: e.target.value })} />
                </Field>
                <Field label="Isi detail" hint="Opsional, tampil di halaman detail portofolio.">
                  <textarea className={INPUT} rows={5} value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} />
                </Field>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Klien dan publikasi</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Klien">
                    <input className={INPUT} value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Nama klien" />
                  </Field>
                  <Field label="Kategori" hint="Daftar diambil dari kategori portofolio di server.">
                    <select
                      className={INPUT}
                      value={form.kategoriId}
                      onChange={(e) => {
                        const id = e.target.value;
                        setForm({
                          ...form,
                          kategoriId: id,
                          label: daftarKategori.find((k) => k.id === id)?.name || "",
                        });
                      }}
                    >
                      <option value="">Tanpa kategori</option>
                      {daftarKategori.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Badge hasil" hint="Teks pendek, tampil sebagai penanda hasil. Contoh: +38% penjualan.">
                    <input
                      className={INPUT}
                      maxLength={40}
                      value={form.badgeHasil}
                      onChange={(e) => setForm({ ...form, badgeHasil: e.target.value })}
                      placeholder="+38% penjualan"
                    />
                  </Field>
                  <Field label="Tanggal proyek">
                    <input type="date" className={INPUT} value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
                  </Field>
                  <Field label="Urutan tampil" hint="Angka kecil tampil lebih dulu.">
                    <input type="number" min="0" className={INPUT} value={form.urutan} onChange={(e) => setForm({ ...form, urutan: e.target.value })} />
                  </Field>
                </div>
                {daftarKategori.length === 0 ? (
                  <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    Belum ada kategori dari server. Portofolio tersimpan tanpa kategori dan bisa diberi kategori nanti.
                  </p>
                ) : null}
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
                tag={form.label || daftarKategori.find((k) => k.id === form.kategoriId)?.name || ""}
                judul={form.title}
                ringkasan={form.ringkasan}
                meta={[form.client, form.tanggal].filter(Boolean).join(" · ")}
              />
              <ImageUpload
                label="Gambar sampul"
                value={form.gambar}
                onChange={(v) => setForm({ ...form, gambar: v })}
                hint="Rasio 16:10 paling rapi. Berkas besar dikecilkan otomatis."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4">
            <button type="submit" disabled={menyimpan} className={BTN_UTAMA}>
              {menyimpan ? "Menyimpan..." : form.id ? "Simpan perubahan" : "Simpan portofolio"}
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
          placeholder="Cari judul, klien, atau kategori"
          aria-label="Cari portofolio"
        />
        <select className={`${INPUT} sm:w-40`} value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Saring status">
          <option value="semua">Semua status</option>
          <option value="terbit">Terbit</option>
          <option value="draf">Draf</option>
        </select>
      </div>

      {memuat ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">Memuat portofolio...</div>
      ) : tersaring.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">
          {items.length === 0 ? "Belum ada portofolio. Mulai dengan tombol Tambah portofolio." : "Tidak ada portofolio yang cocok dengan pencarian."}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tersaring.map((it) => (
            <article key={it.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              {it.gambar ? (
                <img src={it.gambar} alt="" className="aspect-[16/10] w-full object-cover" />
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-50 text-xs text-slate-400">Tanpa gambar</div>
              )}
              <div className="space-y-1.5 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill terbit={it.terbit} />
                  <span className="text-[11px] text-slate-400">Urutan {it.urutan}</span>
                  <span className="text-[11px] text-slate-400">/{it.slug}</span>
                </div>
                <h3 className="font-semibold leading-snug text-slate-900">{it.title}</h3>
                <p className="text-xs text-slate-500">{[it.client, it.label].filter(Boolean).join(" · ")}</p>
                <p className="line-clamp-2 text-xs text-slate-500">{it.ringkasan}</p>
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