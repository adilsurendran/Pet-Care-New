import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./ViewComplaints.css";

const ViewComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/viewcomplaints");
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
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
    setReplyMessage(""); // Clear reply message when closing
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

        // Update the complaint list with the new reply
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
    <motion.div
      className="complaints-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Complaints & Feedback</h2>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Issue</th>
            <th>Date</th>
            <th>Reply</th>
            <th>Reply Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <motion.tr
              key={complaint._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td>{complaint.userId?.username || "Anonymous"}</td>
              <td>{complaint.issue}</td>
              <td>{new Date(complaint.date).toLocaleDateString()}</td>
              <td>{complaint.reply?.message ? complaint.reply.message : "No reply yet"}</td>
              <td>
                {complaint.reply?.repliedAt
                  ? new Date(complaint.reply.repliedAt).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                <button className="reply-btn" onClick={() => openModal(complaint)}>Reply</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reply to Complaint</h3>
            <p><strong>User:</strong> {selectedComplaint.user}</p>
            <p><strong>Issue:</strong> {selectedComplaint.issue}</p>
            <textarea
              placeholder="Type your response..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>
            <div className="modal-actions">
              <button className="send-btn" onClick={sendReply}>Send</button>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};  

export default ViewComplaint;
