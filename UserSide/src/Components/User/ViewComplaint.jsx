import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Admin/ViewComplaints.css";
import BuyerNav from "./BuyerNav";
import { useNavigate } from "react-router-dom";

const ViewComp = () => {
  const [username, setUsername] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve the logged-in user's ID from local storage
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate()

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userId) {
        setError("User ID not found in local storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/getreply/${userId}`);
        
        if (response.data.success) {
          setUsername(response.data.username); // Store username
          setComplaints(response.data.complaints); // Store complaints
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
    <div>
      <BuyerNav />
    <motion.div
      className="complaints-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">My Complaints & Replies</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && (
        <>
          <h3 className="username">User: {username}</h3>
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Date</th>
                <th>Reply</th>
                <th>Reply Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <motion.tr
                    key={complaint._id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <td>{complaint.issue}</td>
                    <td>{new Date(complaint.date).toLocaleDateString()}</td>
                    <td>{complaint.reply?.message || "No reply yet"}</td>
                    <td>
                      {complaint.reply?.repliedAt
                        ? new Date(complaint.reply.repliedAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </motion.div>
    <button className="btn btn-success" style={{position:"fixed", bottom:"30px", right:"55px", fontSize:"30px", padding:"15px 30px", borderRadius:"10px" , fontWeight:"900"}} onClick={()=>navigate('/sendcomplaint')}>+</button>
    </div>
  );
};

export default ViewComp;
