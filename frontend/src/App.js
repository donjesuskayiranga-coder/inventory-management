import { useState, useEffect } from "react";
import "./App.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { apiFetch } from "./api/index";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import AdminDashboard from "./components/AdminDashboard";
import AdminProduct from "./components/AdminProducts";
import AdminOrders, { MyOrders } from "./components/AdminOrders";
import AdminUsers from "./components/AdminUsers";

function AppShell() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [page, setPage] = useState(isAdmin ? "admin-overview" : "dashboard");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiFetch("/orders").then(setOrders).catch(() => {});
  }, [page]);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const renderPage = () => {
    switch (page) {
      case "dashboard":      return <Dashboard />;
      case "products":       return <Products />;
      case "orders":         return <MyOrders />;
      case "admin-overview": return <AdminDashboard />;
      case "admin-products": return <AdminProduct />;
      case "admin-orders":   return <AdminOrders />;
      case "admin-users":    return <AdminUsers />;
      default:               return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Navbar page={page} setPage={setPage} pendingCount={pendingCount} />
      <div className="main">{renderPage()}</div>
    </div>
  );
}

function App() {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  if (!user) {
    return mode === "login"
      ? <Login onSwitch={() => setMode("register")} />
      : <Register onSwitch={() => setMode("login")} />;
  }

  return <AppShell />;
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}