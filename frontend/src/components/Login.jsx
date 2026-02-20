import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/index";

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    if (!form.email || !form.password) return setErr("All fields required");
    setLoading(true);
    setErr("");
    try {
      login(await apiFetch("/auth/login", { method: "POST", body: JSON.stringify(form) }));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-logo">
          <div className="auth-logo-box">📦</div>
          <div className="auth-logo-name">Invent<span>ory</span></div>
        </div>
        <div className="auth-headline">Manage your<br /><em>inventory</em><br />with ease.</div>
        <div className="auth-sub-text">A powerful platform for tracking products, managing orders, and gaining full visibility over your stock.</div>
        <div className="auth-features">
          {["Real-time product tracking", "Order management & status updates", "Admin dashboard with analytics", "Role-based access control"].map((f) => (
            <div className="auth-feature" key={f}><div className="auth-feature-dot" />{f}</div>
          ))}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Welcome back</div>
          <div className="auth-form-sub">Sign in to your account to continue</div>
          {err && <div className="alert alert-error">{err}</div>}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="donjesuskayiranga@gmail.com" value={form.email} onChange={set("email")} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>
          <button className="btn btn-primary btn-full btn-lg" onClick={submit} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
          <p className="auth-switch">No account? <a onClick={onSwitch}>Register here</a></p>
        </div>
      </div>
    </div>
  );
}