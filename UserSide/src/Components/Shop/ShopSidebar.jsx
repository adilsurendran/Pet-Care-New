import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChartPie, FaBoxOpen, FaClipboardList, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./ShopPremium.css";

const ShopSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.clear();
            navigate("/login");
        }
    };

    const menuItems = [
        { title: "Dashboard", path: "/shopdash", icon: <FaChartPie /> },
        { title: "Manage Products", path: "/manage-products", icon: <FaBoxOpen /> },
        { title: "Orders", path: "/vieworders", icon: <FaClipboardList /> },
        { title: "Community", path: "/community", icon: <FaUsers /> },
    ];

    return (
        <aside className="shop-sidebar">
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <h1>Woof<span>Tale</span></h1>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item, index) => (
                        <motion.li
                            key={item.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span>{item.title}</span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default ShopSidebar;
