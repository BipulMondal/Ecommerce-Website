import React from 'react'
import { useFilterContext } from '../context/FilterContext';
import { FaCheck } from 'react-icons/fa'
import FormatPrice from '../helpers/FormatPrice'


const FilterSection = () => {
    const {
        filters: { text, color, price, maxPrice, minPrice},
        all_products,
        updateFilterValue,
        clearFilters
    } = useFilterContext();

    //to get the unique data of each fields
    const getUniqueData = (data, attr) => {
        let newVal = data.map((curElem) => {
            return curElem[attr]
        });

        if(attr === 'colors') {
            newVal = newVal.flat();
        }
        return (newVal = ["All", ...new Set(newVal)]);
    }

    //we need unique data
    const categoryData = getUniqueData(all_products, "category")
    const companyData = getUniqueData(all_products, "company")
    const colorsData = getUniqueData(all_products, "colors")
    // console.log(colorsData)

  return (
    <div className='ml-10'>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
            <input 
            type="text"
            name='text'
            value={text}
            placeholder='Search'
            autoComplete='off'
            className='w-[16rem] border-2 border-gray-300 focus:outline-none mt-6'
            onChange={updateFilterValue}
             />
        </form>
      </div>

        {/* category */}
      <div className='mt-4'>
        <h3 className='text-xl font-semibold'>Category</h3>
        <form action="">
        <select name="category" id="category" onClick={updateFilterValue}>
                {
                    categoryData.map((curElem, index) => {
                        return (
                            <option 
                            key={index}
                            value={curElem} 
                            name="category"
                            >
                                {curElem}
                            </option>
                        )
                    })
                }
            </select>
        </form>
      </div>

        {/* company */}
      <div className='mt-4'>
        <h3 className='text-xl font-semibold'>Company</h3>
        <form action="#">
            <select name="company" id="company" onClick={updateFilterValue}>
                {
                    companyData.map((curElem, index) => {
                        return (
                            <option 
                            key={index}
                            value={curElem} 
                            name="company"
                            >
                                {curElem}
                            </option>
                        )
                    })
                }
            </select>
        </form>
      </div>

        {/* colors */}
        <div className='mt-4'>
            <h3 className='text-xl font-semibold'>Colors</h3>
            <div className='grid grid-cols-7 gap-1 '>
               {colorsData.map((curColor, index) => {
                if(curColor === "All"){
                    return (
                        <button
                        key={index}
                        type='button'
                        name='color'
                        value={curColor}
                        onClick={updateFilterValue}
                        >
                            All
                        </button>
                    )
                }
               return(
                <button
                    key={index}
                    type='button'
                    name='color'
                    value={curColor}
                    style={{backgroundColor : curColor}}
                    className='h-[1.2rem] w-[1.2rem] rounded-full ml-2'
                    onClick={updateFilterValue}
                    >   
                        {color === curColor ? <FaCheck /> : null}
                    </button>
               )
               })
            }
            </div>
        </div>

        {/* price */}
        <div className='mt-4'>
            <h3 className='text-xl font-semibold'>Price</h3>
            <p><FormatPrice price={price} /></p>
            <input 
            type="range"
            name='price'
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={updateFilterValue}
             />
        </div>

        {/* clear filter */}
        <div>
            <button 
            className='h-[3rem] w-[12rem] bg-red-700 text-white text-2xl font-semibold mt-4'
            onClick={clearFilters}>
                Clear Filter
            </button>
        </div>
    </div>
  )
}

export default FilterSection
