import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams(); // Get product ID from URL
  const [input, setInput] = useState({
    ProductName: "",
    description: "",
    price: "",
    screenshots: [],
    quantity: "",
  });
  const [existingScreenshots, setExistingScreenshots] = useState([]);
  const [error, setError] = useState({});
  const [selectedFiles, setSelectedFiles] = useState(null);

  // Fetch existing product details
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/viewProduct/${productId}`)
  //     .then((res) => {
  //       setInput({
  //         ProductName: res.data.product.ProductName,
  //         description: res.data.product.description,
  //         price: res.data.product.price,
  //       });
  //       setExistingScreenshots(res.data.product.screenshots);
  //     })
  //     .catch((err) => console.error("Error fetching product:", err));
  // }, [productId]);

  useEffect(() => {
  axios
    .get(`http://localhost:5000/api/viewProduct/${productId}`)
    .then((res) => {
      setInput({
        ProductName: res.data.product.ProductName,
        description: res.data.product.description,
        price: res.data.product.price,
        quantity: res.data.product.quantity,
      });
      setExistingScreenshots(res.data.product.screenshots);
    });
}, [productId]);


  // Handle input changes
  const inputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Submit updated product data
  const click = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("ProductName", input.ProductName);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("quantity", input.quantity);


    // If new files are selected, append them; otherwise, send existing ones
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("screenshots", file);
      });
    } else {
      existingScreenshots.forEach((img) => {
        formData.append("screenshots", img); // Send existing image paths
      });
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/editProduct/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert('edited successfully')
      navigate("/shopdash");
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Toaster />
      <div className="form-box">
        <h1 className="title">Edit Product</h1>
        <form>
          <div className="input-group">
            <span className="error-text">{error.ProductName}</span>
            <input
              type="text"
              placeholder="Product Name"
              name="ProductName"
              value={input.ProductName}
              onChange={inputChange}
            />
          </div>

          <div className="input-group">
            <span className="error-text">{error.description}</span>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={input.description}
              onChange={inputChange}
            />
          </div>

          <div className="input-group">
            <span className="error-text">{error.price}</span>
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={input.price}
              onChange={inputChange}
            />
          </div>
          
          <div className="input-group">
  <input
    type="number"
    placeholder="Available Quantity"
    name="quantity"
    min="0"
    value={input.quantity}
    onChange={inputChange}
  />
</div>


          <div className="input-group">
            <span className="error-text">{error.screenshots}</span>
            <input
              type="file"
              name="screenshots"
              multiple
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          {/* Show existing images */}
          <div className="existing-images">
            {existingScreenshots.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${img}`} 
                alt="Screenshot"
                className="preview-img"
              />
            ))}
          </div>

          <button onClick={click} className="submit-btn">
            Update Product
          </button>
        </form>
      </div>

      <style>
        {`
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
        .existing-images {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }
        .preview-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 5px;
        }
        `}
      </style>
    </div>
  );
}
