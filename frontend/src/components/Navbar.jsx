import React, {useContext} from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/CartContext'
import { AuthContext } from '../context/UserContext'


const Navbar = () => {
  const {total_item} = useCartContext();
  const { logout } = useContext(AuthContext);

  return (
    <div className='flex bg-blue-700 h-18 justify-between items-center px-16 text-white sticky top-0 left-0 right-0'>
      <div>
      <NavLink to={"/"}>
      <div>
        <img 
          className='h-16 w-24'
          src="images/logo.jpg" 
          alt="logo" />
      </div>
      </NavLink>
      </div>

      <div className='flex space-x-12'>
      <NavLink to={"/login"} >
        <div className='h-[2.5rem] w-[7rem] bg-white font-bold flex justify-center items-center'>
          <button className='text-blue-700'>Login</button>
        </div>
      </NavLink>
        <div className='h-[2.5rem] w-[7rem] bg-white font-bold flex justify-center items-center'>
            <button 
            className='text-blue-700'
            onClick={logout}>Logout</button>
        </div>
       <NavLink to={"/register"}>
       <div className='h-[2.5rem] w-[7rem] bg-white font-bold flex justify-center items-center'>
          <button className='text-blue-700'>Register</button>
        </div>
       </NavLink>
        <NavLink to={"/order"}>
        <div className='h-[2.5rem] w-[7rem] bg-white font-bold flex justify-center items-center'>
          <button className='text-blue-700'>
            order
          </button>
        </div>
        </NavLink>
      <NavLink to={"/cart"}>
        <div className='flex'>
        <FiShoppingCart  className='mt-1 h-10 w-10 static'/>
        <span className='text-lg font-bold bg-sky-500 rounded-full text-center absolute ml-6  h-6 w-6'>
          {total_item}
        </span>
      </div>
      </NavLink>
      </div>
    </div>
  )
}

export default Navbar
