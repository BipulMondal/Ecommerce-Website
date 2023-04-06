import React, { useState, useEffect } from 'react'
import { BsLightning } from 'react-icons/bs'
import { NavLink } from 'react-router-dom';

const MyImage = ({ imgs, product }) => {
    // console.log(product)

    const [mainImage, setMainImage] = useState(imgs && imgs.length > 0 ? imgs[0] : null);


    const handleOrder = () => {
       let cart = localStorage.getItem('cart');
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    useEffect(() => {
        // Update mainImage state when imgs prop changes
        if (imgs && imgs.length > 0) {
          setMainImage(imgs[0]);
        }
      }, [imgs]);
    

  return (
   <div>
        <div className='flex space-x-16'>
            <div className='h-[25rem] w-[5rem] space-y-3 border border-inherit flex flex-col items-center'>
                {imgs && imgs.map((curElem, index) => {
                    return (
                        <figure  key={index}>
                            <img 
                                src={curElem}
                                alt={curElem} 
                                className="h-16 w-12 hover:border-2 hover:border-blue-500 cursor-pointer"
                                onClick={() => setMainImage(curElem)}
                            />
                        </figure>
                        )
                    })  
                }
            </div>
        {/* second column */}
            <div className='h-[25rem] w-[20rem] flex justify-center items-center border border-inherit'>
                <img 
                src={mainImage} 
                alt={mainImage}
                className="h-[20rem] w-[16rem] "
                />
            </div>
        </div>
        <div className='flex justify-around h-[4rem] mt-4'>
           <NavLink to={"/createorder"}>
           <button
                className='flex h-[4rem] w-[14rem] ml-16 bg-red-500 items-center justify-center text-2xl font-bold text-white'
                onClick={handleOrder}
            >
                <BsLightning className='fill-yellow-300'/> Buy Now
            </button>
           </NavLink>
        </div>
   </div>
    
  )
}

export default MyImage;
