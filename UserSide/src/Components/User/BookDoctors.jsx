import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Admin/DoctorPannel.css";
import { useNavigate } from "react-router-dom";
import BuyerNav from "./BuyerNav";

const BookDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  // Fetch doctors from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getalldoctors")
      .then((response) => {
        console.log(response);
        
        setDoctors(response.data.data); // Assuming response structure is { success: true, data: [ ... ] }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);

  const handleBookDoctor = async () => {
    try {
      // Fetch the userId from localStorage or other logic
      const userId = localStorage.getItem("userId");

      // Validate input
      if (!selectedDoctorId || !appointmentDate || !appointmentTime) {
        setError("Please select a doctor, date, and time for the appointment.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/book/${userId}`,
        {
          doctorId: selectedDoctorId,  // Pass the correct doctor ID (doctor's commonkey._id)
          appointmentDate,
          appointmentTime,
        }
      );

      // Handle success
      alert(response.data.message);
      navigate('/buyer-dash') // Redirect to buyer dashboard after booking
      
    } catch (error) {
      setError("Error booking doctor: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <BuyerNav />
    <motion.div
      className="doctor-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Doctor Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="doctor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Qualification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <motion.tr
                key={doctor._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <td>{index + 1}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.doctorEmail}</td>
                <td>{doctor.doctorNumber}</td>
                <td>{doctor.doctorAddress}</td>
                <td>{doctor.doctorQualification}</td>
                <td>
                  {/* <button
                    className="approve-btn"
                    onClick={() => setSelectedDoctorId(doctor.commonkey._id)} // Use commonkey._id
                  >
                    Book
                  </button> */}
                  <button
  className="approve-btn"
  onClick={() => navigate(`/user/chat/${doctor.commonkey._id}`)}
>
  Chat
</button>

                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Date and Time Selection */}
      {selectedDoctorId && (
        <div className="appointment-form">
          <h3>Select Appointment Date and Time</h3>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
          <button onClick={handleBookDoctor}>Book Appointment</button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </motion.div>
    </div>
  );
};

export default BookDoctors;