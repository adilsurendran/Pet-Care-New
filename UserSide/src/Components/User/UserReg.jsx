import React, { useState } from "react";
import { motion } from "framer-motion";
import "./UserReg.css";
import IndexHeader from "../IndexHeader";
import RegHead from "../RegHead";
import { useNavigate } from "react-router-dom";

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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        // Display error message from backend
        setErrorMessage(data.message || "Registration failed. Please try again.");
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
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

        {/* User Registration Form */}
        <motion.div
          className="login-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title">User Registration</h1>

          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="input-container">
              <motion.input
                type="text"
                name="userFullname"
                value={formData.userFullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-container">
              <motion.input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-container">
              <motion.input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-container">
              <motion.input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-container">
              <motion.input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="PinCode"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-container">
              <motion.input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="input-container">
              <motion.input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
                placeholder="Password"
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* <div className="input-container">
              <motion.select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </motion.select>
            </div> */}

            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Register User
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

export default UserReg;
