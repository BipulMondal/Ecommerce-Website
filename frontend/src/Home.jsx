import React from 'react'
import ApplianceProducts from './components/ApplianceProducts'
import FeaturedProducts from './components/FeaturedProducts'
import FootStyle from './components/FootStyle'
import Header from './components/Header'
import Starting149 from './components/Starting149'
import BabyToy from './components/BabyToy'

const Home = () => {
 

  return (
    <div>
      <Header />
      <div>
        <img 
        className='w-full h-[15rem]'
        src="images/sale.jpg" 
        alt="logo" 
        />
      </div>
      <FootStyle />
      <FeaturedProducts/>
      <ApplianceProducts />
      <Starting149 />
      <BabyToy />
    </div>
  )
}

export default Home
