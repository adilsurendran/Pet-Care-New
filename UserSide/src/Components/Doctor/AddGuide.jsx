import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DoctorSidebar from "./DoctorSidebar";
import "./DoctorPremium.css";
import { FaCloudUploadAlt, FaInfoCircle } from "react-icons/fa";

const AddGuide = () => {
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    docId: userId,
    title: "",
    description: "",
    videoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) {
      alert("Title and Video URL are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/addguide", {
        ...formData
      });

      alert("Guide added successfully!");
      navigate("/suggestion");
    } catch (error) {
      console.error("Error adding guide:", error);
      alert("Failed to add guide. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <main className="doctor-main">
        <header className="panel-header">
          <h1 className="panel-title">Add New <span>Guide</span></h1>
        </header>

        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: '800px' }}
        >
          <form onSubmit={handleSubmit} className="premium-form">
            <div style={{ display: 'grid', gap: '20px' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#64748b' }}>
                  Guide Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., How to care for a newborn puppy"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#64748b' }}>
                  Video URL (YouTube/Vimeo)
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="https://youtube.com/..."
                  value={formData.videoUrl}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#64748b' }}>
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Provide a detailed explanation of the tutorial..."
                  value={formData.description}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    outline: 'none',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="logout-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'var(--doc-primary)',
                  color: 'white',
                  marginTop: '10px',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}
              >
                {loading ? "Publishing..." : "Publish Guide"}
                <FaCloudUploadAlt style={{ marginLeft: '10px' }} />
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.9rem' }}>
          <FaInfoCircle />
          <p style={{ margin: 0 }}>Guides are visible to all pet owners once published.</p>
        </div>
      </main>
    </div>
  );
};

export default AddGuide;
