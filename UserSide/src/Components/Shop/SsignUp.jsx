import React, { useState } from "react";
import { motion } from "framer-motion";
import "./SsignUp.css";
import RegHead from "../RegHead";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SsignUp = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    shopEmail: "",
    shopPhone: "",
    shopAddress: "",
    userName: "",
    userPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/shopreg", formData);
      if (response.data.success) {
        alert("Shop registered successfully!");
        navigate("/login"); // Redirect to login page after success
      } else {
        alert(response.data.message || "Registration failed.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error during registration:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RegHead />
      <div className="login-container">
        {/* Background Video */}
        <video autoPlay muted loop className="background-video">
          <source src="/flying.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Shop Registration Form */}
        <motion.div
          className="login-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title">Shop Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <motion.input
                type="text"
                name="shopName"
                placeholder="Shop Name"
                className="input-field"
                required
                value={formData.shopName}
                onChange={handleChange}
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="email"
                name="shopEmail"
                placeholder="Shop Email"
                className="input-field"
                required
                value={formData.shopEmail}
                onChange={handleChange}
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="text"
                name="shopPhone"
                placeholder="Shop Phone Number"
                className="input-field"
                required
                value={formData.shopPhone}
                onChange={handleChange}
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="text"
                name="shopAddress"
                placeholder="Shop Address"
                className="input-field"
                required
                value={formData.shopAddress}
                onChange={handleChange}
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
                required
                value={formData.userName}
                onChange={handleChange}
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
                required
                value={formData.userPassword}
                onChange={handleChange}
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Shop"}
            </motion.button>
          </form>
          <div className="navigation-links">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SsignUp;
