import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import AddProduct from "./AddProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const isAdmin = user?.role === "admin";

  const fetchProducts = async () => {
    const data = await getProducts(token);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      {isAdmin && <AddProduct token={token} onAdd={(p) => setProducts([...products, p])} />}
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
