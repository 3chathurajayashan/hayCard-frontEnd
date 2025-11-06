import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this import

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // <-- Initialize navigation

  const handleProceed = (section) => {
    if (section === "Chemical") {
      navigate("/chemHome"); // <-- Navigate to /new
      return;
    }

    // For others, show notification only
    setMessage(`Proceeding to ${section} section...`);
    setTimeout(() => setMessage(""), 2800);
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

      {/* Cards Section */}
      <div className="cards">
        {[
          { title: "Chemical", desc: "Manage and track all chemical inventory details." },
          { title: "Logins", desc: "Control and monitor user access and authentication." },
          { title: "Samples", desc: "Analyze, record, and manage lab sample data easily." },
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
        }

        /* Header */
        .header {
          width: 100%;
          text-align: center;
          padding: 60px 20px 40px;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-bottom: 3px solid #e4e8f0;
          animation: fadeDown 0.8s ease;
        }

        .header h1 {
          font-size: 2.8rem;
          color: #243a73;
        }

        .header p {
          margin-top: 10px;
          color: #5a6473;
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
          width: 350px;
          height: 300px;
          border-radius: 22px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #a2b6df50, #ffffff00);
          opacity: 0;
          transition: 0.4s;
        }

        .card:hover::before {
          opacity: 1;
        }

        .card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .card-content {
          position: relative;
          z-index: 2;
          padding: 40px 25px;
          text-align: center;
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
          background: #1d2d50;
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .card-content button:hover {
          background: #2a3c6a;
          transform: scale(1.05);
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
          font-weight: 500;
          opacity: 0;
          animation: slideIn 0.4s ease forwards, fadeOut 2.5s ease forwards 0.5s;
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

        /* Responsive */
        @media (max-width: 768px) {
          .card {
            width: 90%;
            height: auto;
          }
          .header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
