import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'

const Star = ({ stars, reviews }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5 ;

        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <FaStar size="1.8rem" className='fill-orange-500'/>
                ): stars >= number ? (
                    <FaStarHalfAlt size="1.8rem" className='fill-orange-500'/>
                ):(
                    <AiOutlineStar size="1.8rem" className='fill-orange-500'/>
                )}
            </span>
          )
    })
return (
    <div>
        <div className=''>
           <div className='flex '>
            {ratingStar }
           </div>
            <p className='font-semibold'>{reviews} customers reviews</p>
        </div>
    </div>
)

}

export default Star
