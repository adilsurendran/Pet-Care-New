// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./AdminPanelPremium.css";
// import IndexHeader from "../IndexHeader";
// import { FaUserEdit, FaTrashAlt, FaStethoscope } from "react-icons/fa";

// const DoctorPannel = () => {

//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [errors, setErrors] = useState({});

//   const fetchDoctors = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/getalldoctors");
//       setDoctors(res.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const handleEditClick = (doctor) => {
//     setSelectedDoctor({ ...doctor });
//     setErrors({});
//     setShowModal(true);
//   };

//   const validateForm = () => {

//     const newErrors = {};

//     const nameRegex = /^[A-Za-z\s]{3,}$/;
//     const phoneRegex = /^[0-9]{10}$/;

//     if (!nameRegex.test(selectedDoctor.doctorName))
//       newErrors.doctorName =
//         "Name must contain only letters and be at least 3 characters";

//     if (!phoneRegex.test(selectedDoctor.doctorNumber))
//       newErrors.doctorNumber = "Phone number must be exactly 10 digits";

//     if (selectedDoctor.doctorQualification.length < 5)
//       newErrors.doctorQualification =
//         "Qualification must be at least 5 characters";

//     if (selectedDoctor.doctorAddress.length < 10)
//       newErrors.doctorAddress = "Address must be at least 10 characters";

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleUpdate = async () => {

//     if (!validateForm()) return;

//     try {
//       await axios.put(
//         `http://localhost:5000/api/doctor/${selectedDoctor._id}`,
//         selectedDoctor
//       );

//       alert("Doctor updated successfully");

//       setShowModal(false);

//       fetchDoctors();

//     } catch (error) {
//       alert("Failed to update doctor");
//     }
//   };

//   const handleDelete = async (id) => {

//     if (!window.confirm("Are you sure you want to delete this doctor?"))
//       return;

//     try {

//       await axios.delete(`http://localhost:5000/api/doctor/${id}`);

//       alert("Doctor deleted successfully");

//       fetchDoctors();

//     } catch (error) {
//       alert("Failed to delete doctor");
//     }
//   };

//   return (
//     <div className="admin-panel-wrapper">

//       <IndexHeader type="admin" />

//       <main className="admin-panel-content">

//         <div className="panel-header">

//           <motion.h2
//             className="panel-title"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             Doctor <span>Management</span>
//           </motion.h2>

//           <div
//             className="stats-badge"
//             style={{
//               background: "#e8f5e9",
//               color: "#2e7d32",
//               padding: "8px 20px",
//               borderRadius: "50px",
//               fontWeight: "bold",
//             }}
//           >
//             <FaStethoscope /> Total Partners: {doctors.length}
//           </div>

//         </div>

//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-success" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : (
//           <motion.div
//             className="table-container"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >

//             <table className="premium-table">

//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Practitioner</th>
//                   <th>Contact Info</th>
//                   <th>Location</th>
//                   <th>Specialization</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {doctors.map((doctor, index) => (

//                   <tr key={doctor._id}>

//                     <td style={{ fontWeight: "bold", color: "#8bc34a" }}>
//                       {index + 1}
//                     </td>

//                     <td>
//                       <div className="d-flex align-items-center gap-3">

//                         <div
//                           style={{
//                             background: "#f1f8e9",
//                             padding: "10px",
//                             borderRadius: "12px",
//                           }}
//                         >
//                           <FaStethoscope color="#2e7d32" />
//                         </div>

//                         <div>
//                           <div
//                             style={{
//                               fontWeight: "800",
//                               color: "#1a1a1a",
//                             }}
//                           >
//                             {doctor.doctorName}
//                           </div>

//                           <small className="text-muted">
//                             UID: {doctor._id.slice(-6).toUpperCase()}
//                           </small>
//                         </div>

//                       </div>
//                     </td>

//                     <td>
//                       <div style={{ fontWeight: "600" }}>
//                         {doctor.doctorEmail}
//                       </div>
//                       <div className="text-muted small">
//                         {doctor.doctorNumber}
//                       </div>
//                     </td>

//                     <td style={{ maxWidth: "200px" }}>
//                       <div className="text-truncate">
//                         {doctor.doctorAddress}
//                       </div>
//                     </td>

//                     <td>
//                       <span
//                         className="badge"
//                         style={{
//                           background: "#e3f2fd",
//                           color: "#1976d2",
//                           padding: "6px 12px",
//                           borderRadius: "8px",
//                         }}
//                       >
//                         {doctor.doctorQualification}
//                       </span>
//                     </td>

//                     <td>
//                       <div className="action-group">

//                         <button
//                           className="btn-premium btn-edit"
//                           onClick={() => handleEditClick(doctor)}
//                         >
//                           <FaUserEdit /> Edit
//                         </button>

//                         <button
//                           className="btn-premium btn-delete"
//                           onClick={() => handleDelete(doctor._id)}
//                         >
//                           <FaTrashAlt />
//                         </button>
                        

//                       </div>
//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </motion.div>
//         )}

//       </main>

//       {showModal && (

//         <div className="premium-modal-overlay">

//           <div className="premium-modal-card-doctor">

//             <div className="modal-accent"></div>

//             <div className="modal-form-grid">

//               <div className="modal-input-group">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   value={selectedDoctor.doctorName}
//                   onChange={(e) =>
//                     setSelectedDoctor({
//                       ...selectedDoctor,
//                       doctorName: e.target.value,
//                     })
//                   }
//                 />
//                 {errors.doctorName && (
//                   <p className="field-error">{errors.doctorName}</p>
//                 )}
//               </div>

//               <div className="modal-input-group">
//                 <label>Professional Email (Read-only)</label>
//                 <input
//                   value={selectedDoctor.doctorEmail}
//                   disabled
//                   style={{
//                     background: "#f5f5f5",
//                     cursor: "not-allowed",
//                   }}
//                 />
//               </div>

//               <div className="form-row d-flex gap-3">

//                 <div className="modal-input-group flex-grow-1">

//                   <label>Phone Number</label>

//                   <input
//                     type="text"
//                     value={selectedDoctor.doctorNumber}
//                     onChange={(e) =>
//                       setSelectedDoctor({
//                         ...selectedDoctor,
//                         doctorNumber: e.target.value,
//                       })
//                     }
//                   />

//                   {errors.doctorNumber && (
//                     <p className="field-error">{errors.doctorNumber}</p>
//                   )}

//                 </div>

//               </div>

//               <div className="modal-input-group">

//                 <label>Qualification & Experience</label>

//                 <input
//                   type="text"
//                   value={selectedDoctor.doctorQualification}
//                   onChange={(e) =>
//                     setSelectedDoctor({
//                       ...selectedDoctor,
//                       doctorQualification: e.target.value,
//                     })
//                   }
//                 />

//                 {errors.doctorQualification && (
//                   <p className="field-error">
//                     {errors.doctorQualification}
//                   </p>
//                 )}

//               </div>

//               <div className="modal-input-group">

//                 <label>Practice Address</label>

//                 <textarea
//                   rows="2"
//                   value={selectedDoctor.doctorAddress}
//                   onChange={(e) =>
//                     setSelectedDoctor({
//                       ...selectedDoctor,
//                       doctorAddress: e.target.value,
//                     })
//                   }
//                   style={{ resize: "none" }}
//                 ></textarea>

//                 {errors.doctorAddress && (
//                   <p className="field-error">{errors.doctorAddress}</p>
//                 )}

//               </div>

//             </div>

//             <div className="modal-actions">

//               <button
//                 className="btn-modal btn-cancel"
//                 onClick={() => setShowModal(false)}
//               >
//                 Go Back
//               </button>

//               <button
//                 className="btn-modal btn-save"
//                 onClick={handleUpdate}
//               >
//                 Sync Changes
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default DoctorPannel;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./AdminPanelPremium.css";
import IndexHeader from "../IndexHeader";
import { FaUserEdit, FaTrashAlt, FaStethoscope } from "react-icons/fa";

const DoctorPannel = () => {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getalldoctors");
      console.log(res.data.data);
      setDoctors(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEditClick = (doctor) => {
    setSelectedDoctor({ ...doctor });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {

    const newErrors = {};

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(selectedDoctor.doctorName))
      newErrors.doctorName =
        "Name must contain only letters and be at least 3 characters";

    if (!phoneRegex.test(selectedDoctor.doctorNumber))
      newErrors.doctorNumber = "Phone number must be exactly 10 digits";

    if (selectedDoctor.doctorQualification.length < 5)
      newErrors.doctorQualification =
        "Qualification must be at least 5 characters";

    if (selectedDoctor.doctorAddress.length < 10)
      newErrors.doctorAddress = "Address must be at least 10 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {

    if (!validateForm()) return;

    try {
      await axios.put(
        `http://localhost:5000/api/doctor/${selectedDoctor._id}`,
        selectedDoctor
      );

      alert("Doctor updated successfully");

      setShowModal(false);

      fetchDoctors();

    } catch (error) {
      alert("Failed to update doctor");
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this doctor?"))
      return;

    try {

      await axios.delete(`http://localhost:5000/api/doctor/${id}`);

      alert("Doctor deleted successfully");

      fetchDoctors();

    } catch (error) {
      alert("Failed to delete doctor");
    }
  };

  // BLOCK / UNBLOCK FUNCTION
  const handleBlockToggle = async (doctor) => {

    const action = doctor.isBlocked ? "unblock" : "block";

    try {

      await axios.post("http://localhost:5000/api/doctor/block", {
        doctorId: doctor._id,
        action: action
      });

      alert(`Doctor ${action}ed successfully`);

      fetchDoctors();

    } catch (error) {
      alert("Failed to update doctor status");
    }
  };

  return (
    <div className="admin-panel-wrapper">

      <IndexHeader type="admin" />

      <main className="admin-panel-content">

        <div className="panel-header">

          <motion.h2
            className="panel-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Doctor <span>Management</span>
          </motion.h2>

          <div
            className="stats-badge"
            style={{
              background: "#e8f5e9",
              color: "#2e7d32",
              padding: "8px 20px",
              borderRadius: "50px",
              fontWeight: "bold",
            }}
          >
            <FaStethoscope /> Total Partners: {doctors.length}
          </div>

        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="table-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >

            <table className="premium-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Practitioner</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Specialization</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {doctors.map((doctor, index) => (

                  <tr key={doctor._id}>

                    <td style={{ fontWeight: "bold", color: "#8bc34a" }}>
                      {index + 1}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-3">

                        <div
                          style={{
                            background: "#f1f8e9",
                            padding: "10px",
                            borderRadius: "12px",
                          }}
                        >
                          <FaStethoscope color="#2e7d32" />
                        </div>

                        <div>
                          <div
                            style={{
                              fontWeight: "800",
                              color: "#1a1a1a",
                            }}
                          >
                            {doctor.doctorName}
                          </div>

                          <small className="text-muted">
                            UID: {doctor._id.slice(-6).toUpperCase()}
                          </small>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: "600" }}>
                        {doctor.doctorEmail}
                      </div>
                      <div className="text-muted small">
                        {doctor.doctorNumber}
                      </div>
                    </td>

                    <td style={{ maxWidth: "200px" }}>
                      <div className="text-truncate">
                        {doctor.doctorAddress}
                      </div>
                    </td>

                    <td>
                      <span
                        className="badge"
                        style={{
                          background: "#e3f2fd",
                          color: "#1976d2",
                          padding: "6px 12px",
                          borderRadius: "8px",
                        }}
                      >
                        {doctor.doctorQualification}
                      </span>
                    </td>

                    <td>
                      <div className="action-group">

                        <button
                          className="btn-premium btn-edit"
                          onClick={() => handleEditClick(doctor)}
                        >
                          <FaUserEdit /> Edit
                        </button>

                        <button
                          className="btn-premium btn-delete"
                          onClick={() => handleDelete(doctor._id)}
                        >
                          <FaTrashAlt />
                        </button>

                        <button
                          className="btn-premium"
                          style={{
                            background: doctor.isBlocked ? "#4caf50" : "#ff9800",
                            color: "#fff"
                          }}
                          onClick={() => handleBlockToggle(doctor)}
                        >
                          {doctor.isBlocked ? "Unblock" : "Block"}
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </motion.div>
        )}

      </main>

      {showModal && (

        <div className="premium-modal-overlay">

          <div className="premium-modal-card-doctor">

            <div className="modal-accent"></div>

            <div className="modal-form-grid">

              <div className="modal-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={selectedDoctor.doctorName}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      doctorName: e.target.value,
                    })
                  }
                />
                {errors.doctorName && (
                  <p className="field-error">{errors.doctorName}</p>
                )}
              </div>

              <div className="modal-input-group">
                <label>Professional Email (Read-only)</label>
                <input
                  value={selectedDoctor.doctorEmail}
                  disabled
                  style={{
                    background: "#f5f5f5",
                    cursor: "not-allowed",
                  }}
                />
              </div>

              <div className="form-row d-flex gap-3">

                <div className="modal-input-group flex-grow-1">

                  <label>Phone Number</label>

                  <input
                    type="text"
                    value={selectedDoctor.doctorNumber}
                    onChange={(e) =>
                      setSelectedDoctor({
                        ...selectedDoctor,
                        doctorNumber: e.target.value,
                      })
                    }
                  />

                  {errors.doctorNumber && (
                    <p className="field-error">{errors.doctorNumber}</p>
                  )}

                </div>

              </div>

              <div className="modal-input-group">

                <label>Qualification & Experience</label>

                <input
                  type="text"
                  value={selectedDoctor.doctorQualification}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      doctorQualification: e.target.value,
                    })
                  }
                />

                {errors.doctorQualification && (
                  <p className="field-error">
                    {errors.doctorQualification}
                  </p>
                )}

              </div>

              <div className="modal-input-group">

                <label>Practice Address</label>

                <textarea
                  rows="2"
                  value={selectedDoctor.doctorAddress}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectedDoctor,
                      doctorAddress: e.target.value,
                    })
                  }
                  style={{ resize: "none" }}
                ></textarea>

                {errors.doctorAddress && (
                  <p className="field-error">{errors.doctorAddress}</p>
                )}

              </div>

            </div>

            <div className="modal-actions">

              <button
                className="btn-modal btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Go Back
              </button>

              <button
                className="btn-modal btn-save"
                onClick={handleUpdate}
              >
                Sync Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default DoctorPannel;