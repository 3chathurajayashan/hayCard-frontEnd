import React from "react";

const MaintenancePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.gearWrapper}>
        <div style={styles.gear}></div>
        <div style={{ ...styles.gear, ...styles.reverseGear }}></div>
      </div>
      <h1 style={styles.title}>This Site is Under Maintenance</h1>
      <p style={styles.text}>
        We’re currently working hard to improve your experience. Please check back soon.
      </p>
    </div>
  );
};

// CSS in JS styling
const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#f1f5f9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: "600",
    marginTop: "30px",
    letterSpacing: "1px",
    animation: "fadeIn 2s ease-in-out",
  },
  text: {
    fontSize: "1rem",
    marginTop: "10px",
    maxWidth: "400px",
    lineHeight: "1.5",
    opacity: 0.8,
    animation: "fadeIn 3s ease-in-out",
  },
  gearWrapper: {
    position: "relative",
    width: "120px",
    height: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gear: {
    position: "absolute",
    width: "80px",
    height: "80px",
    border: "8px solid #f1f5f9",
    borderRadius: "50%",
    borderTopColor: "transparent",
    animation: "spin 4s linear infinite",
  },
  reverseGear: {
    width: "50px",
    height: "50px",
    borderWidth: "6px",
    animation: "spinReverse 3s linear infinite",
  },
};

// Add animations globally
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spinReverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

export default MaintenancePage;
