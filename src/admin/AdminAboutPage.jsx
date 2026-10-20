import { useState } from "react";
import { useContent } from "../lib/contentStore.js";
import ImageUpload from "./ImageUpload.jsx";

const DEFAULT_VALUES = [{ id: "v1", title: "Konsistensi", description: "Merek rapi di semua titik sentuh." }];
const DEFAULT_TEAM = [{ id: "t1", name: "Nama", role: "Founder", photo: "" }];
const DEFAULT_STORIES = [{ id: "s1", title: "Cerita kami", body: "Isi cerita." }];

export default function AdminAboutPage() {
  const [values, setValues] = useContent("values", DEFAULT_VALUES);
  const [team, setTeam] = useContent("team", DEFAULT_TEAM);
  const [stories, setStories] = useContent("stories", DEFAULT_STORIES);

  const [vForm, setVForm] = useState(null);
  const [tForm, setTForm] = useState(null);
  const [sForm, setSForm] = useState(null);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Tentang</h1>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Cerita / Tentang</h2>
          <button onClick={() => setSForm({ title: "", body: "" })} className="text-sm text-brand-700 hover:underline">+ Tambah</button>
        </div>
        {sForm && (
          <form onSubmit={(e) => { e.preventDefault(); if (sForm.id) setStories(stories.map((x) => x.id === sForm.id ? { ...x, ...sForm } : x)); else setStories([{ id: "s-" + Date.now(), ...sForm }, ...stories]); setSForm(null); }} className="space-y-2">
            <input placeholder="Judul" value={sForm.title} onChange={(e) => setSForm({ ...sForm, title: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <textarea placeholder="Isi" value={sForm.body} onChange={(e) => setSForm({ ...sForm, body: e.target.value })} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm">Simpan</button>
              <button type="button" onClick={() => setSForm(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
            </div>
          </form>
        )}
        {stories.map((s) => (
          <div key={s.id} className="border-t border-slate-100 pt-3 flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-slate-500 line-clamp-2">{s.body}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setSForm({ ...s })} className="text-brand-700 text-sm hover:underline">Edit</button>
              <button onClick={() => setStories(stories.filter((x) => x.id !== s.id))} className="text-red-600 text-sm hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Nilai / Values</h2>
          <button onClick={() => setVForm({ title: "", description: "" })} className="text-sm text-brand-700 hover:underline">+ Tambah</button>
        </div>
        {vForm && (
          <form onSubmit={(e) => { e.preventDefault(); if (vForm.id) setValues(values.map((x) => x.id === vForm.id ? { ...x, ...vForm } : x)); else setValues([{ id: "v-" + Date.now(), ...vForm }, ...values]); setVForm(null); }} className="space-y-2">
            <input placeholder="Judul nilai" value={vForm.title} onChange={(e) => setVForm({ ...vForm, title: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
            <textarea placeholder="Deskripsi" value={vForm.description} onChange={(e) => setVForm({ ...vForm, description: e.target.value })} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm">Simpan</button>
              <button type="button" onClick={() => setVForm(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
            </div>
          </form>
        )}
        {values.map((v) => (
          <div key={v.id} className="border-t border-slate-100 pt-3 flex items-start justify-between gap-3">
            <div>
              <div className="font-medium">{v.title}</div>
              <div className="text-sm text-slate-500">{v.description}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setVForm({ ...v })} className="text-brand-700 text-sm hover:underline">Edit</button>
              <button onClick={() => setValues(values.filter((x) => x.id !== v.id))} className="text-red-600 text-sm hover:underline">Hapus</button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Tim</h2>
          <button onClick={() => setTForm({ name: "", role: "", photo: "" })} className="text-sm text-brand-700 hover:underline">+ Tambah</button>
        </div>
        {tForm && (
          <form onSubmit={(e) => { e.preventDefault(); if (tForm.id) setTeam(team.map((x) => x.id === tForm.id ? { ...x, ...tForm } : x)); else setTeam([{ id: "t-" + Date.now(), ...tForm }, ...team]); setTForm(null); }} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Nama" value={tForm.name} onChange={(e) => setTForm({ ...tForm, name: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" required />
              <input placeholder="Peran" value={tForm.role} onChange={(e) => setTForm({ ...tForm, role: e.target.value })} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <ImageUpload label="Foto tim" value={tForm.photo} onChange={(v) => setTForm({ ...tForm, photo: v })} />
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-brand-800 text-white px-3 py-1.5 text-sm">Simpan</button>
              <button type="button" onClick={() => setTForm(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
            </div>
          </form>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {team.map((t) => (
            <div key={t.id} className="border border-slate-200 rounded-lg p-3 text-center">
              {t.photo ? <img src={t.photo} alt={t.name} className="h-16 w-16 rounded-full object-cover mx-auto" /> : <div className="h-16 w-16 rounded-full bg-slate-200 mx-auto" />}
              <div className="mt-2 font-medium text-sm">{t.name}</div>
              <div className="text-xs text-slate-500">{t.role}</div>
              <div className="mt-2 flex gap-2 justify-center">
                <button onClick={() => setTForm({ ...t })} className="text-brand-700 text-xs hover:underline">Edit</button>
                <button onClick={() => setTeam(team.filter((x) => x.id !== t.id))} className="text-red-600 text-xs hover:underline">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
