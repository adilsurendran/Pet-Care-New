// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; // Import axios for API calls
// // import './ProductPage.css';
// // import { useNavigate } from 'react-router-dom';
// // import BuyerNav from './BuyerNav';
// // import BuyerFooter from './BuyerFooter';

// // const BuyPro = () => {
// //   const [cart, setCart] = useState([]); // State for the cart
// //   const [products, setProducts] = useState([]); // State to store products
// //   const [loading, setLoading] = useState(true); // State to track loading
// //   const [userId, setUserId] = useState(null); // State to store userId
// //   const [quantities, setQuantities] = useState({});


// //   const navigate = useNavigate();

// //   // Fetch products from the API
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/allpro');
// //         // console.log(response,"seller idddddddddddddd???????????????????");

// //         setProducts(response.data.products); // Set the products in state
// //         const initialQuantities = {};
// // response.data.products.forEach(p => {
// //   initialQuantities[p._id] = 1;
// // });
// // setQuantities(initialQuantities);

// //         setLoading(false); // Set loading to false once the data is fetched
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();

// //     // Retrieve userId from localStorage
// //     const storedUserId = localStorage.getItem('user');
// //     setUserId(storedUserId); // Set the userId state from localStorage
// //   }, []);

// //   const increaseQty = (id) => {
// //   setQuantities(prev => ({
// //     ...prev,
// //     [id]: prev[id] + 1
// //   }));
// // };

// // const decreaseQty = (id) => {
// //   setQuantities(prev => ({
// //     ...prev,
// //     [id]: Math.max(1, prev[id] - 1)
// //   }));
// // };


// //   const addToCart = async (product) => {
// //     try {
// //         const userId = localStorage.getItem("user"); // Get userId from localStorage
// //         if (!userId) {
// //             alert('Please log in first');
// //             return;
// //         }

// //         const response = await axios.post(
// //             `http://localhost:5000/api/add-to-cart/${userId}`,
// //             { productId: product._id,quantity: quantities[product._id] || 1    }, // Ensure this matches backend schema
// //             { headers: { 'Content-Type': 'application/json' } } // Fix possible format issues
// //         );

// //         console.log("Cart Response:", response.data);

// //         if (response.data.success) {
// //             alert(`${product.ProductName} added to cart!`);
// //         } else {
// //             alert("Failed to add to cart.");
// //         }
// //     } catch (error) {
// //         console.error("Error adding product to cart:", error.response?.data || error.message);
// //         alert("Error adding product to cart.");
// //     }
// // };





// // //  console.log(products);


// //   const bookProduct = async (product) => {
// //     if (!userId) {
// //       alert('Please log in first');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(`http://localhost:5000/api/bookpro/${userId}`, {
// //         productId: product._id, // Send the product ID in the body
// //         sellerLoginId: product.userId,
// //         quantity: quantities[product._id] || 1 
// //       });
// // // console.log(response);

// //       // Ensure to check for success status in the response
// //       if (response.data.success) {
// //         alert(`${product.ProductName} booked successfully!`);
// //         navigate('/buyer-dash'); // Navigate to the buyer dashboard or any other page
// //       } else {
// //         alert('Error booking product.');
// //       }
// //     } catch (error) {
// //       console.error('Error booking product:', error);
// //       alert(error.response.data.message || "Error while booking product!!");
// //     }
// //   };

// //   // If data is still loading, show a loading message
// //   if (loading) {
// //     return <div>Loading products...</div>;
// //   }

// //   return (
// //   <div>
// //     <BuyerNav />
// //     <div className="product-page">
// //       <header className="product-header">
// //         <h1>Pet Care Products</h1>

// //       </header>

// //       <div className="products-container">
// //         {products.map((product) => (
// //           <div key={product._id} className="product-card">
// //             <img
// //               src={`http://localhost:5000/uploads/${product.screenshots[0]}`} // Use the correct image path
// //               alt={product.ProductName}
// //               className="product-image"
// //             />
// //             <div className="product-info">
// //               <h2>{product.ProductName}</h2>
// //               <p>{product.description}</p>
// //               <div className="price">${product.price}</div>
// //               <div className="quantity-control">
// //   <button onClick={() => decreaseQty(product._id)}>-</button>
// //   <span>{quantities[product._id] || 1}</span>
// //   <button onClick={() => increaseQty(product._id)}>+</button>
// // </div>

// //               <div className="product-actions">
// //                 <button
// //                   className="add-to-cart"
// //                   onClick={() => addToCart(product)} // Trigger the addToCart function
// //                 >
// //                   Add to Cart
// //                 </button>
// //                 <button
// //                   className="buy-now"
// //                   onClick={() => bookProduct(product)} // Trigger the bookProduct function
// //                 >
// //                   Book Now
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //     <div className="cart-button-container">
// //   <button className="cart-button" onClick={() => navigate('/cartpage')}>
// //     🛒 Cart
// //   </button>
// // </div>
// //     <BuyerFooter />
// //     </div>
// //   );
// // };

// // export default BuyPro;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ProductPage.css";
// import { useNavigate } from "react-router-dom";
// import BuyerNav from "./BuyerNav";
// import BuyerFooter from "./BuyerFooter";

// const BuyPro = () => {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);
//   const [quantities, setQuantities] = useState({});

//   const navigate = useNavigate();

//   // =========================
//   // FETCH PRODUCTS + ORDERS
//   // =========================
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("user");
//     setUserId(storedUserId);

//     const fetchData = async () => {
//       try {
//         const productRes = await axios.get(
//           "http://localhost:5000/api/allpro"
//         );

//         setProducts(productRes.data.products || []);

//         const qty = {};
//         productRes.data.products.forEach((p) => {
//           qty[p._id] = 1;
//         });
//         setQuantities(qty);

//         if (storedUserId) {
//           const orderRes = await axios.get(
//             `http://localhost:5000/api/ordersbyuser/${storedUserId}`
//           );
//           setOrders(orderRes.data.orders || []);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // =========================
//   // QUANTITY HANDLERS
//   // =========================
//   const increaseQty = (id) =>
//     setQuantities((p) => ({ ...p, [id]: p[id] + 1 }));

//   const decreaseQty = (id) =>
//     setQuantities((p) => ({ ...p, [id]: Math.max(1, p[id] - 1) }));

//   // =========================
//   // ADD TO CART
//   // =========================
//   const addToCart = async (product) => {
//     try {
//       const uid = localStorage.getItem("user");
//       if (!uid) return alert("Please login");

//       const res = await axios.post(
//         `http://localhost:5000/api/add-to-cart/${uid}`,
//         { productId: product._id, quantity: quantities[product._id] }
//       );

//       if (res.data.success) {
//         alert("Added to cart");
//       }
//     } catch (err) {
//       alert("Error adding to cart");
//     }
//   };

//   // =========================
//   // BOOK PRODUCT
//   // =========================
//   const bookProduct = async (product) => {
//     try {
//       if (!userId) return alert("Please login");

//       const res = await axios.post(
//         `http://localhost:5000/api/bookpro/${userId}`,
//         {
//           productId: product._id,
//           sellerLoginId: product.userId,
//           quantity: quantities[product._id],
//         }
//       );

//       if (res.data.success) {
//         alert("Product booked");
//         setOrders((p) => [...p, res.data.order]);
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking failed");
//     }
//   };

//   // =========================
//   // CANCEL ORDER
//   // =========================
//   const cancelOrder = async (orderId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/cancelorder/${orderId}`
//       );
//       console.log(res);


//       if (res.data.success) {
//         setOrders((prev) =>
//           prev.map((o) =>
//             o._id === orderId ? { ...o, status: "cancelled" } : o
//           )
//         );
//       }
//     } catch (err) {
//       console.log(err);

//       alert("Cancel failed");
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <BuyerNav />

//       {/* ================= PRODUCTS ================= */}
//       <div className="product-page">
//         <h1>Pet Care Products</h1>

//         <div className="products-container">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img
//                 src={`http://localhost:5000/uploads/${product.screenshots[0]}`}
//                 alt={product.ProductName}
//               />
//               <h2>{product.ProductName}</h2>
//               <p>{product.description}</p>
//               <div>${product.price}</div>

//               <div className="quantity-control">
//                 <button onClick={() => decreaseQty(product._id)}>-</button>
//                 <span>{quantities[product._id]}</span>
//                 <button onClick={() => increaseQty(product._id)}>+</button>
//               </div>

//               <button onClick={() => addToCart(product)}>
//                 Add to Cart
//               </button>
//               <button onClick={() => bookProduct(product)}>
//                 Book Now
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= MY ORDERS ================= */}
//       <div className="orders-container">
//         <h2>My Orders</h2>

//         {orders.length === 0 ? (
//           <p>No orders yet</p>
//         ) : (
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Qty</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id}>
//                   <td>{order.productId?.ProductName}</td>
//                   <td>{order.quantity}</td>
//                   <td>{order.status}</td>
//                   <td>
//                     {(order.status === "pending" ||
//                       order.status === "confirmed") && (
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => cancelOrder(order._id)}
//                       >
//                         Cancel
//                       </button>
//                     )}

//                     {order.status === "delivered" && (
//                       <span className="text-success">Delivered</span>
//                     )}

//                     {order.status === "cancelled" && (
//                       <span className="text-warning">Cancelled</span>
//                     )}

//                     {order.status === "rejected" && (
//                       <span className="text-danger">Rejected</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <div className="cart-button-container">
//         <button onClick={() => navigate("/cartpage")}>🛒 Cart</button>
//       </div>

//       <BuyerFooter />
//     </div>
//   );
// };

// export default BuyPro;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ProductPage.css";
// import { useNavigate } from "react-router-dom";
// import BuyerNav from "./BuyerNav";
// import BuyerFooter from "./BuyerFooter";

// const BuyPro = () => {
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const uid = localStorage.getItem("user");
//     setUserId(uid);

//     const load = async () => {
//       const p = await axios.get("http://localhost:5000/api/allpro");
//       setProducts(p.data.products);

//       const q = {};
//       p.data.products.forEach((x) => (q[x._id] = 1));
//       setQuantities(q);

//       if (uid) {
//         const o = await axios.get(
//           `http://localhost:5000/api/ordersbyuser/${uid}`
//         );
//         setOrders(o.data.orders || []);
//       }
//     };

//     load();
//   }, []);

//   const markDelivered = async (orderId) => {
//     const res = await axios.post(
//       `http://localhost:5000/api/deliverorder/${orderId}`
//     );

//     if (res.data.success) {
//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === orderId ? { ...o, status: "delivered" } : o
//         )
//       );
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     const res = await axios.post(
//       `http://localhost:5000/api/cancelorder/${orderId}`
//     );

//     if (res.data.success) {
//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === orderId ? { ...o, status: "cancelled" } : o
//         )
//       );
//     }
//   };

//   return (
//     <div>
//       <BuyerNav />

//       {/* PRODUCTS */}
//       <div className="product-page">
//         <h1>Pet Care Products</h1>
//         <div className="products-container">
//           {products.map((p) => (
//             <div className="product-card" key={p._id}>
//               <img
//                 src={`http://localhost:5000/uploads/${p.screenshots[0]}`}
//                 alt=""
//               />
//               <h3>{p.ProductName}</h3>
//               <p>{p.description}</p>
//               <b>₹{p.price}</b>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MY ORDERS */}
//       <div className="orders-container">
//         <h2>My Orders</h2>

//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o) => (
//               <tr key={o._id}>
//                 <td>{o.productId?.ProductName}</td>
//                 <td>{o.quantity}</td>
//                 <td>{o.status}</td>
//                 <td>
//                   {(o.status === "pending" ||
//                     o.status === "confirmed") && (
//                     <button onClick={() => cancelOrder(o._id)}>
//                       Cancel
//                     </button>
//                   )}

//                   {o.status === "confirmed" && (
//                     <button
//                       className="btn btn-success ms-2"
//                       onClick={() => markDelivered(o._id)}
//                     >
//                       Mark Delivered
//                     </button>
//                   )}

//                   {o.status === "delivered" && "Delivered"}
//                   {o.status === "cancelled" && "Cancelled"}
//                   {o.status === "rejected" && "Rejected"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <BuyerFooter />
//     </div>
//   );
// };

// export default BuyPro;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
// import "./ProductPage.css"; // We'll rely on premium CSS or keep specific product styles if needed
import { FaShoppingCart, FaCheckCircle, FaSearch } from "react-icons/fa";

const BuyPro = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // =========================
  // FETCH PRODUCTS + ORDERS
  // =========================
  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    setUserId(storedUserId);

    const fetchData = async () => {
      try {
        // products
        const productRes = await axios.get(
          "http://localhost:5000/api/allpro"
        );
        setProducts(productRes.data.products || []);

        // quantity init
        const q = {};
        productRes.data.products.forEach((p) => {
          q[p._id] = 1;
        });
        setQuantities(q);

        // orders
        if (storedUserId) {
          const orderRes = await axios.get(
            `http://localhost:5000/api/ordersbyuser/${storedUserId}`
          );
          setOrders(orderRes.data.orders || []);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // QUANTITY HANDLERS
  // =========================
  const increaseQty = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const decreaseQty = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (product) => {
    try {
      if (!userId) return alert("Please login");

      const res = await axios.post(
        `http://localhost:5000/api/add-to-cart/${userId}`,
        {
          productId: product._id,
          quantity: quantities[product._id],
        }
      );

      if (res.data.success) {
        alert("Added to cart");
      }
    } catch (err) {
      alert("Error adding to cart");
    }
  };

  // =========================
  // BOOK PRODUCT
  // =========================
  const bookProduct = async (product) => {
    try {
      if (!userId) return alert("Please login");

      const res = await axios.post(
        `http://localhost:5000/api/bookpro/${userId}`,
        {
          productId: product._id,
          sellerLoginId: product.userId,
          quantity: quantities[product._id],
        }
      );

      if (res.data.success) {
        alert("Product booked successfully");
        setOrders((prev) => [...prev, res.data.order]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  // =========================
  // CANCEL ORDER
  // =========================
  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/cancelorder/${orderId}`
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "cancelled" } : o
          )
        );
      }
    } catch (err) {
      alert("Cancel failed");
    }
  };

  // =========================
  // MARK DELIVERED (BUYER)
  // =========================
  const markDelivered = async (orderId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/deliverorder/${orderId}`
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "delivered" } : o
          )
        );
      }
    } catch (err) {
      alert("Failed to update delivery");
    }
  };

  const filteredProducts = products.filter(p =>
    p.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <header className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="panel-title">Pet <span>Marketplace</span></h1>
            <p className="panel-subtitle">Find the best products for your furry friends</p>
          </div>
          <button
            className="btn btn-primary"
            style={{ background: 'var(--user-primary)', border: 'none', padding: '10px 20px', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}
            onClick={() => navigate("/cartpage")}
          >
            <FaShoppingCart /> My Cart
          </button>
        </header>

        {/* Search Bar */}
        <div className="section-container" style={{ background: 'white', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #f1f5f9', display: 'flex', gap: '15px' }}>
          <FaSearch style={{ color: '#94a3b8', fontSize: '1.2rem' }} />
          <input
            type="text"
            placeholder="Search products..."
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading marketplace...</div>
        ) : (
          <>
            <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', marginBottom: '50px' }}>
              {filteredProducts.map((p) => (
                <motion.div
                  key={p._id}
                  className="product-card-premium"
                  whileHover={{ y: -10 }}
                  style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={`http://localhost:5000/uploads/${p.screenshots[0]}`}
                      alt={p.ProductName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0 0 10px 0', color: 'var(--user-text)' }}>{p.ProductName}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>{p.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--user-primary)' }}>₹{p.price}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '5px 10px', borderRadius: '10px' }}>
                        <button onClick={() => decreaseQty(p._id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                        <span style={{ fontWeight: '600' }}>{quantities[p._id]}</span>
                        <button onClick={() => increaseQty(p._id)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => addToCart(p)}
                        style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--user-primary)', background: 'white', color: 'var(--user-primary)', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Cart
                      </button>
                      <button
                        onClick={() => bookProduct(p)}
                        style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'var(--user-primary)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* MY ORDERS SECTION */}
            <div className="section-title" style={{ marginBottom: '20px' }}>
              <FaCheckCircle style={{ color: 'var(--user-primary)' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>My Orders</span>
            </div>

            <div className="orders-list" style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              {orders.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>No orders yet</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '0 15px' }}>Product</th>
                      <th style={{ padding: '0 15px' }}>Qty</th>
                      <th style={{ padding: '0 15px' }}>Status</th>
                      <th style={{ padding: '0 15px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id} style={{ background: '#f8fafc' }}>
                        <td style={{ padding: '15px', borderRadius: '12px 0 0 12px', fontWeight: '600' }}>{o.productId?.ProductName}</td>
                        <td style={{ padding: '15px' }}>{o.quantity}</td>
                        <td style={{ padding: '15px' }}>
                          <span style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            background: o.status === 'delivered' ? '#dcfce7' : o.status === 'cancelled' ? '#fee2e2' : '#e0f2fe',
                            color: o.status === 'delivered' ? '#166534' : o.status === 'cancelled' ? '#991b1b' : '#075985'
                          }}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px', borderRadius: '0 12px 12px 0' }}>
                          {(o.status === "pending" || o.status === "confirmed") && (
                            <button
                              onClick={() => cancelOrder(o._id)}
                              style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #ef4444', background: 'white', color: '#ef4444', fontWeight: '600', cursor: 'pointer', marginRight: '10px' }}
                            >
                              Cancel
                            </button>
                          )}
                          {o.status === "confirmed" && (
                            <button
                              onClick={() => markDelivered(o._id)}
                              style={{ padding: '8px 15px', borderRadius: '8px', background: '#10b981', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}
                            >
                              Mark Delivered
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default BuyPro;
