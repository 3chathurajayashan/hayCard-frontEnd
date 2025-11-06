import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa"; // back icon

export default function ChemicalRequestPage() {
  const [formData, setFormData] = useState({
    chemicalName: "",
    quantity: "",
    handOverRange: "",
    customChemical: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const chemicalOptions = [
    "Hydrochloric Acid",
    "Sulfuric Acid",
    "Ethanol",
    "Sodium Hydroxide",
    "Ammonia Solution",
    "Acetone",
    "Other",
  ];

  const handoverOptions = [
    "Within 1 Week",
    "Within 2 Weeks",
    "Within 3 Weeks",
    "Within 1 Month",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "chemicalName" && value !== "Other" && { customChemical: "" }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setShowNotification(false);

    try {
      const submissionData = {
        chemicalName: formData.chemicalName,
        customChemical:
          formData.chemicalName === "Other" ? formData.customChemical : "",
        quantity: formData.quantity,
        handOverRange: formData.handOverRange,
      };

      const res = await axios.post(
        "https://hay-card-back-end.vercel.app/api/chemicals/add",
        submissionData
      );

      setMessage(res.data.message || "✅ Request sent successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);

      setFormData({
        chemicalName: "",
        quantity: "",
        handOverRange: "",
        customChemical: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error submitting form");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => window.history.back();

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
          min-height: 100vh;
        }

        .page-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          position: relative;
        }

        .form-container {
          background: white;
          padding: 48px 40px;
          border-radius: 20px;
          max-width: 560px;
          width: 100%;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          border: 1px solid #e1e8f0;
          position: relative;
        }

        .back-btn {
          position: absolute;
          top: 18px;
          left: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          cursor: pointer;
          transition: 0.3s;
        }

        .back-btn:hover {
          background: #e2e8f0;
          transform: scale(1.1);
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1a365d;
          text-align: center;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #64748b;
          font-size: 15px;
          text-align: center;
          margin-bottom: 30px;
        }

        label {
          font-weight: 600;
          color: #374151;
          display: block;
          margin-bottom: 8px;
        }

        .required::after {
          content: " *";
          color: #dc2626;
        }

        input, select {
          width: 100%;
          padding: 12px 14px;
          font-size: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          margin-bottom: 20px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        input:focus, select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          font-weight: 600;
          font-size: 16px;
          padding: 14px 0;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59,130,246,0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Notification (popup style) */
        .notification {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          background: white;
          padding: 20px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 35px rgba(0,0,0,0.15);
          font-size: 16px;
          font-weight: 600;
          animation: popUp 0.4s ease forwards;
          z-index: 1000;
        }

        .notification.success {
          border-left: 6px solid #10b981;
          color: #065f46;
        }

        .notification.error {
          border-left: 6px solid #ef4444;
          color: #991b1b;
        }

        @keyframes popUp {
          from { opacity: 0; transform: translate(-50%, -40%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes fadeOut {
          to { opacity: 0; transform: translate(-50%, -60%) scale(0.95); }
        }
      `}</style>

      <div className="page-container">
        <div className="form-container">
          <button className="back-btn" onClick={goBack} title="Go Back">
            <FaArrowLeft color="#1e293b" />
          </button>

          <h1 className="title">Chemical Request Form</h1>
          <p className="subtitle">Submit your chemical requirement below</p>

          <form onSubmit={handleSubmit}>
            <label className="required">Chemical Name</label>
            <select
              name="chemicalName"
              value={formData.chemicalName}
              onChange={handleChange}
              required
            >
              <option value="">Select Chemical</option>
              {chemicalOptions.map((chem, i) => (
                <option key={i} value={chem}>
                  {chem}
                </option>
              ))}
            </select>

            {formData.chemicalName === "Other" && (
              <input
                type="text"
                name="customChemical"
                placeholder="Enter specific chemical name"
                value={formData.customChemical}
                onChange={handleChange}
                required
              />
            )}

            <label className="required">Quantity</label>
            <input
              type="text"
              name="quantity"
              placeholder="Example: 25 L, 10 kg, 500 mL"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <label className="required">Hand Over Timeline</label>
            <select
              name="handOverRange"
              value={formData.handOverRange}
              onChange={handleChange}
              required
            >
              <option value="">Select Timeline</option>
              {handoverOptions.map((range, i) => (
                <option key={i} value={range}>
                  {range}
                </option>
              ))}
            </select>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>

        {showNotification && (
          <div
            className={`notification ${
              message.includes("Error") || message.includes("❌")
                ? "error"
                : "success"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </>
  );
}
