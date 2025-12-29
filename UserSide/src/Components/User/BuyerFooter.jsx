import React from 'react'
import './dash.css'
import { Link } from 'react-router-dom'

const BuyerFooter = () => {
  return (
    <div>
      
         <div className="container-fluid bg-light mt-5 py-5">
         <div className="container-fluid border-bottom d-none d-lg-block">
    <div className="row gx-0">
      <div className="col-lg-4 text-center py-2">
        <div className="d-inline-flex align-items-center">
          <i className="bi bi-geo-alt fs-1 text-primary me-3" />
          <div className="text-start">
            <h6 className="text-uppercase mb-1">Our Office</h6>
            <span>calicut,kerala,India</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 text-center border-start border-end py-2">
        <div className="d-inline-flex align-items-center">
          <i className="bi bi-envelope-open fs-1 text-primary me-3" />
          <div className="text-start">
            <h6 className="text-uppercase mb-1">Email Us</h6>
            <span>info@wooftail.com</span>
          </div>
        </div>
      </div>
      <div className="col-lg-4 text-center py-2">
        <div className="d-inline-flex align-items-center">
          <i className="bi bi-phone-vibrate fs-1 text-primary me-3" />
          <div className="text-start">
            <h6 className="text-uppercase mb-1">Call Us</h6>
            <span>+91 7907621449</span>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div className="container pt-5">
      
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">
            Get In Touch
          </h5>
          <p className="mb-4">
          No pain or sorrow, no meaningless words.
          Suffering lingers, yet joy and sadness intertwine.
          </p>
          <p className="mb-2">
            <i className="bi bi-geo-alt text-primary me-2" />
            calicut,kerala,India
          </p>
          <p className="mb-2">
            <i className="bi bi-envelope-open text-primary me-2" />
            info@wooftail.com
          </p>
          <p className="mb-0">
            <i className="bi bi-telephone text-primary me-2" />
            +91 7907621449
          </p>
        </div>
        <div className="col-lg-3 col-md-6">
          <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">
            Quick Links
          </h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-body mb-2" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              Home
            </a>
            <a className="text-body mb-2" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              About Us
            </a>
            
            <a className="text-body mb-2" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              Meet The Team
            </a>
            
            <a className="text-body" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              Contact Us
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h5 className="text-uppercase border-start border-5 border-primary ps-3 mb-4">
            Popular Links
          </h5>
          <div className="d-flex flex-column justify-content-start">
            <a className="text-body mb-2" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              Home
            </a>
            <a className="text-body mb-2" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              About Us
            </a>
            
            <a className="text-body mb-2" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              Meet The Team
            </a>
            
            <a className="text-body" href="#">
              <i className="bi bi-arrow-right text-primary me-2" />
              Contact Us
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
         
          <form action="">
            <div className="input-group">
              
              <Link to={'/sendcomplaint'} className="btn btn-primary">Send Complaint</Link>
            </div>
          </form>
          <h6 className="text-uppercase mt-4 mb-3">Follow Us</h6>
          <div className="d-flex">
            <a className="btn btn-outline-primary btn-square me-2" href="#">
              <i className="bi bi-twitter" />
            </a>
            <a className="btn btn-outline-primary btn-square me-2" href="#">
              <i className="bi bi-facebook" />
            </a>
            <a className="btn btn-outline-primary btn-square me-2" href="#">
              <i className="bi bi-linkedin" />
            </a>
            <a className="btn btn-outline-primary btn-square" href="#">
              <i className="bi bi-instagram" />
            </a>
          </div>
        </div>
        <div className="col-12 text-center text-body">
          <a className="text-body" href="">
            Terms &amp; Conditions
          </a>
          <span className="mx-1">|</span>
          <a className="text-body" href="">
            Privacy Policy
          </a>
          <span className="mx-1">|</span>
          <a className="text-body" href="">
            Customer Support
          </a>
          <span className="mx-1">|</span>
          <a className="text-body" href="">
            Payments
          </a>
          <span className="mx-1">|</span>
          <a className="text-body" href="">
            Help
          </a>
          <span className="mx-1">|</span>
          <a className="text-body" href="">
            FAQs
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid bg-dark text-white-50 py-4">
    <div className="container">
      <div className="row g-5">
        <div className="col-md-6 text-center text-md-start">
          <p className="mb-md-0">
            ©{" "}
            <a className="text-white" href="#">
              Your Site Name
            </a>
            . All Rights Reserved.
          </p>
        </div>
        <div className="col-md-6 text-center text-md-end">
          <p className="mb-0">
            Designed by{" "}
            <a className="text-white" href="https://htmlcodex.com">
              HTML Codex
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default BuyerFooter