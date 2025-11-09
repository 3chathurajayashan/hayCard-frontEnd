import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://your-vercel-app.vercel.app/api/documents";

export default function DocumentUploader() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    const res = await axios.get(BACKEND_URL);
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("referenceNumber", referenceNumber);
    formData.append("file", file);

    setLoading(true);
    await axios.post(BACKEND_URL, formData);
    setLoading(false);
    setReferenceNumber("");
    setFile(null);
    fetchDocuments();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Upload Reference Document</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.xlsx,.xls,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">{loading ? "Uploading..." : "Submit"}</button>
      </form>

      <h3>Uploaded Documents</h3>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <b>{doc.referenceNumber}</b> -{" "}
            <a href={doc.fileUrl} target="_blank" rel="noreferrer">
              Download {doc.fileName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
