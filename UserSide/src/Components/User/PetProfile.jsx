import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
// import "./PetProfile.css"; // Using premium styles
import { FaPaw, FaPlus, FaVenusMars, FaBirthdayCake, FaWeight, FaSyringe, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

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
    weight: "",
    image: null
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

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const addPet = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.keys(form).forEach(key => {
        if (form[key]) formdata.append(key, form[key]);
      });

      await axios.post(
        `http://localhost:5000/api/pets/add/${userId}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
      name: "", breed: "", purchaseDate: "", ageYears: "", ageMonths: "", sex: "", lastVaccination: "", weight: "", image: null
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

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="panel-title">My <span>Pets</span></h1>
            <p className="panel-subtitle">Keep track of your furry family members.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{ background: 'var(--user-primary)', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaPlus /> Add Pet
          </button>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading pets...</div>
        ) : (
          <div className="pet-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {!loading && pets.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', background: 'white', borderRadius: '20px', color: '#94a3b8' }}>
                <FaPaw style={{ fontSize: '3rem', marginBottom: '20px', color: '#e2e8f0' }} />
                <p>No pets added yet. Click "+ Add Pet" to get started!</p>
              </div>
            )}

            {pets.map((pet) => (
              <motion.div
                key={pet._id}
                whileHover={{ y: -5 }}
                className="pet-card-premium"
                onClick={() => setSelectedPet(pet)}
                style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', cursor: 'pointer' }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={pet.image ? `http://localhost:5000/${pet.image.replace(/\\/g, "/")}` : "/default-pet.png"}
                    alt={pet.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '20px' }}>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>{pet.name}</h3>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>{pet.breed}</p>
                  </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaVenusMars /> {pet.sex}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FaBirthdayCake /> {pet.ageYears}Y {pet.ageMonths}M</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* PET DETAIL MODAL */}
        {selectedPet && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', borderRadius: '25px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', padding: '30px', position: 'relative' }}>
              <button onClick={() => setSelectedPet(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}><FaTimes /></button>

              <div style={{ display: 'flex', gap: '30px', alignItems: 'start' }}>
                <div style={{ width: '200px', height: '200px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={selectedPet.image ? `http://localhost:5000/${selectedPet.image.replace(/\\/g, "/")}` : "/default-pet.png"}
                    alt={selectedPet.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>{selectedPet.name}</h2>
                  <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '20px' }}>{selectedPet.breed}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', color: '#475569' }}>
                    <div><strong>Sex:</strong> {selectedPet.sex}</div>
                    <div><strong>Age:</strong> {selectedPet.ageYears}Y {selectedPet.ageMonths}M</div>
                    <div><strong>Weight:</strong> {selectedPet.weight || "--"} kg</div>
                    <div><strong>Last Vax:</strong> {selectedPet.lastVaccination ? new Date(selectedPet.lastVaccination).toLocaleDateString() : "--"}</div>
                    <div><strong>Purchased:</strong> {selectedPet.purchaseDate ? new Date(selectedPet.purchaseDate).toLocaleDateString() : "--"}</div>
                  </div>

                  <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => openEditModal(selectedPet._id)} style={{ flex: 1, padding: '10px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', gap: '5px' }}><FaEdit /> Edit</button>
                    <button onClick={() => deletePet(selectedPet._id)} style={{ flex: 1, padding: '10px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', gap: '5px' }}><FaTrash /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD PET MODAL */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '500px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
              <h3 style={{ marginTop: 0 }}>Add New Pet</h3>
              <form onSubmit={addPet} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <input name="name" placeholder="Pet Name" onChange={handleChange} required className="premium-input" />
                  <input name="breed" placeholder="Breed" onChange={handleChange} required className="premium-input" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <input name="ageYears" placeholder="Years" onChange={handleChange} className="premium-input" />
                  <input name="ageMonths" placeholder="Months" onChange={handleChange} className="premium-input" />
                </div>
                <select name="sex" onChange={handleChange} required className="premium-input">
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Date of Purchase / Birth</label>
                  <input type="date" name="purchaseDate" onChange={handleChange} className="premium-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Last Vaccination</label>
                  <input type="date" name="lastVaccination" onChange={handleChange} className="premium-input" />
                </div>
                <input name="weight" placeholder="Weight (kg)" onChange={handleChange} className="premium-input" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="premium-input" style={{ padding: '10px' }} />

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--user-primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Save Pet</button>
                  <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
