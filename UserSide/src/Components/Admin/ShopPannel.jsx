import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./AdminPanelPremium.css";
import IndexHeader from "../IndexHeader";
import { FaStore, FaStoreSlash, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ShopPannel = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shops");
      setShops(res.data.shops || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shops:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const toggleShop = async (shopId) => {
    if (!window.confirm("Are you sure you want to change shop status?")) return;
    try {
      await axios.put(`http://localhost:5000/api/shop/block-toggle/${shopId}`);
      fetchShops();
    } catch (error) {
      alert("Failed to toggle shop status");
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
            Shop <span>Management</span>
          </motion.h2>
          <div className="stats-badge" style={{ background: '#e1f5fe', color: '#0288d1', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold' }}>
            <FaStore /> Registered Shops: {shops.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
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
                  <th>Shop Information</th>
                  <th>Contact Details</th>
                  <th>Location</th>
                  <th>Verification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shops.length > 0 ? (
                  shops.map((shop, index) => (
                    <tr key={shop._id}>
                      <td style={{ fontWeight: 'bold', color: '#03a9f4' }}>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div style={{ background: '#e1f5fe', padding: '10px', borderRadius: '12px' }}>
                            <FaStore color="#0288d1" />
                          </div>
                          <div>
                            <div style={{ fontWeight: '800', color: '#1a1a1a' }}>{shop.shopName}</div>
                            <small className="text-muted">ID: {shop._id.slice(-6).toUpperCase()}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600' }}>{shop.shopEmail}</div>
                        <div className="text-muted small">{shop.shopPhone}</div>
                      </td>
                      <td style={{ maxWidth: '200px' }}>
                        <div className="text-truncate">{shop.shopAddress}</div>
                      </td>
                      <td>
                        {shop.commonkey?.verify ? (
                          <div className="d-flex align-items-center gap-2" style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                            <FaCheckCircle /> Verified
                          </div>
                        ) : (
                          <div className="d-flex align-items-center gap-2" style={{ color: '#c62828', fontWeight: 'bold' }}>
                            <FaExclamationCircle /> Blocked
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="action-group">
                          {shop.commonkey?.verify ? (
                            <button
                              className="btn-premium btn-delete"
                              onClick={() => toggleShop(shop._id)}
                            >
                              <FaStoreSlash /> Block
                            </button>
                          ) : (
                            <button
                              className="btn-premium btn-edit"
                              onClick={() => toggleShop(shop._id)}
                              style={{ background: '#e1f5fe', color: '#0288d1' }}
                            >
                              <FaStore /> Unblock
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">No shops found in the system.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ShopPannel;
