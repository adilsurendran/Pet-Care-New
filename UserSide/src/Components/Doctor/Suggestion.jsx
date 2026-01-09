import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";
import "./DoctorPremium.css";
import { FaTrash, FaExternalLinkAlt, FaPlus } from "react-icons/fa";

const ViewGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const doctorId = localStorage.getItem("userId");
  const doctorIdorg = localStorage.getItem("user");

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/viewguides");
      console.log(response);
      
      // Filter guides for this doctor
      const myGuides = response.data.guides.filter(g => g.docId._id === doctorIdorg);
      setGuides(myGuides);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const handleDelete = async (guideId) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/deleteguide/${guideId}`);
      setGuides((prevGuides) => prevGuides.filter((guide) => guide._id !== guideId));
      alert("Guide deleted successfully!");
    } catch (error) {
      console.error("Error deleting guide:", error);
      alert("Failed to delete guide. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <main className="doctor-main">
        <header className="panel-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="panel-title">My <span>Guides</span></h1>
            <Link to="/addguides" className="logout-btn" style={{ background: 'var(--doc-accent)', color: 'var(--doc-primary)', width: 'auto' }}>
              <FaPlus />
              <span style={{ marginLeft: '10px' }}>Add New Guide</span>
            </Link>
          </div>
        </header>

        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="premium-table-container" style={{ overflowX: 'auto' }}>
            <table className="premium-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.9rem' }}>
                  <th style={{ padding: '15px' }}>Title</th>
                  <th style={{ padding: '15px' }}>Description</th>
                  <th style={{ padding: '15px' }}>Video</th>
                  <th style={{ padding: '15px' }}>Date</th>
                  <th style={{ padding: '15px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {guides.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      No guides found. Start by adding one!
                    </td>
                  </tr>
                ) : (
                  guides.map((guide) => (
                    <motion.tr
                      key={guide._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ background: '#f8fafc', borderRadius: '15px' }}
                    >
                      <td style={{ padding: '15px', fontWeight: '700', borderRadius: '15px 0 0 15px' }}>{guide.title}</td>
                      <td style={{ padding: '15px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {guide.description || "N/A"}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <a
                          href={guide.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--doc-primary)', textDecoration: 'none', fontWeight: '600' }}
                        >
                          Watch <FaExternalLinkAlt size={12} />
                        </a>
                      </td>
                      <td style={{ padding: '15px' }}>{new Date(guide.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '15px', borderRadius: '0 15px 15px 0' }}>
                        <button
                          className="btn-reject-sm"
                          onClick={() => handleDelete(guide._id)}
                          disabled={loading}
                          style={{
                            background: '#fff1f2',
                            color: '#e11d48',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <FaTrash size={14} />
                          {loading ? "..." : "Delete"}
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .premium-table tr {
            transition: all 0.3s ease;
        }
        .premium-table tr:hover {
            transform: scale(1.01) translateX(5px);
            background: #f1f5f9 !important;
        }
      ` }} />
    </div>
  );
};

export default ViewGuides;
