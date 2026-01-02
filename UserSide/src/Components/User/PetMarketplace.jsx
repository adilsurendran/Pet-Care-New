import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PetMarketplace.css";

export default function PetMarketplace() {
  const userId = localStorage.getItem("user");

  const [activeTab, setActiveTab] = useState("home");
  const [pets, setPets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);

  const [sellForm, setSellForm] = useState({
    name: "",
    breed: "",
    age: "",
    price: ""
  });

  /* ======================
     FETCH DATA
  ====================== */
  const loadHome = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/market/pets/${userId}`
    );
    setPets(res.data || []);
  };

  const loadOrders = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/market/orders/buyer/${userId}`
    );
    setOrders(res.data || []);
  };

  const loadSellOrders = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/market/orders/seller/${userId}`
    );
    setSellOrders(res.data || []);
  };

  useEffect(() => {
    if (activeTab === "home") loadHome();
    if (activeTab === "orders") loadOrders();
    if (activeTab === "sell") loadSellOrders();
  }, [activeTab]);

  /* ======================
     BUY REQUEST
  ====================== */
  const buyPet = async (petId) => {
    await axios.post(`http://localhost:5000/api/market/buy`, {
      petId,
      buyerId: userId
    });
    alert("Buy request sent!");
  };

  /* ======================
     ADD PET FOR SALE
  ====================== */
  const addToSale = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/api/market/sell/${userId}`,
      sellForm
    );
    setSellForm({ name: "", breed: "", age: "", price: "" });
    loadSellOrders();
  };

  /* ======================
     UPDATE ORDER STATUS
  ====================== */
  const updateOrder = async (orderId, status) => {
    await axios.put(
      `http://localhost:5000/api/market/order/${orderId}`,
      { status }
    );
    loadSellOrders();
  };

  return (
    <div className="market-page">
      {/* ================= HOME ================= */}
      {activeTab === "home" && (
        <div className="tab-view">
          <h2>Pets for Sale</h2>
          <div className="grid">
            {pets.map((p) => (
              <div key={p._id} className="card">
                <h4>{p.name}</h4>
                <p>{p.breed}</p>
                <p>Age: {p.age}</p>
                <p className="price">₹ {p.price}</p>
                <button onClick={() => buyPet(p._id)}>Buy</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ORDERS ================= */}
      {activeTab === "orders" && (
        <div className="tab-view">
          <h2>My Orders</h2>
          {orders.map((o) => (
            <div key={o._id} className="order-card">
              <p><b>{o.pet.name}</b></p>
              <p>Status: <span className={`status ${o.status}`}>{o.status}</span></p>
            </div>
          ))}
        </div>
      )}

      {/* ================= SELL ================= */}
      {activeTab === "sell" && (
        <div className="tab-view">
          <h2>Sell a Pet</h2>

          <form className="sell-form" onSubmit={addToSale}>
            <input placeholder="Pet Name" required
              onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })} />
            <input placeholder="Breed" required
              onChange={(e) => setSellForm({ ...sellForm, breed: e.target.value })} />
            <input placeholder="Age"
              onChange={(e) => setSellForm({ ...sellForm, age: e.target.value })} />
            <input placeholder="Price"
              onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })} />
            <button>Add for Sale</button>
          </form>

          <h3>Requests on My Pets</h3>
          {sellOrders.map((o) => (
            <div key={o._id} className="order-card">
              <p>{o.pet.name} — {o.buyer.userFullname}</p>
              <div className="actions">
                <button onClick={() => updateOrder(o._id, "Approved")}>Approve</button>
                <button className="reject"
                  onClick={() => updateOrder(o._id, "Rejected")}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab("home")}
          className={activeTab === "home" ? "active" : ""}>
          Home
        </button>
        <button onClick={() => setActiveTab("orders")}
          className={activeTab === "orders" ? "active" : ""}>
          Orders
        </button>
        <button onClick={() => setActiveTab("sell")}
          className={activeTab === "sell" ? "active" : ""}>
          Sell
        </button>
      </div>
    </div>
  );
}
