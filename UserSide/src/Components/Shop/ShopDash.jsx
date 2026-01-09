import { useState, useEffect } from "react";
import { FaBox, FaShoppingCart, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import ShopSidebar from "./ShopSidebar";
import "./ShopPremium.css";

const ShopDashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shopId = localStorage.getItem("userId");
    if (shopId) {
      fetchDashboardData(shopId);
    }
  }, []);

  const fetchDashboardData = async (id) => {
    try {
      setLoading(true);
      // Fetch products to count them
      const productsRes = await axios.get(`http://localhost:5000/api/getpro/${id}`);
      if (productsRes.data.success) {
        setProductsCount(productsRes.data.products.length);
      }

      // Fetch orders to count them
      const ordersRes = await axios.get(`http://localhost:5000/api/orderbyuser/${id}`);
      if (ordersRes.data.orders) {
        setOrdersCount(ordersRes.data.orders.length);
      }

      // Fetch customers count
      const customersRes = await axios.get("http://localhost:5000/api/getbuyers");
      if (customersRes.data.success) {
        setCustomersCount(customersRes.data.count);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="shop-layout">
      <ShopSidebar />

      <main className="shop-main">
        <header className="dashboard-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Shop <span>Dashboard</span></h2>
            <p>Welcome back! Here's what's happening in your shop today.</p>
          </motion.div>
        </header>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card-pattern"></div>
              <div className="stat-icon green-theme">
                <FaBox />
              </div>
              <div className="stat-info">
                <h3>{productsCount}</h3>
                <p>Live Products</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-pattern"></div>
              <div className="stat-icon blue-theme">
                <FaShoppingCart />
              </div>
              <div className="stat-info">
                <h3>{ordersCount}</h3>
                <p>Total Orders</p>
              </div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="card-pattern"></div>
              <div className="stat-icon purple-theme">
                <FaUsers />
              </div>
              <div className="stat-info">
                <h3>{customersCount}</h3>
                <p>Happy Customers</p>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopDashboard;
