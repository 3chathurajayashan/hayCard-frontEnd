import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

// Public backend URL
const BACKEND_URL = "https://hay-card-back-end.vercel.app";

export default function SampleDetails() {
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get ID from query params
  const id = searchParams.get("id") || location.pathname.split("/").pop();

  useEffect(() => {
    const fetchSample = async () => {
      if (!id) {
        setError("Sample ID not provided");
        setLoading(false);
        return;
      }

      try {
        // PUBLIC GET request (no Authorization)
        const res = await axios.get(`${BACKEND_URL}/samples/public/${id}`);
        setSample(res.data);
      } catch (err) {
        console.error("Error fetching sample:", err);
        setError("Failed to fetch sample data.");
        setSample(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [id]);

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <p>Loading sample details...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-state">
      <p>{error}</p>
    </div>
  );
  
  if (!sample) return (
    <div className="not-found-state">
      <p>Sample not found.</p>
    </div>
  );

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString() : "-");

  return (
    <div className="sample-details-container">
      <div className="sample-details-card">
        <div className="sample-header">
          <h2>Sample Details</h2>
          <div className="sample-ref-badge">
            {sample.sampleRefNo || "-"}
          </div>
        </div>
        
        <div className="details-grid">
          <div className="detail-item">
            <strong>Request Ref</strong>
            <p>{sample.requestRefNo || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Sample Ref</strong>
            <p>{sample.sampleRefNo || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>From</strong>
            <p>{Array.isArray(sample.from) ? sample.from.join(", ") : sample.from || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>To</strong>
            <p>{sample.to || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Route</strong>
            <p>{sample.sampleRoute || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Test Method</strong>
            <p>{sample.testMethod || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Analysed By</strong>
            <p>{sample.analysedBy || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Completed Date</strong>
            <p>{sample.completedDate || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Completed Time</strong>
            <p>{sample.completedTime || "-"}</p>
          </div>
          
          <div className="detail-item">
            <strong>Created At</strong>
            <p>{formatDate(sample.createdAt)}</p>
          </div>
          
          <div className="detail-item">
            <strong>Received</strong>
            <p>{sample.received ? "Yes" : "No"}</p>
          </div>
          
          {sample.received && (
            <div className="detail-item">
              <strong>Received Date & Time</strong>
              <p>{sample.receivedDate || "-"} {sample.receivedTime || "-"}</p>
            </div>
          )}
        </div>

        <div className="results-section">
          <h3>Results</h3>
          {sample.results && sample.results.length > 0 ? (
            <div className="results-table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>As (ppb)</th>
                    <th>Sb (ppb)</th>
                    <th>Al (ppb)</th>
                  </tr>
                </thead>
                <tbody>
                  {sample.results.map((r, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{r.As_ppb ?? "-"}</td>
                      <td>{r.Sb_ppb ?? "-"}</td>
                      <td>{r.Al_ppb ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results">
              <p>No results entered.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}