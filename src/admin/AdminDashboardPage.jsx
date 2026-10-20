import { MOCK_SERVICES, MOCK_INQUIRIES, MOCK_PORTFOLIO, MOCK_ARTICLES } from "./mockData.js";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Layanan", value: MOCK_SERVICES.length },
    { label: "Inquiry", value: MOCK_INQUIRIES.length },
    { label: "Portofolio", value: MOCK_PORTFOLIO.length },
    { label: "Artikel", value: MOCK_ARTICLES.length },
  ];
  const recent = MOCK_INQUIRIES.slice(0, 5);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dasbor</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-500">{s.label}</div>
            <div className="mt-2 text-3xl font-bold text-brand-800">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 font-semibold text-slate-800">Inquiry terbaru</div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Nama</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Layanan</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-5 py-3 font-medium">{r.full_name}</td>
                <td className="px-5 py-3 text-slate-500">{r.email}</td>
                <td className="px-5 py-3">{r.service_interest}</td>
                <td className="px-5 py-3">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
