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

  const handleReceivedChange = async (sample, checked) => {
    try {
      await axios.put(
        `http://localhost:5000/samples/samples/${sample._id}/received`,
        { received: checked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSamples();
    } catch (err) {
      console.error("Error updating received status:", err);
      alert("Failed to update received status");
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>Lab Admin Dashboard</h1>
            <p style={styles.subtitle}>Welcome, {user?.name || "Lab Admin"}</p>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Samples</h2>
            <button 
              style={styles.refreshButton}
              onClick={fetchSamples}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
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
                    <th style={styles.tableHeader}>Results</th>
                    <th style={styles.tableHeader}>Analysed By</th>
                    <th style={styles.tableHeader}>Created</th>
                    <th style={styles.tableHeader}>Received</th>
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
                      <td style={styles.tableCell}>
                        {Array.isArray(sample.from) ? sample.from.join(", ") : sample.from}
                      </td>
                      <td style={styles.tableCell}>{sample.to}</td>
                      <td style={styles.tableCell}>{sample.sampleRoute}</td>
                      <td style={styles.tableCell}>{sample.testMethod}</td>
                      <td style={styles.tableCell}>
                        {sample.results
                          ? `As: ${sample.results.As_ppb || "-"}, Sb: ${sample.results.Sb_ppb || "-"}, Al: ${sample.results.Al_ppb || "-"}`
                          : "Not Entered"}
                      </td>
                      <td style={styles.tableCell}>{sample.analysedBy || "-"}</td>
                      <td style={styles.tableCell}>
                        {new Date(sample.createdAt).toLocaleDateString()}
                      </td>
                      <td style={styles.tableCell}>
                        <input
                          type="checkbox"
                          checked={sample.received || false}
                          onChange={(e) => handleReceivedChange(sample, e.target.checked)}
                          disabled={sample.isFinalized}
                          style={styles.checkbox}
                        />
                        {sample.received && (
                          <div style={styles.receivedInfo}>
                            {sample.receivedDate} {sample.receivedTime}
                          </div>
                        )}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={sample.isFinalized ? styles.statusFinalized : styles.statusPending}>
                          {sample.isFinalized ? "Finalized" : "Pending"}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionContainer}>
                          <button 
                            style={{
                              ...styles.button,
                              ...styles.primaryButton,
                              ...(sample.isFinalized && styles.disabledButton)
                            }} 
                            onClick={() => handleAddResults(sample)}
                            disabled={sample.isFinalized}
                          >
                            Add Results
                          </button>
                          <button 
                            style={{
                              ...styles.button,
                              ...styles.successButton,
                              ...((sample.isFinalized || !sample.results) && styles.disabledButton)
                            }} 
                            onClick={() => finalizeSample(sample._id)}
                            disabled={sample.isFinalized || !sample.results}
                          >
                            Finalize
                          </button>
                          <button 
                            style={{
                              ...styles.button,
                              ...styles.infoButton,
                              ...(!sample.isFinalized && styles.disabledButton)
                            }} 
                            onClick={() => generateQR(sample._id)}
                            disabled={!sample.isFinalized}
                          >
                            QR Code
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
      </div>

      {/* Results Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {selectedSample?.results ? "Edit Results" : "Add Results"}
              </h3>
              <button 
                style={styles.closeButton} 
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={submitResults} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>As (ppb)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.As_ppb}
                    onChange={(e) => setForm({ ...form, As_ppb: e.target.value })}
                    style={styles.input}
                    placeholder="Enter As value"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Sb (ppb)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.Sb_ppb}
                    onChange={(e) => setForm({ ...form, Sb_ppb: e.target.value })}
                    style={styles.input}
                    placeholder="Enter Sb value"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Al (ppb)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.Al_ppb}
                    onChange={(e) => setForm({ ...form, Al_ppb: e.target.value })}
                    style={styles.input}
                    placeholder="Enter Al value"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Analysed By</label>
                  <input
                    type="text"
                    value={form.analysedBy}
                    onChange={(e) => setForm({ ...form, analysedBy: e.target.value })}
                    style={styles.input}
                    placeholder="Enter analyst name"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Completed Date</label>
                  <input
                    type="date"
                    value={form.completedDate}
                    onChange={(e) => setForm({ ...form, completedDate: e.target.value })}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
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
                <button 
                  type="button" 
                  style={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.submitButton}>
                  Save Results
                </button>
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
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "1rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  subtitle: {
    margin: "0.25rem 0 0 0",
    color: "#bdc3c7",
    fontSize: "0.9rem",
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  content: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #ecf0f1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#2c3e50",
  },
  refreshButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  loading: {
    padding: "3rem",
    textAlign: "center",
    color: "#7f8c8d",
  },
  emptyState: {
    padding: "3rem",
    textAlign: "center",
    color: "#95a5a6",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1000px",
  },
  tableHeader: {
    padding: "1rem",
    textAlign: "left",
    fontWeight: "600",
    color: "#2c3e50",
    fontSize: "0.8rem",
    borderBottom: "2px solid #ecf0f1",
    backgroundColor: "#f8f9fa",
    textTransform: "uppercase",
  },
  tableRow: {
    borderBottom: "1px solid #ecf0f1",
  },
  tableRowHover: {
    backgroundColor: "#f8f9fa",
  },
  tableCell: {
    padding: "1rem",
    fontSize: "0.85rem",
    color: "#2c3e50",
    verticalAlign: "middle",
  },
  checkbox: {
    margin: 0,
  },
  receivedInfo: {
    fontSize: "0.75rem",
    color: "#7f8c8d",
    marginTop: "0.25rem",
  },
  statusFinalized: {
    color: "#27ae60",
    fontWeight: "600",
    fontSize: "0.8rem",
  },
  statusPending: {
    color: "#e67e22",
    fontWeight: "600",
    fontSize: "0.8rem",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    minWidth: "120px",
  },
  button: {
    padding: "0.5rem 0.75rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#3498db",
    color: "white",
  },
  successButton: {
    backgroundColor: "#27ae60",
    color: "white",
  },
  infoButton: {
    backgroundColor: "#95a5a6",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#bdc3c7",
    color: "#7f8c8d",
    cursor: "not-allowed",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "1rem",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflow: "auto",
  },
  modalHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #ecf0f1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    margin: 0,
    fontSize: "1.25rem",
    color: "#2c3e50",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#7f8c8d",
    padding: 0,
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: "1.5rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#2c3e50",
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
  formActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
  },
  cancelButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "transparent",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    color: "#7f8c8d",
  },
  submitButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
};