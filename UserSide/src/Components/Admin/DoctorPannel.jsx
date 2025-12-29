// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./DoctorPannel.css";

// const DoctorPannel = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch doctors from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/getalldoctors")
//       .then((response) => {
//         console.log(response);
        
//         setDoctors(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching doctors:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <motion.div
//       className="doctor-container"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="title">Doctor Management</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="doctor-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Doctor Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Qualification</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((doctor, index) => (
//               <motion.tr
//                 key={doctor._id}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <td>{index + 1}</td>
//                 <td>{doctor.doctorName}</td>
//                 <td>{doctor.doctorEmail}</td>
//                 <td>{doctor.doctorNumber}</td>
//                 <td>{doctor.doctorAddress}</td>
//                 <td>{doctor.doctorQualification}</td>
                
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </motion.div>
//   );
// };

// export default DoctorPannel;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./DoctorPannel.css";
import { useNavigate } from "react-router-dom";

const DoctorPannel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();


  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/getalldoctors");
    setDoctors(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // --------------------
  // Edit handlers
  // --------------------
  const handleEditClick = (doctor) => {
    setSelectedDoctor({ ...doctor });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:5000/api/doctor/${selectedDoctor._id}`,
      selectedDoctor
    );
    alert("Doctor updated successfully");
    setShowModal(false);
    fetchDoctors();
  };

  // --------------------
  // Delete handler
  // --------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    await axios.delete(`http://localhost:5000/api/doctor/${id}`);
    alert("Doctor deleted successfully");
    fetchDoctors();
  };

  return (
    <motion.div
      className="doctor-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="back-btnn" onClick={() => navigate("/admindash")}>
  ← Back to Dashboard
</button>

      <h2 className="title">Doctor Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="doctor-table">
          <thead>
            <tr>
              <th>#</th>
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
              <motion.tr key={doctor._id} whileHover={{ scale: 1.02 }}>
                <td>{index + 1}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.doctorEmail}</td>
                <td>{doctor.doctorNumber}</td>
                <td>{doctor.doctorAddress}</td>
                <td>{doctor.doctorQualification}</td>
                <td className="action-btns">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(doctor)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------------- MODAL ---------------- */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Edit Doctor</h3>

            <input
              value={selectedDoctor.doctorName}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  doctorName: e.target.value,
                })
              }
              placeholder="Doctor Name"
            />

            <input value={selectedDoctor.doctorEmail} disabled />

            <input
              value={selectedDoctor.doctorNumber}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  doctorNumber: e.target.value,
                })
              }
              placeholder="Phone"
            />

            <input
              value={selectedDoctor.doctorAddress}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  doctorAddress: e.target.value,
                })
              }
              placeholder="Address"
            />

            <input
              value={selectedDoctor.doctorQualification}
              onChange={(e) =>
                setSelectedDoctor({
                  ...selectedDoctor,
                  doctorQualification: e.target.value,
                })
              }
              placeholder="Qualification"
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DoctorPannel;
