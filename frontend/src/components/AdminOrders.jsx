import { useState, useEffect } from "react";
import { apiFetch } from "../api/index";

function Loading() {
  return <div className="spinner-wrap"><div className="spinner" /> Loading...</div>;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  const load = () => {
    setLoading(true);
    apiFetch("/orders")
      .then((o) => { setOrders(o); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await apiFetch(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
      load();
    } catch (e) { alert(e.message); }
    finally { setUpdating(null); }
  };

  const del = async (id) => {
    try { await apiFetch(`/orders/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  const counts = { all: orders.length, pending: 0, completed: 0, cancelled: 0 };
  orders.forEach((o) => { if (counts[o.status] !== undefined) counts[o.status]++; });
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">All Orders</div>
          <div className="page-sub">{orders.length} orders system-wide</div>
        </div>
      </div>
      <div className="content">
        <div className="admin-banner">🔐 Admin — View and update every order in the system</div>
        <div className="tabs">
          {["all", "pending", "completed", "cancelled"].map((t) => (
            <button key={t} className={`tab ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)} ({counts[t]})
            </button>
          ))}
        </div>
        <div className="card">
          {loading ? <Loading /> : filtered.length === 0 ? (
            <div className="empty"><div className="empty-icon">📋</div><div className="empty-title">No orders here</div></div>
          ) : (
            <table className="table">
              <thead><tr><th>Order ID</th><th>Products</th><th>Status</th><th>Date</th><th>Update</th><th></th></tr></thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o._id}>
                    <td className="mono text-dim fs-12">{o._id.slice(-10)}</td>
                    <td>{o.products?.map((p, i) => <div key={i} className="fs-12 text-muted">{p.product?.name || <em className="text-dim">Deleted product</em>} ×{p.quantity}</div>)}</td>
                    <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                    <td className="text-dim fs-12">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select className="form-select" style={{ width: "auto", padding: "5px 10px", fontSize: 12 }} value={o.status} disabled={updating === o._id} onChange={(e) => updateStatus(o._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td><button className="btn btn-icon" onClick={() => del(o._id)} style={{ color: "var(--danger)" }}>🗑️</button></td>
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

export function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiFetch("/orders")
      .then((o) => { setOrders(o); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    try {
      await apiFetch(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status: "cancelled" }) });
      load();
    } catch (e) { alert(e.message); }
  };

  const del = async (id) => {
    try { await apiFetch(`/orders/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Orders</div>
          <div className="page-sub">{orders.length} total orders</div>
        </div>
      </div>
      <div className="content">
        <div className="card">
          {loading ? <Loading /> : orders.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🛒</div>
              <div className="empty-title">No orders yet</div>
              <div className="empty-sub">Head to Products to place an order</div>
            </div>
          ) : (
            <table className="table">
              <thead><tr><th>Order ID</th><th>Products</th><th>Status</th><th>Placed</th><th>Actions</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td className="mono text-dim fs-12">{o._id.slice(-10)}</td>
                    <td>{o.products?.map((p, i) => <div key={i} className="fs-12 text-muted">{p.product?.name || <em className="text-dim">Deleted product</em>} ×{p.quantity}</div>)}</td>
                    <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                    <td className="text-dim fs-12">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="actions-cell">
                        {o.status === "pending" && <button className="btn btn-sm btn-danger" onClick={() => cancel(o._id)}>Cancel</button>}
                        <button className="btn btn-icon" onClick={() => del(o._id)} style={{ color: "var(--danger)" }}>🗑️</button>
                      </div>
                    </td>
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