import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clears all stored data
    navigate("/login", { replace: true }); // Redirects and replaces history
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);

  return (
    <motion.div
      className="sidebar-container"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="sidebar-content">
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255, 0, 0, 0.7)" }}
          whileTap={{ scale: 0.9 }}
          className="logout-btn"
          onClick={handleLogout} // Calls logout function
        >
          <LogOut size={20} className="icon" />
          LOGOUT
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
