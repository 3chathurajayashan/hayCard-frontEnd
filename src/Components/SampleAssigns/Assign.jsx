import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReferenceForm() {
  const [refNumber, setRefNumber] = useState("");
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);

  // Change this to your backend URL if deployed
  const BASE_URL = "https://hay-card-back-end.vercel.app/api/reference";

  // Fetch all references from backend
  const fetchReferences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/`);
      setReferences(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!refNumber) return alert("Enter reference number");
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/add`, { refNumber });
      setRefNumber("");
      fetchReferences(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Reference Number Submission</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Reference Number"
          value={refNumber}
          onChange={(e) => setRefNumber(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <h3 style={{ marginTop: "20px" }}>Submitted References:</h3>
      <ul>
        {references.length === 0 && <li>No references yet.</li>}
        {references.map((ref) => (
          <li key={ref._id}>{ref.refNumber}</li>
        ))}
      </ul>
    </div>
  );
}
