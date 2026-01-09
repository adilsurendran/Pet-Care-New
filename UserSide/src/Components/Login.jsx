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
        const { id, role, verify } = response.data.data; // Access the correct response data
        // console.log(verify,"verifyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyh");


        // Debugging line to verify if the role and id are correct
        console.log("Login successful. UserID:", id, "Role:", role);

        // Save user data in local storage
        localStorage.setItem("userId", id);
        localStorage.setItem("role", role);

        // Check the role and navigate accordingly
        if (role === "admin" && verify) {
          alert('login successfully');
          navigate("/admindash");
        } else if (role === "user" && verify) {
          localStorage.setItem("user", response.data.data.userDetails._id)
          localStorage.setItem("name", response.data.data.userDetails.userFullname)
          console.log("Navigating to user home...");
          navigate("/buyer-dash");
        } else if (role === "shop" && verify) {
          localStorage.setItem("user", response.data.data.userDetails._id)
          localStorage.setItem("name", response.data.data.userDetails.shopName)
          console.log("Navigating to shop home...");
          navigate("/shopdash");
          // } else if (role === "seller") {
          //   console.log("Navigating to seller home...");
          //   navigate("/sellerdash");
        } else if (role === "doctor" && verify) {
          localStorage.setItem("user", response.data.data.userDetails._id)
          localStorage.setItem("name", response.data.data.userDetails.doctorName)
          console.log("Navigating to doctor home...");
          navigate("/doctor-home");
        } else {
          alert("Blocked by Admin")
          setError("Blocked by Admin");
          console.log("Blocked");
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
    <div className="login-page-wrapper">
      <IndexHeader />
      <div className="login-container">
        {/* Background Video Layer */}
        <div className="video-overlay"></div>
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/lab.mp4" type="video/mp4" />
          {/* Fallback to high-quality image if video fails to load or not supported */}
          <img src="https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=2070&auto=format&fit=crop" alt="Background" />
        </video>

        {/* glassmorphism Login Card */}
        <motion.div
          className="premium-login-card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="login-card-header">
            <h1 className="premium-title">W<span>oo</span>fTale</h1>
            <p className="premium-subtitle">Your pet's happiness starts here</p>
          </div>

          {error && (
            <motion.div
              className="premium-error"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="premium-form">
            <div className="premium-input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="premium-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="premium-login-btn"
              whileHover={{ scale: 1.02, backgroundColor: "#388e3c" }}
              whileTap={{ scale: 0.98 }}
            >
              Log In
            </motion.button>
          </form>

          <footer className="login-card-footer">
            <div className="divider">
              <span>OR</span>
            </div>
            <p className="register-text text-light">Don't have an account? Register as</p>
            <div className="registration-actions">
              <Link to="/userreg" className="reg-link user-reg">
                <i>🐾</i> User
              </Link>
              <Link to="/shopr" className="reg-link shop-reg">
                <i>🏬</i> Shop
              </Link>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
