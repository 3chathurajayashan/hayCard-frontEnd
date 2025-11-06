import React, { useState } from "react";
import axios from "axios";

export default function ChemicalRequestPage() {
  const [formData, setFormData] = useState({
    chemicalName: "",
    quantity: "",
    handOverRange: "",
    customChemical: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      const submissionData = {
        chemicalName: formData.chemicalName,
        customChemical:
          formData.chemicalName === "Other" ? formData.customChemical : "",
        quantity: formData.quantity,
        handOverRange: formData.handOverRange,
      };

      const res = await axios.post(
        "http://localhost:5000/api/chemicals/add",
        submissionData
      );

      setMessage(res.data.message);
      setFormData({
        chemicalName: "",
        quantity: "",
        handOverRange: "",
        customChemical: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting form ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        }

        .form-container {
          background: white;
          padding: 48px 40px;
          border-radius: 20px;
          max-width: 560px;
          width: 100%;
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          border: 1px solid #e1e8f0;
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

        .message {
          text-align: center;
          margin-top: 20px;
          padding: 12px;
          border-radius: 8px;
          font-weight: 500;
        }

        .success {
          background-color: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .error {
          background-color: #fee2e2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
      `}</style>

      <div className="page-container">
        <div className="form-container">
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

          {message && (
            <div
              className={`message ${
                message.includes("Error") || message.includes("❌")
                  ? "error"
                  : "success"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
