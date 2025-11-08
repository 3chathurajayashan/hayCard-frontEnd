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
    }, 2000);
  };

  return (
    <div className="page">
      {/* Animated Background Elements */}
      <div className="bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>Haycarb Laboratory System</h1>
          <p>Your centralized platform for chemical, login, and sample management</p>
        </div>
      </header>

      {/* Custom Notification */}
      {message && (
        <div className="notification-container">
          <div className="notification">
            <div className="notification-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM9 5H11V11H9V5ZM9 13H11V15H9V13Z" fill="currentColor"/>
              </svg>
            </div>
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Advanced Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-container">
              <div className="spinner"></div>
              <div className="spinner-inner"></div>
            </div>
            <p className="loading-text">Authenticating</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="cards">
        {[
          { 
            title: "Chemical", 
            desc: "Manage and track all chemical inventory details.",
            icon: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
          },
          { 
            title: "Logins", 
            desc: "Control and monitor user access and authentication.",
            icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
          },
          { 
            title: "Customer", 
            desc: "Analyze, record, and manage lab sample data easily.",
            icon: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
          },
        ].map((item, i) => (
          <div key={i} className="card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-image">
              <svg className="card-icon" viewBox="0 0 24 24" fill="none">
                <path d={item.icon} fill="currentColor"/>
              </svg>
            </div>
            <div className="card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button onClick={() => handleProceed(item.title)}>
                <span>Proceed</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="card-glow"></div>
          </div>
        ))}
      </div>

      {/* Inline CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* Animated Background Shapes */
        .bg-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          bottom: -150px;
          right: -150px;
          animation-delay: -7s;
        }

        .shape-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(100px, -100px) rotate(90deg); }
          50% { transform: translate(0, -200px) rotate(180deg); }
          75% { transform: translate(-100px, -100px) rotate(270deg); }
        }

        /* Header */
        .header {
          width: 100%;
          padding: 60px 20px;
          position: relative;
          z-index: 1;
          animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .header h1 {
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .header p {
          color: #94a3b8;
          font-size: 1.15rem;
          line-height: 1.6;
        }

        /* Cards Container */
        .cards {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
          margin-top: 60px;
          padding: 0 20px 80px;
          position: relative;
          z-index: 1;
        }

        /* Card */
        .card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(20px);
          width: 360px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          animation: cardEntry 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        @keyframes cardEntry {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(148, 163, 184, 0.3);
        }

        .card:hover .card-glow {
          opacity: 1;
        }

        .card:hover .card-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .card-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
          filter: blur(20px);
        }

        .card-image {
          height: 200px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .card-image::before {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .card-icon {
          width: 80px;
          height: 80px;
          color: #60a5fa;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3));
        }

        .card-content {
          padding: 32px 28px;
        }

        .card-content h2 {
          color: #f1f5f9;
          font-size: 1.75rem;
          margin-bottom: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .card-content p {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .card-content button {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .card-content button:hover {
          transform: translateX(4px);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
        }

        .card-content button svg {
          transition: transform 0.3s ease;
        }

        .card-content button:hover svg {
          transform: translateX(4px);
        }

        /* Custom Notification */
        .notification-container {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 3000;
          animation: notificationSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes notificationSlide {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .notification {
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(20px);
          color: white;
          padding: 16px 24px;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.2);
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 300px;
          animation: notificationPulse 2s ease infinite;
        }

        @keyframes notificationPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .notification-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .notification span {
          font-size: 0.95rem;
          font-weight: 500;
        }

        /* Advanced Loading Overlay */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4000;
          animation: overlayFade 0.3s ease;
        }

        @keyframes overlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .loading-content {
          text-align: center;
        }

        .spinner-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }

        .spinner {
          width: 120px;
          height: 120px;
          border: 4px solid rgba(59, 130, 246, 0.1);
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner-inner {
          position: absolute;
          top: 15px;
          left: 15px;
          width: 90px;
          height: 90px;
          border: 4px solid rgba(139, 92, 246, 0.1);
          border-top: 4px solid #8b5cf6;
          border-radius: 50%;
          animation: spin 0.8s linear infinite reverse;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          margin-top: 32px;
          color: #f1f5f9;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .loading-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 16px;
        }

        .loading-dots span {
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          animation: dotPulse 1.4s infinite ease-in-out;
        }

        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotPulse {
          0%, 60%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        /* Animations */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2.5rem;
          }

          .header p {
            font-size: 1rem;
          }

          .card {
            width: 100%;
            max-width: 400px;
          }

          .notification-container {
            left: 20px;
            right: 20px;
          }

          .notification {
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
}