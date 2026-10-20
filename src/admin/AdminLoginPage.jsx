import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    // Tiruan: tanpa backend, token dummy disimpan lokal.
    localStorage.setItem("admin_token", "dummy-admin-token");
    localStorage.setItem("admin_email", email.trim());
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold">Gaharu Creative</div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Masuk Panel Admin</h1>
        <p className="mt-1 text-sm text-slate-500">Data tiruan — belum terhubung ke backend.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
              placeholder="admin@gaharu.id"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Kata sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-800 text-white py-2.5 text-sm font-semibold hover:bg-brand-900"
          >
            Masuk
          </button>
        </form>
        <div className="mt-4 text-xs text-slate-400">
          Tip: isi email &amp; kata sandi apa saja (mode tiruan).
        </div>
      </div>
    </div>
  );
}
