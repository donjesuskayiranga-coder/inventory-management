import { useState } from "react";
import { apiFetch } from "../api/index";

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

export default function AddProduct({ onClose, onSaved, editProduct = null }) {
  const [form, setForm] = useState({
    name: editProduct?.name || "",
    sku: editProduct?.sku || "",
    price: editProduct?.price || "",
    quantity: editProduct?.quantity || "",
    description: editProduct?.description || "",
  });
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    if (!form.name || !form.sku || !form.price) return setErr("Name, SKU and Price are required");
    setSaving(true);
    setErr("");
    try {
      const body = { ...form, price: Number(form.price), quantity: Number(form.quantity) };
      if (editProduct) {
        await apiFetch(`/products/${editProduct._id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        await apiFetch("/products", { method: "POST", body: JSON.stringify(body) });
      }
      onSaved();
      onClose();
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={editProduct ? "Edit Product" : "Add Product"} onClose={onClose}>
      {err && <div className="alert alert-error">{err}</div>}
      <div className="form-group">
        <label className="form-label">Name *</label>
        <input className="form-input" placeholder="Product name" value={form.name} onChange={set("name")} />
      </div>
      <div className="form-group">
        <label className="form-label">SKU *</label>
        <input className="form-input" placeholder="SKU-001" value={form.sku} onChange={set("sku")} />
      </div>
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Price *</label>
          <input className="form-input" type="number" step="0.01" placeholder="0.00" value={form.price} onChange={set("price")} />
        </div>
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input className="form-input" type="number" placeholder="0" value={form.quantity} onChange={set("quantity")} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" placeholder="Optional…" value={form.description} onChange={set("description")} />
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : editProduct ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </Modal>
  );
}