import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DoctorSidebar from "./DoctorSidebar";
import "./DoctorPremium.css";
import { FaUserPlus, FaUserInjured } from "react-icons/fa";

const PatientPannel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getallusers")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <main className="doctor-main">
        <header className="panel-header">
          <h1 className="panel-title">Patient <span>Records</span></h1>
        </header>

        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <p>Loading patient records...</p>
            </div>
          ) : (
            <div className="premium-table-container" style={{ overflowX: 'auto' }}>
              <table className="premium-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: '#64748b', fontSize: '0.9rem' }}>
                    <th style={{ padding: '15px' }}>#</th>
                    <th style={{ padding: '15px' }}>Patient Name</th>
                    <th style={{ padding: '15px' }}>Email</th>
                    <th style={{ padding: '15px' }}>Location</th>
                    <th style={{ padding: '15px' }}>Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ background: '#f8fafc' }}
                    >
                      <td style={{ padding: '15px', borderRadius: '15px 0 0 15px', color: '#64748b' }}>{index + 1}</td>
                      <td style={{ padding: '15px', fontWeight: '700' }}>{user.userFullname}</td>
                      <td style={{ padding: '15px' }}>{user.userEmail}</td>
                      <td style={{ padding: '15px' }}>{user.city}, {user.state}</td>
                      <td style={{ padding: '15px', borderRadius: '0 15px 15px 0' }}>{user.pincode}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .premium-table tr:hover {
            transform: scale(1.01) translateX(5px);
            background: #f1f5f9 !important;
            transition: all 0.3s ease;
        }
      ` }} />
    </div>
  );
};

export default PatientPannel;
