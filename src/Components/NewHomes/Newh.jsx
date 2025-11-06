import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProceed = (section) => {
    setLoading(true);
    setMessage(`Processing ${section} section...`);

    setTimeout(() => {
      setLoading(false);
      setMessage("");

      if (section === "Chemical") {
        navigate("/chemHome");
      }else if(section ==="Customer"){
         navigate("/cushome");
      } else if(section === "Logins"){
        navigate("/preSign")
      }
      
      else {
        setMessage(`Proceeding to ${section} section...`);
        setTimeout(() => setMessage(""), 2500);
      }
    }, 2000); // ⏳ Processing delay
  };

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <h1>Haycarb Laboratory System</h1>
        <p>Your centralized platform for chemical, login, and sample management</p>
      </header>

      {/* Notification */}
      {message && <div className="notification">{message}</div>}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Authenticating...</p>
        </div>
      )}

      {/* Cards Section */}
      <div className="cards">
        {[
          { title: "Chemical", desc: "Manage and track all chemical inventory details." },
          { title: "Logins", desc: "Control and monitor user access and authentication." },
          { title: "Customer", desc: "Analyze, record, and manage lab sample data easily." },
        ].map((item, i) => (
          <div key={i} className="card">
            <div className="card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button onClick={() => handleProceed(item.title)}>Proceed</button>
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #e9eef5, #f9fafc);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* Header */
        .header {
          width: 100%;
          text-align: center;
          padding: 80px 20px 60px;
          background: linear-gradient(135deg, #1d2d50 0%, #243a73 100%);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          animation: fadeDown 0.8s ease;
          color: white;
        }

        .header h1 {
          font-size: 3rem;
          font-weight: 600;
        }

        .header p {
          margin-top: 12px;
          color: rgba(255,255,255,0.85);
          font-size: 1.1rem;
        }

        /* Cards Container */
        .cards {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 50px;
          margin-top: 80px;
          padding: 0 20px 60px;
          animation: fadeUp 0.9s ease;
        }

        /* Card */
        .card {
          background: #ffffff;
          width: 360px;
          height: 320px;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(29,45,80,0.08);
          transition: all 0.4s ease;
          overflow: hidden;
          border: 1px solid rgba(228,232,240,0.5);
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(29,45,80,0.15);
          border-color: rgba(162,182,223,0.3);
        }

        .card-content {
          text-align: center;
          padding: 40px 25px;
        }

        .card-content h2 {
          color: #1d2d50;
          font-size: 1.8rem;
          margin-bottom: 15px;
        }

        .card-content p {
          color: #5a6473;
          font-size: 1rem;
          margin-bottom: 35px;
        }

        .card-content button {
          background: linear-gradient(135deg, #1d2d50 0%, #243a73 100%);
          color: white;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(29,45,80,0.2);
          transition: all 0.3s ease;
        }

        .card-content button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(29,45,80,0.3);
        }

        /* Notification */
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #1d2d50;
          color: white;
          padding: 15px 28px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          animation: slideIn 0.4s ease forwards, fadeOut 2.5s ease forwards 0.5s;
          z-index: 1000;
        }

        /* Loading Overlay */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .loader {
          width: 60px;
          height: 60px;
          border: 6px solid #c7d2fe;
          border-top: 6px solid #1d2d50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-overlay p {
          margin-top: 20px;
          color: #1d2d50;
          font-weight: 500;
          font-size: 1.1rem;
          animation: pulse 1.5s infinite;
        }

        /* Animations */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; transform: translateX(100px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
