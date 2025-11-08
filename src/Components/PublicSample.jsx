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

  if (loading) {
    // Loading animation
    return (
      <div style={{
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0f7fa, #ffffff)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid #00796b',
          borderTop: '6px solid #e0f7fa',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!sample) return <p style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Poppins, sans-serif' }}>Sample not found.</p>;

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
      padding: '20px',
      minHeight: '100vh',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'fadeIn 0.8s ease-in-out'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <h2 style={{
        color: '#00796b',
        marginBottom: '20px',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)'
      }}>Sample Details - {sample.sampleId}</h2>

      <div style={{
        background: '#fff',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '30px',
        transition: 'all 0.3s ease-in-out',
      }}>
        {[
          ["Request Ref No", sample.requestRefNo],
          ["Sample Ref No", sample.sampleRefNo],
          ["From", sample.from.join(", ")],
          ["To", sample.to],
          ["Route", sample.sampleRoute],
          ["Test Method", sample.testMethod],
          ["Remarks", sample.remarks],
          ["Analysed By", sample.analysedBy],
          ["Created At", new Date(sample.createdAt).toLocaleString()],
          ["Completed Date", sample.completedDate],
          ["Completed Time", sample.completedTime]
        ].map(([label, value], i) => (
          <p key={i} style={{
            margin: '8px 0',
            fontSize: '16px',
            transition: `opacity 0.4s ease ${(i + 1) * 0.1}s`,
            opacity: 1
          }}><strong>{label}:</strong> {value || "-"}</p>
        ))}
      </div>

      <h3 style={{ marginBottom: '15px', color: '#00796b', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Results</h3>
      {sample.results && sample.results.length > 0 ? (
        <table style={{
          borderCollapse: 'collapse',
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ background: '#00796b', color: '#fff', textAlign: 'center' }}>
              <th>#</th>
              <th>As (ppb)</th>
              <th>Sb (ppb)</th>
              <th>Al (ppb)</th>
            </tr>
          </thead>
          <tbody>
            {sample.results.map((r, i) => (
              <tr key={i} style={{
                background: i % 2 === 0 ? '#e0f7fa' : '#ffffff',
                transition: 'background 0.3s'
              }}>
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
