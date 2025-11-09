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
          background: #0a0f0d;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        .card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
          padding: 50px;
          margin-bottom: 40px;
          animation: fadeInUp 0.7s ease-out;
          border: 1px solid #e8e8e8;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #10b981, #059669);
          animation: slideRight 2s ease-in-out infinite;
        }

        @keyframes slideRight {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header {
          margin-bottom: 40px;
          border-left: 4px solid #10b981;
          padding-left: 20px;
        }

        .title {
          font-size: 32px;
          font-weight: 800;
          color: #0a0f0d;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }

        .subtitle {
          font-size: 15px;
          color: #6b7280;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .label {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          background: #fafafa;
        }

        .input:focus {
          border-color: #10b981;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
          transform: translateY(-2px);
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
          padding: 24px 20px;
          background: #f9fafb;
          border: 3px dashed #d1d5db;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          color: #4b5563;
          font-weight: 600;
        }

        .file-input-label:hover {
          border-color: #10b981;
          background: #ecfdf5;
          transform: scale(1.02);
        }

        .file-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .file-name {
          margin-top: 12px;
          font-size: 14px;
          color: #10b981;
          font-weight: 600;
          padding: 8px 16px;
          background: #ecfdf5;
          border-radius: 8px;
          display: inline-block;
        }

        .submit-btn {
          width: 100%;
          padding: 18px 28px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.5s;
        }

        .submit-btn:hover:not(:disabled)::before {
          left: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.35);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loader {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.7s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .section-title {
          font-size: 24px;
          font-weight: 800;
          color: #0a0f0d;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -0.5px;
        }

        .reference-list {
          list-style: none;
        }

        .reference-item {
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
          padding: 20px 24px;
          border-radius: 12px;
          margin-bottom: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideIn 0.5s ease-out;
          border: 2px solid #f3f4f6;
          position: relative;
          overflow: hidden;
        }

        .reference-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #10b981;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .reference-item:hover::before {
          transform: scaleY(1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .reference-item:hover {
          background: #ffffff;
          border-color: #10b981;
          transform: translateX(8px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .reference-number {
          font-weight: 700;
          color: #1f2937;
          font-size: 16px;
          letter-spacing: 0.3px;
        }

        .download-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .download-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .download-btn:active {
          transform: scale(1.02);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #9ca3af;
        }

        .empty-state-text {
          font-size: 15px;
          font-weight: 600;
        }

        .skeleton-loader {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: loading 1.4s infinite;
          border-radius: 12px;
          height: 70px;
          margin-bottom: 14px;
          border: 2px solid #f9fafb;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .note-badge {
          display: inline-flex;
          align-items: center;
          background: #ecfdf5;
          color: #065f46;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          margin-left: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid #d1fae5;
        }

        .header-badge {
          background: #0a0f0d;
          color: #10b981;
          border: 1px solid #10b981;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="header">
            <h1 className="title">Reference Submission</h1>
            <p className="subtitle">Submit your reference documents securely</p>
          </div>

          <div onSubmit={handleSubmit}>
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

            <button type="button" onClick={handleSubmit} disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="loader"></span>
                  Processing
                </>
              ) : (
                "Submit Reference"
              )}
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">
            Submitted References
            <span className="note-badge header-badge">Assign Samples</span>
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
                  <p className="empty-state-text">No references submitted yet</p>
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