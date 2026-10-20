import { MOCK_ARTICLES, STATUS_LABEL } from "./mockData.js";

export default function AdminArticlesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Artikel / Insight</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Judul</th>
              <th className="text-left px-5 py-3">Kategori</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Terbit</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ARTICLES.map((a) => (
              <tr key={a.id} className="border-t border-slate-100">
                <td className="px-5 py-3 font-medium">{a.title}</td>
                <td className="px-5 py-3">{a.category}</td>
                <td className="px-5 py-3">{STATUS_LABEL[a.status] || a.status}</td>
                <td className="px-5 py-3 text-slate-500">{a.published_at || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
