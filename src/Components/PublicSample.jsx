import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BACKEND_URL = "https://hay-card-back-end.vercel.app";

export default function PublicSample() {
  const { id } = useParams(); // URL like /sample/public/:id
  const [sample, setSample] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/samples/public/${id}`);
        setSample(res.data);
      } catch (err) {
        console.error(err);
        setSample(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSample();
  }, [id]);

  if (loading) return <p>Loading sample...</p>;
  if (!sample) return <p>Sample not found.</p>;

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
      padding: '20px',
      minHeight: '100vh',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ color: '#00796b' }}>Sample Details - {sample.sampleId}</h2>
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px'
      }}>
        <p><strong>Request Ref No:</strong> {sample.requestRefNo}</p>
        <p><strong>Sample Ref No:</strong> {sample.sampleRefNo}</p>
        <p><strong>From:</strong> {sample.from.join(", ")}</p>
        <p><strong>To:</strong> {sample.to}</p>
        <p><strong>Route:</strong> {sample.sampleRoute}</p>
        <p><strong>Test Method:</strong> {sample.testMethod}</p>
        <p><strong>Remarks:</strong> {sample.remarks}</p>
        <p><strong>Analysed By:</strong> {sample.analysedBy}</p>
        <p><strong>Created At:</strong> {new Date(sample.createdAt).toLocaleString()}</p>
        <p><strong>Completed Date:</strong> {sample.completedDate}</p>
        <p><strong>Completed Time:</strong> {sample.completedTime}</p>
      </div>

      <h3>Results</h3>
      {sample.results && sample.results.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
          <thead>
            <tr style={{ background: '#00796b', color: '#fff' }}>
              <th>#</th><th>As (ppb)</th><th>Sb (ppb)</th><th>Al (ppb)</th>
            </tr>
          </thead>
          <tbody>
            {sample.results.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center', border: '1px solid #00796b' }}>{i + 1}</td>
                <td style={{ textAlign: 'center', border: '1px solid #00796b' }}>{r.As_ppb}</td>
                <td style={{ textAlign: 'center', border: '1px solid #00796b' }}>{r.Sb_ppb}</td>
                <td style={{ textAlign: 'center', border: '1px solid #00796b' }}>{r.Al_ppb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>No results found.</p>}
    </div>
  );
}
