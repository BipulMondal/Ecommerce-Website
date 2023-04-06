import React from 'react'
import ProductList from './components/ProductList'
import FilterSection from './components/FilterSection'
import Sort from './components/Sort'

const Products = () => {


  return (
    <div className='bg-gray-100'>
      <div className='flex justify-between mt-4 pt-4 space-x-4' >
        <div className='w-1/4 ml-10'>
          <FilterSection />
        </div>
        <section className='w-3/4'>
          <div className='mr-10'>
            <Sort />
          </div>
          <div>
            <ProductList />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Products
