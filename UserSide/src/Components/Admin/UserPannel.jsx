// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./UserPannel.css";

// const UserPannel = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch users from the backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/getallusers")
//       .then((response) => {
//         setUsers(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <motion.div
//       className="user-container"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="title">User Management</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Full Name</th>
//               <th>Email</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Pincode</th>
            
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <motion.tr
//                 key={user._id}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <td>{index + 1}</td>
//                 <td>{user.userFullname}</td>
//                 <td>{user.userEmail}</td>
//                 <td>{user.city}</td>
//                 <td>{user.state}</td>
//                 <td>{user.pincode}</td>
                
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </motion.div>
//   );
// };

// export default UserPannel;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./UserPannel.css";
import { useNavigate } from "react-router-dom";


const UserPannel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/getallusers");
    // console.log(res);
    
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (userId) => {
    if (!window.confirm("Are you sure you want to change user status?")) return;

    await axios.put(
      `http://localhost:5000/api/user/block-toggle/${userId}`
    );
    fetchUsers();
  };

  return (
    <motion.div
      className="user-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="back-btnn" onClick={() => navigate("/admindash")}>
  ← Back to Dashboard
</button>
      <h2 className="title">User Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <motion.tr key={user._id} whileHover={{ scale: 1.02 }}>
                <td>{index + 1}</td>
                <td>{user.userFullname}</td>
                <td>{user.userEmail}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.pincode}</td>
                <td>
                  {user.commonKey?.verify ? (
                    <button
                      className="block-btn"
                      onClick={() => toggleBlock(user._id)}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="unblock-btn"
                      onClick={() => toggleBlock(user._id)}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default UserPannel;
