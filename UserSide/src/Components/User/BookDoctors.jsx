import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
import { FaUserMd, FaComments, FaEnvelope, FaPhone } from "react-icons/fa";

const BookDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getalldoctors")
      .then((response) => {
        setDoctors(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header">
          <h1 className="panel-title">Find a <span>Doctor</span></h1>
          <p className="panel-subtitle">Connect with certified veterinarians for your pet.</p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading doctors...</div>
        ) : (
          <div className="doctors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {doctors.map((doctor) => (
              <motion.div
                key={doctor._id}
                className="doctor-card-premium"
                whileHover={{ y: -5 }}
                style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    <FaUserMd />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>{doctor.doctorName}</h3>
                    <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>{doctor.doctorQualification}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', color: '#475569', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaEnvelope style={{ color: '#94a3b8' }} /> {doctor.doctorEmail}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaPhone style={{ color: '#94a3b8' }} /> {doctor.doctorNumber}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/user/chat/${doctor.commonkey._id}`)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'white',
                    border: '2px solid var(--user-primary)',
                    color: 'var(--user-primary)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'var(--user-primary)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--user-primary)'; }}
                >
                  <FaComments /> Consult Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookDoctors;