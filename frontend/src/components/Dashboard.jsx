import React from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.username}</h1>
      <p>Role: {user?.role}</p>
    </div>
  );
}
