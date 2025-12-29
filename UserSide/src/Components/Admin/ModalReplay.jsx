import React, { useState } from "react";
import "./ViewComplaints.css";

const ModalReplay = ({ complaint, closeModal }) => {
  const [response, setResponse] = useState("");

  const handleSend = () => {
    console.log("Reply sent to:", complaint.user, "Message:", response);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Reply to Complaint</h3>
        <p><strong>User:</strong> {complaint.user}</p>
        <p><strong>Issue:</strong> {complaint.issue}</p>
        <textarea
          placeholder="Type your response..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
        <div className="modal-actions">
          <button className="send-btn" onClick={handleSend}>Send</button>
          <button className="close-btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalReplay;
