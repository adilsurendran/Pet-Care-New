// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import "../RegistrationPage.css";
// import IndexHeader from "../IndexHeader";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const SsignUp = () => {
//   const [formData, setFormData] = useState({
//     shopName: "",
//     shopEmail: "",
//     shopPhone: "",
//     shopAddress: "",
//     userPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const phoneRegex = /^[0-9]{10}$/; // India-style 10 digit phone

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setLoading(true);

// //   try {
// //     const payload = {
// //       ...formData,
// //       userName: formData.shopEmail, // ✅ email acts as username
// //     };

// //     const response = await axios.post(
// //       "http://localhost:5000/api/shopreg",
// //       payload
// //     );

// //     if (response.data.success) {
// //       alert("Shop registered successfully!");
// //       navigate("/login");
// //     } else {
// //       alert(response.data.message || "Registration failed.");
// //     }
// //   } catch (error) {
// //     alert("An error occurred. Please try again.");
// //     console.error("Error during registration:", error.message);
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setErrorMessage("");
//   setLoading(true);

//   const {
//     shopName,
//     shopEmail,
//     shopPhone,
//     shopAddress,
//     userPassword
//   } = formData;

//   // ===== VALIDATIONS =====
//   if (shopName.trim().length < 3) {
//     setLoading(false);
//     return setErrorMessage("Shop name must be at least 3 characters.");
//   }

//   if (!emailRegex.test(shopEmail.trim().toLowerCase())) {
//     setLoading(false);
//     return setErrorMessage("Please enter a valid shop email address.");
//   }

//   if (!phoneRegex.test(shopPhone.trim())) {
//     setLoading(false);
//     return setErrorMessage("Phone number must be exactly 10 digits.");
//   }

//   if (shopAddress.trim().length < 5) {
//     setLoading(false);
//     return setErrorMessage("Shop address must be at least 5 characters.");
//   }

//   if (!userPassword) {
//     setLoading(false);
//     return setErrorMessage("Password is required.");
//   }

//   // ===== PAYLOAD =====
//   const payload = {
//     ...formData,
//     shopEmail: shopEmail.trim().toLowerCase(),
//     userName: shopEmail.trim().toLowerCase(), // email = username
//   };

//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/shopreg",
//       payload
//     );

//     if (response.data.success) {
//       alert("Shop registered successfully!");
//       navigate("/login");
//     } else {
//       setErrorMessage(response.data.message || "Registration failed.");
//     }
//   } catch (error) {
//     console.error("Error during registration:", error.message);
//     setErrorMessage("An error occurred. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="reg-page-wrapper">
//       <IndexHeader />
// {errorMessage && <div className="reg-error">{errorMessage}</div>}

//       <div className="reg-content-container">
//         <motion.div
//           className="premium-reg-card"
//           initial={{ opacity: 0, scale: 0.98, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="card-accent"></div>

//           <div className="reg-card-header">
//             <h1 className="reg-title">Shop Registration</h1>
//             <p className="reg-subtitle">Partner with Wooftale and grow your business</p>
//           </div>

//           <form onSubmit={handleSubmit} className="premium-reg-form">
//             <div className="form-row">
//               <div className="reg-input-group">
//                 <label>Shop Name</label>
//                 <input
//                   type="text"
//                   name="shopName"
//                   placeholder="Official Shop Name"
//                   required
//                   value={formData.shopName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="reg-input-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="text"
//                   name="shopPhone"
//                   placeholder="Contact Number"
//                   required
//                   value={formData.shopPhone}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="reg-input-group">
//               <label>Shop Email</label>
//               <input
//                 type="email"
//                 name="shopEmail"
//                 placeholder="shop@example.com"
//                 required
//                 value={formData.shopEmail}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="reg-input-group">
//               <label>Shop Address</label>
//               <textarea
//                 name="shopAddress"
//                 placeholder="Full location details"
//                 required
//                 value={formData.shopAddress}
//                 onChange={handleChange}
//                 rows="2"
//                 style={{ resize: "none" }}
//                 className="reg-input-field"
//               ></textarea>
//             </div>

//             <div className="form-row">
//               {/* <div className="reg-input-group">
//                 <label>Username</label>
//                 <input
//                   type="text"
//                   name="userName"
//                   placeholder="Login Username"
//                   required
//                   value={formData.userName}
//                   onChange={handleChange}
//                 />
//               </div> */}
//               <div className="reg-input-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="userPassword"
//                   placeholder="Strong password"
//                   required
//                   value={formData.userPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               className="premium-reg-btn"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={loading}
//             >
//               {loading ? "Registering Shop..." : "Register Shop"}
//             </motion.button>
//           </form>

//           <div className="reg-footer">
//             <p>
//               Already partnered? <Link to="/login" className="login-link">Login here</Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SsignUp;

import React, { useState } from "react";
import { motion } from "framer-motion";
import "../RegistrationPage.css";
import IndexHeader from "../IndexHeader";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SsignUp = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    shopEmail: "",
    shopPhone: "",
    shopAddress: "",
    userPassword: "",
  });

  const [shopLogo, setShopLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setShopLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const {
      shopName,
      shopEmail,
      shopPhone,
      shopAddress,
      userPassword,
    } = formData;

    // ===== VALIDATIONS =====
    if (shopName.trim().length < 3) {
      setLoading(false);
      return setErrorMessage("Shop name must be at least 3 characters.");
    }

    if (!emailRegex.test(shopEmail.trim().toLowerCase())) {
      setLoading(false);
      return setErrorMessage("Please enter a valid shop email address.");
    }

    if (!phoneRegex.test(shopPhone.trim())) {
      setLoading(false);
      return setErrorMessage("Phone number must be exactly 10 digits.");
    }

    if (shopAddress.trim().length < 5) {
      setLoading(false);
      return setErrorMessage("Shop address must be at least 5 characters.");
    }

    if (!userPassword) {
      setLoading(false);
      return setErrorMessage("Password is required.");
    }

    if (!shopLogo) {
      setLoading(false);
      return setErrorMessage("Shop logo is required.");
    }

    // ===== FORM DATA (MULTIPART) =====
    const data = new FormData();
    data.append("shopName", shopName.trim());
    data.append("shopEmail", shopEmail.trim().toLowerCase());
    data.append("shopPhone", shopPhone.trim());
    data.append("shopAddress", shopAddress.trim());
    data.append("userPassword", userPassword);
    data.append("userName", shopEmail.trim().toLowerCase());
    data.append("shopLogo", shopLogo);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/shopreg",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Shop registered successfully!");
        navigate("/login");
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-page-wrapper">
      <IndexHeader />

      {errorMessage && <div className="reg-error">{errorMessage}</div>}

      <div className="reg-content-container">
        <motion.div
          className="premium-reg-card"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-accent"></div>

          <div className="reg-card-header">
            <h1 className="reg-title">Shop Registration</h1>
            <p className="reg-subtitle">
              Partner with Wooftale and grow your business
            </p>
          </div>

          <form onSubmit={handleSubmit} className="premium-reg-form">
            {/* SHOP LOGO */}
            <div className="reg-input-group">
              <label>Shop Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Shop Logo Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>

            <div className="form-row">
              <div className="reg-input-group">
                <label>Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  placeholder="Official Shop Name"
                  required
                  value={formData.shopName}
                  onChange={handleChange}
                />
              </div>

              <div className="reg-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="shopPhone"
                  placeholder="Contact Number"
                  required
                  value={formData.shopPhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="reg-input-group">
              <label>Shop Email</label>
              <input
                type="email"
                name="shopEmail"
                placeholder="shop@example.com"
                required
                value={formData.shopEmail}
                onChange={handleChange}
              />
            </div>

            <div className="reg-input-group">
              <label>Shop Address</label>
              <textarea
                name="shopAddress"
                placeholder="Full location details"
                required
                value={formData.shopAddress}
                onChange={handleChange}
                rows="2"
                style={{ resize: "none" }}
              ></textarea>
            </div>

            <div className="reg-input-group">
              <label>Password</label>
              <input
                type="password"
                name="userPassword"
                placeholder="Strong password"
                required
                value={formData.userPassword}
                onChange={handleChange}
              />
            </div>

            <motion.button
              type="submit"
              className="premium-reg-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Registering Shop..." : "Register Shop"}
            </motion.button>
          </form>

          <div className="reg-footer">
            <p>
              Already partnered?{" "}
              <Link to="/login" className="login-link">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SsignUp;
