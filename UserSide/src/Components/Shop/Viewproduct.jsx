import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Admin/ViewComplaints.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  // =========================
  // FETCH ORDERS
  // =========================
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User ID not found in local storage.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/orderbyuser/${userId}`
        );

        if (response.data.message === "Orders retrieved successfully") {
          setOrders(response.data.orders || []);
        } else {
          alert("No orders found for this user.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Error fetching orders. Please try again.");
      }
    };

    fetchOrders();
  }, []);

  // =========================
  // HANDLE ACTIONS
  // =========================
  const handleAction = async (orderId, action) => {
    try {
      let response;

      if (action === "accept") {
        response = await axios.post(
          `http://localhost:5000/api/acceptorder/${orderId}`
        );
      }

      if (action === "reject") {
        response = await axios.post(
          `http://localhost:5000/api/orderaction/${orderId}`,
          { action }
        );
      }

      if (action === "deliver") {
        response = await axios.post(
          `http://localhost:5000/api/deliverorder/${orderId}`
        );
      }

      if (response?.data?.success) {
        alert("Action performed successfully");

        // ✅ SAFE UI UPDATE (NO undefined)
        setOrders((prev) =>
          prev.map((o) =>
            o && o._id === orderId
              ? {
                  ...o,
                  status:
                    action === "accept"
                      ? "confirmed"
                      : action === "reject"
                      ? "rejected"
                      : action === "deliver"
                      ? "delivered"
                      : o.status,
                }
              : o
          )
        );
      } else {
        alert("Failed to perform action");
      }
    } catch (error) {
      console.error("Action error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // FILTER LOGIC (SAFE)
  // =========================
  const filteredOrders =
    statusFilter === "all"
      ? orders.filter(Boolean)
      : orders.filter(
          (order) => order && order.status === statusFilter
        );

  // =========================
  // RENDER
  // =========================
  return (
    <div className="orders-container">
      <h2 className="title">Orders</h2>

      {/* STATUS FILTER */}
      <div className="filter-bar">
        <label>Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Pincode</th>
            <th>Product</th>
            <th>Unit price</th>
            <th>Ordered Quantity</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="9">No orders available</td>
            </tr>
          ) : (
            filteredOrders.map((order) => {
              if (!order) return null;

              return (
                <tr key={order._id}>
                  <td>{order.userId?.userFullname}</td>
                  <td>{order.userId?.city}</td>
                  <td>{order.userId?.pincode}</td>
                  <td>{order.productId?.ProductName}</td>
                  <td>{order.productId?.price}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>

                  {/* ACTION COLUMN */}
                  <td>
                    {order.status === "pending" && (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() =>
                            handleAction(order._id, "accept")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() =>
                            handleAction(order._id, "reject")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {order.status === "confirmed" && (
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          handleAction(order._id, "deliver")
                        }
                      >
                        Delivered?
                      </button>
                    )}

                    {order.status === "rejected" && (
                      <span className="text-danger fw-bold">
                        Rejected
                      </span>
                    )}

                    {order.status === "cancelled" && (
                      <span className="text-warning fw-bold">
                        Cancelled
                      </span>
                    )}

                    {order.status === "delivered" && (
                      <span className="text-success fw-bold">
                        Delivered
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
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
