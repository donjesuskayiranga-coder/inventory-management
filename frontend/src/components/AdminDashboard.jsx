import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/products">Manage Products</Link>
      <br />
      <Link to="/admin/orders">View Orders</Link>
    </div>
  );
}

export default AdminDashboard;
