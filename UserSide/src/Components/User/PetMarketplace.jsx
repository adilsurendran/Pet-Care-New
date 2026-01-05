// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./PetMarketplace.css";

// export default function PetMarketplace() {
//   const userId = localStorage.getItem("user");

//   const [activeTab, setActiveTab] = useState("home");
//   const [pets, setPets] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [sellOrders, setSellOrders] = useState([]);

//   const [sellForm, setSellForm] = useState({
//     name: "",
//     breed: "",
//     age: "",
//     price: "",
//     image: null
//   });

//   /* ======================
//      FETCH DATA
//   ====================== */
//   const loadHome = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/pets/sell/${userId}`
//       );
//       setPets(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadOrders = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/orders/buyer/${userId}`
//       );
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadSellOrders = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/orders/seller/${userId}`
//       );
//       setSellOrders(res.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "home") loadHome();
//     if (activeTab === "orders") loadOrders();
//     if (activeTab === "sell") loadSellOrders();
//   }, [activeTab]);

//   /* ======================
//      BUY REQUEST
//   ====================== */
//   const buyPet = async (petId) => {
//     try {
//       await axios.post(`http://localhost:5000/api/buy`, {
//         petId,
//         buyerId: userId
//       });
//       alert("Buy request sent!");
//     } catch (err) {
//       alert("Failed to send request");
//     }
//   };

//   /* ======================
//      ADD PET FOR SALE
//   ====================== */
//   const addToSale = async (e) => {
//     e.preventDefault();

//     if (!sellForm.image) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(sellForm).forEach((key) =>
//       formData.append(key, sellForm[key])
//     );

//     try {
//       await axios.post(
//         `http://localhost:5000/api/sell/${userId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setSellForm({ name: "", breed: "", age: "", price: "", image: null });
//       loadSellOrders();
//     } catch (err) {
//       alert("Failed to add pet for sale");
//     }
//   };

//   /* ======================
//      UPDATE ORDER STATUS
//   ====================== */
//   const updateOrder = async (orderId, status) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/order/${orderId}`,
//         { status }
//       );
//       loadSellOrders();
//     } catch (err) {
//       alert("Failed to update order");
//     }
//   };

//   return (
//     <div className="market-page">
//       {/* ================= HOME ================= */}
//       {activeTab === "home" && (
//         <div className="tab-view">
//           <h2>Pets for Sale</h2>
//           <div className="grid">
//             {pets.map((p) => (
//               <div key={p._id} className="card">
//                 <img
//                   src={
//                     p.image
//                       ? `http://localhost:5000/uploads/${p.image}`
//                       : "/placeholder-pet.png"
//                   }
//                   alt={p.name}
//                   className="pet-image"
//                 />
//                 <h4>{p.name}</h4>
//                 <p>{p.breed}</p>
//                 <p>Age: {p.age || "-"}</p>
//                 <p className="price">₹ {p.price}</p>
//                 <button onClick={() => buyPet(p._id)}>Buy</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ================= ORDERS ================= */}
//       {activeTab === "orders" && (
//         <div className="tab-view">
//           <h2>My Orders</h2>
//           {orders.map((o) => (
//             <div key={o._id} className="order-card">
//               <p><b>{o.petId?.name}</b></p>
//               <p>
//                 Status:
//                 <span className={`status ${o.status}`}>{o.status}</span>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ================= SELL ================= */}
//       {activeTab === "sell" && (
//         <div className="tab-view">
//           <h2>Sell a Pet</h2>

//           <form className="sell-form" onSubmit={addToSale}>
//             <input placeholder="Pet Name" required
//               value={sellForm.name}
//               onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })} />

//             <input placeholder="Breed" required
//               value={sellForm.breed}
//               onChange={(e) => setSellForm({ ...sellForm, breed: e.target.value })} />

//             <input placeholder="Age"
//               value={sellForm.age}
//               onChange={(e) => setSellForm({ ...sellForm, age: e.target.value })} />

//             <input placeholder="Price" required
//               value={sellForm.price}
//               onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })} />

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setSellForm({ ...sellForm, image: e.target.files[0] })
//               }
//             />

//             <button>Add for Sale</button>
//           </form>

//           <h3>Requests on My Pets</h3>
//           {sellOrders.map((o) => (
//             <div key={o._id} className="order-card">
//               <p>
//                 {o.petId?.name} — {o.buyerId?.userFullname}
//               </p>
//               <div className="actions">
//                 <button onClick={() => updateOrder(o._id, "Approved")}>
//                   Approve
//                 </button>
//                 <button
//                   className="reject"
//                   onClick={() => updateOrder(o._id, "Rejected")}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ================= FOOTER ================= */}
//       <div className="bottom-nav">
//         <button
//           onClick={() => setActiveTab("home")}
//           className={activeTab === "home" ? "active" : ""}
//         >
//           Home
//         </button>
//         <button
//           onClick={() => setActiveTab("orders")}
//           className={activeTab === "orders" ? "active" : ""}
//         >
//           Orders
//         </button>
//         <button
//           onClick={() => setActiveTab("sell")}
//           className={activeTab === "sell" ? "active" : ""}
//         >
//           Sell
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PetMarketplace.css";

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
       const res= await axios.post(
          `http://localhost:5000/api/sell/${userId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(res);
        
      }

      closeModal();
      loadMyPets();
    } catch(e) {
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

  return (
    <div className="market-page">

      {activeTab === "home" && (
        <div className="tab-view">
          <h2>Pets for Sale</h2>
          <div className="grid">
            {pets.map((p) => (
              <div key={p._id} className="card">
                <img
                  src={
                    p.image
                      ? `http://localhost:5000/uploads/${p.image}`
                      : "/placeholder-pet.png"
                  }
                  alt={p.name}
                  className="pet-image"
                  width={"100px"}
                />
                <h4>{p.name}</h4>
                <p>{p.breed}</p>
                <p>Age: {p.age || "-"}</p>
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
            <div key={o._id} className="order-card d-flex justify-content-between">
              <div>
              <p><b>{o.petId?.name}</b></p>
              <p>
                Status:
                <span className={`status ${o.status}`}>{o.status}</span>
              </p>
              </div>
              <div>
                <button onClick={() => updateOrder(o._id, "Cancelled")}>Cancel</button>
                <button onClick={() => updateOrder(o._id, "Delivered")}>
          Delivered?
        </button>
        </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= SELL ================= */}
      {activeTab === "sell" && (
        <div className="row sell-layout">

          {/* ===== LEFT : MANAGE PETS ===== */}
          <div className="col-8">
            <div className="sell-header">
              <h2>My Pets for Sale</h2>
              <button onClick={() => setShowModal(true)}>
                + Add Pet
              </button>
            </div>

            <div className="grid">
              {myPets.map((p) => (
                <div className="card" key={p._id}>
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    alt={p.name}
                    width={"100px"}
                  />
                  <h4>{p.name}</h4>
                  <p>{p.breed}</p>
                  <p>₹ {p.price}</p>

                  <div className="actions">
                    <button onClick={() => editPet(p)}>Edit</button>
                    <button className="reject" onClick={() => deletePet(p._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* ===== RIGHT : REQUESTS & HISTORY ===== */}
<div className="col-4 request-panel">

  {/* -------- CURRENT REQUESTS -------- */}
  <h3>Current Requests</h3>

  {pendingRequests.length === 0 && (
    <p className="muted">No pending requests</p>
  )}

  {pendingRequests.map((o) => (
    <div key={o._id} className="order-card">
      <p>
        <b>{o.petId?.name}</b>
      </p>
      <p>{o.buyerId?.userFullname}</p>

      <div className="actions">
        <button onClick={() => updateOrder(o._id, "Approved")}>
          Approve
        </button>
        <button
          className="reject"
          onClick={() => updateOrder(o._id, "Rejected")}
        >
          Reject
        </button>
      </div>
    </div>
  ))}

  {/* -------- HISTORY -------- */}
  <h3 className="mt-4">History</h3>

  {historyRequests.length === 0 && (
    <p className="muted">No history available</p>
  )}

  {historyRequests.map((o) => (
    <div key={o._id} className="order-card history">
      <p>
        <b>{o.petId?.name}</b>
      </p>
      <p>{o.buyerId?.userFullname}</p>

      <span className={`status-badge ${o.status}`}>
        {o.status}
      </span>
    </div>
  ))}
</div>

        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>{editId ? "Edit Pet" : "Add Pet"}</h3>

            <form onSubmit={submitPet}>
              <input
                placeholder="Pet Name"
                required
                value={sellForm.name}
                onChange={(e) =>
                  setSellForm({ ...sellForm, name: e.target.value })
                }
              />
              <input
                placeholder="Breed"
                required
                value={sellForm.breed}
                onChange={(e) =>
                  setSellForm({ ...sellForm, breed: e.target.value })
                }
              />
              <input
                placeholder="Age"
                value={sellForm.age}
                onChange={(e) =>
                  setSellForm({ ...sellForm, age: e.target.value })
                }
              />
              <input
                placeholder="Price"
                required
                value={sellForm.price}
                onChange={(e) =>
                  setSellForm({ ...sellForm, price: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSellForm({ ...sellForm, image: e.target.files[0] })
                }
              />

              <div className="actions">
                <button type="submit">Save</button>
                <button type="button" className="reject" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="bottom-nav">
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
        <button onClick={() => setActiveTab("sell")}>Sell</button>
      </div>
    </div>
  );
}
