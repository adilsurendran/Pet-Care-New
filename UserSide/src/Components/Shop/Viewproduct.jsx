import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "../Admin/ViewComplaints.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]); // State for storing orders
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get the user ID from local storage

      if (!userId) {
        alert("User ID not found in local storage.");
        return;
      }

      try {
        // Make the API call using the userId
        const response = await axios.get(`http://localhost:5000/api/orderbyuser`);

        if (response.data.message === "Orders retrieved successfully") {
          setOrders(response.data.orders); // Populate orders state
        } else {
          alert("No orders found for this user.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Error fetching orders. Please try again.");
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this will run once when the component is mounted

  const handleAction = async (orderId, action) => {
    const userId = localStorage.getItem("userId"); // Get the user ID from local storage
    if (!userId) {
      alert("User ID not found in local storage.");
      return;
    }

    try {
      let response;

      if (action === "accept") {
        // Call the API to accept the order
        response = await axios.post(`http://localhost:5000/api/acceptorder/${orderId}`);
      } else if (action === "reject") {
        // Handle reject action if necessary
        response = await axios.post(`http://localhost:5000/api/orderaction/${orderId}`, {
          userId,
          action,
        });
      }

      if (response.data.success) {
        alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action performed successfully!`);

        // Update the orders list after action
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId) // Remove the order after action
        );
      } else {
        alert("Failed to perform action.");
      }
    } catch (error) {
      console.error("Error performing action:", error);
      alert("Error performing action. Please try again.");
    }
  };

  return (
    <div className="orders-container">
      <h2 className="title">Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Username</th> {/* Change from Order ID to Username */}
            <th>Product</th> {/* Change from Order ID to Product */}
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">No orders available</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userId.username}</td> {/* Display username */}
                <td>{order.productId.ProductName}</td> {/* Display product name */}
                <td>{order.status}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td> {/* Format date */}
                <td>
                  <button
                    className="accept-btn"
                    onClick={() => handleAction(order._id, "accept")}
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
