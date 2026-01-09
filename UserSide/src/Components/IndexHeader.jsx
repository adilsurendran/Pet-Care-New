import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const IndexHeader = ({ type }) => {
  return (
    <div className="header-wrapper">
      <header className="premium-header">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to={'/'} className='text-decoration-none'>
            <h1 className="logo-brand">
              W<span>oo</span>fTale
            </h1>
          </Link>
          <nav className="premium-nav">
            {type === 'admin' ? (
              <Link to='/admindash' className="login-pill">← Dashboard</Link>
            ) : (
              <>
                <Link to={'/service'} className='text-light'>Services</Link>
                <Link to='/login' className="login-pill">Login</Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  )
}

export default IndexHeader