import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="empty" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="empty-icon">🔒</div>
        <div className="empty-title">Not authenticated</div>
        <div className="empty-sub">Please log in to access this page.</div>
      </div>
    );
  }

  if (adminOnly && user.role !== "admin") {
    return (
      <div className="empty" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="empty-icon">🚫</div>
        <div className="empty-title">Access denied</div>
        <div className="empty-sub">This page is for admins only.</div>
      </div>
    );
  }

  return children;
}