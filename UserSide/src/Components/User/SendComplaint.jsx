import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
import { FaPaperPlane, FaExclamationCircle } from "react-icons/fa";

const SendComplaint = () => {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    if (!issue.trim()) {
      setMessage("Issue cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/sendComplaint/${userId}`,
        { issue }
      );

      if (response.data.success) {
        setMessage("Complaint sent successfully!");
        setTimeout(() => navigate("/complaint"), 1500);
        setIssue("");
      } else {
        setMessage("Failed to send complaint.");
      }
    } catch (error) {
      console.error("Error sending complaint:", error);
      setMessage("Error sending complaint. Please try again.");
    }
  };

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <header className="panel-header" style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1 className="panel-title">Submit a <span>Complaint</span></h1>
            <p className="panel-subtitle">We are here to help. Describe your issue below.</p>
          </header>

          <div style={{ background: 'white', borderRadius: '25px', padding: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
            {message && (
              <div style={{ padding: '15px', borderRadius: '12px', background: message.includes("success") ? '#dcfce7' : '#fee2e2', color: message.includes("success") ? '#166534' : '#991b1b', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: '700', color: '#334155' }}>Describe Issue</label>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="E.g. I had an issue with my recent order..."
                  rows="6"
                  required
                  style={{ width: '100%', padding: '15px', borderRadius: '15px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={{ width: '100%', padding: '15px', borderRadius: '15px', background: 'var(--user-primary)', color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)' }}
              >
                <FaPaperPlane /> Send Complaint
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SendComplaint;
