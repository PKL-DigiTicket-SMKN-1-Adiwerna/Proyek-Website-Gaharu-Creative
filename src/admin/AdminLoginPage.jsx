import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi, setAdminToken } from "../lib/adminApi";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email dan kata sandi wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.login(email.trim(), password);
      setAdminToken(res.access_token);
      try { localStorage.setItem("admin_email", res.user?.email || email.trim()); } catch {}
      try { localStorage.setItem("admin_role", res.user?.role || ""); } catch {}
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err?.message || "Gagal masuk. Periksa email dan kata sandi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="text-xs uppercase tracking-widest text-brand-700 font-semibold">Gaharu Creative</div>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Masuk Panel Admin</h1>
        <p className="mt-1 text-sm text-slate-500">Terhubung ke backend (Supabase Auth).</p>
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
            disabled={loading}
            className="w-full rounded-lg bg-brand-800 text-white py-2.5 text-sm font-semibold hover:bg-brand-900 disabled:opacity-60"
          >
            {loading ? "Memproses…" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
