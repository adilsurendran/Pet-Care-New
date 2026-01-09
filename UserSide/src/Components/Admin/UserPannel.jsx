import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./AdminPanelPremium.css";
import IndexHeader from "../IndexHeader";
import { FaUserShield, FaUserCheck, FaUserSlash, FaUser } from "react-icons/fa";

const UserPannel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getallusers");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (userId) => {
    if (!window.confirm("Are you sure you want to change user status?")) return;
    try {
      await axios.put(`http://localhost:5000/api/user/block-toggle/${userId}`);
      fetchUsers();
    } catch (error) {
      alert("Failed to toggle user status");
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
            User <span>Management</span>
          </motion.h2>
          <div className="stats-badge" style={{ background: '#e8f5e9', color: '#2e7d32', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold' }}>
            <FaUserShield /> Total Users: {users.length}
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
                  <th>User Profile</th>
                  <th>Contact Info</th>
                  <th>Location Details</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td style={{ fontWeight: 'bold', color: '#8bc34a' }}>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ background: '#f1f8e9', padding: '10px', borderRadius: '12px' }}>
                          <FaUserCheck color="#2e7d32" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '800', color: '#1a1a1a' }}>{user.userFullname}</div>
                          <small className="text-muted">UID: {user._id.slice(-6).toUpperCase()}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600' }}>{user.userEmail}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{user.city}, {user.state}</div>
                      <div className="text-muted small">PIN: {user.pincode}</div>
                    </td>
                    <td>
                      {user.commonKey?.verify ? (
                        <span className="badge" style={{ background: '#e8f5e9', color: '#2e7d32', padding: '6px 12px', borderRadius: '8px' }}>Active</span>
                      ) : (
                        <span className="badge" style={{ background: '#ffebee', color: '#c62828', padding: '6px 12px', borderRadius: '8px' }}>Blocked</span>
                      )}
                    </td>
                    <td>
                      <div className="action-group">
                        {user.commonKey?.verify ? (
                          <button
                            className="btn-premium btn-delete"
                            onClick={() => toggleBlock(user._id)}
                            style={{ background: '#ffebee', color: '#c62828' }}
                          >
                            <FaUserSlash /> Block
                          </button>
                        ) : (
                          <button
                            className="btn-premium btn-edit"
                            onClick={() => toggleBlock(user._id)}
                            style={{ background: '#e8f5e9', color: '#2e7d32' }}
                          >
                            <FaUserCheck /> Unblock
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default UserPannel;
