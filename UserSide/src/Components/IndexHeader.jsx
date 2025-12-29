import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const IndexHeader = () => {
  return (
    <div>
        {/* Header Section */}
        <header className="bg-dark text-light">
                <div className="container d-flex justify-content-between align-items-center">
                <Link to={'/'} className='h1 text-decoration-none'>
  <h1 className="display-6 custom-font-color">
    W<span className="custom-oo">oo</span>fTale
  </h1>
</Link>
                    <nav>
                        <a href="#about" className="text-light mx-2">About</a>
                        <Link to={'/service'} className="text-light mx-2">Services</Link>
                        <a href="#contact" className="text-light mx-2">Contact</a>
                        <Link to='/login' className="text-light mx-2">Login</Link>
                    </nav>
                </div>
            </header>
    </div>
  )
}

export default IndexHeader