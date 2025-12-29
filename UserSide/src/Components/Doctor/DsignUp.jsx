import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls
import "./DoctorSignup.css";
import IndexHeader from "../IndexHeader";
import RegHead from "../RegHead";
import { useNavigate } from "react-router-dom"; // For navigation

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

  const [error, setError] = useState(""); // To display errors
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate(); // To navigate after successful registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setError(""); // Clear previous errors

    try {
        console.log(doctorDetails)
      const response = await axios.post("http://localhost:5000/api/doctorreg", doctorDetails);

      alert(response.data.message);
      navigate("/admindash"); 
    } catch (error) {
      setLoading(false); 
      if (error.response && error.response.data) {
        alert(error.response.data.message); // Alert message from error response
      } else {
        setError("An error occurred. Please try again.");
      } 
    }
  };

  return (
    <div>

      <div className="login-container">
              <button className="back-btn " onClick={() => navigate("/admindash")}>
  ← Back to Dashboard
</button> 
        {/* Background Video */}
        <video autoPlay muted loop className="background-video">
          <source src="/snow.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Doctor Registration Form */}
        <motion.div
          className="login-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          
          <h1 className="title">Doctor Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <motion.input
                type="text"
                name="doctorName"
                placeholder="Doctor Name"
                className="input-field"
                value={doctorDetails.doctorName}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="email"
                name="doctorEmail"
                placeholder="Doctor Email"
                className="input-field"
                value={doctorDetails.doctorEmail}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="text"
                name="doctorNumber"
                placeholder="Doctor Phone Number"
                className="input-field"
                value={doctorDetails.doctorNumber}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="text"
                name="doctorAddress"
                placeholder="Doctor Address"
                className="input-field"
                value={doctorDetails.doctorAddress}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="text"
                name="doctorQualification"
                placeholder="Doctor Qualification"
                className="input-field"
                value={doctorDetails.doctorQualification}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="text"
                name="userName"
                placeholder="Username"
                className="input-field"
                value={doctorDetails.userName}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="password"
                name="userPassword"
                placeholder="Password"
                className="input-field"
                value={doctorDetails.userPassword}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {error && <div className="error-message">{error}</div>} {/* Show error message */}

            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Registering..." : "Register Doctor"}
            </motion.button>
          </form>
          <div className="navigation-links">
            <p>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DsignUp;
