import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaHome, FaBook, FaStethoscope, FaBoxOpen,
    FaExclamationCircle, FaPaw, FaUser,
    FaDog, FaUsers, FaComments, FaSignOutAlt
} from "react-icons/fa";

const UserSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/login");
        }
    };

    const menuItems = [
        { title: "Home", path: "/buyer-dash", icon: <FaHome /> },
        { title: "Pet Guide", path: "/viewguide", icon: <FaBook /> },
        { title: "Doctors", path: "/bookdoctors", icon: <FaStethoscope /> },
        { title: "Marketplace", path: "/buypro", icon: <FaBoxOpen /> },
        { title: "Pets for Sale", path: "/pestmarketplace", icon: <FaDog /> },
        { title: "My Pets", path: "/pet-profile", icon: <FaPaw /> },
        { title: "Community", path: "/community", icon: <FaUsers /> },
        { title: "Chat Center", path: "/user/chat", icon: <FaComments /> },
        { title: "Complaints", path: "/complaint", icon: <FaExclamationCircle /> },
        { title: "Profile", path: "/profile", icon: <FaUser /> },
    ];

    return (
        <aside className="user-sidebar">
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <h1>W<span>oo</span>fTale</h1>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span>{item.title}</span>
                                </Link>
                            </motion.div>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <motion.button
                    className="logout-btn"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </motion.button>
            </div>
        </aside>
    );
};

export default UserSidebar;
