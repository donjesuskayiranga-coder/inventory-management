import { useState, useEffect } from "react";
import { apiFetch } from "../api/index";
import AddProduct from "./AddProduct";

function Loading() {
  return <div className="spinner-wrap"><div className="spinner" /> Loading...</div>;
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const load = () => {
    setLoading(true);
    apiFetch("/products")
      .then((p) => { setProducts(p); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditProduct(null); setShowModal(true); };
  const openEdit = (p) => { setEditProduct(p); setShowModal(true); };

  const del = async (id) => {
    try { await apiFetch(`/products/${id}`, { method: "DELETE" }); load(); }
    catch (e) { alert(e.message); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Manage Products</div>
          <div className="page-sub">{products.length} products in inventory</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Product</button>
      </div>
      <div className="content">
        <div className="admin-banner">🔐 Admin — Create, edit, and delete products</div>
        <div className="card">
          {loading ? <Loading /> : products.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📦</div>
              <div className="empty-title">No products yet</div>
              <div className="empty-sub">Click "Add Product" to get started</div>
            </div>
          ) : (
            <table className="table">
              <thead><tr><th>Name</th><th>SKU</th><th>Price</th><th>Quantity</th><th>Description</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td className="fw-700">{p.name}</td>
                    <td className="mono text-dim fs-12">{p.sku}</td>
                    <td className="text-accent fw-700 mono">${Number(p.price).toFixed(2)}</td>
                    <td><span className={p.quantity === 0 ? "text-danger fw-700" : p.quantity <= 5 ? "text-warning fw-700" : "text-muted"}>{p.quantity}</span></td>
                    <td className="text-muted fs-12" style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description || "—"}</td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn btn-icon" onClick={() => openEdit(p)}>✏️</button>
                        <button className="btn btn-icon" onClick={() => del(p._id)} style={{ color: "var(--danger)" }}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showModal && (
        <AddProduct editProduct={editProduct} onClose={() => setShowModal(false)} onSaved={load} />
      )}
    </div>
  );
}