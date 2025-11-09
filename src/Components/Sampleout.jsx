import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function SampleOut() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [notification, setNotification] = useState(null);

  const BASE_URL = "https://hay-card-back-end.vercel.app/api/reference";

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchReferences = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setReferences(res.data);
    } catch (err) {
      console.error(err);
      showNotification("Failed to fetch references", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const handleSampleOut = async (refId) => {
    setUpdating((prev) => ({ ...prev, [refId]: true }));
    try {
      await axios.post(`${BASE_URL}/sample-out`, { id: refId });
      showNotification("Sample finalized!", "success");
      fetchReferences();
    } catch (err) {
      console.error(err);
      showNotification("Failed to finalize sample", "error");
    } finally {
      setUpdating((prev) => ({ ...prev, [refId]: false }));
    }
  };

  return (
    <div className="container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="card">
        <h1>Sample Out</h1>
        <p>Check references to finalize their sample out status</p>

        {loading ? (
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="loader">Loading...</div>
            ))}
          </div>
        ) : (
          <ul>
            <AnimatePresence>
              {references.length === 0 ? (
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  No references available
                </motion.li>
              ) : (
                references.map((ref) => (
                  <motion.li
                    key={ref._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>{ref.refNumber}</span>
                    <input
                      type="checkbox"
                      checked={ref.sampleOut || false}
                      disabled={updating[ref._id]}
                      onChange={() => handleSampleOut(ref._id)}
                    />
                    {updating[ref._id] && <span className="loader"></span>}
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
