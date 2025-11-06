import React from "react";
import { FaFlask, FaTasks, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SampleMenu() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Sample In",
      icon: <FaFlask size={60} />,
      description: "Register new samples received for laboratory testing.",
      color: "#0056b3",
      link: "/samplein",
    },
    {
      title: "Sample Assign",
      icon: <FaTasks size={60} />,
      description: "Assign received samples to laboratory technicians.",
      color: "#2e7d32",
      link: "/sample-assign",
    },
    {
      title: "Sample Out",
      icon: <FaTruck size={60} />,
      description: "Dispatch completed samples and finalize reports.",
      color: "#b71c1c",
      link: "/sample-out",
    },
  ];

  return (
    <motion.div
      className="sample-menu-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="menu-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Laboratory Sample Management
      </motion.h2>

      <div className="card-grid">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="menu-card"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            style={{ borderTop: `5px solid ${card.color}` }}
          >
            <div className="card-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button
              className="menu-btn"
              style={{ backgroundColor: card.color }}
              onClick={() => navigate(card.link)}
            >
              Open
            </button>
          </motion.div>
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

        .sample-menu-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa, #e9edf3);
          padding: 60px 20px;
        }

        .menu-title {
          font-size: 2.4rem;
          font-weight: 600;
          color: #1c1c1c;
          margin-bottom: 60px;
          text-align: center;
          letter-spacing: 0.5px;
        }

        .card-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 50px;
          width: 100%;
          max-width: 1100px;
        }

        .menu-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 40px 30px;
          text-align: center;
          width: 330px;
          transition: all 0.3s ease;
        }

        .menu-card:hover {
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
          transform: translateY(-5px);
        }

        .card-icon {
          margin-bottom: 20px;
        }

        .menu-card h3 {
          font-size: 1.5rem;
          color: #222;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .menu-card p {
          color: #555;
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 30px;
        }

        .menu-btn {
          padding: 12px 30px;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .menu-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }

        @media (max-width: 900px) {
          .card-grid {
            flex-direction: column;
            gap: 35px;
          }
        }
      `}</style>
    </motion.div>
  );
}
