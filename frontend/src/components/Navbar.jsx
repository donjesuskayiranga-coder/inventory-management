import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setUser }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/products">Products</Link>
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
