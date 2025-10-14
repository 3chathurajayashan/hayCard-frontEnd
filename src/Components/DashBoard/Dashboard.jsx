import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/sign"); // redirect if not logged in
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) return null; // or a loader

  const renderContent = () => {
    switch (user.role) {
      case "superadmin":
        return (
          <div>
            <h2>Superadmin Dashboard</h2>
            <p>Welcome, {user.name}! You can manage all users and system settings.</p>
            {/* Add superadmin specific components here */}
          </div>
        );
      case "labadmin":
        return (
          <div>
            <h2>Lab Admin Dashboard</h2>
            <p>Welcome, {user.name}! You can view and manage lab samples.</p>
            {/* Add labadmin specific components here */}
          </div>
        );
      case "technician":
        return (
          <div>
            <h2>Technician Dashboard</h2>
            <p>Welcome, {user.name}! You can update sample statuses and track work.</p>
            {/* Add technician specific components here */}
          </div>
        );
      case "factory":
        return (
          <div>
            <h2>Factory Dashboard</h2>
            <p>Welcome, {user.name}! You can register new samples and view your history.</p>
            {/* Add factory specific components here */}
          </div>
        );
      case "driver":
        return (
          <div>
            <h2>Driver Dashboard</h2>
            <p>Welcome, {user.name}! You can see pickup/delivery assignments.</p>
            {/* Add driver specific components here */}
          </div>
        );
      default:
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Role not recognized.</p>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <h1>HeyCrab Dashboard</h1>
      {renderContent()}
      <button
        style={styles.logoutBtn}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  logoutBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Dashboard;
