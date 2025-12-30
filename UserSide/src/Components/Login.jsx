import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./LoginPage.css";
import IndexHeader from "./IndexHeader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset the error message

    try {
      // Debugging line to check if the login is being triggered
      console.log("Attempting login with:", username, password);

      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      console.log("Server response:", response);

      if (response.data && response.data.message === "Login successful") {
        const { id, role } = response.data.data; // Access the correct response data

        // Debugging line to verify if the role and id are correct
        console.log("Login successful. UserID:", id, "Role:", role);

        // Save user data in local storage
        localStorage.setItem("userId", id);
        localStorage.setItem("role", role);

        // Check the role and navigate accordingly
        if (role === "admin") {
          alert('login successfully');
          navigate("/admindash");
        } else if (role === "user") {
          localStorage.setItem("user",response.data.data.userDetails._id)
          console.log("Navigating to user home...");
          navigate("/buyer-dash");
        } else if (role === "shop") {
          console.log("Navigating to shop home...");
          navigate("/shopdash");
        } else if (role === "seller") {
          console.log("Navigating to seller home...");
          navigate("/sellerdash");
        } else if (role === "doctor") {
          console.log("Navigating to doctor home...");
          navigate("/doctor-home");
        } else {
          setError("Unknown role. Please contact support.");
          console.log("Error: Unknown role");
        }
      } else {
        setError(response.data.message || "Login failed. Please try again.");
        console.log("Error: Login failed");
      }
    } catch (err) {
      // Log the error to debug
      console.error("Error during login:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
          window.history.pushState(null, null, window.location.href);
        };
      }, []);

  return (
    <div>
      <IndexHeader />
      <div className="container-fluid d-flex justify-content-center login-container">
        {/* Background Video */}
        <video autoPlay muted loop className="background-video">
          <source src="/lab.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Login Form */}
        <motion.div
          className="login-form"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="title">Welcome Back</h1>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <motion.input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="input-container">
              <motion.input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                whileFocus={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to={"/userreg"}>Sign up here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
