import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

// Replace this with your backend ngrok URL or local URL
const BACKEND_URL = "https://hay-card-back-end.vercel.app";


export default function SampleDetails() {
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Get ID from query params (from QR code)
  const id = searchParams.get("id") || location.pathname.split("/").pop();

  useEffect(() => {
    const fetchSample = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/samples/${id}`);
        console.log("Fetched sample:", res.data); // debug to check results
        setSample(res.data);
      } catch (err) {
        console.error("Error fetching sample:", err);
        setSample(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [id]);

  if (loading) return <p>Loading sample details...</p>;
  if (!sample) return <p>Sample not found.</p>;

  const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleString() : "-");

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Sample Details - {sample.sampleId || "-"}</h2>
      <p><strong>Request Ref:</strong> {sample.requestRefNo || "-"}</p>
      <p><strong>Sample Ref:</strong> {sample.sampleRefNo || "-"}</p>
      <p>
        <strong>From:</strong>{" "}
        {Array.isArray(sample.from) ? sample.from.join(", ") : sample.from || "-"}
      </p>
      <p><strong>To:</strong> {sample.to || "-"}</p>
      <p><strong>Route:</strong> {sample.sampleRoute || "-"}</p>
      <p><strong>Test Method:</strong> {sample.testMethod || "-"}</p>
      <p><strong>Analysed By:</strong> {sample.analysedBy || "-"}</p>
      <p><strong>Completed Date:</strong> {sample.completedDate || "-"}</p>
      <p><strong>Completed Time:</strong> {sample.completedTime || "-"}</p>
      <p><strong>Created At:</strong> {formatDate(sample.createdAt)}</p>
      <p><strong>Received:</strong> {sample.received ? "Yes" : "No"}</p>
      {sample.received && (
        <p>
          <strong>Received Date & Time:</strong>{" "}
          {sample.receivedDate || "-"} {sample.receivedTime || "-"}
        </p>
      )}

      <div style={{ marginTop: "1.5rem" }}>
        <h3>Results:</h3>
        {sample.results && sample.results.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={styles.th}>Row</th>
                <th style={styles.th}>As (ppb)</th>
                <th style={styles.th}>Sb (ppb)</th>
                <th style={styles.th}>Al (ppb)</th>
              </tr>
            </thead>
            <tbody>
              {sample.results.map((r, i) => (
                <tr key={i}>
                  <td style={styles.td}>{i + 1}</td>
                  <td style={styles.td}>{r.As_ppb || "-"}</td>
                  <td style={styles.td}>{r.Sb_ppb || "-"}</td>
                  <td style={styles.td}>{r.Al_ppb || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results entered.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  },
};
