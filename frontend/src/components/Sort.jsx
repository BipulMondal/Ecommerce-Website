import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import { BsFillGridFill, BsList} from 'react-icons/bs'

const Sort = () => {
    const { filter_products, setGridView, setListView, sorting } = useFilterContext()
  return (
    <div className='flex justify-between mt-6'>
        {/* 1st column */}
        <div className='space-x-4'>
            <button
            className=''
            onClick={setGridView}>
                <BsFillGridFill />
            </button>
            <button
            className=''
            onClick={setListView}>
                <BsList />
            </button>
        </div>

        {/* 2nd column */}
        <div>
            <p>{`${filter_products.length} Product Available`}</p>
        </div>

        {/* 3rd column */}
        <div>
            <form action="#">
                <label htmlFor="sort"></label>
                <select 
                name="sort" 
                id="sort"
                onClick={sorting}
                >
                    <option value="lowest">Price(lowest)</option>
                    <option value="#" disabled></option>
                    <option value="highest">Price(highest)</option>
                    <option value="#" disabled></option>
                    <option value="a-z">Price(a-z)</option>
                    <option value="#" disabled></option>
                    <option value="z-a">Price(z-a)</option>
                    <option value="#" disabled></option>
                </select>
            </form>
        </div>
    </div>
  )
}

export default Sort