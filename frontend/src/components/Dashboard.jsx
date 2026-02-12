import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <div className="cards">
          <div className="card">
            <h3>Manage Products</h3>
            <p>View, create and manage inventory items.</p>
          </div>
        </div>
      </div>
    </>
  );
}
