import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/index";

export default function Register({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    if (!form.username || !form.email || !form.password) return setErr("All fields required");
    setLoading(true);
    setErr("");
    try {
      await apiFetch("/auth/register", { method: "POST", body: JSON.stringify(form) });
      login(await apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email: form.email, password: form.password }) }));
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
          <div className="auth-logo-box">🏛️</div>
          <div className="auth-logo-name">Vault<span>IQ</span></div>
        </div>
        <div className="auth-headline">Join<br /><em>VaultIQ</em><br />Today.</div>
        <div className="auth-sub-text">Get instant access to premium inventory tracking, smart order management, and powerful analytics built for serious operations.</div>
        <div className="auth-features">
          {["Free to get started", "Instant setup", "Full admin capabilities", "Secure JWT authentication"].map((f) => (
            <div className="auth-feature" key={f}><div className="auth-feature-dot" />{f}</div>
          ))}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">Create account</div>
          <div className="auth-form-sub">Fill in your details to get started</div>
          {err && <div className="alert alert-error">{err}</div>}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" placeholder="Don Jesus" value={form.username} onChange={set("username")} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="donjesuskayiranga@gmail.com" value={form.email} onChange={set("email")} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>
          <button className="btn btn-primary btn-full btn-lg" onClick={submit} disabled={loading}>
            {loading ? "Creating…" : "Create Account"}
          </button>
          <p className="auth-switch">Already have an account? <a onClick={onSwitch}>Sign in</a></p>
        </div>
      </div>
    </div>
  );
}