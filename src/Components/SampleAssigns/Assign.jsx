import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = "https://hay-card-back-end.vercel.app/api/sample-assign";

export default function SampleAssign() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [file, setFile] = useState(null);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  // 🔹 Fetch all samples
  const fetchSamples = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/all`);
      setSamples(res.data);
    } catch (err) {
      console.error("Error fetching samples:", err);
    }
  };

  useEffect(() => {
    fetchSamples();
  }, []);

  // 🔹 Convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!referenceNumber || !file) {
      setNotification("⚠️ Please provide both reference number and file!");
      return;
    }

    setLoading(true);
    setNotification("Uploading your document...");

    try {
      const base64File = await convertToBase64(file);

      const res = await axios.post(`${BACKEND_URL}/add`, {
        referenceNumber,
        file: base64File,
      });

      if (res.status === 201) {
        setNotification("✅ Document uploaded successfully!");
        setReferenceNumber("");
        setFile(null);
        fetchSamples();
      }
    } catch (error) {
      console.error(error);
      setNotification("❌ Upload failed! Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(""), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <motion.h1
        className="text-3xl font-bold mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Sample Assign Dashboard
      </motion.h1>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key="notify"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md mb-6"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Reference Number</span>
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter reference number..."
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Upload Document</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2 w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </motion.form>

      {/* Loading animation */}
      {loading && (
        <motion.div
          className="mt-6 flex items-center gap-2 text-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-5 h-5 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin"></div>
          Uploading your document...
        </motion.div>
      )}

      {/* Display Uploaded Samples */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Uploaded Samples
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {samples.map((sample) => (
            <motion.div
              key={sample._id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-semibold text-gray-800 mb-2">
                Ref: {sample.referenceNumber}
              </p>
              <a
                href={sample.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-600 hover:text-indigo-800 underline"
              >
                Download Document
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
