import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LabAdminDashboard() {
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    As_ppb: "",
    Sb_ppb: "",
    Al_ppb: "",
    analysedBy: "",
    completedDate: "",
    completedTime: "",
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/samples", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSamples(res.data);
    } catch (err) {
      console.error("Error fetching samples:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResults = (sample) => {
    setSelectedSample(sample);
    setForm({
      As_ppb: sample.results?.As_ppb || "",
      Sb_ppb: sample.results?.Sb_ppb || "",
      Al_ppb: sample.results?.Al_ppb || "",
      analysedBy: sample.analysedBy || "",
      completedDate: sample.completedDate || "",
      completedTime: sample.completedTime || "",
    });
    setShowForm(true);
  };

  const submitResults = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/samples/${selectedSample._id}`,
        {
          results: {
            As_ppb: form.As_ppb,
            Sb_ppb: form.Sb_ppb,
            Al_ppb: form.Al_ppb,
          },
          analysedBy: form.analysedBy,
          completedDate: form.completedDate,
          completedTime: form.completedTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Results added successfully!");
      setShowForm(false);
      fetchSamples();
    } catch (err) {
      console.error("Error adding results:", err);
      alert("Failed to add results");
    }
  };

  const finalizeSample = async (id) => {
    if (!window.confirm("Are you sure you want to finalize this sample? This action cannot be undone.")) return;
    try {
      await axios.put(
        `http://localhost:5000/samples/${id}`,
        { isFinalized: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Sample finalized successfully!");
      fetchSamples();
    } catch (err) {
      console.error("Error finalizing sample:", err);
      alert("Failed to finalize sample");
    }
  };

  const generateQR = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/samples/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedSample = res.data;
      alert("QR code generated successfully!");
      window.open(updatedSample.qrCodeDataUrl, "_blank");
    } catch (err) {
      console.error("QR generation error:", err);
      alert("Failed to generate QR code");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerText}>
            <h2 style={styles.title}>Lab Admin Dashboard</h2>
            <p style={styles.subtitle}>Welcome, {user?.name || "Lab Admin"}</p>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Samples Table */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>All Samples</h3>
        </div>
        {loading ? (
          <div style={styles.loading}>Loading samples...</div>
        ) : samples.length === 0 ? (
          <div style={styles.emptyState}>No samples found.</div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Sample ID</th>
                  <th style={styles.tableHeader}>Request Ref</th>
                  <th style={styles.tableHeader}>Sample Ref</th>
                  <th style={styles.tableHeader}>From</th>
                  <th style={styles.tableHeader}>To</th>
                  <th style={styles.tableHeader}>Route</th>
                  <th style={styles.tableHeader}>Test Method</th>
                  <th style={styles.tableHeader}>Results (As/Sb/Al)</th>
                  <th style={styles.tableHeader}>Analysed By</th>
                  <th style={styles.tableHeader}>Created Date</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample._id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{sample.sampleId}</td>
                    <td style={styles.tableCell}>{sample.requestRefNo}</td>
                    <td style={styles.tableCell}>{sample.sampleRefNo}</td>
                    <td style={styles.tableCell}>{Array.isArray(sample.from) ? sample.from.join(", ") : sample.from}</td>
                    <td style={styles.tableCell}>{sample.to}</td>
                    <td style={styles.tableCell}>{sample.sampleRoute}</td>
                    <td style={styles.tableCell}>{sample.testMethod}</td>
                    <td style={styles.tableCell}>
                      {sample.results
                        ? `As: ${sample.results.As_ppb || "-"}, Sb: ${sample.results.Sb_ppb || "-"}, Al: ${sample.results.Al_ppb || "-"}`
                        : "Not Entered"}
                    </td>
                    <td style={styles.tableCell}>{sample.analysedBy || "-"}</td>
                    <td style={styles.tableCell}>{new Date(sample.createdAt).toLocaleDateString()}</td>
                    <td style={styles.tableCell}>
                      <span style={sample.isFinalized ? styles.statusFinalized : styles.statusPending}>
                        {sample.isFinalized ? "Finalized" : "Pending"}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionContainer}>
                        <button 
                          style={styles.actionBtn} 
                          onClick={() => handleAddResults(sample)}
                          disabled={sample.isFinalized}
                        >
                          Add Results
                        </button>
                        <button 
                          style={styles.finalizeBtn} 
                          onClick={() => finalizeSample(sample._id)}
                          disabled={sample.isFinalized || !sample.results}
                        >
                          Finalize
                        </button>
                        <button 
                          style={styles.qrBtn} 
                          onClick={() => generateQR(sample._id)}
                          disabled={!sample.isFinalized}
                        >
                          Generate QR
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Popup Form */}
      {showForm && (
        <div style={styles.popup}>
          <div style={styles.popupInner}>
            <div style={styles.popupHeader}>
              <h3 style={styles.popupTitle}>Add / Edit Results</h3>
              <button style={styles.closeBtn} onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={submitResults} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>As (ppb)</label>
                  <input
                    type="number"
                    value={form.As_ppb}
                    onChange={(e) => setForm({ ...form, As_ppb: e.target.value })}
                    style={styles.input}
                    placeholder="Enter As value"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Sb (ppb)</label>
                  <input
                    type="number"
                    value={form.Sb_ppb}
                    onChange={(e) => setForm({ ...form, Sb_ppb: e.target.value })}
                    style={styles.input}
                    placeholder="Enter Sb value"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Al (ppb)</label>
                  <input
                    type="number"
                    value={form.Al_ppb}
                    onChange={(e) => setForm({ ...form, Al_ppb: e.target.value })}
                    style={styles.input}
                    placeholder="Enter Al value"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Analysed By</label>
                  <input
                    type="text"
                    value={form.analysedBy}
                    onChange={(e) => setForm({ ...form, analysedBy: e.target.value })}
                    style={styles.input}
                    placeholder="Enter analyst name"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Completed Date</label>
                  <input
                    type="date"
                    value={form.completedDate}
                    onChange={(e) => setForm({ ...form, completedDate: e.target.value })}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Completed Time</label>
                  <input
                    type="time"
                    value={form.completedTime}
                    onChange={(e) => setForm({ ...form, completedTime: e.target.value })}
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.formActions}>
                <button type="submit" style={styles.saveBtn}>Save Results</button>
                <button type="button" onClick={() => setShowForm(false)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { 
    padding: 30, 
    background: "#f8fafc", 
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    marginBottom: 30
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20
  },
  headerText: {
    flex: 1
  },
  title: { 
    fontSize: 32, 
    marginBottom: 8, 
    color: "#1e293b",
    fontWeight: "600"
  },
  subtitle: { 
    color: "#64748b",
    fontSize: 16,
    margin: 0
  },
  logoutButton: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
    minWidth: 100,
    height: "fit-content"
  },
  card: {
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: 30,
    overflow: "hidden"
  },
  cardHeader: {
    background: "#8dc63f",
    padding: "20px 24px"
  },
  cardTitle: {
    color: "#ffffff",
    margin: 0,
    fontSize: 20,
    fontWeight: "600"
  },
  tableContainer: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14
  },
  tableHeader: {
    background: "#f1f5f9",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap"
  },
  tableRow: {
    borderBottom: "1px solid #e5e7eb",
    transition: "background 0.2s ease"
  },
  tableCell: {
    padding: "12px 16px",
    color: "#374151",
    borderBottom: "1px solid #f1f5f9",
    whiteSpace: "nowrap"
  },
  statusFinalized: {
    color: "#059669",
    fontWeight: "500",
    fontSize: 13,
    padding: "4px 8px",
    borderRadius: 4,
    background: "#f0fdf4"
  },
  statusPending: {
    color: "#d97706",
    fontWeight: "500",
    fontSize: 13,
    padding: "4px 8px",
    borderRadius: 4,
    background: "#fffbeb"
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 120
  },
  actionBtn: {
    padding: "6px 12px",
    background: "#059669",
    color: "#ffffff",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s ease"
  },
  finalizeBtn: {
    padding: "6px 12px",
    background: "#1e40af",
    color: "#ffffff",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s ease"
  },
  qrBtn: {
    padding: "6px 12px",
    background: "#7c3aed",
    color: "#ffffff",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s ease"
  },
  loading: {
    padding: 40,
    textAlign: "center",
    color: "#64748b",
    fontSize: 16
  },
  emptyState: {
    padding: 40,
    textAlign: "center",
    color: "#64748b",
    fontSize: 16
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  popupInner: {
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    width: "90%",
    maxWidth: 600,
    maxHeight: "90vh",
    overflow: "auto"
  },
  popupHeader: {
    background: "#8dc63f",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  popupTitle: {
    color: "#ffffff",
    margin: 0,
    fontSize: 18,
    fontWeight: "600"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: 24,
    cursor: "pointer",
    padding: 0,
    width: 30,
    height: 30,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    padding: 24
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    marginBottom: 24
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: 6,
    color: "#374151",
    fontSize: 14,
    fontWeight: "500"
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: "#ffffff",
    transition: "all 0.2s ease",
    width: "100%",
    boxSizing: "border-box"
  },
  formActions: {
    display: "flex",
    gap: 12,
    justifyContent: "flex-end"
  },
  saveBtn: {
    background: "#1e40af",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
    minWidth: 120
  },
  cancelBtn: {
    background: "#6b7280",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
    minWidth: 100
  }
};