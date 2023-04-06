import React from 'react'
import { useProductContext } from '../context/ProductContext'
import Product from './Product';

const FootStyle = () => {
    const { isLoading, footStyleProducts } = useProductContext();

    if(isLoading) {
        return <div className='text-center text-2xl mt-48 font-bold'>
            .......Loading
            </div>
    }

  return (
    <div className='h-[25rem] bg-gray-100 mt-4'>
        <div className='flex justify-evenly items-center pt-2'>
            <div className='mx-10'>
                <div>
                    <img 
                    className='w-[15rem]'
                    src="images/sale2.PNG" 
                    alt="logo" 
                    />
                </div>
            </div>
            <div className='grid grid-cols-5 gap-5 place-items-center mt-8'>
                {
                    footStyleProducts.map((curElem) => {
                        return <Product key={curElem.id} {...curElem}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default FootStyle