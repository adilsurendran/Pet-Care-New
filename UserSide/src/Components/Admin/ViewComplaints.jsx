import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./AdminPanelPremium.css";
import IndexHeader from "../IndexHeader";
import { FaCommentAlt, FaReply, FaCheckCircle, FaUserCircle } from "react-icons/fa";

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/viewcomplaints");
      setComplaints(response.data.complaints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setReplyMessage(complaint.reply?.message || ""); // Load existing reply if available
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
    setReplyMessage("");
  };

  const sendReply = async () => {
    if (!replyMessage.trim()) {
      alert("Reply message cannot be empty!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/sendreply", {
        complaintId: selectedComplaint._id,
        replyMessage,
      });

      if (response.data.success) {
        alert("Reply sent successfully!");
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === selectedComplaint._id
              ? { ...complaint, reply: { message: replyMessage, repliedAt: new Date() } }
              : complaint
          )
        );
        closeModal();
      } else {
        alert("Failed to send reply.");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Error sending reply. Please try again.");
    }
  };

  return (
    <div className="admin-panel-wrapper">
      <IndexHeader type="admin" />

      <main className="admin-panel-content">
        <div className="panel-header">
          <motion.h2
            className="panel-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Complaints <span>& Feedback</span>
          </motion.h2>
          <div className="stats-badge" style={{ background: '#fff3e0', color: '#e65100', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold' }}>
            <FaCommentAlt /> Total Issues: {complaints.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="table-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <table className="premium-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Issue Details</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                  <th>Latest Response</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <tr key={complaint._id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div style={{ background: '#fff3e0', padding: '10px', borderRadius: '12px' }}>
                            <FaUserCircle color="#e65100" />
                          </div>
                          <div>
                            <div style={{ fontWeight: '800', color: '#1a1a1a' }}>{complaint.userId?.username || "Anonymous"}</div>
                            <small className="text-muted">UID: {complaint.userId?._id?.slice(-6).toUpperCase() || "N/A"}</small>
                          </div>
                        </div>
                      </td>
                      <td style={{ maxWidth: '300px' }}>
                        <div className="text-truncate" title={complaint.issue} style={{ fontWeight: '500' }}>{complaint.issue}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(complaint.date).toLocaleDateString()}</div>
                        <div className="small text-muted">{new Date(complaint.date).toLocaleTimeString()}</div>
                      </td>
                      <td>
                        {complaint.reply?.message ? (
                          <span className="badge" style={{ background: '#e8f5e9', color: '#2e7d32', padding: '6px 12px', borderRadius: '8px' }}>
                            <FaCheckCircle /> Resolved
                          </span>
                        ) : (
                          <span className="badge" style={{ background: '#fff3e0', color: '#e65100', padding: '6px 12px', borderRadius: '8px' }}>Pending</span>
                        )}
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        {complaint.reply?.message ? (
                          <div className="text-truncate small text-muted italic">"{complaint.reply.message}"</div>
                        ) : (
                          <span className="text-muted small">No reply yet</span>
                        )}
                      </td>
                      <td>
                        <button
                          className={`btn-premium ${complaint.reply?.message ? 'btn-disabled' : 'btn-edit'}`}
                          onClick={() => !complaint.reply?.message && openModal(complaint)}
                          disabled={complaint.reply?.message}
                          style={complaint.reply?.message ? { opacity: 0.5, cursor: 'not-allowed', background: '#f5f5f5', color: '#999' } : { background: '#fff3e0', color: '#e65100' }}
                        >
                          <FaReply /> {complaint.reply?.message ? "Sent" : "Reply"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">No complaints found. Perfect record!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>

      {/* Premium Reply Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="premium-modal-overlay">
            <motion.div
              className="premium-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
            >
              <div className="modal-accent" style={{ background: 'linear-gradient(90deg, #ff9800, #ffb74d)' }}></div>
              <div className="modal-header">
                <h3>Submit Resolution</h3>
              </div>

              <div className="modal-form-grid">
                <div style={{ background: '#fff9f0', padding: '15px', borderRadius: '15px', border: '1px solid #ffe0b2', marginBottom: '10px' }}>
                  <div className="small text-muted mb-1" style={{ fontWeight: 700, textTransform: 'uppercase' }}>User Concern</div>
                  <div style={{ fontWeight: 600, color: '#444' }}>{selectedComplaint.issue}</div>
                </div>

                <div className="modal-input-group">
                  <label>Your Response</label>
                  <textarea
                    rows="4"
                    placeholder="Type a helpful resolution..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-modal btn-cancel" onClick={closeModal}>
                  Discard
                </button>
                <button className="btn-modal btn-save" onClick={sendReply} style={{ background: '#ff9800' }}>
                  Send Reply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewComplaint;
