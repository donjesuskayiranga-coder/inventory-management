import React, { useState } from "react";
import { createProduct } from "../api/api";

export default function AddProduct({ token, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!token) return;
    const newProduct = await createProduct({ name, price }, token);
    onAdd(newProduct);
    setName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleAdd} className="add-product-form">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
