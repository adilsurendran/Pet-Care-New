import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
// import "./PetMarketplace.css"; // Using premium styles mainly
import { FaDog, FaShoppingBag, FaStore, FaPlus, FaCheck, FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

export default function PetMarketplace() {
  const userId = localStorage.getItem("user");

  const [activeTab, setActiveTab] = useState("home");
  const [pets, setPets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);

  // seller pets (manage area)
  const [myPets, setMyPets] = useState([]);

  const [sellForm, setSellForm] = useState({
    name: "",
    breed: "",
    age: "",
    price: "",
    image: null
  });

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* ======================
     FETCH DATA
  ====================== */
  const loadHome = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pets/sell/${userId}`
      );
      setPets(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/buyer/${userId}`
      );
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSellOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/seller/${userId}`
      );
      setSellOrders(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 seller pets (manage area)
  const loadMyPets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sell/mypets/${userId}`
      );
      setMyPets(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "home") loadHome();
    if (activeTab === "orders") loadOrders();
    if (activeTab === "sell") {
      loadSellOrders();
      loadMyPets();
    }
  }, [activeTab]);

  /* ======================
     BUY REQUEST
  ====================== */
  const buyPet = async (petId) => {
    try {
      await axios.post(`http://localhost:5000/api/buy`, {
        petId,
        buyerId: userId
      });
      alert("Buy request sent!");
    } catch {
      alert("Failed to send request");
    }
  };

  /* ======================
     ADD / UPDATE PET
  ====================== */
  const submitPet = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(sellForm).forEach((k) =>
      formData.append(k, sellForm[k])
    );

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/sell/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/sell/${userId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(res);
      }

      closeModal();
      loadMyPets();
    } catch (e) {
      console.log(e);
      alert("Failed to save pet");
    }
  };

  const deletePet = async (id) => {
    console.log(id);
    if (!window.confirm("Delete this pet?")) return;
    await axios.delete(`http://localhost:5000/api/sell/${id}`);
    loadMyPets();
  };

  const editPet = (p) => {
    setEditId(p._id);
    setSellForm({
      name: p.name,
      breed: p.breed,
      age: p.age,
      price: p.price,
      image: null
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setSellForm({
      name: "",
      breed: "",
      age: "",
      price: "",
      image: null
    });
  };

  /* ======================
     UPDATE ORDER STATUS
  ====================== */
  const updateOrder = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/order/${orderId}`,
        { status }
      );
      loadSellOrders();
      loadOrders();
    } catch {
      alert("Failed to update order");
    }
  };

  const pendingRequests = sellOrders.filter(
    (o) => o.status === "Pending"
  );

  const historyRequests = sellOrders.filter(
    (o) => o.status !== "Pending"
  );

  // Tab Button Component
  const TabBtn = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '12px 25px',
        borderRadius: '12px',
        border: 'none',
        background: activeTab === id ? 'var(--user-primary)' : 'white',
        color: activeTab === id ? 'white' : '#64748b',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
        boxShadow: activeTab === id ? '0 4px 10px rgba(76, 175, 80, 0.3)' : 'none'
      }}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header" style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
            <div>
              <h1 className="panel-title">Pet <span>Adoptions</span></h1>
              <p className="panel-subtitle">Buy, sell, and adopt pets within the community.</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', background: '#f1f5f9', padding: '5px', borderRadius: '15px' }}>
              <TabBtn id="home" label="Browse Pets" icon={<FaDog />} />
              <TabBtn id="orders" label="My Requests" icon={<FaShoppingBag />} />
              <TabBtn id="sell" label="Sell / Manage" icon={<FaStore />} />
            </div>
          </div>
        </header>

        {activeTab === "home" && (
          <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
            {pets.map((p) => (
              <motion.div
                key={p._id}
                className="pet-card"
                whileHover={{ y: -5 }}
                style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={p.image ? `http://localhost:5000/uploads/${p.image}` : "/placeholder-pet.png"}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>{p.name}</h3>
                    <div style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      ₹ {p.price}
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}><strong>Breed:</strong> {p.breed}</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}><strong>Age:</strong> {p.age || "-"}</p>

                  <button
                    onClick={() => buyPet(p._id)}
                    style={{ width: '100%', padding: '12px', background: 'var(--user-primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Request to Buy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ================= ORDERS ================= */}
        {activeTab === "orders" && (
          <div className="orders-container">
            {orders.map((o) => (
              <div key={o._id} style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{o.petId?.name}</h4>
                  <span style={{
                    padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700',
                    background: o.status === 'Approved' ? '#dcfce7' : o.status === 'Rejected' ? '#fee2e2' : '#e0f2fe',
                    color: o.status === 'Approved' ? '#166534' : o.status === 'Rejected' ? '#991b1b' : '#075985'
                  }}>
                    Status: {o.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => updateOrder(o._id, "Cancelled")} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 15px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => updateOrder(o._id, "Delivered")} style={{ background: '#f0fdf4', color: '#22c55e', border: 'none', padding: '8px 15px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Delivered?</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= SELL / MANAGE ================= */}
        {activeTab === "sell" && (
          <div style={{ display: 'flex', gap: '30px', alignItems: 'start' }}>
            <div style={{ flex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>My Pets</h3>
                <button onClick={() => setShowModal(true)} style={{ background: 'var(--user-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FaPlus /> Add Pet
                </button>
              </div>

              <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {myPets.map((p) => (
                  <div key={p._id} style={{ background: 'white', borderRadius: '15px', padding: '15px', border: '1px solid #f1f5f9' }}>
                    <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                    <h4 style={{ margin: '0 0 5px 0' }}>{p.name}</h4>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button onClick={() => editPet(p)} style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', background: 'white', borderRadius: '8px', cursor: 'pointer' }}><FaEdit /></button>
                      <button onClick={() => deletePet(p._id)} style={{ flex: 1, padding: '8px', background: '#ffe4e6', color: '#e11d48', border: 'none', borderRadius: '8px', cursor: 'pointer' }}><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, background: 'white', padding: '25px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
              <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Requests</h3>

              {pendingRequests.length === 0 && <p className="text-muted">No pending requests</p>}

              {pendingRequests.map((o) => (
                <div key={o._id} style={{ paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: '700', marginBottom: '5px' }}>{o.petId?.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '10px' }}>Requested by {o.buyerId?.userFullname}</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => updateOrder(o._id, "Approved")} style={{ flex: 1, background: '#dcfce7', color: '#166534', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Accept</button>
                    <button onClick={() => updateOrder(o._id, "Rejected")} style={{ flex: 1, background: '#fee2e2', color: '#991b1b', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Reject</button>
                  </div>
                </div>
              ))}

              <h4 style={{ margin: '30px 0 15px 0' }}>History</h4>
              {historyRequests.map((o) => (
                <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '10px' }}>
                  <span>{o.petId?.name}</span>
                  <span style={{ fontWeight: '700', color: o.status === 'Approved' ? 'green' : 'red' }}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODAL ================= */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '400px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
              <h3 style={{ marginTop: 0 }}>{editId ? "Edit Pet" : "Add Pet for Adoption"}</h3>
              <form onSubmit={submitPet} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input placeholder="Pet Name" required value={sellForm.name} onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                <input placeholder="Breed" required value={sellForm.breed} onChange={(e) => setSellForm({ ...sellForm, breed: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                <input placeholder="Age" value={sellForm.age} onChange={(e) => setSellForm({ ...sellForm, age: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                <input placeholder="Price" required value={sellForm.price} onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                <input type="file" accept="image/*" onChange={(e) => setSellForm({ ...sellForm, image: e.target.files[0] })} style={{ padding: '10px' }} />

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--user-primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Save Pet</button>
                  <button type="button" onClick={closeModal} style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
