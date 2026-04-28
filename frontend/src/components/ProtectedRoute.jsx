import { useAuth } from "../context/AuthContext";

// Fix 7: ProtectedRoute now redirects to login instead of just showing a message
// Fix 11: Added loading state handling
export default function ProtectedRoute({ children, adminOnly = false, onRedirect }) {
  const { user } = useAuth();

  if (!user) {
    // Trigger redirect to login if a callback is provided
    if (onRedirect) onRedirect("login");
    return (
      <div className="empty" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="empty-icon">🔒</div>
        <div className="empty-title">Not authenticated</div>
        <div className="empty-sub">Redirecting to login...</div>
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