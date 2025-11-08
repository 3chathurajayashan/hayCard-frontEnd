import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://hay-card-back-end.vercel.app/api/sample-assign.js";


export default function SampleAssign() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSamples = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setSamples(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch samples");
    }
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referenceNumber || !documentFile) {
      setError("Reference Number and Document are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("referenceNumber", referenceNumber);
      formData.append("document", documentFile);

      const res = await axios.post(BACKEND_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSamples((prev) => [res.data, ...prev]);
      setReferenceNumber("");
      setDocumentFile(null);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sample Assignment</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border p-4 rounded shadow">
        <input
          type="text"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setDocumentFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Uploaded Samples</h2>
        {samples.length === 0 ? (
          <p>No samples uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {samples.map((s) => (
              <li key={s._id} className="flex justify-between items-center border p-2 rounded">
                <span>{s.referenceNumber}</span>
                <a href={s.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" download>
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
