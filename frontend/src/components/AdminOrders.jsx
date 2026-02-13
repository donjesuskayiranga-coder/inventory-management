import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/api/orders", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setOrders(res.data))
    .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map(order => (
        <div key={order._id}>
          <p>Total: ${order.totalPrice}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
