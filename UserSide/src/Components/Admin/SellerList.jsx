import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import './SellerList.css'

const sellersData = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", shop: "Alice's Pet Supplies", status: "Pending" },
  { id: 2, name: "Bob Williams", email: "bob@example.com", shop: "Bob's Vet Clinic", status: "Approved" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", shop: "Charlie's Grooming", status: "Pending" },
];

const SellerList = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSellers(sellersData);
    }, 500);
  }, []);

  return (
    <motion.div
      className="seller-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Seller Management</h2>
      <table className="seller-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Shop Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <motion.tr
              key={seller.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td>{seller.id}</td>
              <td>{seller.name}</td>
              <td>{seller.email}</td>
              <td>{seller.shop}</td>
              <td className={`status ${seller.status.toLowerCase()}`}>
                {seller.status}
              </td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="delete-btn">Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default SellerList;
