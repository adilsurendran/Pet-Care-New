// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import "./ShopPannel.css";

// const ShopPannel = () => {
//   const [shops, setShops] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/shops")
//       .then((response) => {
//         console.log("API Response:", response.data); // Debugging log
        
//         // Ensure the response is an array
//         if (Array.isArray(response.data)) {
//           setShops(response.data);
//         } else if (response.data && Array.isArray(response.data.shops)) {
//           setShops(response.data.shops); // If data is nested inside 'shops'
//         } else {
//           console.error("Unexpected API response format:", response.data);
//           setShops([]); // Fallback to an empty array
//         }
        
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching shops:", error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <motion.div
//       className="shop-container"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="title">Shop Management</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="shop-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Shop Name</th>
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shops.length > 0 ? (
//               shops.map((shop, index) => (
//                 <motion.tr
//                   key={shop._id || index}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.95 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <td>{index + 1}</td>
//                   <td>{shop.shopName || "N/A"}</td>
//                   <td>{shop.shopAddress || "N/A"}</td>
//                   <td>{shop.shopPhone || "N/A"}</td>
//                   <td>{shop.shopEmail || "N/A"}</td>
                
//                 </motion.tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No shops found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </motion.div>
//   );
// };

// export default ShopPannel;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./ShopPannel.css";
import {useNavigate} from "react-router-dom"

const ShopPannel = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchShops = async () => {
    const res = await axios.get("http://localhost:5000/api/shops");
    setShops(res.data.shops || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const toggleShop = async (shopId) => {
    if (!window.confirm("Are you sure you want to change shop status?")) return;

    await axios.put(
      `http://localhost:5000/api/shop/block-toggle/${shopId}`
    );
    fetchShops();
  };

  return (
    <motion.div
      className="shop-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button className="back-btnn" onClick={() => navigate("/admindash")}>
  ← Back to Dashboard
</button>
      <h2 className="title">Shop Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="shop-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Shop Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shops.length > 0 ? (
              shops.map((shop, index) => (
                <motion.tr key={shop._id} whileHover={{ scale: 1.02 }}>
                  <td>{index + 1}</td>
                  <td>{shop.shopName}</td>
                  <td>{shop.shopAddress}</td>
                  <td>{shop.shopPhone}</td>
                  <td>{shop.shopEmail}</td>
                  <td>
                    {shop.commonkey?.verify ? (
                      <button
                        className="block-btn"
                        onClick={() => toggleShop(shop._id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="unblock-btn"
                        onClick={() => toggleShop(shop._id)}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No shops found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </motion.div>
  );
};

export default ShopPannel;
