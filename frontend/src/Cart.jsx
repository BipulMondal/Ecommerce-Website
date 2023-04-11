import React, {useEffect} from 'react'
import { useCartContext } from './context/CartContext'
import { NavLink } from 'react-router-dom';
import FormatPrice from './helpers/FormatPrice';
import CartItem from './components/CartItem'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Cart = () => {
    const { cart, clearCart, total_price, shipping_fee } = useCartContext();
    const navigate = useNavigate();

    const API = "http://localhost:4000/api/v1/orders"
  
    const handleOrder = async () => {
      const token = localStorage.getItem("token");
      let user = null;
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      if(token) {
        //if user logged in. get user total details from localstorage
        user = JSON.parse(localStorage.getItem('user'));
      }

      if (!user) {
        navigate("/createorder")
        return 
      }
      
  
      if(user) {
        const order = {
          userId: user._id,
          totalPrice: total_price,
          shipping_fee: shipping_fee,
          order_date: new Date().toISOString(),
        }
    
        try {
            const response = await axios.post(API, order, config);
            console.log(response.data); // handle response data here

            alert("Order Successfull")

            clearCart();
        } catch (error) {
            console.log(error); // handle error here
            alert("Order Unsuccessfull")
        }
    
      }
  
    }

    const handleClearCart = async () => {
        const token = localStorage.getItem("token")
        await axios.delete("http://localhost:4000/api/v1/cartItems", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
        clearCart();
    }
    useEffect(() => {
        if(!localStorage.getItem("token")) {
          navigate("/login")
        }
      },[navigate]) 

    if(cart.length === 0) {
        return (
            <div className='h-screen flex justify-center items-center bg-gray-300'>
                <h3 className='text-4xl font-semibold text-blue-500'>No Item in Cart</h3>
            </div>
        )
    }
   

  return (
    <div>
        <div className='px-6 flex'>
           <div className='w-5/6 border-2 border-gray-200'>
           <div className='grid grid-cols-5 text-center text-xl font-semibold text-blue-500'>
                <p>Item</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
                <p>Remove</p>
            </div>
            <hr/>

            <div>
                {
                    cart.map((curElem) => {
                        return <CartItem key={curElem.id} {...curElem} />
                    })
                }
            </div>
            <hr />

            <div className='flex justify-between px-12 text-xl text-white font-bold '>
                <NavLink to={"/products"}>
                    <button
                    className='h-[3rem] w-[14rem] bg-red-700 hover:bg-white hover:text-red-700 hover:border-2 border-red-700 mt-6 hover:rounded-full'
                    >
                        Continue Shopping
                    </button>
                </NavLink>
                <button 
                className='h-[3rem] w-[10rem] bg-red-700 hover:bg-white hover:text-red-700 hover:border-2 border-red-700 mt-6 hover:rounded-full'
                onClick={handleClearCart}>
                    Clear Cart
                </button>
            </div>
           </div>

            {/* order total amount */}
            <div className='mt-10 w-1/6 h-[30rem] w-[15rem]'>
                <div className='w-full flex flex-col ml-2'>
                    <div className='flex justify-between border-2 border-gray-200'>
                        <p className='text-xl'>Subtotal: </p>
                        <p>
                            <FormatPrice price={total_price}/>
                        </p>
                    </div>
                    <div className='flex justify-between border-2 border-gray-200'>
                        <p className='text-xl'>Shipping fee: </p>
                        <p><FormatPrice price={shipping_fee}/> </p>
                    </div>
                    <div className='flex justify-between border-2 border-gray-200 mt-4'>
                        <p className='text-xl'>Order Total : </p>
                        <p><FormatPrice price={shipping_fee + total_price}/> </p>
                    </div>
                    <div className=''>
                    <button 
                    onClick={handleOrder}
                    className='h-[3rem] w-[10rem] mt-6 bg-red-500'>
                        Place Order
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart