import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FactoryDashboard() {
  const [samples, setSamples] = useState([]);
  const [form, setForm] = useState({
    requestRefNo: "",
    sampleRefNo: "",
    to: "Haycarb Colombo Lab",
    from: "",
    remarks: "",
    sampleInTime: "",
    sampleInDate: "",
    gatePassNo: "",
    sampleReceivedTime: "",
    sampleReceivedDate: "",
    sampleRoute: "",
    testMethod: "",
    results: { As_ppb: "", Sb_ppb: "", Al_ppb: "" },
    analysedBy: "",
    completedTime: "",
    completedDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["As_ppb", "Sb_ppb", "Al_ppb"].includes(name)) {
      setForm({ ...form, results: { ...form.results, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCreateSample = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await axios.post("http://localhost:5000/samples", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        requestRefNo: "",
        sampleRefNo: "",
        to: "Haycarb Colombo Lab",
        from: "",
        remarks: "",
        sampleInTime: "",
        sampleInDate: "",
        gatePassNo: "",
        sampleReceivedTime: "",
        sampleReceivedDate: "",
        sampleRoute: "",
        testMethod: "",
        results: { As_ppb: "", Sb_ppb: "", Al_ppb: "" },
        analysedBy: "",
        completedTime: "",
        completedDate: "",
      });
      await fetchSamples();
      alert("Sample created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create sample");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sample?")) return;
    try {
      await axios.delete(`http://localhost:5000/samples/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchSamples();
    } catch (err) {
      console.error(err);
      alert("Failed to delete sample");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Hay Carb Factory Dashboard</h2>
        <p style={styles.subtitle}>Welcome, {user?.name || "Factory User"}</p>
      </div>

      {/* Create New Sample */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Create New Sample</h3>
        </div>
        <form onSubmit={handleCreateSample} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Request Reference No</label>
              <input
                type="text"
                name="requestRefNo"
                value={form.requestRefNo}
                onChange={handleChange}
                placeholder="Enter Request Ref No"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sample Ref No</label>
              <input
                type="text"
                name="sampleRefNo"
                value={form.sampleRefNo}
                onChange={handleChange}
                placeholder="Enter Sample Ref No"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>To</label>
              <input 
                type="text" 
                name="to" 
                value="Haycarb Colombo Lab" 
                disabled 
                style={styles.input} 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>From</label>
              <select name="from" value={form.from} onChange={handleChange} required style={styles.input}>
                <option value="">Select From</option>
                <option value="HCM">HCM</option>
                <option value="HCB">HCB</option>
                <option value="HCM HCB">HCM & HCB</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Remarks</label>
              <input
                type="text"
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Any remarks"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sample IN Date</label>
              <input
                type="date"
                name="sampleInDate"
                value={form.sampleInDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sample IN Time</label>
              <input
                type="time"
                name="sampleInTime"
                value={form.sampleInTime}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Gate Pass No</label>
              <input
                type="text"
                name="gatePassNo"
                value={form.gatePassNo}
                onChange={handleChange}
                placeholder="Enter Gate Pass No"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sample Received Date (HO Lab)</label>
              <input
                type="date"
                name="sampleReceivedDate"
                value={form.sampleReceivedDate}
                onChange={handleChange}
                readOnly={user.role === "factory"}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sample Received Time (HO Lab)</label>
              <input
                type="time"
                name="sampleReceivedTime"
                value={form.sampleReceivedTime}
                onChange={handleChange}
                readOnly={user.role === "factory"}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Sample Route</label>
              <select
                name="sampleRoute"
                value={form.sampleRoute}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Select Route</option>
                <option value="Direct from Madampe">Direct from Madampe</option>
                <option value="Direct from Badalgama">Direct from Badalgama</option>
                <option value="Through Wewalduwa">Through Wewalduwa</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Test Method</label>
              <input
                type="text"
                name="testMethod"
                value={form.testMethod}
                onChange={handleChange}
                placeholder="Enter Test Method"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Results (PPb)</label>
              <div style={styles.resultsContainer}>
                <input
                  type="number"
                  name="As_ppb"
                  placeholder="As"
                  value={form.results.As_ppb}
                  onChange={handleChange}
                  style={styles.resultInput}
                />
                <input
                  type="number"
                  name="Sb_ppb"
                  placeholder="Sb"
                  value={form.results.Sb_ppb}
                  onChange={handleChange}
                  style={styles.resultInput}
                />
                <input
                  type="number"
                  name="Al_ppb"
                  placeholder="Al"
                  value={form.results.Al_ppb}
                  onChange={handleChange}
                  style={styles.resultInput}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Analysed By</label>
              <input
                type="text"
                name="analysedBy"
                value={form.analysedBy}
                onChange={handleChange}
                placeholder="Enter Analyst Name"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Completion Date</label>
              <input
                type="date"
                name="completedDate"
                value={form.completedDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Completion Time</label>
              <input
                type="time"
                name="completedTime"
                value={form.completedTime}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
          <button type="submit" style={styles.button} disabled={creating}>
            {creating ? "Creating..." : "Create Sample"}
          </button>
        </form>
      </div>

      {/* Sample List */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Your Samples</h3>
        </div>
        {loading ? (
          <div style={styles.loading}>Loading samples...</div>
        ) : samples.length === 0 ? (
          <div style={styles.emptyState}>No samples created yet.</div>
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
                  <th style={styles.tableHeader}>Remarks</th>
                  <th style={styles.tableHeader}>Sample IN Date</th>
                  <th style={styles.tableHeader}>Sample IN Time</th>
                  <th style={styles.tableHeader}>Gate Pass No</th>
                  <th style={styles.tableHeader}>Sample Received Date</th>
                  <th style={styles.tableHeader}>Sample Received Time</th>
                  <th style={styles.tableHeader}>Route</th>
                  <th style={styles.tableHeader}>Test Method</th>
                  <th style={styles.tableHeader}>Results (As/Sb/Al)</th>
                  <th style={styles.tableHeader}>Analysed By</th>
                  <th style={styles.tableHeader}>Completion Date</th>
                  <th style={styles.tableHeader}>Completion Time</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>QR</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((s) => (
                  <tr key={s._id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{s.sampleId}</td>
                    <td style={styles.tableCell}>{s.requestRefNo}</td>
                    <td style={styles.tableCell}>{s.sampleRefNo}</td>
                    <td style={styles.tableCell}>{s.from}</td>
                    <td style={styles.tableCell}>{s.to}</td>
                    <td style={styles.tableCell}>{s.remarks}</td>
                    <td style={styles.tableCell}>{s.sampleInDate}</td>
                    <td style={styles.tableCell}>{s.sampleInTime}</td>
                    <td style={styles.tableCell}>{s.gatePassNo}</td>
                    <td style={styles.tableCell}>{s.sampleReceivedDate}</td>
                    <td style={styles.tableCell}>{s.sampleReceivedTime}</td>
                    <td style={styles.tableCell}>{s.sampleRoute}</td>
                    <td style={styles.tableCell}>{s.testMethod}</td>
                    <td style={styles.tableCell}>
                      As: {s.results?.As_ppb || "-"}, Sb: {s.results?.Sb_ppb || "-"}, Al: {s.results?.Al_ppb || "-"}
                    </td>
                    <td style={styles.tableCell}>{s.analysedBy}</td>
                    <td style={styles.tableCell}>{s.completedDate}</td>
                    <td style={styles.tableCell}>{s.completedTime}</td>
                    <td style={styles.tableCell}>
                      <span style={s.isFinalized ? styles.statusFinalized : styles.statusPending}>
                        {s.isFinalized ? "Finalized" : "Pending"}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {s.qrCodeDataUrl && <img src={s.qrCodeDataUrl} alt="QR" style={styles.qrImage} />}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionContainer}>
                        <button style={styles.actionBtn} onClick={() => alert("Edit functionality pending")}>
                          Edit
                        </button>
                        <button style={styles.deleteBtn} onClick={() => handleDelete(s._id)}>
                          Delete
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
    textAlign: "center",
    marginBottom: 30
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
  form: {
    padding: 24
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
    transition: "all 0.2s ease"
  },
  resultsContainer: {
    display: "flex",
    gap: 8
  },
  resultInput: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: "#ffffff"
  },
  button: {
    background: "#1e40af",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s ease",
    minWidth: 140
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
    fontSize: 13
  },
  statusPending: {
    color: "#d97706",
    fontWeight: "500",
    fontSize: 13
  },
  qrImage: {
    width: 60,
    height: 60,
    borderRadius: 4
  },
  actionContainer: {
    display: "flex",
    gap: 8
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
  deleteBtn: {
    padding: "6px 12px",
    background: "#dc2626",
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
  }
};