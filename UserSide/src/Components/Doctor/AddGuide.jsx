import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGuide = () => {
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    docId:userId,
    title: "",
    description: "",
    videoUrl: "",
    // tags: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) {
      alert("Title and Video URL are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/addguide", {
        ...formData
      });

      alert("Guide added successfully!");
      setFormData({ uploaderName: "", title: "", description: "", videoUrl: "", tags: "" });
      navigate("/suggestion"); // Redirect to guides list
    } catch (error) {
      console.error("Error adding guide:", error);
      alert("Failed to add guide. Try again!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 bg-white rounded">
        <h2 className="text-center mb-4">Add a New Guide</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className="mb-3">
            <label className="form-label">Uploader Name</label>
            <input
              type="text"
              name="uploaderName"
              className="form-control"
              placeholder="Enter uploader name"
              value={formData.uploaderName}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Video URL</label>
            <input
              type="text"
              name="videoUrl"
              className="form-control"
              placeholder="Enter video URL"
              value={formData.videoUrl}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              className="form-control"
              placeholder="Enter tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div> */}
          <button type="submit" className="btn btn-primary w-100">
            Add Guide
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGuide;
