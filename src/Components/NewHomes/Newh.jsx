import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleProceed = (section) => {
    if (section === "Chemical") {
      navigate("/chemHome");
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
          padding: 80px 20px 60px;
          background: linear-gradient(135deg, #1d2d50 0%, #243a73 100%);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          position: relative;
          overflow: hidden;
          animation: fadeDown 0.8s ease;
        }

        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 40%;
          height: 200%;
          background: radial-gradient(circle, rgba(162,182,223,0.15) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite;
        }

        .header h1 {
          font-size: 3rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 2;
        }

        .header p {
          margin-top: 12px;
          color: rgba(255,255,255,0.85);
          font-size: 1.15rem;
          font-weight: 300;
          position: relative;
          z-index: 2;
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
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(228,232,240,0.5);
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #1d2d50, #243a73, #2a3c6a);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .card:hover::before {
          transform: scaleX(1);
        }

        .card::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(162,182,223,0.08) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .card:hover::after {
          opacity: 1;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(29,45,80,0.15);
          border-color: rgba(162,182,223,0.3);
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
          font-weight: 600;
        }

        .card-content p {
          color: #5a6473;
          font-size: 1rem;
          margin-bottom: 35px;
          line-height: 1.6;
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
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(29,45,80,0.2);
          position: relative;
          overflow: hidden;
        }

        .card-content button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .card-content button:hover::before {
          width: 300px;
          height: 300px;
        }

        .card-content button:hover {
          transform: translateY(-2px);
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
          font-weight: 500;
          opacity: 0;
          animation: slideIn 0.4s ease forwards, fadeOut 2.5s ease forwards 0.5s;
          z-index: 1000;
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

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
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
          .header p {
            font-size: 1rem;
          }
          .cards {
            margin-top: 40px;
            gap: 30px;
          }
        }
      `}</style>
    </div>
  );
}