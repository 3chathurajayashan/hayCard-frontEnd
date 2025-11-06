import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomerSamplePage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [document, setDocument] = useState(null);
  const [samples, setSamples] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
  try {
    const res = await axios.get("https://hay-card-back-end.vercel.app/api/samples/all");
    console.log("Fetched samples:", res.data); // 👈 add this
    setSamples(res.data);
  } catch (err) {
    console.error("Error fetching samples:", err);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referenceNumber || !document) {
      setMessage("Please provide reference number and document");
      return;
    }

    const formData = new FormData();
    formData.append("referenceNumber", referenceNumber);
    formData.append("document", document);

    try {
     await axios.post("https://hay-card-back-end.vercel.app/api/samples/add", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

      setMessage("Sample added successfully!");
      setReferenceNumber("");
      setDocument(null);
      fetchSamples();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding sample");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: "750px",
    margin: "50px auto",
    padding: "25px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f6fa",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  };

  const inputStyle = {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    padding: "14px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s all ease",
  };

  const buttonHover = {
    backgroundColor: "#0056b3",
    transform: "scale(1.03)",
  };

  const messageStyle = {
    padding: "12px",
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "500",
    animation: "fadeIn 0.5s ease",
  };

  const sampleCard = {
    background: "#fff",
    padding: "18px",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const sampleCardHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Customer Sample Upload</h2>

      {message && <div style={messageStyle}>{message}</div>}

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          required
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
        <input
          style={inputStyle}
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => setDocument(e.target.files[0])}
          required
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => {
            Object.assign(e.currentTarget.style, buttonHover);
          }}
          onMouseOut={(e) => {
            Object.assign(e.currentTarget.style, buttonStyle);
          }}
        >
          Submit
        </button>
      </form>

      <h3 style={{ marginBottom: "20px", color: "#555" }}>Uploaded Samples</h3>
      {samples.length === 0 && <p style={{ textAlign: "center", color: "#888" }}>No samples uploaded yet.</p>}
      {samples.map((sample) => (
        <div
          key={sample._id}
          style={sampleCard}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, sampleCardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, sampleCard)}
        >
          <span style={{ fontWeight: "500", color: "#333" }}>{sample.referenceNumber}</span>
          <a
            href={`https://hay-card-back-end.vercel.app/${sample.documentPath}`}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "500",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
