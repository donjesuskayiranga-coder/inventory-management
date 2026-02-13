import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/api/products", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setProducts(res.data))
    .catch(() => alert("Failed to load products"));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product._id}>
          <h4>{product.name}</h4>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;
