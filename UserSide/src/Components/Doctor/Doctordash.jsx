import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBookMedical, FaComments, FaCalendarCheck, FaUsers, FaArrowRight, FaStethoscope } from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar";
import "./DoctorPremium.css";

const DoctorDash = () => {
  const [stats, setStats] = useState({
    guides: 0,
    chats: 0,
    appointments: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctorId = localStorage.getItem("userId");
  const doctorName = localStorage.getItem("name") || "Doctor";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch Guides
        const guidesRes = await axios.get("http://localhost:5000/api/viewguides");
        const myGuides = guidesRes.data.guides.filter(g => g.docId === doctorId);

        // Fetch Chats
        const chatsRes = await axios.get(`http://localhost:5000/api/chat/doctor/list/${doctorId}`);

        // Fetch Appointments (Optional - can be expanded later)
        // For now setting a dummy or fetching if API exists
        // const appointmentsRes = await axios.get(`http://localhost:5000/api/todaysappointments/${doctorId}`);

        setStats({
          guides: myGuides.length,
          chats: chatsRes.data.length,
          appointments: 0 // Will be updated if API is ready
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [doctorId]);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />

      <main className="doctor-main">
        <header className="panel-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="welcome-text">Welcome back,</p>
            <h1 className="panel-title">Dr. <span>{doctorName}</span></h1>
          </motion.div>
        </header>

        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-pattern"></div>
            <div className="stat-icon blue-theme">
              <FaBookMedical />
            </div>
            <div className="stat-info">
              <h3>{stats.guides}</h3>
              <p>My Guides</p>
            </div>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-pattern"></div>
            <div className="stat-icon purple-theme">
              <FaComments />
            </div>
            <div className="stat-info">
              <h3>{stats.chats}</h3>
              <p>Active Chats</p>
            </div>
          </motion.div>

          <motion.div className="stat-card" variants={itemVariants}>
            <div className="card-pattern"></div>
            <div className="stat-icon green-theme">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.appointments}</h3>
              <p>Today's Schedule</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="dashboard-sections">
          <motion.section
            className="section-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h2>Navigation Shortcuts</h2>
              <span className="view-all">Quick Access</span>
            </div>

            <div className="shortcut-grid">
              <Link to="/community" className="shortcut-card community">
                <div className="shortcut-header">
                  <FaUsers />
                  <FaArrowRight className="arrow" />
                </div>
                <h4>Community Hub</h4>
                <p>Interact with pet owners and share your expertise</p>
              </Link>

              <Link to="/doctor/chat" className="shortcut-card">
                <div className="shortcut-header">
                  <FaComments />
                  <FaArrowRight className="arrow" />
                </div>
                <h4>Chat Center</h4>
                <p>Provide real-time consultations to patients</p>
              </Link>
            </div>
          </motion.section>

          <motion.section
            className="section-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="section-header">
              <h2>Expertise Tools</h2>
            </div>
            <div className="tools-list">
              <Link to="/addguides" className="tool-item">
                <div className="tool-icon">
                  <FaStethoscope />
                </div>
                <div className="tool-text">
                  <h4>Create Tutorial</h4>
                  <p>Share medical knowledge</p>
                </div>
              </Link>
              {/* Additional tools can be added here */}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default DoctorDash;
