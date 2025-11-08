import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.webp';

function Signin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 4000);
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
      setError("Please enter a valid email address");
      showNotification("Please enter a valid email address", "error");
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
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMsg);
      showNotification(errorMsg, "error");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Custom Notification */}
      {notification.show && (
        <div style={{
          ...styles.notification,
          ...(notification.type === "success" ? styles.notificationSuccess : styles.notificationError)
        }}>
          <div style={styles.notificationContent}>
            <div style={styles.notificationIcon}>
              {notification.type === "success" ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              )}
            </div>
            <div style={styles.notificationText}>
              <div style={styles.notificationTitle}>
                {notification.type === "success" ? "Success" : "Error"}
              </div>
              <div style={styles.notificationMessage}>{notification.message}</div>
            </div>
            <button 
              onClick={() => setNotification({ show: false, message: "", type: "" })}
              style={styles.notificationClose}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div style={styles.notificationProgress}>
            <div style={{
              ...styles.notificationProgressBar,
              animation: `progress 4s linear forwards`,
              backgroundColor: notification.type === "success" ? '#8dc63f' : '#dc3545'
            }}></div>
          </div>
        </div>
      )}

      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.logoContainer}>
              <img src={logo} alt="Company Logo" style={styles.logoImage} />
               
            </div>
            <h1 style={styles.title}>Sign In</h1>
            <p style={styles.subtitle}>Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {error && (
              <div style={styles.errorBox}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={styles.errorIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {error}
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={inputs.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
                <div style={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#6c757d">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputContainer}>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={inputs.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  disabled={loading}
                />
                <div style={styles.inputIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#6c757d">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonLoading : {})
              }}
              disabled={loading}
            >
              {loading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.spinner}></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.footerLine}></div>
            <p style={styles.footerText}>
              Secure enterprise authentication system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
  },
  loginContainer: {
    width: "100%",
    maxWidth: "440px",
  },
  loginCard: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
    padding: "48px 40px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    animation: "slideUp 0.5s ease-out",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  logoImage: {
    width: "158px",
    height: "108px",
    objectFit: "contain",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2c3e50",
    letterSpacing: "0.5px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#2c3e50",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6c757d",
    margin: 0,
    fontWeight: "400",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  errorBox: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #f5c6cb",
    animation: "slideDown 0.3s ease-out",
  },
  errorIcon: {
    color: "#dc3545",
    flexShrink: 0,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: "4px",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "14px 48px 14px 16px",
    borderRadius: "8px",
    border: "2px solid #e9ecef",
    fontSize: "15px",
    background: "#f8f9fa",
    transition: "all 0.2s ease",
    outline: "none",
    fontFamily: "inherit",
  },
  inputIcon: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
  },
  submitButton: {
    width: "100%",
    padding: "16px 24px",
    borderRadius: "8px",
    border: "none",
    background: "#8dc63f",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    marginTop: "8px",
    position: "relative",
    overflow: "hidden",
  },
  submitButtonLoading: {
    background: "#7cb32e",
    cursor: "not-allowed",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  footer: {
    marginTop: "32px",
    textAlign: "center",
  },
  footerLine: {
    height: "1px",
    background: "#e9ecef",
    marginBottom: "20px",
  },
  footerText: {
    fontSize: "12px",
    color: "#6c757d",
    margin: 0,
  },
  // Notification Styles
  notification: {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "380px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    animation: "slideInRight 0.3s ease-out",
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  notificationSuccess: {
    borderTop: "3px solid #8dc63f",
  },
  notificationError: {
    borderTop: "3px solid #dc3545",
  },
  notificationContent: {
    padding: "16px 20px",
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  notificationIcon: {
    flexShrink: 0,
    marginTop: "2px",
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "2px",
  },
  notificationMessage: {
    fontSize: "13px",
    color: "#6c757d",
    lineHeight: "1.4",
  },
  notificationClose: {
    background: "none",
    border: "none",
    color: "#6c757d",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    transition: "background 0.2s ease",
    flexShrink: 0,
  },
  notificationProgress: {
    width: "100%",
    height: "3px",
    background: "rgba(0, 0, 0, 0.1)",
  },
  notificationProgressBar: {
    height: "100%",
    width: "100%",
    transformOrigin: "left",
  },
};

// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideDown {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes progress {
    0% { transform: scaleX(1); }
    100% { transform: scaleX(0); }
  }
  
  /* Input focus effects */
  input:focus {
    border-color: #8dc63f !important;
    background: white !important;
    box-shadow: 0 0 0 3px rgba(141, 198, 63, 0.1) !important;
  }
  
  /* Button hover effects */
  button:not(:disabled):hover {
    background: #7cb32e !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(141, 198, 63, 0.3);
  }
  
  /* Notification close button hover */
  .notification-close:hover {
    background: rgba(0, 0, 0, 0.05) !important;
  }
  
  /* Responsive design */
  @media (max-width: 480px) {
    .login-card {
      padding: 32px 24px;
      margin: 0 16px;
    }
    
    .notification {
      width: calc(100% - 48px);
      right: 16px;
      left: 16px;
    }
    
    .logo-image {
      width: 40px;
      height: 40px;
    }
    
    .logo-text {
      font-size: 14px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Signin;