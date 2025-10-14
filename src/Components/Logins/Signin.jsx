import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Handle input change
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!inputs.email.includes("@") || !inputs.email.includes(".")) {
      setError("Please enter a valid email");
      showNotification("Please enter a valid email", "error");
      return;
    }
    if (inputs.password.length < 6) {
      setError("Password must be at least 6 characters");
      showNotification("Password must be at least 6 characters", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        email: inputs.email,
        password: inputs.password,
      });

      // Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const userRole = res.data.user.role;

      showNotification("Login successful! Redirecting...", "success");

      // Redirect based on role
      setTimeout(() => {
        if (userRole === "factory") navigate("/addDashboard");
        else if (userRole === "tester") navigate("/tester");
        else if (userRole === "labadmin") navigate("/editDashboard");
        else navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      showNotification(errorMsg, "error");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {notification.show && (
        <div
          style={{
            ...styles.notification,
            ...(notification.type === "success"
              ? styles.notificationSuccess
              : styles.notificationError),
          }}
        >
          <span style={styles.notificationIcon}>
            {notification.type === "success" ? "✓" : "✕"}
          </span>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Sign In</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleChange}
          style={styles.input}
          required
          disabled={loading}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? (
            <div style={styles.spinnerContainer}>
              <div style={styles.spinner}></div>
              <span style={styles.loadingText}>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}

// --- styles (unchanged) ---
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "300px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    minHeight: "40px",
  },
  buttonDisabled: {
    background: "#6c757d",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
  notification: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: 1000,
    animation: "slideIn 0.3s ease-out",
    minWidth: "250px",
  },
  notificationSuccess: {
    background: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
  },
  notificationError: {
    background: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
  },
  notificationIcon: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  spinnerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #fff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: "16px",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

export default Signin;
