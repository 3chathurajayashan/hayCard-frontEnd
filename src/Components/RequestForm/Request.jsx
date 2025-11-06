import React, { useState } from "react";
import axios from "axios";

export default function ChemicalRequestPage() {
  const [formData, setFormData] = useState({
    chemicalName: "",
    quantity: "",
    handOverRange: "",
    fixedHandOverDate: "",
    
  });

  const [message, setMessage] = useState("");

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
    "Within 1 Month",
    "Within 2 Months",
    "Fixed Date",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/chemicals/add", formData);
      setMessage(res.data.message);
      setFormData({
        chemicalName: "",
        quantity: "",
        handOverRange: "",
        fixedHandOverDate: "",
        customDate: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <>
      <style>{`
        /* Background */
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e6f0ff, #d0e4ff);
        }

        .page-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .form-container {
          background: #fff;
          padding: 40px;
          border-radius: 16px;
          width: 100%;
          max-width: 550px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
        }

        .title {
          text-align: center;
          color: #0a4b9f;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .subtitle {
          text-align: center;
          color: #666;
          font-size: 14px;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 18px;
        }

        label {
          display: block;
          color: #333;
          font-weight: 600;
          margin-bottom: 6px;
        }

        input[type="text"],
        input[type="date"],
        select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: 0.3s;
        }

        input:focus,
        select:focus {
          border-color: #2b6ef7;
          box-shadow: 0 0 5px rgba(43, 110, 247, 0.3);
        }

        .submit-btn {
          width: 100%;
          background: #2b6ef7;
          color: white;
          font-weight: 600;
          padding: 10px 0;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }

        .submit-btn:hover {
          background: #1f56c0;
        }

        .message {
          text-align: center;
          margin-top: 15px;
        }

        .success-text {
          color: green;
          font-weight: 600;
        }

        .error-text {
          color: red;
          font-weight: 600;
        }
      `}</style>

      <div className="page-container">
        <div className="form-container">
          <h1 className="title">Chemical Request Portal</h1>
          <p className="subtitle">Fill in the chemical details and submit your request.</p>

          <form onSubmit={handleSubmit}>
            {/* Chemical Name */}
            <div className="form-group">
              <label>Chemical Name</label>
              <select
                name="chemicalName"
                value={formData.chemicalName}
                onChange={handleChange}
                required
              >
                <option value="">Select Chemical</option>
                {chemicalOptions.map((chem, idx) => (
                  <option key={idx} value={chem}>
                    {chem}
                  </option>
                ))}
              </select>

              {formData.chemicalName === "Other" && (
                <input
                  type="text"
                  name="chemicalName"
                  placeholder="Enter chemical name"
                  onChange={handleChange}
                />
              )}
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                placeholder="e.g. 25 L, 10 kg"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Handover Range */}
            <div className="form-group">
              <label>Hand Over Range</label>
              <select
                name="handOverRange"
                value={formData.handOverRange}
                onChange={handleChange}
                required
              >
                <option value="">Select Range</option>
                {handoverOptions.map((range, idx) => (
                  <option key={idx} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Fixed Date */}
            {formData.handOverRange === "Fixed Date" && (
              <div className="form-group">
                <label>Fixed Hand Over Date</label>
                <input
                  type="date"
                  name="fixedHandOverDate"
                  value={formData.fixedHandOverDate}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

           

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </form>

          {message && (
            <div className="message">
              <p
                className={
                  message.includes("Error") ? "error-text" : "success-text"
                }
              >
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
