import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
import { FaPlayCircle, FaUserCircle, FaCalendarAlt, FaBookOpen } from "react-icons/fa";

const ViewGuide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/viewguides");
      setGuides(response.data.guides || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching guides:", error);
      setLoading(false);
    }
  };

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header">
          <h1 className="panel-title">Pet <span>Guides</span></h1>
          <p className="panel-subtitle">Expert advice and tutorials for your furry friends.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading guides...</div>
        ) : (
          <div className="guides-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {guides.map((guide) => (
              <motion.div
                key={guide._id}
                className="guide-card"
                whileHover={{ y: -5 }}
                style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
              >
                <div style={{ padding: '25px' }}>
                  <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ background: '#fff7ed', color: '#ea580c', padding: '5px 12px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: '700' }}>
                      Tutorial
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaCalendarAlt /> {new Date(guide.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '10px', color: '#1e293b' }}>
                    {guide.title}
                  </h3>

                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {guide.description || "No description available."}
                  </p>

                  {/* Author Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
                    <FaUserCircle style={{ color: '#cbd5e1', fontSize: '2.5rem' }} />
                    <div>
                      <div style={{ fontWeight: '700', color: '#334155' }}>{guide.docId?.doctorName || "Doctor"}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{guide.docId?.doctorQualification || "Specialist"}</div>
                    </div>
                  </div>

                  <a
                    href={guide.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      background: '#fef2f2',
                      color: '#ef4444',
                      textDecoration: 'none',
                      fontWeight: '700',
                      transition: 'background 0.3s'
                    }}
                  >
                    <FaPlayCircle /> Watch Video
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewGuide;
