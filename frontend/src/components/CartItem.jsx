import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/CartContext'
import CartAmountToggle from './CartAmountToggle'
import axios from 'axios'

const CartItem = ({productId, name, image, color, price, amount }) => {
  // console.log(amount)
    const { removeItem, setIncrease, setDecrease } = useCartContext();

    const handleRemoveItem = async () => {
      
      const token = localStorage.getItem("token");
  
      try {
        await axios.delete(`http://localhost:4000/api/v1/cartItems/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        removeItem(productId);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className='grid grid-cols-5 items-center'>
        <div className="flex">
            <div>
                <figure className='h-16 w-16 my-2 border-2 border-black flex justify-center items-center'>
                    <img
                    className='h-12 '
                     src={image} 
                     alt={productId} 
                     />
                </figure>
            </div>
            <div className='ml-2'>
                <p>{name}</p>
                <div className="flex">
                    <p>color:
                    </p>
                    <div 
                    className="h-4 w-4 rounded-full mt-2 ml-2" 
                    style={{ backgroundColor:color, color:color}}
                    >

                    </div>
                </div>
            </div>
        </div>

        {/*price */}
        <div className="flex justify-center">
            <p> 
                <FormatPrice price={price} />
            </p>
        </div>

        {/* quantity */}
       <CartAmountToggle 
         amount = {amount}
         setIncrease = {() => setIncrease(productId)}
         setDecrease = {() => setDecrease(productId)}
      />

        {/* subtotal */}
      <div className="flex justify-center">
        <p> <FormatPrice price={price * amount} /> </p>
      </div>

      {/* remove  */}
      <div className='flex justify-center'>
        {/* <FaTrash className="fill-red-400 hover:fill-red-600 cursor-pointer h-8" onClick={() => removeItem(_id)} /> */}
        <FaTrash 
        className="fill-red-400 hover:fill-red-600 cursor-pointer h-8"
         onClick={handleRemoveItem} />
      </div>
    </div>
  )
}

export default CartItem
