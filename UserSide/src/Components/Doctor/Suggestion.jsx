import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Admin/ViewComplaints.css"; // Keeping the same CSS
import { Link } from "react-router-dom";

const ViewGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGuides();
  }, []);

  // Fetch all guides
  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/viewguides");
      console.log(response);
      
      setGuides(response.data.guides);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  // Delete Guide Function
  const handleDelete = async (guideId) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/deleteguide/${guideId}`);
      setGuides((prevGuides) => prevGuides.filter((guide) => guide._id !== guideId)); // Update UI dynamically
      alert("Guide deleted successfully!");
    } catch (error) {
      console.error("Error deleting guide:", error);
      alert("Failed to delete guide. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            {/* <th>ID</th> */}
            {/* <th>Uploader</th> */}
            <th>Title</th>
            <th>Description</th>
            <th>Video</th>
            {/* <th>Tags</th> */}
            <th>Date</th>
            <th>Action</th>
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
              {/* <td>{guide._id}</td> */}
              {/* <td>{guide.uploaderName}</td> */}
              <td>{guide.title}</td>
              <td>{guide.description || "N/A"}</td>
              <td>
                <a href={guide.videoUrl} target="_blank" rel="noopener noreferrer">Watch</a>
              </td>
              {/* <td>{guide.tags.join(", ")}</td> */}
              <td>{new Date(guide.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(guide._id)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <div className="btn-not">
  <Link to={'/addguides'}>
    <i className='bx bxs-plus-circle' style={{ color: 'green', fontSize: '24px' }}></i>
  </Link>
</div>
    </motion.div>
  );
};

export default ViewGuides;
