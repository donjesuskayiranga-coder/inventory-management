import { useState } from "react";
import { createProduct } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await createProduct({ name, price, quantity }, token);
    navigate("/products");
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
          <input type="number" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} required />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}
