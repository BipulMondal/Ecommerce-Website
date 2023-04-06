import React from 'react'
import {FaPlus, FaMinus} from 'react-icons/fa'

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <div>
        <div className="flex space-x-8 mt-2 justify-center">
            <button
            className='h-[2.2rem] w-[2.2rem] bg-black text-white flex justify-center items-center rounded-full'
            onClick={() => setDecrease()}>
                <FaMinus />
            </button>
            <div className="font-bold text-2xl">{amount}</div>
            <button 
            className='h-[2.2rem] w-[2.2rem] bg-black text-white flex justify-center items-center rounded-full'
            onClick={() => setIncrease()}>
                <FaPlus />
            </button>
        </div>    
    </div>
  )
}

export default CartAmountToggle
