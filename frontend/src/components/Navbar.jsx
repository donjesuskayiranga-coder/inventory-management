import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Fix 10: Added mobile hamburger menu support
export default function Navbar({ page, setPage, pendingCount }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const [open, setOpen] = useState(false);

  const navigate = (id) => {
    setPage(id);
    setOpen(false); // close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <div className="mobile-topbar-logo">Vault<span>IQ</span></div>
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay to close sidebar on mobile */}
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-box">🏛️</div>
          <div className="sidebar-logo-name">Vault<span>IQ</span></div>
        </div>
        <div className="nav-label">Main</div>
        {[
          { id: "dashboard", icon: "⊞", label: "Dashboard" },
          { id: "products", icon: "◈", label: "Products" },
          { id: "orders", icon: "◎", label: "My Orders", badge: pendingCount || 0 },
        ].map((n) => (
          <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => navigate(n.id)}>
            <span className="nav-icon">{n.icon}</span>
            {n.label}
            {n.badge > 0 && <span className="nav-badge">{n.badge}</span>}
          </button>
        ))}
        {isAdmin && (
          <>
            <div className="nav-divider" />
            <div className="nav-label">Admin Panel</div>
            {[
              { id: "admin-overview", icon: "◉", label: "Overview" },
              { id: "admin-products", icon: "▦", label: "Manage Products" },
              { id: "admin-orders", icon: "≡", label: "All Orders" },
              { id: "admin-users", icon: "◍", label: "Users" },
            ].map((n) => (
              <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => navigate(n.id)}>
                <span className="nav-icon">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </>
        )}
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="user-name">{user?.username}</div>
              <span className={`user-role-pill ${user?.role}`}>{user?.role}</span>
            </div>
          </div>
          <button className="nav-btn" onClick={logout}>
            <span className="nav-icon">→</span>Sign out
          </button>
        </div>
      </div>
    </>
  );
}