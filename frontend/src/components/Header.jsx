import React from 'react'
import {NavLink} from 'react-router-dom'

const Header = () => {
  return (
    <div className='py-2'>
      {/* header section */}
      <section className='flex justify-around text-center'>
      <div>
        <NavLink to={"/mobile"}>
          <img
          className="h-20" 
          src="images/mobile.png" alt="logo" />
          <h3>Mobiles</h3>
        </NavLink>
      </div>
      <div>
        <NavLink to={"/fashion"}>
        <img
        className="h-20" 
        src="images/fashion.jpg" alt="logo" />
          <h3>Fashions</h3>
        </NavLink>
      </div>
      <div>
        <NavLink to={"/electronics"}>
        <img
        className="h-20" 
        src="images/electronic.jpg" alt="logo" />
          <h3>Electronics</h3>
        </NavLink>
      </div>
      <div>
        <NavLink to={"/toys"}>
        <img
        className="h-20" 
        src="images/baby.PNG" alt="logo" />
          <h3>Baby's Toys</h3>
        </NavLink>
      </div>
      <div>
        <NavLink to={"/homedecoration"}>
        <img
        className="h-20" 
        src="images/home.jpg" alt="logo" />
          <h3>Home</h3>
        </NavLink>
        </div>

        <div>  
        <NavLink to={"/products"}>
        <img
        className="h-20 w-32" 
        src="images/all.PNG" alt="logo" />
          <h3>All</h3>
        </NavLink>
      </div>
    </section>
    </div>
  )
}

export default Header
