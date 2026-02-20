import { useState, useEffect } from "react";
import { apiFetch } from "../api/index";

function Loading() {
  return <div className="spinner-wrap"><div className="spinner" /> Loading...</div>;
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/auth/users")
      .then((data) => { setUsers(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Users</div>
          <div className="page-sub">{users.length} registered users</div>
        </div>
      </div>
      <div className="content">
        <div className="admin-banner">🔐 Admin — User management panel</div>
        <div className="card">
          <div className="card-header"><div className="card-title">All Users</div></div>
          {loading ? <Loading /> : error ? (
            <div className="empty">
              <div className="empty-icon">⚠️</div>
              <div className="empty-title">Could not load users</div>
              <div className="empty-sub">{error}</div>
            </div>
          ) : users.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">👥</div>
              <div className="empty-title">No users found</div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr><th>Username</th><th>Email</th><th>Role</th><th>Joined</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="fw-700">{u.username}</td>
                    <td className="text-muted">{u.email}</td>
                    <td><span className={`user-role-pill ${u.role}`}>{u.role}</span></td>
                    <td className="text-dim fs-12">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}