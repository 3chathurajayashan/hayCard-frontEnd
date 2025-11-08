import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import your images (place them in src/assets/)
import storageImg from "../../assets/str1.jpg";
import purchasingImg from "../../assets/str2.jpg";

function ChemHome() {
  const [message, setMessage] = useState("");
  const [loadingCard, setLoadingCard] = useState(null); // Track which card is loading
  const navigate = useNavigate();

  const handleNext = (section) => {
    setLoadingCard(section); // show loading animation
    setMessage(`Navigating to ${section}...`);

    setTimeout(() => {
      setMessage("");
      setLoadingCard(null);
      if (section === "Chemical Storage") navigate("/storage");
      if (section === "Chemical Purchasing") navigate("/purchasing");
    }, 2000); // 2 seconds loading animation
  };

  const cards = [
    {
      title: "Chemical Storage",
      desc: "Safely manage and monitor chemical stock levels.",
      image: storageImg,
    },
    {
      title: "Chemical Purchasing",
      desc: "Track and record purchasing details efficiently.",
      image: purchasingImg,
    },
  ];

  return (
    <div className="chem-page">
      {/* Header */}
      <header className="chem-header">
        <h1>Chemical Management Portal</h1>
        <p>Manage, monitor, and organize all laboratory chemical operations</p>
      </header>

      {/* Notification */}
      {message && <div className="notification">{message}</div>}

      {/* Cards Section */}
      <div className="chem-card-container">
        {cards.map((item, i) => (
          <div key={i} className="chem-card">
            <div className="chem-card-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="chem-card-content">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button onClick={() => handleNext(item.title)}>
                {loadingCard === item.title ? "Loading..." : "Next"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .chem-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, #eaf0f9, #f6f9fc);
        }

        .chem-header {
          width: 100%;
          text-align: center;
          padding: 70px 20px 40px;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-bottom: 3px solid #e1e7f0;
          animation: fadeDown 0.8s ease;
        }

        .chem-header h1 {
          font-size: 2.8rem;
          color: #1d2d50;
        }

        .chem-header p {
          margin-top: 10px;
          color: #5c6475;
          font-size: 1.1rem;
        }

        .chem-card-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 80px;
          margin-top: 100px;
          animation: fadeUp 0.9s ease;
        }

        .chem-card {
          width: 420px;
          background: #ffffff;
          border-radius: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .chem-card:hover {
          transform: translateY(-15px) scale(1.03);
          box-shadow: 0 15px 45px rgba(0,0,0,0.15);
        }

        .chem-card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
          border-top-left-radius: 25px;
          border-top-right-radius: 25px;
        }

        .chem-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .chem-card:hover .chem-card-image img {
          transform: scale(1.05);
        }

        .chem-card-content {
          padding: 30px;
          text-align: center;
        }

        .chem-card-content h2 {
          font-size: 2rem;
          color: #1d2d50;
          margin-bottom: 15px;
        }

        .chem-card-content p {
          color: #5c6475;
          font-size: 1.05rem;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .chem-card-content button {
          background: #1d2d50;
          color: #fff;
          border: none;
          padding: 14px 34px;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chem-card-content button:hover {
          background: #2a3c6a;
          transform: scale(1.07);
        }

        .notification {
          position: fixed;
          top: 25px;
          right: 25px;
          background: #1d2d50;
          color: white;
          padding: 16px 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.25);
          font-weight: 500;
          animation: slideIn 0.4s ease forwards, fadeOut 2.6s ease forwards 0.5s;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(70px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeOut {
          0%, 80% { opacity: 1; }
          100% { opacity: 0; transform: translateX(100px); }
        }

        @media (max-width: 768px) {
          .chem-card {
            width: 90%;
          }
          .chem-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ChemHome;
