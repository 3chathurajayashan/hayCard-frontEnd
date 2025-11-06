import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestPage() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    chemicalName: "",
    quantity: "",
    requester: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const backendURL = "https://hay-card-back-end.vercel.app/api/request";

  // ✅ Fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(backendURL);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching chemicals:", err);
      showNotification("Failed to fetch data. Please check backend.", "error");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Add a new request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${backendURL}/add`, formData);
      showNotification("Chemical request added successfully!", "success");
      setFormData({ chemicalName: "", quantity: "", requester: "" });
      fetchRequests();
    } catch (err) {
      console.error(err);
      showNotification("Failed to add chemical request!", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show custom notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Chemical Request Management
      </motion.h1>

      {/* ✅ Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`fixed top-4 right-4 px-5 py-3 rounded-xl shadow-lg text-white font-medium ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Add Request Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Chemical Name</label>
          <input
            type="text"
            value={formData.chemicalName}
            onChange={(e) => setFormData({ ...formData, chemicalName: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Quantity (L or Kg)</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Requester Name</label>
          <input
            type="text"
            value={formData.requester}
            onChange={(e) => setFormData({ ...formData, requester: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
        >
          {loading ? "Processing..." : "Add Request"}
        </motion.button>
      </motion.form>

      {/* ✅ Display Requests */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {requests.length > 0 ? (
          requests.map((req, index) => (
            <motion.div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-lg font-bold text-gray-800">{req.chemicalName}</h2>
              <p className="text-gray-600 mt-1">Quantity: {req.quantity}</p>
              <p className="text-gray-500 mt-1 text-sm">Requested by: {req.requester}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No chemical requests found.</p>
        )}
      </motion.div>
    </div>
  );
}
