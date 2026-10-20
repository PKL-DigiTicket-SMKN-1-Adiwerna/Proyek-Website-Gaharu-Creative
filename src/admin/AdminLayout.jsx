import { NavLink, useNavigate, Outlet } from "react-router-dom";

const NAV = [
  { to: "/admin", label: "Dasbor", end: true },
  { to: "/admin/site", label: "Pengaturan Situs" },
  { to: "/admin/services", label: "Layanan" },
  { to: "/admin/portfolio", label: "Portofolio" },
  { to: "/admin/articles", label: "Artikel" },
  { to: "/admin/about", label: "Tentang" },
  { to: "/admin/stats", label: "Statistik" },
  { to: "/admin/inquiries", label: "Inquiry" },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login", { replace: true });
  };
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      <aside className="w-60 shrink-0 bg-brand-900 text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="text-xs uppercase tracking-widest text-white/60">Gaharu</div>
          <div className="text-lg font-bold">Panel Admin</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white text-left"
          >
            Keluar
          </button>
          <a href="/" className="block mt-2 rounded-lg px-3 py-2 text-sm font-medium text-white/50 hover:text-white">
            ← Situs publik
          </a>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6">
          <div className="text-sm font-semibold text-slate-700">Area Admin (data tiruan)</div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
