import React from 'react'
import './dash.css'
import { Link } from 'react-router-dom'

const BuyerNav = () => {
  const handleLogout = () => {
    alert("Logging out");
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId"); 
    localStorage.removeItem("role");
    window.location.href = "/login"; 
  };
  return (
    <div>
  
  <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm py-3 py-lg-0 px-3 px-lg-0">
  <Link to="/buyer-dash" className="navbar-brand ms-lg-5">
    <h1 className="m-0 text-uppercase text-dark">
      <i className="bi bi-profile fs-1 text-primary me-3" />
      WOOFTAIL 
    </h1> 
  </Link>
   
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto py-0">
        <Link to={'/buyer-dash'} className="nav-item nav-link active">
          Home
        </Link>
        <Link to={'/viewguide'} className="nav-item nav-link">
          Guide
        </Link>
        <Link to={'/bookdoctors'} className="nav-item nav-link">
          Doctors
        </Link>
        <Link to={'/buypro'} className="nav-item nav-link">
          Product
        </Link>
        <Link to={'/complaint'} className="nav-item nav-link">
          Complaint
        </Link>

        <a
          className="nav-item nav-link nav-contact bg-primary text-white px-5 ms-lg-5"
          onClick={handleLogout}
        >
          Logout <i className="bi bi-arrow-right" />
        </a>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default BuyerNav