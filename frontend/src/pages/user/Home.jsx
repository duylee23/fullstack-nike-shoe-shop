import React from 'react'
import { Slider, ProductItem } from '../../components'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='px-[50px]'>
      <Slider/>
      <div className='flex justify-between w-full border my-8 text-white font-semibold bg-[#333] rounded-full px-8 py-[2px]'>
        <span>Our products</span>
        <Link to='/user/products' className='underline'>See more</Link>
      </div>
      <div className='grid grid-cols-4 gap-8 w-full'>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
      </div>
    </div>
  )
}

export default Home