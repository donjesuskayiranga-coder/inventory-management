import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: 10, background: "#222", color: "white" }}>
      <Link to="/products" style={{ color: "white", marginRight: 10 }}>Products</Link>

      {role === "admin" && (
        <>
          <Link to="/admin" style={{ color: "white", marginRight: 10 }}>Admin</Link>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
