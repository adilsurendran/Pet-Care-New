import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDash.css";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";

const AdminDash = () => {
  return (
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="main-content p-4">
        <div className="welcome-section mb-4" >
          
          <h1>Welcome, Admin</h1>
          <p>Manage your platform efficiently with quick access to all modules.</p>
        </div>

        {/* Grid of Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <Link to={'/userpannel'}>
            <div className="info-card shadow">
              <h4>Users</h4>
              <p>Manage platform users efficiently.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/shoppannel'}>
            <div className="info-card shadow">
              <h4>Shops</h4>
              <p>Monitor shop details and analytics.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/doctorpannel'} >
            <div className="info-card shadow">
              <h4>Doctors</h4>
              <p>Manage doctor registrations and approvals.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/docs'} >
            <div className="info-card shadow">
              <h4>Doctor registration</h4>
              <p>Manage doctor registrations and approvals.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/petcarepannel'}>
            <div className="info-card shadow">
              <h4>Petcare</h4>
              <p>Oversee petcare services and providers.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to={'/viewcomplaintes'}>
            <div className="info-card shadow">
              <h4>Complaints</h4>
              <p>Handle user complaints and feedback.</p>
            </div>
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
