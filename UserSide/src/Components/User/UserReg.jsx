import React, { useState } from "react";
import { motion } from "framer-motion";
import "../RegistrationPage.css";
import IndexHeader from "../IndexHeader";
import { useNavigate, Link } from "react-router-dom";

const UserReg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userFullname: "",
    userEmail: "",
    city: "",
    state: "",
    pincode: "",
    userName: "",
    userPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/userregistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="reg-page-wrapper">
      <IndexHeader />

      <div className="reg-content-container">
        <motion.div
          className="premium-reg-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-accent"></div>

          <div className="reg-card-header">
            <h1 className="reg-title">Join Wooftale</h1>
            <p className="reg-subtitle">Create a personal account for your pet care journey</p>
          </div>

          {errorMessage && <div className="reg-error">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="premium-reg-form">
            <div className="reg-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="userFullname"
                value={formData.userFullname}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div className="reg-input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-row">
              <div className="reg-input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>
              <div className="reg-input-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="reg-input-group">
                <label>Pin Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="123456"
                  required
                />
              </div>
              <div className="reg-input-group">
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Choose username"
                  required
                />
              </div>
            </div>

            <div className="reg-input-group">
              <label>Password</label>
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
                placeholder="Strong password"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="premium-reg-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register Account
            </motion.button>
          </form>

          <div className="reg-footer">
            <p>
              Already a member? <Link to="/login" className="login-link">Login here</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserReg;
