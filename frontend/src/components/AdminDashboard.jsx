import { useState, useEffect } from "react";
import { apiFetch } from "../api/index";

function Loading() {
  return <div className="spinner-wrap"><div className="spinner" /> Loading...</div>;
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([apiFetch("/products"), apiFetch("/orders")])
      .then(([products, orders]) => setData({ products, orders }))
      .catch(() => setData({ products: [], orders: [] }));
  }, []);

  if (!data) return (
    <>
      <div className="page-header"><div className="page-title">Admin Overview</div></div>
      <Loading />
    </>
  );

  const { products, orders } = data;
  const totalValue = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;
  const lowStock = products.filter((p) => p.quantity <= 5);
  const topByPrice = [...products].sort((a, b) => b.price - a.price).slice(0, 5);
  const topByQty = [...products].sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  const pct = (n) => (orders.length ? Math.round((n / orders.length) * 100) : 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Admin Overview</div>
          <div className="page-sub">Full system analytics & control</div>
        </div>
      </div>
      <div className="content">
        <div className="admin-banner">🔐 Admin Area — Full read/write access to all system data</div>
        <div className="stats-grid">
          <div className="stat-card green"><div className="stat-card-icon">📦</div><div className="stat-card-value">{products.length}</div><div className="stat-card-label">Total Products</div></div>
          <div className="stat-card blue"><div className="stat-card-icon">🛒</div><div className="stat-card-value">{orders.length}</div><div className="stat-card-label">Total Orders</div></div>
          <div className="stat-card orange"><div className="stat-card-icon">⏳</div><div className="stat-card-value">{pending}</div><div className="stat-card-label">Pending</div></div>
          <div className="stat-card green"><div className="stat-card-icon">✅</div><div className="stat-card-value">{completed}</div><div className="stat-card-label">Completed</div></div>
          <div className="stat-card red"><div className="stat-card-icon">❌</div><div className="stat-card-value">{cancelled}</div><div className="stat-card-label">Cancelled</div></div>
          <div className="stat-card purple"><div className="stat-card-icon">💰</div><div className="stat-card-value">${totalValue.toLocaleString("en", { maximumFractionDigits: 0 })}</div><div className="stat-card-label">Inventory Value</div></div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><div className="card-title">📊 Order Status Breakdown</div></div>
          <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Pending", count: pending, pct: pct(pending), color: "var(--warning)" },
              { label: "Completed", count: completed, pct: pct(completed), color: "var(--success)" },
              { label: "Cancelled", count: cancelled, pct: pct(cancelled), color: "var(--danger)" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, marginBottom: 7 }}>
                  <span style={{ color: s.color }}>{s.label}</span>
                  <span className="text-dim">{s.count} orders ({s.pct}%)</span>
                </div>
                <div className="progress-wrap">
                  <div className="progress-bar" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="two-col">
          <div className="card">
            <div className="card-header"><div className="card-title">💎 Top Products by Price</div></div>
            <table className="table">
              <thead><tr><th>#</th><th>Name</th><th>Price</th><th>Qty</th></tr></thead>
              <tbody>
                {topByPrice.map((p, i) => (
                  <tr key={p._id}>
                    <td className="text-dim fw-700">{i + 1}</td>
                    <td className="fw-700 fs-13">{p.name}</td>
                    <td className="text-accent fw-700 mono">${p.price.toFixed(2)}</td>
                    <td className="text-muted">{p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">⚠️ Low Stock Alerts</div>
              <span className={`badge ${lowStock.length > 0 ? "badge-low" : "badge-ok"}`}>{lowStock.length > 0 ? `${lowStock.length} items` : "All good"}</span>
            </div>
            {lowStock.length === 0 ? (
              <div className="empty" style={{ padding: 36 }}>
                <div className="empty-icon">✅</div>
                <div className="empty-title" style={{ fontSize: 14 }}>All products well-stocked</div>
              </div>
            ) : (
              <table className="table">
                <thead><tr><th>Product</th><th>SKU</th><th>Stock</th></tr></thead>
                <tbody>
                  {lowStock.map((p) => (
                    <tr key={p._id}>
                      <td className="fw-700 fs-13">{p.name}</td>
                      <td className="mono text-dim fs-12">{p.sku}</td>
                      <td className={`fw-700 ${p.quantity === 0 ? "text-danger" : "text-warning"}`}>{p.quantity === 0 ? "OUT" : p.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><div className="card-title">📦 Products by Stock Level</div></div>
          <table className="table">
            <thead><tr><th>Rank</th><th>Product</th><th>SKU</th><th>Quantity</th><th>Value</th><th>Status</th></tr></thead>
            <tbody>
              {topByQty.map((p, i) => (
                <tr key={p._id}>
                  <td className="text-dim fw-700">#{i + 1}</td>
                  <td className="fw-700">{p.name}</td>
                  <td className="mono text-dim fs-12">{p.sku}</td>
                  <td className="fw-700">{p.quantity}</td>
                  <td className="text-accent mono">${(p.price * p.quantity).toFixed(2)}</td>
                  <td><span className={`badge ${p.quantity === 0 ? "badge-out" : p.quantity <= 5 ? "badge-low" : "badge-ok"}`}>{p.quantity === 0 ? "Out of Stock" : p.quantity <= 5 ? "Low Stock" : "In Stock"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}