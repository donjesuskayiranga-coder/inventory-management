import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api/index";

function Loading() {
  return <div className="spinner-wrap"><div className="spinner" /> Loading...</div>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([apiFetch("/products"), apiFetch("/orders")])
      .then(([products, orders]) => setData({ products, orders }))
      .catch(() => setData({ products: [], orders: [] }));
  }, []);

  if (!data) return (
    <>
      <div className="page-header"><div className="page-title">Dashboard</div></div>
      <Loading />
    </>
  );

  const { products, orders } = data;
  const totalValue = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const lowStock = products.filter((p) => p.quantity <= 5).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">Welcome back, {user?.username}</div>
        </div>
      </div>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card green"><div className="stat-card-icon">📦</div><div className="stat-card-value">{products.length}</div><div className="stat-card-label">Products</div></div>
          <div className="stat-card blue"><div className="stat-card-icon">🛒</div><div className="stat-card-value">{orders.length}</div><div className="stat-card-label">My Orders</div></div>
          <div className="stat-card orange"><div className="stat-card-icon">⏳</div><div className="stat-card-value">{pending}</div><div className="stat-card-label">Pending</div></div>
          <div className="stat-card purple"><div className="stat-card-icon">💰</div><div className="stat-card-value">${totalValue.toLocaleString("en", { maximumFractionDigits: 0 })}</div><div className="stat-card-label">Inventory Value</div></div>
          {lowStock > 0 && <div className="stat-card red"><div className="stat-card-icon">⚠️</div><div className="stat-card-value">{lowStock}</div><div className="stat-card-label">Low Stock</div></div>}
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Recent Orders</div></div>
          {orders.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🛒</div>
              <div className="empty-title">No orders yet</div>
              <div className="empty-sub">Head to Products to place an order</div>
            </div>
          ) : (
            <table className="table">
              <thead><tr><th>Order ID</th><th>Items</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o._id}>
                    <td className="mono text-dim fs-12">{o._id.slice(-10)}</td>
                    <td className="text-muted">{o.products?.length} item(s)</td>
                    <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                    <td className="text-dim fs-12">{new Date(o.createdAt).toLocaleDateString()}</td>
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