import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../RegistrationPage.css";
import IndexHeader from "../IndexHeader";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const DsignUp = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: "",
    doctorEmail: "",
    doctorNumber: "",
    doctorAddress: "",
    doctorQualification: "",
    userName: "",
    userPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/doctorreg", doctorDetails);
      alert(response.data.message);
      navigate("/admindash");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="reg-page-wrapper">
      <IndexHeader type="admin" />

      <div className="reg-content-container">
        <motion.div
          className="premium-reg-card"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-accent"></div>

          <div className="reg-card-header">
            <h1 className="reg-title">Doctor Registration</h1>
            <p className="reg-subtitle">Join our medical network and help pets thrive</p>
          </div>

          {error && <div className="reg-error">{error}</div>}

          <form onSubmit={handleSubmit} className="premium-reg-form">
            <div className="form-row">
              <div className="reg-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Dr. Name"
                  value={doctorDetails.doctorName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="reg-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="doctorNumber"
                  placeholder="Contact Number"
                  value={doctorDetails.doctorNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="reg-input-group">
              <label>Professional Email</label>
              <input
                type="email"
                name="doctorEmail"
                placeholder="doctor@example.com"
                value={doctorDetails.doctorEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reg-input-group">
              <label>Qualification / Specialization</label>
              <input
                type="text"
                name="doctorQualification"
                placeholder="e.g. BVSc & AH - Veterinary Surgeon"
                value={doctorDetails.doctorQualification}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reg-input-group">
              <label>Clinic Address</label>
              <textarea
                name="doctorAddress"
                placeholder="Full practice address"
                value={doctorDetails.doctorAddress}
                onChange={handleChange}
                required
                rows="2"
                style={{ resize: "none" }}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="reg-input-group">
                <label>Login Username</label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Choose username"
                  value={doctorDetails.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="reg-input-group">
                <label>Secret Password</label>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="Strong password"
                  value={doctorDetails.userPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="premium-reg-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Registering Doctor..." : "Complete Registration"}
            </motion.button>
          </form>

          <div className="reg-footer">
            <p>
              By registering, you agree to our <Link to="/" className="login-link">PetCare Provider Terms</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

};

export default DsignUp;
