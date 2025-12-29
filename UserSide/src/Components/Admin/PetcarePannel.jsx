import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import './PetcarePannel.css'

const petcareData = [
  { id: 1, name: "Happy Paws Clinic", service: "Veterinary Services", status: "Pending" },
  { id: 2, name: "Furry Friends Spa", service: "Grooming & Care", status: "Approved" },
  { id: 3, name: "Pawfect Walks", service: "Dog Walking", status: "Rejected" },
];

const PetcarePannel= () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProviders(petcareData);
    }, 500);
  }, []);

  return (
    <motion.div
      className="petcare-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="title">Petcare Management</h2>
      <table className="petcare-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Provider Name</th>
            <th>Service</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <motion.tr
              key={provider.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <td>{provider.id}</td>
              <td>{provider.name}</td>
              <td>{provider.service}</td>
              <td className={`status ${provider.status.toLowerCase()}`}>
                {provider.status}
              </td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="reject-btn">Reject</button>
                <button className="remove-btn">Remove</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default PetcarePannel;
