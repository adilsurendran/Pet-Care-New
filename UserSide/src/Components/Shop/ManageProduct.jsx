import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaPlus, FaTrash, FaEdit, FaBox, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import ShopSidebar from "./ShopSidebar";
import "./ShopPremium.css";
import "../Admin/AdminPanelPremium.css"; // Reuse table styles

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [shopId, setShopId] = useState(localStorage.getItem("userId"));

    const [input, setInput] = useState({
        ProductName: "",
        description: "",
        quantity: "",
        price: "",
        screenshots: [],
    });

    const [error, setError] = useState({});

    useEffect(() => {
        if (shopId) {
            fetchProducts(shopId);
        }
    }, [shopId]);

    const fetchProducts = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/getpro/${id}`);
            if (response.data.success) {
                setProducts(response.data.products);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/deletepro/${productId}`);
            toast.success("Product deleted successfully");
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            toast.error("Error deleting product");
        }
    };

    const toggleAvailability = async (productId) => {
        try {
            await axios.put(`http://localhost:5000/api/product/toggle-availability/${productId}`);
            fetchProducts(shopId);
        } catch (error) {
            toast.error("Failed to toggle availability");
        }
    };

    const inputChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleFileChange = (e) => {
        setInput({ ...input, screenshots: Array.from(e.target.files) });
    };

    const validationError = () => {
        const errorMessage = {};
        if (!input.ProductName.trim()) errorMessage.ProductName = "Product name is required";
        if (!input.description.trim()) errorMessage.description = "Description is required";
        if (!input.price) errorMessage.price = "Price is required";
        if (!input.quantity) errorMessage.quantity = "Quantity is required";
        if (input.screenshots.length === 0) errorMessage.screenshots = "Image is required";
        setError(errorMessage);
        return Object.keys(errorMessage).length === 0;
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        if (!validationError()) return;

        const data = new FormData();
        data.append("ProductName", input.ProductName);
        data.append("description", input.description);
        data.append("price", input.price);
        data.append("quantity", input.quantity);
        input.screenshots.forEach((file) => data.append("screenshots", file));

        try {
            const res = await axios.post(`http://localhost:5000/api/addgameaccount/${shopId}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(res.data.message);
            setShowModal(false);
            setInput({ ProductName: "", description: "", quantity: "", price: "", screenshots: [] });
            fetchProducts(shopId);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="shop-layout">
            <Toaster />
            <ShopSidebar />

            <main className="shop-main">
                <div className="product-management-header">
                    <motion.h2
                        className="panel-title"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        Manage <span>Products</span>
                    </motion.h2>
                    <button className="add-product-btn" onClick={() => setShowModal(true)}>
                        <FaPlus /> Add New Product
                    </button>
                </div>

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
                                    <th>#</th>
                                    <th>Product Details</th>
                                    <th>Price & Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <tr key={product._id}>
                                            <td style={{ fontWeight: 'bold', color: '#4caf50' }}>{index + 1}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <img
                                                        src={`http://localhost:5000/uploads/${product.screenshots[0]}`}
                                                        alt={product.ProductName}
                                                        style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                                                    />
                                                    <div>
                                                        <div style={{ fontWeight: '700' }}>{product.ProductName}</div>
                                                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>{product.description}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '700', color: '#2c3e50' }}>${product.price}</div>
                                                <small className="text-muted">Quantity: {product.quantity}</small>
                                            </td>
                                            <td>
                                                <button
                                                    className={`badge ${product.available ? 'bg-success' : 'bg-danger'}`}
                                                    style={{ border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', color: 'white' }}
                                                    onClick={() => toggleAvailability(product._id)}
                                                >
                                                    {product.available ? "In Stock" : "Out of Stock"}
                                                </button>
                                            </td>
                                            <td>
                                                <div className="action-group">
                                                    <button className="btn-premium btn-delete" onClick={() => deleteProduct(product._id)}>
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">No products found. Start adding!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </main>

            {/* Add Product Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="premium-modal-overlay">
                        <motion.div
                            className="premium-modal-card"
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        >
                            <div className="modal-header">
                                <h3><FaBox /> Add New Product</h3>
                            </div>
                            <div className="modal-body">
                                <form className="modal-grid">
                                    <div className="modal-input-group full-width">
                                        <label>Product Name</label>
                                        <input type="text" name="ProductName" placeholder="Enter product name" onChange={inputChange} />
                                        {error.ProductName && <small className="text-danger">{error.ProductName}</small>}
                                    </div>

                                    <div className="modal-input-group">
                                        <label>Price ($)</label>
                                        <input type="number" name="price" placeholder="0.00" onChange={inputChange} />
                                        {error.price && <small className="text-danger">{error.price}</small>}
                                    </div>

                                    <div className="modal-input-group">
                                        <label>Quantity</label>
                                        <input type="number" name="quantity" placeholder="0" onChange={inputChange} />
                                        {error.quantity && <small className="text-danger">{error.quantity}</small>}
                                    </div>

                                    <div className="modal-input-group full-width">
                                        <label>Description</label>
                                        <textarea name="description" rows="3" placeholder="Briefly describe the product" onChange={inputChange}></textarea>
                                        {error.description && <small className="text-danger">{error.description}</small>}
                                    </div>

                                    <div className="modal-input-group full-width">
                                        <label>Product Image</label>
                                        <div className="file-upload-wrapper" style={{ position: 'relative' }}>
                                            <input type="file" multiple onChange={handleFileChange} style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 2 }} />
                                            <div className="text-center p-2" style={{ border: '2px dashed #eee', borderRadius: '12px', color: '#64748b', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                <FaCloudUploadAlt size={20} />
                                                <div style={{ fontSize: '0.85rem' }}>{input.screenshots.length > 0 ? `${input.screenshots.length} files selected` : "Upload image"}</div>
                                            </div>
                                        </div>
                                        {error.screenshots && <small className="text-danger">{error.screenshots}</small>}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-modal btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn-modal btn-save" onClick={handleAddProduct}>Create Product</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProduct;
