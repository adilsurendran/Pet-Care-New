import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
import { FaPlus, FaExclamationCircle, FaReply, FaCalendarAlt, FaUser } from "react-icons/fa";

const ViewComp = () => {
  const [username, setUsername] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // Login ID used in previous code
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/getreply/${userId}`);

        if (response.data.success) {
          setUsername(response.data.username);
          setComplaints(response.data.complaints);
        } else {
          setError("Failed to fetch complaints.");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("Error fetching complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId]);

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="panel-title">My <span>Complaints</span></h1>
            <p className="panel-subtitle">Track and manage your reported issues.</p>
          </div>
          <button
            onClick={() => navigate('/sendcomplaint')}
            style={{
              background: 'var(--user-primary)',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <FaPlus /> New Complaint
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading complaints...</div>
        ) : error ? (
          <div style={{ color: '#ef4444', textAlign: 'center', padding: '40px' }}>{error}</div>
        ) : (
          <div className="complaints-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {complaints.length === 0 && (
              <div style={{ textAlign: 'center', color: '#94a3b8', padding: '50px' }}>
                <FaExclamationCircle style={{ fontSize: '3rem', marginBottom: '20px', color: '#e2e8f0' }} />
                <p>No complaints found. Have an issue? Raise a ticket.</p>
              </div>
            )}

            {complaints.map((complaint) => (
              <motion.div
                key={complaint._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}>
                    <FaCalendarAlt /> {new Date(complaint.date).toLocaleDateString()}
                  </div>
                  <span style={{
                    background: complaint.reply ? '#dcfce7' : '#fef9c3',
                    color: complaint.reply ? '#166534' : '#854d0e',
                    padding: '5px 12px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: '700'
                  }}>
                    {complaint.reply ? "Replied" : "Pending"}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#1e293b' }}>
                  <FaExclamationCircle style={{ color: '#ef4444', marginRight: '10px' }} />
                  {complaint.issue}
                </h3>

                {complaint.reply && (
                  <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', borderLeft: '4px solid var(--user-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: '700', color: 'var(--user-primary)' }}>
                      <FaReply /> Admin Reply
                    </div>
                    <p style={{ margin: 0, color: '#334155', lineHeight: '1.5' }}>{complaint.reply.message}</p>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
                      Replied on: {new Date(complaint.reply.repliedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default ViewComp;
