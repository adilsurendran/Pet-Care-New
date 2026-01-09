import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaStore,
  FaUserMd,
  FaClipboardList,
  FaExclamationCircle,
  FaSignOutAlt
} from "react-icons/fa";
import "./AdminDashPremium.css";

const AdminDash = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const adminModules = [
    {
      title: "User Management",
      desc: "Monitor and manage user accounts, permissions, and platform activity.",
      link: "/userpannel",
      icon: <FaUsers />,
      className: "users-card"
    },
    {
      title: "Shop Analytics",
      desc: "Oversee partner shops, track performance, and manage store listings.",
      link: "/shoppannel",
      icon: <FaStore />,
      className: "shops-card"
    },
    {
      title: "Doctor Panel",
      desc: "Manage existing veterinary practitioners and their consultation schedules.",
      link: "/doctorpannel",
      icon: <FaUserMd />,
      className: "doctors-card"
    },
    {
      title: "Doctor Onboarding",
      desc: "Review new registrations and approve qualified medical professionals.",
      link: "/docs",
      icon: <FaClipboardList />,
      className: "reg-card"
    },
    {
      title: "Resolution Center",
      desc: "Review user complaints and feedback to ensure platform quality.",
      link: "/viewcomplaintes",
      icon: <FaExclamationCircle />,
      className: "complaints-card"
    }
  ];

  return (
    <div className="admin-dash-wrapper">
      {/* Premium Admin Header */}
      <header className="admin-header">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <h1 className="logo-brand">
              W<span>oo</span>fTale <small style={{ fontSize: '0.9rem', color: '#8bc34a', fontWeight: 'bold' }}>ADMIN</small>
            </h1>
          </Link>
          <div className="admin-nav-actions">
            <button onClick={handleLogout} className="logout-pill">
              <FaSignOutAlt /> LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Area */}
      <main className="admin-main-content">
        <motion.div
          className="admin-welcome"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome Back, <span>Admin</span></h1>
          <p>Your centralized command center for platform operations and maintenance.</p>
        </motion.div>

        <motion.div
          className="admin-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {adminModules.map((module, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <Link to={module.link} className={`dashboard-premium-card ${module.className}`}>
                <div className="card-pattern"></div>
                <div className="card-icon-container">
                  {module.icon}
                </div>
                <h3 className="card-title">{module.title}</h3>
                <p className="card-desc">{module.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="py-4 text-center text-muted small mt-auto">
        &copy; 2026 Wooftale Admin Portal. Secure Management Environment.
      </footer>
    </div>
  );
};

export default AdminDash;
