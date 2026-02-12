import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Inventory Admin</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/add-product">Add Product</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
