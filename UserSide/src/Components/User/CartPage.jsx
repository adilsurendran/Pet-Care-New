import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import BuyerNav from "./BuyerNav";
import BuyerFooter from "./BuyerFooter";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/viewcart/${userId}`);
        if (response.data.success) {
          setCartItems(response.data.cart.items || []);
        } else {
          alert("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, navigate]);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/remove-from-cart/${userId}/${productId}`);
      setCartItems(cartItems.filter((item) => item.productId._id !== productId));
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  const bookProduct = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/bookpro/${userId}`, { productId });
      if (response.data.success) {
        alert("Product booked successfully!");
        navigate("/buyer-dash");
      } else {
        alert("Failed to book the product.");
      }
    } catch (error) {
      console.error("Error booking product:", error);
      alert("Error booking product.");
    }
  };

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  return (
    <div>
      <BuyerNav />
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <img src={`http://localhost:5000/uploads/${item.productId.screenshots[0]}`} alt={item.productId.ProductName} />
                <div className="cart-info">
                  <h2>{item.productId.ProductName}</h2>
                  <p>{item.productId.description}</p>
                  <div className="price">${item.productId.price}</div>
                  <div className="cart-buttons">
                    <button className="remove-button" onClick={() => removeFromCart(item.productId._id)}>Cancel</button>
                    <button className="book-now" onClick={() => bookProduct(item.productId._id)} style={{ marginLeft: "10px" }}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BuyerFooter />
    </div>
  );
};

export default CartPage;
