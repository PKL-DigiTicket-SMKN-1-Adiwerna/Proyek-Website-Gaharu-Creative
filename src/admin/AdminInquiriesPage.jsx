import { useState } from "react";
import { useContent } from "../lib/contentStore.js";
import { MOCK_INQUIRIES } from "./mockData.js";

export default function AdminInquiriesPage() {
  const [items, setItems] = useContent("inquiries", MOCK_INQUIRIES);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  const setStatus = (id, status) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Inquiry</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">Semua status</option>
          <option value="new">Baru</option>
          <option value="in_progress">Diproses</option>
          <option value="done">Selesai</option>
        </select>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Nama</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Layanan</th>
              <th className="text-left px-5 py-3">Pesan</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((it) => (
              <tr key={it.id} className="border-t border-slate-100 align-top">
                <td className="px-5 py-3 font-medium">{it.full_name}</td>
                <td className="px-5 py-3 text-slate-500">{it.email}</td>
                <td className="px-5 py-3">{it.service_interest}</td>
                <td className="px-5 py-3 max-w-xs">{it.message}</td>
                <td className="px-5 py-3">
                  <select
                    value={it.status}
                    onChange={(e) => setStatus(it.id, e.target.value)}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                  >
                    <option value="new">Baru</option>
                    <option value="in_progress">Diproses</option>
                    <option value="done">Selesai</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
