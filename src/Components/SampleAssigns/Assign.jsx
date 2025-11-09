import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://your-vercel-app.vercel.app/api/upload-document";

export default function DocumentUploader() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch all uploaded documents
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setDocuments(res.data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !referenceNumber) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("referenceNumber", referenceNumber);
    formData.append("file", file);

    try {
      setUploading(true);
      await axios.post(BACKEND_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setReferenceNumber("");
      setFile(null);
      fetchDocuments();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload file!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Upload Reference Document
      </h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />

        <input
          type="file"
          accept=".pdf,.xlsx,.xls,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: "0.7rem",
            fontSize: "1rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {/* Uploaded Documents */}
      <h3>Uploaded Documents</h3>
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {documents.map((doc) => (
            <li
              key={doc._id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <b>{doc.referenceNumber}</b> - {doc.fileName}
              </span>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "#4f46e5",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                }}
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
