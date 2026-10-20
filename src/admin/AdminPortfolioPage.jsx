import { MOCK_PORTFOLIO, STATUS_LABEL } from "./mockData.js";

export default function AdminPortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Portofolio</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Judul</th>
              <th className="text-left px-5 py-3">Klien</th>
              <th className="text-left px-5 py-3">Kategori</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PORTFOLIO.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-5 py-3 font-medium">{p.title}</td>
                <td className="px-5 py-3">{p.client}</td>
                <td className="px-5 py-3">{p.category}</td>
                <td className="px-5 py-3">{STATUS_LABEL[p.status] || p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
