import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = "https://hay-card-back-end.vercel.app/api/sample-assign";

export default function SampleAssign() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [document, setDocument] = useState(null);
  const [assigns, setAssigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");

  // Fetch existing sample assigns
  const fetchAssigns = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      setAssigns(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssigns();
  }, []);

  // Convert file to Base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!referenceNumber || !document) {
      setNotif("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setNotif("Uploading your document...");

      const base64Doc = await convertToBase64(document);

      const res = await axios.post(BACKEND_URL, {
        referenceNumber,
        document: base64Doc,
      });

      if (res.status === 201) {
        setNotif("✅ Sample assigned successfully!");
        setReferenceNumber("");
        setDocument(null);
        fetchAssigns();
      }
    } catch (error) {
      console.error(error);
      setNotif("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setNotif(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center py-10">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Sample Assign Upload
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-[90%] max-w-lg"
      >
        <label className="block mb-2 font-medium text-gray-700">
          Reference Number
        </label>
        <input
          type="text"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter reference number"
        />

        <label className="block mb-2 font-medium text-gray-700">
          Upload Document
        </label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => setDocument(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <AnimatePresence>
          {notif && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center text-sm text-gray-700"
            >
              {notif}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Display Uploaded Assigns */}
      <div className="mt-10 w-[90%] max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Uploaded Samples
        </h2>
        {assigns.length === 0 ? (
          <p className="text-gray-600 text-center">No samples uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assigns.map((a) => (
              <motion.div
                key={a._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="font-medium text-gray-700 mb-2">
                    Ref No: <span className="text-blue-600">{a.referenceNumber}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Uploaded: {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
                <a
                  href={a.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Download Document
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
