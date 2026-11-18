import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../lib/adminApi";
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

const KATEGORI = ["Branding", "Web", "Konten", "Digital", "Konsultasi"];

// Nama ikon yang tersedia di src/components/Icons.jsx. Kartu layanan publik
// menampilkan ikon, bukan gambar, jadi form memilih nama ikon.
const IKON = [
  "brand", "content", "social", "chart", "code", "team", "tech", "target", "search", "layers",
  "store", "building", "landmark", "globe", "mail", "chat", "pin", "clock", "compass", "doc",
  "contract", "shield",
];

function toForm(row) {
  return {
    id: row.id,
    name: row.name || "",
    slug: row.slug || "",
    slugManual: true,
    tag: row.tag || "Branding",
    ringkasan: row.short_desc || "",
    masalah: row.problem || "",
    solusi: row.solution || "",
    deliverables: Array.isArray(row.deliverables) ? row.deliverables.join("\n") : row.deliverables || "",
    ikon: row.icon || "brand",
    urutan: row.sort_order ?? 0,
    terbit: Boolean(row.is_published),
  };
}

function kosong(urutan) {
  return {
    id: "",
    name: "",
    slug: "",
    slugManual: false,
    tag: "Branding",
    ringkasan: "",
    masalah: "",
    solusi: "",
    deliverables: "",
    ikon: "brand",
    urutan,
    terbit: false,
  };
}

function toDto(f) {
  return {
    slug: f.slug.trim(),
    tag: f.tag,
    name: f.name.trim(),
    short_desc: f.ringkasan.trim(),
    problem: f.masalah.trim(),
    solution: f.solusi.trim(),
    deliverables: f.deliverables.split("\n").map((s) => s.trim()).filter(Boolean),
    icon: f.ikon,
    sort_order: Number(f.urutan) || 0,
    is_published: f.terbit,
    locale: "id",
  };
}

function cekForm(f) {
  if (!f.name.trim()) return "Nama layanan wajib diisi.";
  if (f.name.trim().length < 3) return "Nama layanan minimal 3 karakter.";
  if (!f.slug.trim()) return "Slug wajib diisi.";
  if (!/^[a-z0-9-]+$/.test(f.slug.trim())) return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
  if (f.ringkasan.trim().length < 10) return "Deskripsi singkat minimal 10 karakter supaya kartu publik tidak kosong.";
  return "";
}

export default function AdminServicesPage() {
  const [items, setItems] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");
  const [info, setInfo] = useState("");
  const [form, setForm] = useState(null);
  const [menyimpan, setMenyimpan] = useState(false);
  const [cari, setCari] = useState("");

  const muat = async (senyap = false) => {
    if (!senyap) setMemuat(true);
    setGalat("");
    try {
      const res = await adminApi.listServices("id");
      setItems((res?.data || []).map(toForm));
    } catch (e) {
      setGalat(e?.message || "Gagal memuat data.");
    } finally {
      setMemuat(false);
    }
  };

  useEffect(() => { (async () => { await muat(); })(); }, []);

  // Sama seperti portofolio: urutan baru ditaruh di belakang, bukan 0 yang bikin seri.
  const urutanBerikut = () => items.reduce((maks, it) => Math.max(maks, Number(it.urutan) || 0), 0) + 1;

  const buka = (it) => {
    setGalat(""); setInfo("");
    setForm(it ? { ...it } : kosong(urutanBerikut()));
  };

  const ubahNama = (nilai) =>
    setForm((f) => ({ ...f, name: nilai, slug: f.slugManual ? f.slug : slugify(nilai) }));

  const simpan = async (e) => {
    e.preventDefault();
    const salah = cekForm(form);
    if (salah) { setGalat(salah); setInfo(""); return; }
    setMenyimpan(true); setGalat(""); setInfo("");
    try {
      if (form.id) await adminApi.updateService(form.id, toDto(form));
      else await adminApi.createService(toDto(form));
      setInfo(form.id ? `Layanan "${form.name.trim()}" diperbarui.` : `Layanan "${form.name.trim()}" ditambahkan.`);
      setForm(null);
      await muat(true);
    } catch (err) {
      setGalat(err?.message || "Gagal menyimpan layanan.");
    } finally {
      setMenyimpan(false);
    }
  };

  const hapus = async (it) => {
    if (!confirm(`Hapus layanan "${it.name}"?`)) return;
    setGalat(""); setInfo("");
    try {
      await adminApi.deleteService(it.id);
      setItems((prev) => prev.filter((x) => x.id !== it.id));
      setInfo(`Layanan "${it.name}" dihapus.`);
    } catch (e) {
      setGalat(e?.message || "Gagal menghapus.");
    }
  };

  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return items
      .filter((it) => !q || [it.name, it.tag, it.slug, it.ringkasan].join(" ").toLowerCase().includes(q))
      .sort((a, b) => (Number(a.urutan) || 0) - (Number(b.urutan) || 0) || a.name.localeCompare(b.name));
  }, [items, cari]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Layanan</h1>
          <p className="text-sm text-slate-500">
            {items.length} layanan, {items.filter((it) => it.terbit).length} terbit. Urutan kecil tampil lebih dulu.
          </p>
        </div>
        <button onClick={() => buka(null)} className={BTN_UTAMA}>Tambah layanan</button>
      </div>

      <Pesan jenis="gagal">{galat}</Pesan>
      <Pesan>{info}</Pesan>

      {form && (
        <form onSubmit={simpan} className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">{form.id ? "Ubah layanan" : "Layanan baru"}</h2>
              <p className="text-xs text-slate-500">Pratinjau di kanan memakai gaya kartu halaman Layanan.</p>
            </div>
            <button type="button" onClick={() => setForm(null)} className="text-sm text-slate-500 hover:text-slate-800">Tutup</button>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Identitas</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nama layanan" wajib>
                    <input className={INPUT} value={form.name} onChange={(e) => ubahNama(e.target.value)} placeholder="Contoh: Identitas Merek" />
                  </Field>
                  <Field label="Kategori" wajib>
                    <select className={INPUT} value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
                      {KATEGORI.map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Slug" wajib hint="Alamat /layanan/slug. Ikut nama sampai Anda menyuntingnya sendiri.">
                  <input
                    className={INPUT}
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value), slugManual: true })}
                    placeholder="identitas-merek"
                  />
                </Field>
                <Field label="Deskripsi singkat" wajib hint="Tampil di kartu layanan, satu sampai dua kalimat.">
                  <textarea className={INPUT} rows={3} value={form.ringkasan} onChange={(e) => setForm({ ...form, ringkasan: e.target.value })} />
                </Field>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Isi halaman detail</legend>
                <Field label="Masalah klien">
                  <textarea className={INPUT} rows={3} value={form.masalah} onChange={(e) => setForm({ ...form, masalah: e.target.value })} placeholder="Apa yang biasanya jadi kendala?" />
                </Field>
                <Field label="Pendekatan kami">
                  <textarea className={INPUT} rows={3} value={form.solusi} onChange={(e) => setForm({ ...form, solusi: e.target.value })} placeholder="Bagaimana kami mengatasinya?" />
                </Field>
                <Field label="Yang Anda dapat" hint="Satu poin per baris.">
                  <textarea className={INPUT} rows={4} value={form.deliverables} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} placeholder={"Riset audiens\nPanduan merek\nAset desain"} />
                </Field>
              </fieldset>

              <fieldset>
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-800">Tampilan</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Ikon" hint="Ikon bulat di kartu layanan.">
                    <select className={INPUT} value={form.ikon} onChange={(e) => setForm({ ...form, ikon: e.target.value })}>
                      {IKON.map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                  </Field>
                  <Field label="Urutan tampil" hint="Angka kecil tampil lebih dulu.">
                    <input type="number" min="0" className={INPUT} value={form.urutan} onChange={(e) => setForm({ ...form, urutan: e.target.value })} />
                  </Field>
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="h-4 w-4" checked={form.terbit} onChange={(e) => setForm({ ...form, terbit: e.target.checked })} />
                  Terbitkan di situs publik
                </label>
              </fieldset>
            </div>

            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Pratinjau kartu</p>
              <PreviewKartu
                ikon={form.ikon}
                tag={form.tag}
                judul={form.name}
                ringkasan={form.ringkasan}
                meta={form.deliverables.split("\n").filter((s) => s.trim()).length + " poin hasil"}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-5 py-4">
            <button type="submit" disabled={menyimpan} className={BTN_UTAMA}>
              {menyimpan ? "Menyimpan..." : form.id ? "Simpan perubahan" : "Simpan layanan"}
            </button>
            <button type="button" onClick={() => setForm(null)} className={BTN_KEDUA}>Batal</button>
          </div>
        </form>
      )}

      <input
        className={`${INPUT} sm:max-w-sm`}
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari nama atau kategori layanan"
        aria-label="Cari layanan"
      />

      {memuat ? (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500">Memuat layanan...</div>
      ) : tersaring.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">
          {items.length === 0 ? "Belum ada layanan. Mulai dengan tombol Tambah layanan." : "Tidak ada layanan yang cocok dengan pencarian."}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tersaring.map((it) => (
            <article key={it.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill terbit={it.terbit} />
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{it.tag}</span>
                <span className="text-[11px] text-slate-400">Urutan {it.urutan}</span>
              </div>
              <h3 className="mt-2 font-semibold leading-snug text-slate-900">{it.name}</h3>
              <p className="line-clamp-2 text-xs text-slate-500">{it.ringkasan}</p>
              <p className="mt-1 text-[11px] text-slate-400">/{it.slug} · ikon {it.ikon}</p>
              <div className="flex gap-3 pt-2 text-sm">
                <button onClick={() => buka(it)} className="text-brand-700 hover:underline">Ubah</button>
                <button onClick={() => hapus(it)} className="text-red-600 hover:underline">Hapus</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}