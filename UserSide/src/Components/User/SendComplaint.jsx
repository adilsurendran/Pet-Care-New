import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const SendComplaint = () => {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Retrieve userId from localStorage
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
        navigate("/complaint")
        setIssue(""); // Clear input after success
      } else {
        setMessage("Failed to send complaint.");
      }
    } catch (error) {
      console.error("Error sending complaint:", error);
      setMessage("Error sending complaint. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary">Submit a Complaint</h2>
        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Issue:</label>
            <textarea
              className="form-control"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe your issue..."
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendComplaint;
