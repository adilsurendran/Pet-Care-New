import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import './ProductPage.css';
import { useNavigate } from 'react-router-dom';
import BuyerNav from './BuyerNav';
import BuyerFooter from './BuyerFooter';

const BuyPro = () => {
  const [cart, setCart] = useState([]); // State for the cart
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to track loading
  const [userId, setUserId] = useState(null); // State to store userId
  const [quantities, setQuantities] = useState({});


  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allpro');
        // console.log(response,"seller idddddddddddddd???????????????????");
        
        setProducts(response.data.products); // Set the products in state
        const initialQuantities = {};
response.data.products.forEach(p => {
  initialQuantities[p._id] = 1;
});
setQuantities(initialQuantities);

        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();

    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('user');
    setUserId(storedUserId); // Set the userId state from localStorage
  }, []);

  const increaseQty = (id) => {
  setQuantities(prev => ({
    ...prev,
    [id]: prev[id] + 1
  }));
};

const decreaseQty = (id) => {
  setQuantities(prev => ({
    ...prev,
    [id]: Math.max(1, prev[id] - 1)
  }));
};


  const addToCart = async (product) => {
    try {
        const userId = localStorage.getItem("user"); // Get userId from localStorage
        if (!userId) {
            alert('Please log in first');
            return;
        }

        const response = await axios.post(
            `http://localhost:5000/api/add-to-cart/${userId}`,
            { productId: product._id,quantity: quantities[product._id] || 1    }, // Ensure this matches backend schema
            { headers: { 'Content-Type': 'application/json' } } // Fix possible format issues
        );

        console.log("Cart Response:", response.data);

        if (response.data.success) {
            alert(`${product.ProductName} added to cart!`);
        } else {
            alert("Failed to add to cart.");
        }
    } catch (error) {
        console.error("Error adding product to cart:", error.response?.data || error.message);
        alert("Error adding product to cart.");
    }
};





//  console.log(products);
  

  const bookProduct = async (product) => {
    if (!userId) {
      alert('Please log in first');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/bookpro/${userId}`, {
        productId: product._id, // Send the product ID in the body
        sellerLoginId: product.userId,
        quantity: quantities[product._id] || 1 
      });

      // Ensure to check for success status in the response
      if (response.data.success) {
        alert(`${product.ProductName} booked successfully!`);
        navigate('/buyer-dash'); // Navigate to the buyer dashboard or any other page
      } else {
        alert('Error booking product.');
      }
    } catch (error) {
      console.error('Error booking product:', error);
      alert('Error booking product.');
    }
  };

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
  <div>
    <BuyerNav />
    <div className="product-page">
      <header className="product-header">
        <h1>Pet Care Products</h1>
       
      </header>

      <div className="products-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={`http://localhost:5000/uploads/${product.screenshots[0]}`} // Use the correct image path
              alt={product.ProductName}
              className="product-image"
            />
            <div className="product-info">
              <h2>{product.ProductName}</h2>
              <p>{product.description}</p>
              <div className="price">${product.price}</div>
              <div className="quantity-control">
  <button onClick={() => decreaseQty(product._id)}>-</button>
  <span>{quantities[product._id] || 1}</span>
  <button onClick={() => increaseQty(product._id)}>+</button>
</div>
          
              <div className="product-actions">
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product)} // Trigger the addToCart function
                >
                  Add to Cart
                </button>
                <button
                  className="buy-now"
                  onClick={() => bookProduct(product)} // Trigger the bookProduct function
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="cart-button-container">
  <button className="cart-button" onClick={() => navigate('/cartpage')}>
    🛒 Cart
  </button>
</div>
    <BuyerFooter />
    </div>
  );
};

export default BuyPro;
