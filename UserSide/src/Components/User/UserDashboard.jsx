import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import UserSidebar from "./UserSidebar";
import "./UserPremium.css";
import {
    FaShoppingBag, FaPaw, FaExchangeAlt,
    FaComments, FaArrowRight, FaStore,
    FaUsers, FaBook, FaUserCircle
} from "react-icons/fa";

const UserDashboard = () => {
    const userId = localStorage.getItem("user");
    const userName = localStorage.getItem("name") || "Pet Lover";

    const [stats, setStats] = useState({
        productOrders: 0,
        petOrders: 0,
        requestsReceived: 0,
        activeChats: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            fetchStats();
        }
    }, [userId]);

    const fetchStats = async () => {
        try {
            // Parallel api calls for specific stats
            const [prodRes, petRes, reqRes, chatRes] = await Promise.allSettled([
                axios.get(`http://localhost:5000/api/ordersbyuser/${userId}`),
                axios.get(`http://localhost:5000/api/orders/buyer/${userId}`),
                axios.get(`http://localhost:5000/api/orders/seller/${userId}`),
                axios.get(`http://localhost:5000/api/chat/list/${userId}`)
            ]);

            setStats({
                productOrders: prodRes.status === 'fulfilled' ? (prodRes.value.data.orders?.length || 0) : 0,
                petOrders: petRes.status === 'fulfilled' ? (petRes.value.data?.length || 0) : 0,
                requestsReceived: reqRes.status === 'fulfilled' ? (reqRes.value.data?.length || 0) : 0,
                activeChats: chatRes.status === 'fulfilled' ? (chatRes.value.data?.length || 0) : 0
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            setLoading(false);
        }
    };

    const shortcuts = [
        { title: "Marketplace", path: "/buypro", icon: <FaStore />, color: "#4caf50" },
        { title: "Community", path: "/community", icon: <FaUsers />, color: "#2196f3" },
        { title: "Pet Guide", path: "/viewguide", icon: <FaBook />, color: "#ff9800" },
        { title: "Chat Center", path: "/user/chat", icon: <FaComments />, color: "#e91e63" },
        { title: "My Profile", path: "/profile", icon: <FaUserCircle />, color: "#9c27b0" },
    ];

    return (
        <div className="user-layout">
            <UserSidebar />
            <main className="user-main">
                <header className="panel-header">
                    <h1 className="panel-title">Hello, <span>{userName}</span></h1>
                    <p className="panel-subtitle">Welcome back to your personal pet care hub.</p>
                </header>

                {/* Stats Grid */}
                <div className="section-title">
                    <FaPaw color="var(--user-primary)" />
                    <span>Overview</span>
                </div>

                <div className="stats-grid">
                    <motion.div className="stat-card" whileHover={{ y: -5 }}>
                        <div className="stat-icon" style={{ background: "#e8f5e9", color: "#2e7d32" }}>
                            <FaShoppingBag />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.productOrders}</h3>
                            <p>Product Orders</p>
                        </div>
                    </motion.div>

                    <motion.div className="stat-card" whileHover={{ y: -5 }}>
                        <div className="stat-icon" style={{ background: "#fff3e0", color: "#ef6c00" }}>
                            <FaPaw />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.petOrders}</h3>
                            <p>Pet Adoptions</p>
                        </div>
                    </motion.div>

                    <motion.div className="stat-card" whileHover={{ y: -5 }}>
                        <div className="stat-icon" style={{ background: "#e3f2fd", color: "#1565c0" }}>
                            <FaExchangeAlt />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.requestsReceived}</h3>
                            <p>Sell Requests</p>
                        </div>
                    </motion.div>

                    <motion.div className="stat-card" whileHover={{ y: -5 }}>
                        <div className="stat-icon" style={{ background: "#fce4ec", color: "#c2185b" }}>
                            <FaComments />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.activeChats}</h3>
                            <p>Active Chats</p>
                        </div>
                    </motion.div>
                </div>

                {/* Shortcuts */}
                <div className="section-title">
                    <FaArrowRight color="var(--user-primary)" />
                    <span>Quick Actions</span>
                </div>

                <div className="shortcut-grid">
                    {shortcuts.map((item, index) => (
                        <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
                            <motion.div
                                className="shortcut-card"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="shortcut-icon" style={{ color: item.color, background: `${item.color}15` }}>
                                    {item.icon}
                                </div>
                                <span>{item.title}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
