

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./RegistrationPage.css";
import { useNavigate, Link } from "react-router-dom";

const DoctorRegistration = () => {

  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: "",
    doctorEmail: "",
    doctorNumber: "",
    doctorAddress: "",
    doctorQualification: "",
    doctorExperience: "",
    doctorAbout: "",
    userPassword: "",
  });

  const [doctorImage, setDoctorImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    setDoctorImage(e.target.files[0]);
    setErrors({ ...errors, doctorImage: "" });
  };

  const validateForm = () => {

    let newErrors = {};

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!nameRegex.test(doctorDetails.doctorName))
      newErrors.doctorName = "Enter a valid name (letters only, min 3 characters)";

    if (!phoneRegex.test(doctorDetails.doctorNumber))
      newErrors.doctorNumber = "Phone number must be exactly 10 digits";

    if (!emailRegex.test(doctorDetails.doctorEmail))
      newErrors.doctorEmail = "Enter a valid email address";

    if (doctorDetails.doctorQualification.length < 5)
      newErrors.doctorQualification = "Qualification must be at least 5 characters";

    if (
      doctorDetails.doctorExperience < 0 ||
      doctorDetails.doctorExperience > 60
    )
      newErrors.doctorExperience = "Experience must be between 0 and 60";

    if (doctorDetails.doctorAddress.length < 10)
      newErrors.doctorAddress = "Address must be at least 10 characters";

    if (doctorDetails.doctorAbout.length < 20)
      newErrors.doctorAbout = "About section must be at least 20 characters";

    if (!passwordRegex.test(doctorDetails.userPassword))
      newErrors.userPassword =
        "Password must contain uppercase, lowercase, number, special character (min 8)";

    if (!doctorImage)
      newErrors.doctorImage = "Doctor image is required";

    if (doctorImage) {
      const allowed = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowed.includes(doctorImage.type))
        newErrors.doctorImage = "Only JPG or PNG images allowed";

      if (doctorImage.size > 2 * 1024 * 1024)
        newErrors.doctorImage = "Image must be less than 2MB";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {

      const formData = new FormData();

      Object.entries(doctorDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("doctorImage", doctorImage);

      const response = await axios.post(
        "http://localhost:5000/api/doctorreg/fromlogin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      navigate("/");

    } catch (err) {

      alert(err.response?.data?.message || "Registration failed");

      setLoading(false);
    }
  };

  return (
    <div className="reg-page-wrapper">
        <button onClick={() => navigate("/")} style={{position:"absolute",top:"20px",left:"20px",zIndex:"1000",backgroundColor:"#000",color:"#fff",border:"none",padding:"10px 20px",borderRadius:"5px",cursor:"pointer"}}><i className="fa fa-arrow-left" style={{color:"#fff !important"}}></i>Back</button>

      <div className="reg-content-container">

        <motion.div
          className="premium-reg-card"
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <div className="card-accent"></div>

          <div className="reg-card-header">
            <h1 className="reg-title">Doctor Registration</h1>
            <p className="reg-subtitle">
              Join our medical network and help pets thrive
            </p>
          </div>

          <form onSubmit={handleSubmit} className="premium-reg-form">

            <div className="form-row">

              <div className="reg-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Dr. Name"
                  value={doctorDetails.doctorName}
                  onChange={handleChange}
                />
                {errors.doctorName && <p className="field-error">{errors.doctorName}</p>}
              </div>

              <div className="reg-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="doctorNumber"
                  placeholder="Contact Number"
                  value={doctorDetails.doctorNumber}
                  onChange={handleChange}
                />
                {errors.doctorNumber && <p className="field-error">{errors.doctorNumber}</p>}
              </div>

            </div>

            <div className="reg-input-group">
              <label>Professional Email</label>
              <input
                type="email"
                name="doctorEmail"
                placeholder="doctor@example.com"
                value={doctorDetails.doctorEmail}
                onChange={handleChange}
              />
              {errors.doctorEmail && <p className="field-error">{errors.doctorEmail}</p>}
            </div>

            <div className="form-row">

              <div className="reg-input-group">
                <label>Qualification / Specialization</label>
                <input
                  type="text"
                  name="doctorQualification"
                  value={doctorDetails.doctorQualification}
                  onChange={handleChange}
                />
                {errors.doctorQualification && <p className="field-error">{errors.doctorQualification}</p>}
              </div>

              <div className="reg-input-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="doctorExperience"
                  value={doctorDetails.doctorExperience}
                  onChange={handleChange}
                />
                {errors.doctorExperience && <p className="field-error">{errors.doctorExperience}</p>}
              </div>

            </div>

            <div className="reg-input-group">
              <label>Clinic Address</label>
              <textarea
                name="doctorAddress"
                rows="2"
                value={doctorDetails.doctorAddress}
                onChange={handleChange}
                style={{ resize: "none" }}
              />
              {errors.doctorAddress && <p className="field-error">{errors.doctorAddress}</p>}
            </div>

            <div className="reg-input-group">
              <label>About Doctor</label>
              <textarea
                name="doctorAbout"
                rows="3"
                value={doctorDetails.doctorAbout}
                onChange={handleChange}
                style={{ resize: "none" }}
              />
              {errors.doctorAbout && <p className="field-error">{errors.doctorAbout}</p>}
            </div>

            <div className="reg-input-group">
              <label>Doctor Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.doctorImage && <p className="field-error">{errors.doctorImage}</p>}
            </div>

            <div className="reg-input-group">
              <label>Account Password</label>
              <input
                type="password"
                name="userPassword"
                value={doctorDetails.userPassword}
                onChange={handleChange}
              />
              {errors.userPassword && <p className="field-error">{errors.userPassword}</p>}
            </div>

            <motion.button
              type="submit"
              className="premium-reg-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Registering Doctor..." : "Complete Registration"}
            </motion.button>

          </form>

          <div className="reg-footer">
            <p>
              By registering, you agree to our{" "}
              <Link to="/" className="login-link">
                PetCare Provider Terms
              </Link>
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default DoctorRegistration;