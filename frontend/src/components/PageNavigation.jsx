import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNavigation = ({ title }) => {
  return (
    <div className='h-[4rem] flex justify-start items-center  pl-[1.2rem]'>
      <NavLink to={"/"}>
        <p className='text-2xl text-blue-400 font-bold'>Home / </p>
        </NavLink>{title}
    </div>
  )
}

export default PageNavigation
