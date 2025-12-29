import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Admin/UserPannel.css";

const DoctorAppointmentView = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = localStorage.getItem("userId");
        if (!doctorId) {
          console.error("No doctor ID found in local storage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/getdocbooking/${doctorId}`
        );

        if (response.data.success) {
          setAppointments(response.data.bookings);
        } else {
          console.error("No bookings found.");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Function to accept an appointment
  const handleAccept = async (bookingId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/accept/${bookingId}`);

      if (response.data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === bookingId
              ? { ...appointment, status: "Confirmed" }
              : appointment
          )
        );
        alert("Appointment accepted successfully!");
      } else {
        alert("Failed to accept appointment.");
      }
    } catch (error) {
      console.error("Error accepting appointment:", error);
      alert("Error accepting appointment.");
    }
  };

  // Function to reject an appointment
  const handleReject = async (bookingId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/reject/${bookingId}`);

      if (response.data.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === bookingId
              ? { ...appointment, status: "Rejected" }
              : appointment
          )
        );
        alert("Appointment rejected successfully!");
      } else {
        alert("Failed to reject appointment.");
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      alert("Error rejecting appointment.");
    }
  };

  return (
    <motion.div
      className="user-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Doctor Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6">No Appointments Found</td>
              </tr>
            ) : (
              appointments.map((appointment, index) => (
                <motion.tr
                  key={appointment._id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <td>{index + 1}</td>
                  <td>{appointment.patientId?.username || "N/A"}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.status === "Pending" && (
                      <>
                        <button onClick={() => handleAccept(appointment._id)}>Accept</button>
                        <button onClick={() => handleReject(appointment._id)}>Reject</button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default DoctorAppointmentView;
