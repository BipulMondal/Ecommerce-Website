import React from 'react'

const Footer = () => {
  return (
    <div className='text-white'>
       <div className='px-24 py-8 grid grid-cols-3 gap-6 bg-cyan-900 '>
            <div>
                <h3 className='font-bold text-xl pb-6'>Get Know About Us</h3>
                <p>About Us</p>
                <p>Careers</p>
            </div>
            <div>
                <h3 className='font-bold text-xl  pb-6'>Connect with us</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instagram</p>
            </div>
            <div>
                <h3 className='font-bold text-xl  pb-6'>Let Us Help You</h3>
                <p>Your Acount</p>
                <p>Returns Center</p>
                <p>100% Purchase Protection</p>
                <p>Help</p>
            </div>
       </div>
       <div className='flex flex-col items-center justify-center py-8 bg-sky-950 '>
            <div className='space-x-6'><span>Condition of Use & Sale</span><span>Privacy Notice</span><span>Interested-Based Ads</span></div>
            <p>©1990-{new Date().getFullYear()}, eKart.com All rights reserved</p>
       </div>
    </div>
  )
}

export default Footer