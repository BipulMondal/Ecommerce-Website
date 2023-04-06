import React from 'react'
import Product from './Product'

const GridView = ({ products }) => {

  return (
    <div className='mt-6'>
      <div className='grid grid-cols-4 gap-4'>
        {
            products.map((curElem) => {
                return <Product key={curElem.id} { ...curElem} />
            })
        }
      </div>
    </div>
  )
}

export default GridView
