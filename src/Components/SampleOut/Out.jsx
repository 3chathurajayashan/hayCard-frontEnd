import React, { useState, useEffect } from "react";
import axios from "axios";
const FRONTEND_URL = "https://hay-card-front-end.vercel.app";
export default function SampleOut() {
  const [samples, setSamples] = useState([]);
  const [message, setMessage] = useState(""); // Custom notifications
  const [processingId, setProcessingId] = useState(null); // Track checkbox processing

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const res = await axios.get("https://hay-card-back-end.vercel.app/api/samples/all");
      setSamples(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching samples");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleCheck = async (id) => {
    setProcessingId(id);
    setMessage("Processing sample...");

    try {
      await axios.patch(`https://hay-card-back-end.vercel.app/api/samples/out/${id}`);
      setSamples((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, isOut: true } : s
        )
      );
      setProcessingId(null);
      setMessage("Sample successfully passed out!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setProcessingId(null);
      setMessage("Error passing out sample");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const containerStyle = {
    maxWidth: "750px",
    margin: "50px auto",
    padding: "25px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f6fa",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
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
  };

  const sampleCardHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
  };

  const instructionStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#555",
  };

  const messageStyle = {
    padding: "12px",
    marginBottom: "20px",
    textAlign: "center",
    borderRadius: "8px",
    backgroundColor: "#d1e7dd",
    color: "#0f5132",
    fontWeight: "500",
    transition: "all 0.3s ease",
  };

  const processingStyle = {
    marginLeft: "10px",
    width: "16px",
    height: "16px",
    border: "3px solid #007bff",
    borderTop: "3px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Sample Out</h2>
      <p style={instructionStyle}>
        Tick the checkbox to pass out the customer sample
      </p>

      {message && <div style={messageStyle}>{message}</div>}

      {samples.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>No samples available.</p>
      )}

      {samples.map((sample) => (
        <div
          key={sample._id}
          style={sampleCard}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, sampleCardHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, sampleCard)}
        >
          <span style={{ fontWeight: "500", color: "#333" }}>{sample.referenceNumber}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="checkbox"
                checked={sample.isOut || false}
                disabled={sample.isOut || processingId === sample._id}
                onChange={() => handleCheck(sample._id)}
              />
              {processingId === sample._id && <span style={processingStyle}></span>}
              {sample.isOut && <span style={{ color: "#28a745", fontWeight: "500" }}>Passed Out</span>}
            </div>
          </div>
        </div>
      ))}

      {/* Spin animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
