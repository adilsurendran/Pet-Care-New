// // import React, { useState } from "react";
// // import "./PetProfile.css";

// // export default function PetProfile() {
// //   const [pets, setPets] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedPet, setSelectedPet] = useState(null);

// //   const [form, setForm] = useState({
// //     name: "",
// //     breed: "",
// //     purchaseDate: "",
// //     ageYears: "",
// //     ageMonths: "",
// //     sex: "",
// //     lastVaccination: "",
// //     weight: ""
// //   });

// //     const userId = localStorage.getItem("user");


// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const addPet = async (e) => {
// //     e.preventDefault();
// //         const response = await axios.post(`http://localhost:5000/api/pets/add/${userId}`,form);

// //     setForm({
// //       name: "",
// //       breed: "",
// //       purchaseDate: "",
// //       ageYears: "",
// //       ageMonths: "",
// //       sex: "",
// //       lastVaccination: "",
// //       weight: ""
// //     });
// //     setShowModal(false);
// //   };

// //   return (
// //     <div className="pet-profile-page">
// //       <div className="pet-header">
// //         <h2>My Pets</h2>
// //         <button className="add-pet-btn" onClick={() => setShowModal(true)}>
// //           + Add Pet
// //         </button>
// //       </div>

// //       {/* PET LIST */}
// //       <div className="pet-card-grid">
// //         {pets.length === 0 && (
// //           <p className="empty-text">No pets added yet 🐾</p>
// //         )}

// //         {pets.map((pet) => (
// //           <div
// //             key={pet.id}
// //             className="pet-card"
// //             onClick={() => setSelectedPet(pet)}
// //           >
// //             <div className="pet-avatar">
// //               {pet.name.charAt(0).toUpperCase()}
// //             </div>
// //             <h4>{pet.name}</h4>
// //             <p>{pet.breed}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* PET DETAILS */}
// //       {selectedPet && (
// //         <div className="pet-detail-card">
// //           <h3>{selectedPet.name} 🐶</h3>
// //           <div className="pet-detail-grid">
// //             <div><b>Breed:</b> {selectedPet.breed}</div>
// //             <div><b>Sex:</b> {selectedPet.sex}</div>
// //             <div><b>Age:</b> {selectedPet.ageYears}Y {selectedPet.ageMonths}M</div>
// //             <div><b>Weight:</b> {selectedPet.weight} kg</div>
// //             <div><b>Purchased On:</b> {selectedPet.purchaseDate}</div>
// //             <div><b>Last Vaccination:</b> {selectedPet.lastVaccination}</div>
// //           </div>
// //           <button
// //             className="close-btn"
// //             onClick={() => setSelectedPet(null)}
// //           >
// //             Close
// //           </button>
// //         </div>
// //       )}

// //       {/* ADD PET MODAL */}
// //       {showModal && (
// //         <div className="modal-backdrop">
// //           <div className="pet-modal">
// //             <h3>Add Pet Details</h3>
// //             <form onSubmit={addPet}>
// //               <input name="name" placeholder="Pet Name" onChange={handleChange} required />
// //               <input name="breed" placeholder="Breed" onChange={handleChange} required />
// //               <input type="date" name="purchaseDate" onChange={handleChange} />
// //               <div className="age-row">
// //                 <input name="ageYears" placeholder="Years" onChange={handleChange} />
// //                 <input name="ageMonths" placeholder="Months" onChange={handleChange} />
// //               </div>
// //               <select name="sex" onChange={handleChange} required>
// //                 <option value="">Select Sex</option>
// //                 <option>Male</option>
// //                 <option>Female</option>
// //               </select>
// //               <input type="date" name="lastVaccination" onChange={handleChange} />
// //               <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
// //               <div className="modal-actions">
// //                 <button type="submit">Save Pet</button>
// //                 <button type="button" onClick={() => setShowModal(false)}>
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./PetProfile.css";

// export default function PetProfile() {
//   const [pets, setPets] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     breed: "",
//     purchaseDate: "",
//     ageYears: "",
//     ageMonths: "",
//     sex: "",
//     lastVaccination: "",
//     weight: ""
//   });

//   const userId = localStorage.getItem("user");

//   // ---------------------------
//   // Fetch user pets
//   // ---------------------------
//   const fetchPets = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/pets/user/${userId}`
//       );
//       setPets(res.data.pets || []);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching pets", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) fetchPets();
//   }, [userId]);

//   // ---------------------------
//   // Handle form change
//   // ---------------------------
//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // ---------------------------
//   // Add pet (API)
//   // ---------------------------
//   const addPet = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         `http://localhost:5000/api/pets/add/${userId}`,
//         form
//       );

//       await fetchPets(); // refresh list

//       setForm({
//         name: "",
//         breed: "",
//         purchaseDate: "",
//         ageYears: "",
//         ageMonths: "",
//         sex: "",
//         lastVaccination: "",
//         weight: ""
//       });

//       setShowModal(false);
//     } catch (err) {
//       console.error("Failed to add pet", err);
//       alert("Failed to add pet");
//     }
//   };

//   return (
//     <div className="pet-profile-page">
//       {/* HEADER */}
//       <div className="pet-header">
//         <h2>My Pets</h2>
//         <button className="add-pet-btn" onClick={() => setShowModal(true)}>
//           + Add Pet
//         </button>
//       </div>

//       {/* PET LIST */}
//       <div className="pet-card-grid">
//         {loading && <p className="empty-text">Loading pets...</p>}

//         {!loading && pets.length === 0 && (
//           <p className="empty-text">No pets added yet 🐾</p>
//         )}

//         {pets.map((pet) => (
//           <div
//             key={pet._id}
//             className="pet-card"
//             onClick={() => setSelectedPet(pet)}
//           >
//             <div className="pet-avatar">
//               {pet.name?.charAt(0).toUpperCase()}
//             </div>
//             <h4>{pet.name}</h4>
//             <p>{pet.breed}</p>
//           </div>
//         ))}
//       </div>

//       {/* PET DETAILS */}
//       {selectedPet && (
//         <div className="pet-detail-card">
//           <h3>{selectedPet.name} 🐶</h3>

//           <div className="pet-detail-grid">
//             <div><b>Breed:</b> {selectedPet.breed}</div>
//             <div><b>Sex:</b> {selectedPet.sex}</div>
//             <div>
//               <b>Age:</b> {selectedPet.ageYears || 0}Y{" "}
//               {selectedPet.ageMonths || 0}M
//             </div>
//             <div><b>Weight:</b> {selectedPet.weight || "--"} kg</div>
//             <div>
//               <b>Purchased On:</b>{" "}
//               {selectedPet.purchaseDate
//                 ? new Date(selectedPet.purchaseDate).toLocaleDateString()
//                 : "--"}
//             </div>
//             <div>
//               <b>Last Vaccination:</b>{" "}
//               {selectedPet.lastVaccination
//                 ? new Date(selectedPet.lastVaccination).toLocaleDateString()
//                 : "--"}
//             </div>
//           </div>

//           <button className="close-btn" onClick={() => setSelectedPet(null)}>
//             Close
//           </button>
//         </div>
//       )}

//       {/* ADD PET MODAL */}
//       {showModal && (
//         <div className="modal-backdrop">
//           <div className="pet-modal">
//             <h3>Add Pet Details</h3>

//             <form onSubmit={addPet}>
//               <input
//                 name="name"
//                 placeholder="Pet Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="breed"
//                 placeholder="Breed"
//                 value={form.breed}
//                 onChange={handleChange}
//                 required
//               />
// <label className="mb-1">DOB / Purchase Date</label>
//               <input
//                 type="date"
//                 name="purchaseDate"
//                 value={form.purchaseDate}
//                 onChange={handleChange}
//               />
// <label className="mb-1">Age</label>
//               <div className="age-row">
//                 <input
//                   name="ageYears"
//                   placeholder="Years"
//                   value={form.ageYears}
//                   onChange={handleChange}
//                 />
//                 <input
//                   name="ageMonths"
//                   placeholder="Months"
//                   value={form.ageMonths}
//                   onChange={handleChange}
//                 />
//               </div>

//               <select
//                 name="sex"
//                 value={form.sex}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Sex</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
// <label className="mb-1">Last Vaccination</label>
//               <input
//                 type="date"
//                 name="lastVaccination"
//                 value={form.lastVaccination}
//                 onChange={handleChange}
//               />

//               <input
//                 name="weight"
//                 placeholder="Weight (kg)"
//                 value={form.weight}
//                 onChange={handleChange}
//               />

//               <div className="modal-actions">
//                 <button type="submit">Save Pet</button>
//                 <button type="button" onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PetProfile.css";
import BuyerNav from "./BuyerNav";

export default function PetProfile() {
  const userId = localStorage.getItem("user");

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const [form, setForm] = useState({
    name: "",
    breed: "",
    purchaseDate: "",
    ageYears: "",
    ageMonths: "",
    sex: "",
    lastVaccination: "",
    weight: ""
  });

  const [editForm, setEditForm] = useState({});

  /* ============================
     FETCH USER PETS
  ============================ */
  const fetchPets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pets/user/${userId}`
      );
      setPets(res.data.pets || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching pets", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchPets();
  }, [userId]);

  /* ============================
     ADD PET
  ============================ */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addPet = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/pets/add/${userId}`,
        form
      );
      setShowAddModal(false);
      resetForm();
      fetchPets();
    } catch (err) {
      console.error("Add pet failed", err);
      alert("Failed to add pet");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      breed: "",
      purchaseDate: "",
      ageYears: "",
      ageMonths: "",
      sex: "",
      lastVaccination: "",
      weight: ""
    });
  };

  /* ============================
     EDIT PET
  ============================ */
  const openEditModal = async (petId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pets/${petId}`
      );
      setEditForm(res.data);
      setShowEditModal(true);
    } catch (err) {
      console.error("Failed to load pet", err);
    }
  };

  const updatePet = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/pets/${editForm._id}`,
        editForm
      );
      setShowEditModal(false);
      setSelectedPet(null);
      fetchPets();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update pet");
    }
  };

  /* ============================
     DELETE PET
  ============================ */
  const deletePet = async (petId) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/pets/${petId}`
      );
      setSelectedPet(null);
      fetchPets();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete pet");
    }
  };

  /* ============================
     UI
  ============================ */
  return (
    <div>
        <BuyerNav></BuyerNav>
    <div className="pet-profile-page">
      {/* HEADER */}
      <div className="pet-header">
        <h2>My Pets</h2>
        <button className="add-pet-btn" onClick={() => setShowAddModal(true)}>
          + Add Pet
        </button>
      </div>

      {/* PET LIST */}
      <div className="pet-card-grid">
        {loading && <p className="empty-text">Loading pets...</p>}

        {!loading && pets.length === 0 && (
          <p className="empty-text">No pets added yet 🐾</p>
        )}

        {pets.map((pet) => (
          <div
            key={pet._id}
            className="pet-card"
            onClick={() => setSelectedPet(pet)}
          >
            <div className="pet-avatar">
              {pet.name?.charAt(0).toUpperCase()}
            </div>
            <h4>{pet.name}</h4>
            <p>{pet.breed}</p>
          </div>
        ))}
      </div>

      {/* PET DETAILS */}
      {selectedPet && (
        <div className="pet-detail-card">
          <h3>{selectedPet.name} 🐶</h3>

          <div className="pet-detail-grid">
            <div><b>Breed:</b> {selectedPet.breed}</div>
            <div><b>Sex:</b> {selectedPet.sex}</div>
            <div>
              <b>Age:</b> {selectedPet.ageYears || 0}Y{" "}
              {selectedPet.ageMonths || 0}M
            </div>
            <div><b>Weight:</b> {selectedPet.weight || "--"} kg</div>
            <div>
              <b>Purchased On:</b>{" "}
              {selectedPet.purchaseDate
                ? new Date(selectedPet.purchaseDate).toLocaleDateString()
                : "--"}
            </div>
            <div>
              <b>Last Vaccination:</b>{" "}
              {selectedPet.lastVaccination
                ? new Date(selectedPet.lastVaccination).toLocaleDateString()
                : "--"}
            </div>
          </div>

          <div className="pet-action-buttons">
            <button
              className="edit-btn"
              onClick={() => openEditModal(selectedPet._id)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deletePet(selectedPet._id)}
            >
              Delete
            </button>

            <button
              className="close-btn"
              onClick={() => setSelectedPet(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD PET MODAL */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="pet-modal">
            <h3>Add Pet</h3>
            <form onSubmit={addPet}>
              <input name="name" placeholder="Pet Name" onChange={handleChange} required />
              <input name="breed" placeholder="Breed" onChange={handleChange} required />
            <label className="mb-1">DOB / Purchase Date</label>
              <input type="date" name="purchaseDate" onChange={handleChange} />
            <label className="mb-1">Age</label>
              <div className="age-row">
                <input name="ageYears" placeholder="Years" onChange={handleChange} />
                <input name="ageMonths" placeholder="Months" onChange={handleChange} />
              </div>
              <select name="sex" onChange={handleChange} required>
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label className="mb-1">Last Vaccination</label>
              <input type="date" name="lastVaccination" onChange={handleChange} />
              <input name="weight" placeholder="Weight (kg)" onChange={handleChange} />
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PET MODAL */}
      {showEditModal && (
        <div className="modal-backdrop">
          <div className="pet-modal">
            <h3>Edit Pet</h3>
            <form onSubmit={updatePet}>
              <input
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                required
              />
              <input
                value={editForm.breed || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, breed: e.target.value })
                }
                required
              />
              <input
                type="date"
                value={
                  editForm.purchaseDate
                    ? editForm.purchaseDate.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditForm({ ...editForm, purchaseDate: e.target.value })
                }
              />
              <div className="age-row">
                <input
                  value={editForm.ageYears || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, ageYears: e.target.value })
                  }
                />
                <input
                  value={editForm.ageMonths || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, ageMonths: e.target.value })
                  }
                />
              </div>
              <select
                value={editForm.sex || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, sex: e.target.value })
                }
                required
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="date"
                value={
                  editForm.lastVaccination
                    ? editForm.lastVaccination.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    lastVaccination: e.target.value
                  })
                }
              />
              <input
                value={editForm.weight || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, weight: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
