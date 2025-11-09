import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReferenceForm() {
  const [refNumber, setRefNumber] = useState("");
  const [file, setFile] = useState(null);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingReferences, setFetchingReferences] = useState(true);

  const BASE_URL = "https://hay-card-back-end.vercel.app/api/reference";

  const fetchReferences = async () => {
    setFetchingReferences(true);
    try {
      const res = await axios.get(BASE_URL);
      setReferences(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingReferences(false);
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

  const downloadFile = (fileData, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${fileData}`;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          padding: 40px;
          margin-bottom: 30px;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header {
          margin-bottom: 32px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 14px;
          color: #718096;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .input {
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          transition: all 0.3s ease;
          outline: none;
        }

        .input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .file-input-wrapper {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 100%;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          background: #f7fafc;
          border: 2px dashed #cbd5e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          color: #4a5568;
        }

        .file-input-label:hover {
          border-color: #667eea;
          background: #edf2f7;
        }

        .file-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .file-name {
          margin-top: 8px;
          font-size: 13px;
          color: #667eea;
          font-weight: 500;
        }

        .submit-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .reference-list {
          list-style: none;
        }

        .reference-item {
          background: #f7fafc;
          padding: 16px 20px;
          border-radius: 8px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          animation: slideIn 0.4s ease-out;
          border: 1px solid #e2e8f0;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .reference-item:hover {
          background: #edf2f7;
          border-color: #cbd5e0;
          transform: translateX(4px);
        }

        .reference-number {
          font-weight: 600;
          color: #2d3748;
          font-size: 15px;
        }

        .download-btn {
          padding: 8px 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .download-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #718096;
        }

        .skeleton-loader {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
          height: 60px;
          margin-bottom: 12px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .note-badge {
          display: inline-block;
          background: #edf2f7;
          color: #4a5568;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 8px;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="header">
            <h1 className="title">Reference Submission</h1>
            <p className="subtitle">Submit your reference documents securely</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">
                Reference Number
                <span className="note-badge">Required</span>
              </label>
              <input
                type="text"
                placeholder="Enter reference number"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                className="input"
              />
            </div>

            <div className="form-group">
              <label className="label">
                Attach Document
                <span className="note-badge">Optional</span>
              </label>
              <div className="file-input-wrapper">
                <label className="file-input-label">
                  <span>Choose file or drag here</span>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input"
                  />
                </label>
              </div>
              {file && <div className="file-name">{file.name}</div>}
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="loader"></span>
                  Processing...
                </>
              ) : (
                "Submit Reference"
              )}
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="section-title">
            Submitted References
            <span className="note-badge">Assign Samples</span>
          </h2>

          {fetchingReferences ? (
            <>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
              <div className="skeleton-loader"></div>
            </>
          ) : (
            <ul className="reference-list">
              {references.length === 0 ? (
                <div className="empty-state">
                  <p>No references submitted yet</p>
                </div>
              ) : (
                references.map((ref) => (
                  <li key={ref._id} className="reference-item">
                    <span className="reference-number">{ref.refNumber}</span>
                    {ref.fileData && (
                      <button
                        onClick={() => downloadFile(ref.fileData, ref.fileName)}
                        className="download-btn"
                      >
                        Download
                      </button>
                    )}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}