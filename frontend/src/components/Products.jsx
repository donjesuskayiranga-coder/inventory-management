import { useState, useEffect } from "react";
import { apiFetch } from "../api/index";

function Loading() {
  return <div className="spinner-wrap"><div className="spinner" /> Loading...</div>;
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        {children}
      </div>
    </div>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderModal, setOrderModal] = useState(null);
  const [qty, setQty] = useState(1);
  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    apiFetch("/products")
      .then((p) => { setProducts(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const placeOrder = async () => {
    setPlacing(true);
    try {
      await apiFetch("/orders", {
        method: "POST",
        body: JSON.stringify({ products: [{ product: orderModal._id, quantity: Number(qty) }] }),
      });
      setMsg("✅ Order placed successfully!");
      setTimeout(() => { setOrderModal(null); setMsg(""); }, 1400);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Products</div>
          <div className="page-sub">{products.length} items available</div>
        </div>
        <div className="page-header-actions">
          <input className="search-input" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="content">
        <div className="card">
          {loading ? <Loading /> : filtered.length === 0 ? (
            <div className="empty"><div className="empty-icon">📦</div><div className="empty-title">No products found</div></div>
          ) : (
            <table className="table">
              <thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Description</th><th></th></tr></thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id}>
                    <td className="fw-700">{p.name}</td>
                    <td className="mono text-dim fs-12">{p.sku}</td>
                    <td className="text-accent fw-700 mono">${Number(p.price).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${p.quantity === 0 ? "badge-out" : p.quantity <= 5 ? "badge-low" : "badge-ok"}`}>
                        {p.quantity === 0 ? "Out of Stock" : p.quantity <= 5 ? `Low (${p.quantity})` : `In Stock (${p.quantity})`}
                      </span>
                    </td>
                    <td className="text-muted fs-12" style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description || "—"}</td>
                    <td>
                      <button className="btn btn-sm btn-success" disabled={p.quantity === 0} onClick={() => { setOrderModal(p); setQty(1); setMsg(""); }}>Order</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {orderModal && (
        <Modal title={`Order: ${orderModal.name}`} onClose={() => setOrderModal(null)}>
          {msg && <div className={`alert ${msg.startsWith("✅") ? "alert-success" : "alert-error"}`}>{msg}</div>}
          <div className="form-group">
            <label className="form-label">Unit Price</label>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)", fontFamily: "var(--mono)" }}>${Number(orderModal.price).toFixed(2)}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Quantity (max {orderModal.quantity})</label>
            <input className="form-input" type="number" min={1} max={orderModal.quantity} value={qty} onChange={(e) => setQty(e.target.value)} />
          </div>
          <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 4 }}>
            Total: <strong style={{ color: "var(--accent)", fontFamily: "var(--mono)" }}>${(orderModal.price * qty).toFixed(2)}</strong>
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={() => setOrderModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={placeOrder} disabled={placing || msg.startsWith("✅")}>{placing ? "Placing…" : "Place Order"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}