import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import toast, { Toaster } from "react-hot-toast";
import "./add.css"

export default function AddProduct() {
  const navigate = useNavigate(); // Initialize navigation
  const [input, setInput] = useState({
    ProductName: "",
    description: "",
    quantity: "",
    price: "",
    screenshots: [],
  });

  const [error, setError] = useState({});

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
    if (!input.price.trim()) errorMessage.price = "Price is required";
    if (input.screenshots.length === 0) errorMessage.screenshots = "At least one screenshot is required";
    if (!input.quantity.trim()) errorMessage.quantity = "Quantity is required";


    setError(errorMessage);
    return Object.keys(errorMessage).length === 0;
  };

  const click = (event) => {
    event.preventDefault();

    if (!validationError()) {
      return;
    }

    const data = new FormData();
    data.append("ProductName", input.ProductName);
    data.append("description", input.description);
    data.append("price", input.price);
    data.append("quantity", input.quantity);


    input.screenshots.forEach((file) => {
      data.append("screenshots", file);
    });

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found in local storage");
      return;
    }

    axios
      .post(`http://localhost:5000/api/addgameaccount/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/shopdash"); // Redirect after success
        }, 2000); // Delay for toast message
      })
      .catch((err) => toast.error(err.response?.data?.message || "Something went wrong"));
  };

  return (
    <div className="container">
      <button className="back-btnn buttoonn" onClick={() => navigate("/shopdash")}>
  ← Back to Dashboard
</button>
      <Toaster />
      <div className="form-box">
        <h1 className="title">Add Product</h1>
        <form>
          <div className="input-group">
            <span className="error-text">{error.ProductName}</span>
            <input type="text" placeholder="Product Name" name="ProductName" onChange={inputChange} />
          </div>

          <div className="input-group">
            <span className="error-text">{error.description}</span>
            <input type="text" placeholder="Description" name="description" onChange={inputChange} />
          </div>

          <div className="input-group">
            <span className="error-text">{error.price}</span>
            <input type="number" placeholder="Price" name="price" onChange={inputChange} />
          </div>

          <div className="input-group">
  <span className="error-text">{error.quantity}</span>
  <input
    type="number"
    placeholder="Available Quantity"
    name="quantity"
    min="0"
    onChange={inputChange}
  />
</div>


          <div className="input-group">
            <span className="error-text">{error.screenshots}</span>
            <input type="file" name="screenshots" multiple onChange={handleFileChange} className="file-input" />
          </div>

          <button onClick={click} className="submit-btn">Add Product</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }

        .form-box {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }

        .title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }

        .input-group {
          margin-bottom: 20px;
          position: relative;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          color: #333;
        }

        .input-group input:focus {
          border-color: #f39c12;
          outline: none;
        }

        .error-text {
          color: red;
          font-size: 12px;
          position: absolute;
          bottom: -15px;
        }

        .file-input {
          padding: 6px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        .submit-btn {
          width: 100%;
          padding: 10px;
          background-color: #f39c12;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: #e67e22;
        }
      `}</style>
    </div>
  );
}
