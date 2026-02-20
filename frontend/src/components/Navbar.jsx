import { useAuth } from "../context/AuthContext";

export default function Navbar({ page, setPage, pendingCount }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-box">📦</div>
        <div className="sidebar-logo-name">Invent<span>ory</span></div>
      </div>

      <div className="nav-label">Main</div>
      {[
        { id: "dashboard", icon: "🏠", label: "Dashboard" },
        { id: "products", icon: "📦", label: "Products" },
        { id: "orders", icon: "🛒", label: "My Orders", badge: pendingCount || 0 },
      ].map((n) => (
        <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
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
      { id: "admin-overview", icon: "📊", label: "Overview" },
      { id: "admin-products", icon: "🗂️", label: "Manage Products" },
      { id: "admin-orders", icon: "📋", label: "All Orders" },
      { id: "admin-users", icon: "👥", label: "Users" },
    ].map((n) => (
      <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
        <span className="nav-icon">{n.icon}</span>
        {n.label}
      </button>
    ))}
  </>
)}

      <div className="sidebar-footer">
        <div className="user-card">
          <div className={`user-avatar ${isAdmin ? "admin" : ""}`}>
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="user-name">{user?.username}</div>
            <span className={`user-role-pill ${user?.role}`}>{user?.role}</span>
          </div>
        </div>
        <button className="nav-btn" onClick={logout}>
          <span className="nav-icon">🚪</span>Sign out
        </button>
      </div>
    </div>
  );
}