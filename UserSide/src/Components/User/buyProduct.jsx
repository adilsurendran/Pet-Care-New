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
