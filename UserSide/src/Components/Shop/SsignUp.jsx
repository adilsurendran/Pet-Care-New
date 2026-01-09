import React, { useState } from "react";
import { motion } from "framer-motion";
import "../RegistrationPage.css";
import IndexHeader from "../IndexHeader";
import { useNavigate, Link } from "react-router-dom";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/shopreg", formData);
      if (response.data.success) {
        alert("Shop registered successfully!");
        navigate("/login");
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
    <div className="reg-page-wrapper">
      <IndexHeader />

      <div className="reg-content-container">
        <motion.div
          className="premium-reg-card"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-accent"></div>

          <div className="reg-card-header">
            <h1 className="reg-title">Shop Registration</h1>
            <p className="reg-subtitle">Partner with Wooftale and grow your business</p>
          </div>

          <form onSubmit={handleSubmit} className="premium-reg-form">
            <div className="form-row">
              <div className="reg-input-group">
                <label>Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  placeholder="Official Shop Name"
                  required
                  value={formData.shopName}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="shopPhone"
                  placeholder="Contact Number"
                  required
                  value={formData.shopPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="reg-input-group">
              <label>Shop Email</label>
              <input
                type="email"
                name="shopEmail"
                placeholder="shop@example.com"
                required
                value={formData.shopEmail}
                onChange={handleChange}
              />
            </div>

            <div className="reg-input-group">
              <label>Shop Address</label>
              <textarea
                name="shopAddress"
                placeholder="Full location details"
                required
                value={formData.shopAddress}
                onChange={handleChange}
                rows="2"
                style={{ resize: "none" }}
                className="reg-input-field"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="reg-input-group">
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Login Username"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="reg-input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="Strong password"
                  required
                  value={formData.userPassword}
                  onChange={handleChange}
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
              {loading ? "Registering Shop..." : "Register Shop"}
            </motion.button>
          </form>

          <div className="reg-footer">
            <p>
              Already partnered? <Link to="/login" className="login-link">Login here</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SsignUp;
