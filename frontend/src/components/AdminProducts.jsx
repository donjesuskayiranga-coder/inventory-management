import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadProducts = () => {
    axios.get("http://localhost:7000/api/products", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setProducts(res.data))
    .catch(() => alert("Failed to load products"));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    try {
      await axios.post(
        "http://localhost:7000/api/products",
        { name, sku, price, quantity },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      loadProducts();
    } catch {
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h2>Admin Products</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="SKU" onChange={e => setSku(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Quantity" onChange={e => setQuantity(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>

      {products.map(product => (
        <div key={product._id}>
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
