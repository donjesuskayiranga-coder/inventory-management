import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        console.log("Products response:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError("Failed to load products");
        }

      } catch (err) {
        setError("Error fetching products");
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length === 0 && !error && <p>No products available</p>}

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>{product.name}</h3>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
