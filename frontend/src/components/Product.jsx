import React from 'react'
import { NavLink } from 'react-router-dom';
import FormatPrice from '../helpers/FormatPrice';

const Product = (curElem) => {
    const {_id, name, images, price} =curElem;
  return (
    <NavLink to={`/singleproduct/${_id}`}>
        <div className='h-[20rem] w-[12rem] flex flex-col items-center p-2 rounded-xl hover:scale-105'>
            <figure>
                <img className='h-[14rem] w-[9rem]'
                    src={images[0]} alt={name} 
                />
            </figure>
            <div className='mt-4 w-full'>
                <div className=''>
                    <h3>{name}</h3>
                    <p><FormatPrice price={price} /> </p>
                </div>
            </div>
        </div>
    </NavLink>
  )
}

export default Product
