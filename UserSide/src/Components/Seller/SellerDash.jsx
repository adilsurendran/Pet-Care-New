import { useState, useEffect } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Shop/AddProduct.css";

const SellerDash = () => {
  const [products, setProducts] = useState([]);
  const [shopId, setShopId] = useState(null);

  useEffect(() => {
    const storedShopId = localStorage.getItem("userId");
    if (storedShopId) {
      setShopId(storedShopId);
      fetchProducts(storedShopId);
    } else {
      console.error("No shopId found in local storage!");
    }
  }, []);

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

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletepro/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Sidebar</h2>
        <ul className="nav-menu">
          <li>Dashboard</li>
          <Link to="/addprod"><li>Products</li></Link>
          <Link to={'/vieworders'}>Orders</Link>
        </ul>
      </aside>

      <main className="main-content">
        <h1>Seller Dashboard</h1>

        <div className="cards">
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <FaBox className="icon blue" />
            <div><h3>{products.length}</h3><p>Products</p></div>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <FaShoppingCart className="icon green" />
            <div><h3>0</h3><p>Orders</p></div>
          </motion.div>
          <motion.div className="card" whileHover={{ scale: 1.05 }}>
            <FaUsers className="icon red" />
            <div><h3>0</h3><p>Customers</p></div>
          </motion.div>
        </div>

        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Price</th><th>Description</th><th>Images</th><th>Action</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.ProductName}</td>
                <td>${product.price}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default SellerDash;
