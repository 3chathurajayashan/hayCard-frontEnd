import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReferenceForm() {
  const [refNumber, setRefNumber] = useState("");
  const [file, setFile] = useState(null);
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingReferences, setFetchingReferences] = useState(true);
  const [notification, setNotification] = useState(null);

  const BASE_URL = "https://hay-card-back-end.vercel.app/api/reference";

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

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
    if (!refNumber) {
      showNotification("Please enter a reference number", "error");
      return;
    }
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
      showNotification("Reference submitted successfully", "success");
    } catch (err) {
      console.error(err);
      showNotification("Submission failed. Please try again", "error");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (fileData, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${fileData}`;
    link.download = fileName;
    link.click();
    showNotification("Download started", "info");
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
          background: linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 50px 20px;
        }

        .card {
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.1);
          padding: 48px;
          margin-bottom: 32px;
          animation: fadeInUp 0.6s ease-out;
          border: 2px solid rgba(59, 130, 246, 0.1);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #3b82f6, #10b981, #3b82f6);
          background-size: 200% 100%;
          animation: gradientShift 3s linear infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
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
          margin-bottom: 36px;
        }

        .title {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }

        .subtitle {
          font-size: 16px;
          color: #64748b;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 26px;
        }

        .label {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }

        .input {
          width: 100%;
          padding: 16px 20px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          background: #f8fafc;
        }

        .input:focus {
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
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
          gap: 10px;
          padding: 28px 20px;
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
          border: 3px dashed #93c5fd;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          color: #475569;
          font-weight: 600;
        }

        .file-input-label:hover {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%);
          transform: translateY(-2px);
        }

        .file-input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .file-name {
          margin-top: 12px;
          font-size: 14px;
          color: #3b82f6;
          font-weight: 600;
          padding: 10px 18px;
          background: #eff6ff;
          border-radius: 10px;
          display: inline-block;
          border: 1px solid #bfdbfe;
        }

        .submit-btn {
          width: 100%;
          padding: 18px 32px;
          background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-btn:hover:not(:disabled)::after {
          width: 300px;
          height: 300px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .section-title {
          font-size: 26px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -0.5px;
        }

        .reference-list {
          list-style: none;
        }

        .reference-item {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          padding: 22px 26px;
          border-radius: 14px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideIn 0.4s ease-out;
          border: 2px solid #e2e8f0;
          position: relative;
        }

        .reference-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: linear-gradient(180deg, #3b82f6, #10b981);
          border-radius: 14px 0 0 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .reference-item:hover::before {
          opacity: 1;
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
          background: #ffffff;
          border-color: #3b82f6;
          transform: translateX(6px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
        }

        .reference-number {
          font-weight: 700;
          color: #1e293b;
          font-size: 16px;
        }

        .download-btn {
          padding: 10px 22px;
          background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .download-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        }

        .download-btn:active {
          transform: scale(0.98);
        }

        .empty-state {
          text-align: center;
          padding: 50px 20px;
          color: #94a3b8;
        }

        .empty-state-text {
          font-size: 15px;
          font-weight: 600;
        }

        .skeleton-loader {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 14px;
          height: 72px;
          margin-bottom: 12px;
          border: 2px solid #f8fafc;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .note-badge {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%);
          color: #1e40af;
          padding: 5px 12px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          margin-left: 8px;
          letter-spacing: 0.3px;
          border: 1px solid #93c5fd;
        }

        .notification {
          position: fixed;
          top: 24px;
          right: 24px;
          padding: 18px 24px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          max-width: 400px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 2px solid;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(400px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .notification.success {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #065f46;
          border-color: #6ee7b7;
        }

        .notification.error {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          color: #991b1b;
          border-color: #fca5a5;
        }

        .notification.info {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #1e40af;
          border-color: #93c5fd;
        }

        .notification-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 16px;
        }

        .notification.success .notification-icon {
          background: #10b981;
          color: white;
        }

        .notification.error .notification-icon {
          background: #ef4444;
          color: white;
        }

        .notification.info .notification-icon {
          background: #3b82f6;
          color: white;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: currentColor;
          opacity: 0.4;
          animation: shrink 4s linear;
        }

        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div className="container">
        {notification && (
          <div className={`notification ${notification.type}`}>
            <div className="notification-icon">
              {notification.type === 'success' && '✓'}
              {notification.type === 'error' && '✕'}
              {notification.type === 'info' && 'i'}
            </div>
            <span>{notification.message}</span>
            <div className="progress-bar"></div>
          </div>
        )}

        <div className="card">
          <div className="header">
            <h1 className="title">Reference Submission</h1>
            <p className="subtitle">Submit your reference documents securely and efficiently</p>
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