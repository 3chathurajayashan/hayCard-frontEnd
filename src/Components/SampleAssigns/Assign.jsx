import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReferenceForm() {
  const [refNumber, setRefNumber] = useState("");
  const [file, setFile] = useState(null);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://hay-card-back-end.vercel.app/api/reference";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!refNumber) return alert("Enter reference number");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("refNumber", refNumber);
      if (file) formData.append("document", file);

      await axios.post(`${BASE_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRefNumber("");
      setFile(null);
      fetchReferences();
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
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <h3 style={{ marginTop: "20px" }}>Submitted References:</h3>
      <ul>
        {references.length === 0 && <li>No references yet.</li>}
        {references.map((ref) => (
          <li key={ref._id}>
            {ref.refNumber} {ref.document && <a href={ref.document} target="_blank" rel="noreferrer">[View Document]</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
