import React from 'react'
import { Link } from 'react-router-dom'

const RegHead = () => {
  return (
    <div>
          <header className="bg-dark text-light">
                <div className="container d-flex justify-content-between align-items-center">
                   <Link to={'/'} className='h1 text-decoration-none '><h1 className="display-6">PetCare</h1></Link>
                    <nav>
                        <Link to={'/userreg'} className="text-light mx-2">User</Link>
                        <Link to={'/shopr'} className="text-light mx-2">Shop</Link>
                        <Link to={'/docs'} className="text-light mx-2">Doctor</Link>
                        <Link to='/login' className="text-light mx-2">Login</Link>
                    </nav>
                </div>
            </header>
    </div>

  )
}

export default RegHead