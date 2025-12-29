import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Admin/ViewComplaints.css"; // Keeping the same CSS
import { Link } from "react-router-dom";
import BuyerNav from "./BuyerNav";

const ViewGuide = () => {
  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState({
    uploaderName: "",
    title: "",
    description: "",
    videoUrl: "",
  });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/viewguides");
      console.log(response);
      
      setGuides(response.data.guides);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };




  return (
    <div>
      <BuyerNav />
    <motion.div
      className="complaints-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Guides & Tutorials</h2>

  

      {/* Display Guides */}
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Uploader</th>
            <th>Title</th>
            <th>Description</th>
            <th>Video</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <motion.tr
              key={guide._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td>{guide.docId?.doctorName} <tr/>
                <small className="text-muted">{guide.docId?.doctorQualification}</small>
              </td>
              <td>{guide.title}</td>
              <td>{guide.description || "N/A"}</td>
              <td>
                <a href={guide.videoUrl} target="_blank" rel="noopener noreferrer">Watch</a>
              </td>
              <td>{new Date(guide.createdAt).toLocaleDateString()}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
     
    </motion.div>
    </div>
  );
};

export default ViewGuide;
