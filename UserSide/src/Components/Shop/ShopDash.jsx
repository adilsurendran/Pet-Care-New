import { useState, useEffect } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

const ShopDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState(0); // Store customer count
  const [shopId, setShopId] = useState(null);

  useEffect(() => {
    const storedShopId = localStorage.getItem("userId");
    if (storedShopId) {
      setShopId(storedShopId);
      fetchProducts(storedShopId);
      fetchOrders(storedShopId);
      fetchCustomers(); // Fetch customers count
    } else {
      console.error("No shopId found in local storage!");
    }
  }, []);

  // Fetch Products by Shop ID
  const fetchProducts = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getpro/${id}`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch Orders
  const fetchOrders = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orderbyuser`);
      if (response.data.orders) {
        setOrders(response.data.orders.length); // Count number of orders for the shop
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  // Fetch Customers (Buyers)
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getbuyers");
      if (response.data.success) {
        setCustomers(response.data.count); // Directly using count from response
      } else {
        console.error("Failed to fetch buyers");
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };
  

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletepro/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the authentication token
    localStorage.removeItem("userId"); // Remove stored user ID
    localStorage.removeItem("role"); // Remove stored role
    window.location.href = "/login"; // Redirect to login page
  };

  const toggleAvailability = async (productId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/product/toggle-availability/${productId}`
    );
    fetchProducts(shopId); // refresh list
  } catch (error) {
    console.error("Toggle availability failed", error);
  }
};


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Sidebar</h2>
        <ul className="nav-menu">
          <li>Dashboard</li>
          <Link to="/addprod"><li>Add Products</li></Link>
          <Link to="/vieworders"><li>Orders</li></Link>
          <a onClick={handleLogout} style={{ cursor: "pointer" }}>
  <li>Logout</li>
</a>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Shop Dashboard</h1>

        <div className="cards">
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <FaBox className="icon blue" />
            <div><h3>{products.length}</h3><p> Products</p></div>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <FaShoppingCart className="icon green" />
            <div><h3>{orders}</h3><p>Orders</p></div>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <FaUsers className="icon red" />
            <div><h3>{customers}</h3><p>Customers</p></div> {/* Updated Customer Count */}
          </motion.div>
        </div>

        <table>
          <thead>
            <tr><th>No</th><th>Name</th><th>Price</th><th>Quantity</th><th>Status</th><th>Description</th><th>Images</th><th>Action</th></tr>
          </thead>
          <tbody>
            {products.map((product,index) => (
              // <tr key={product._id}>
              //   <td>{product._id}</td>
              //   <td>{product.ProductName}</td>
              //   <td>${product.price}</td>
              //   <td>{product.description}</td>
              //   <td>
              //     {product.screenshots.map((image, index) => (
              //       <img 
              //         key={index} 
              //         src={`http://localhost:5000/uploads/${image}`} 
              //         alt="Product" 
              //         width="50" 
              //       />
              //     ))}
              //   </td>
              //   <td>
              //     <button onClick={() => deleteProduct(product._id)} className="delete-btn">
              //       <FaTrash /> Delete
              //     </button>
              //     <Link to={`/editproduct/${product._id}`}>
              //       <button className="edit-btn">✏️ Edit</button>
              //     </Link>
              //   </td>
              // </tr>
              <tr key={product._id}>
  <td>{index+1}</td>
  <td>{product.ProductName}</td>
  <td>${product.price}</td>

  {/* Quantity */}
  <td>{product.quantity}</td>

  {/* Availability Toggle */}
  <td>
    <button
      className={product.available ? "available-btn" : "unavailable-btn"}
      onClick={() => toggleAvailability(product._id)}
    >
      {product.available ? "Available" : "Out of Stock"}
    </button>
  </td>

  <td>{product.description}</td>

  <td>
    {product.screenshots.map((image, index) => (
      <img
        key={index}
        src={`http://localhost:5000/uploads/${image}`}
        alt="Product"
        width="50"
      />
    ))}
  </td>

  <td>
    <button onClick={() => deleteProduct(product._id)} className="delete-btn">
      <FaTrash /> Delete
    </button>
    <Link to={`/editproduct/${product._id}`}>
      <button className="edit-btn">✏️ Edit</button>
    </Link>
  </td>
</tr>

            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ShopDashboard;
