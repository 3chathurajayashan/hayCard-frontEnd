import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://hay-card-back-end.vercel.app/api/sample-assign";

export default function SampleAssignPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSamples = async () => {
    const res = await axios.get(BACKEND_URL);
    setSamples(res.data);
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referenceNumber || !documentFile) return alert("All fields required");

    setLoading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const documentBase64 = reader.result;

      try {
        const res = await axios.post(BACKEND_URL, {
          referenceNumber,
          documentBase64,
        });

        setSamples((prev) => [res.data, ...prev]);
        setReferenceNumber("");
        setDocumentFile(null);
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(documentFile);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sample Assign Upload</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
        <input
          type="text"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          placeholder="Enter Reference Number"
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          onChange={(e) => setDocumentFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Uploaded Samples</h2>
        {samples.length === 0 ? (
          <p>No samples yet.</p>
        ) : (
          <ul className="space-y-2">
            {samples.map((s) => (
              <li key={s._id} className="flex justify-between border p-2 rounded">
                <span>{s.referenceNumber}</span>
                <a
                  href={s.documentUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
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
