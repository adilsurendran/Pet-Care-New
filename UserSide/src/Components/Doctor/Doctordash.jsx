import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Doctordash.css";

const DoctorDash = () => {
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("userId"); // Retrieve doctor ID from local storage
  const navigate = useNavigate();


  // useEffect(() => {
  //   const fetchAppointments = async () => {
  //     try {
  //       if (!doctorId) return; // Prevent API call if no doctorId is found

  //       const response = await axios.get(`http://localhost:5000/api/todaysappointments/${doctorId}`);
        
  //       if (response.data.success) {
  //         setAppointments(response.data.appointments);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching appointments:", error);
  //     }
  //   };

  //   fetchAppointments();
  // }, [doctorId]);
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
    <div className="dashboard-container">
  
        <aside className="sidebar">
        <div className="logo">
          <img src="/Med logo.jpg" alt="Medical Logo" className="logo-img" />
          <h1 className="logo-text">WoofTale</h1>
        </div>
        
        <nav className="nav-menu">
          <Link to="/doctor-home" className="nav-item active">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/addguides" className="nav-item">
            <i className="fas fa-calendar-check"></i>
            <span>Add Guides</span>
          </Link>
          {/* <Link to="/patients" className="nav-item">
            <i className="fas fa-users"></i>
            <span>Patients</span>
          </Link> */}
          <Link to="/suggestion" className="nav-item">
            <i className="fas fa-users"></i>
            <span>Suggestions</span>
          </Link>
            <Link to="/doctor/chat" className="nav-item">
            <i className="fas fa-users"></i>
            <span>Chats</span>
          </Link>
          <div className="nav-item" onClick={handleLogout}>
            <i className="fas fa-users"></i>
            <span>Logout</span>
          </div>

        </nav>
      </aside>

      <main className="main-content">
        <div className="dashboard-content">
          <section className="appointments-section">
            <h2>Today's Appointments</h2>
            <div className="appointments-list">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment._id} className="appointment-card">
                    <div className="appointment-time">
                      {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="appointment-details">
                      <h4>{appointment.patientId.username} ({appointment.petType})</h4>
                      <p>{appointment.reason}</p>
                    </div>
                    <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </div>
                ))
              ) : (
                <p>No appointments for today.</p>
              )}
            </div>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-details">
                <h3>{appointments.length}</h3>
                <p>Today's Appointments</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DoctorDash;
