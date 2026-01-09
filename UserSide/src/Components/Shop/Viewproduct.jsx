import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheckCircle, FaTimesCircle, FaTruck, FaClock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import ShopSidebar from "./ShopSidebar";
import "./ShopPremium.css";
import "../Admin/AdminPanelPremium.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User session not found.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/orderbyuser/${userId}`);
      if (response.data.message === "Orders retrieved successfully") {
        setOrders(response.data.orders || []);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
      setLoading(false);
    }
  };

  const handleAction = async (orderId, action) => {
    try {
      let response;
      if (action === "accept") {
        response = await axios.post(`http://localhost:5000/api/acceptorder/${orderId}`);
      } else if (action === "reject") {
        response = await axios.post(`http://localhost:5000/api/orderaction/${orderId}`, { action });
      } else if (action === "deliver") {
        response = await axios.post(`http://localhost:5000/api/deliverorder/${orderId}`);
      }

      if (response?.data?.success) {
        toast.success(`Order ${action}ed successfully`);
        fetchOrders(); // Refresh data
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      console.error("Action error:", error);
      toast.error("Something went wrong");
    }
  };

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter(order => order && order.status === statusFilter);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <span className="badge bg-warning"><FaClock className="me-1" /> Pending</span>;
      case "confirmed": return <span className="badge bg-primary"><FaCheckCircle className="me-1" /> Confirmed</span>;
      case "delivered": return <span className="badge bg-success"><FaTruck className="me-1" /> Delivered</span>;
      case "rejected": return <span className="badge bg-danger"><FaTimesCircle className="me-1" /> Rejected</span>;
      case "cancelled": return <span className="badge bg-secondary">Cancelled</span>;
      default: return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  return (
    <div className="shop-layout">
      <Toaster />
      <ShopSidebar />

      <main className="shop-main">
        <header className="product-management-header">
          <motion.h2
            className="panel-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Customer <span>Orders</span>
          </motion.h2>

          <div className="filter-group d-flex align-items-center gap-3">
            <label className="text-muted fw-bold small text-uppercase">Filter Status:</label>
            <select
              className="form-select status-select"
              style={{ borderRadius: '12px', padding: '8px 15px', border: '1px solid #eee', outline: 'none', cursor: 'pointer' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </header>

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
          >
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Customer Info</th>
                  <th>Product Details</th>
                  <th>Price & Qty</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <div style={{ fontWeight: '700' }}>{order.userId?.userFullname}</div>
                        <small className="text-muted">{order.userId?.city}, {order.userId?.pincode}</small>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: '#2e7d32' }}>{order.productId?.ProductName}</div>
                        <small className="text-muted">ID: {order._id.substring(0, 8)}...</small>
                      </td>
                      <td>
                        <div style={{ fontWeight: '700' }}>${order.productId?.price}</div>
                        <small className="text-muted">Qty: {order.quantity}</small>
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <div style={{ fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                        <small className="text-muted">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                      </td>
                      <td>
                        <div className="action-group d-flex gap-2">
                          {order.status === "pending" && (
                            <>
                              <button className="btn-approve-sm" onClick={() => handleAction(order._id, "accept")}>
                                Approve
                              </button>
                              <button className="btn-reject-sm" onClick={() => handleAction(order._id, "reject")}>
                                Reject
                              </button>
                            </>
                          )}
                          {order.status === "confirmed" && (
                            <button className="btn-deliver-sm" onClick={() => handleAction(order._id, "deliver")}>
                              Mark Delivered
                            </button>
                          )}
                          {(order.status === "delivered" || order.status === "rejected" || order.status === "cancelled") && (
                            <span className="text-muted small italic">No actions</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">No orders matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .status-select:focus {
          border-color: #4caf50 !important;
          box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1) !important;
        }
        .btn-approve-sm { background: #e8f5e9; color: #2e7d32; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; transition: all 0.3s; }
        .btn-approve-sm:hover { background: #2e7d32; color: white; }
        .btn-reject-sm { background: #ffebee; color: #c62828; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; transition: all 0.3s; }
        .btn-reject-sm:hover { background: #c62828; color: white; }
        .btn-deliver-sm { background: #e3f2fd; color: #1565c0; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; transition: all 0.3s; }
        .btn-deliver-sm:hover { background: #1565c0; color: white; }
      `}} />
    </div>
  );
};

export default ViewOrders;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../Admin/ViewComplaints.css";

// const ViewOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");

//   // =========================
//   // FETCH ORDERS
//   // =========================
//   useEffect(() => {
//     const fetchOrders = async () => {
//       const userId = localStorage.getItem("userId");

//       if (!userId) {
//         alert("User ID not found");
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/orderbyuser/${userId}`
//         );
//         setOrders(res.data.orders || []);
//       } catch (err) {
//         alert("Failed to load orders");
//       }
//     };

//     fetchOrders();
//   }, []);

//   // =========================
//   // HANDLE ACTIONS
//   // =========================
//   const handleAction = async (orderId, action) => {
//     try {
//       let res;

//       if (action === "accept") {
//         res = await axios.post(
//           `http://localhost:5000/api/acceptorder/${orderId}`
//         );
//       }

//       if (action === "reject") {
//         res = await axios.post(
//           `http://localhost:5000/api/orderaction/${orderId}`,
//           { action }
//         );
//       }

//       if (res?.data?.success) {
//         setOrders((prev) =>
//           prev.map((o) =>
//             o._id === orderId
//               ? {
//                   ...o,
//                   status: action === "accept" ? "confirmed" : "rejected",
//                 }
//               : o
//           )
//         );
//       }
//     } catch (err) {
//       alert("Action failed");
//     }
//   };

//   const filteredOrders =
//     statusFilter === "all"
//       ? orders
//       : orders.filter((o) => o.status === statusFilter);

//   return (
//     <div className="orders-container">
//       <h2>Orders</h2>

//       <select
//         value={statusFilter}
//         onChange={(e) => setStatusFilter(e.target.value)}
//       >
//         <option value="all">All</option>
//         <option value="pending">Pending</option>
//         <option value="confirmed">Confirmed</option>
//         <option value="rejected">Rejected</option>
//         <option value="cancelled">Cancelled</option>
//         <option value="delivered">Delivered</option>
//       </select>

//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Product</th>
//             <th>Qty</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredOrders.map((o) => (
//             <tr key={o._id}>
//               <td>{o.userId?.userFullname}</td>
//               <td>{o.productId?.ProductName}</td>
//               <td>{o.quantity}</td>
//               <td>{o.status}</td>
//               <td>
//                 {o.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => handleAction(o._id, "accept")}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleAction(o._id, "reject")}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {o.status !== "pending" && (
//                   <span className="fw-bold">{o.status}</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewOrders;
