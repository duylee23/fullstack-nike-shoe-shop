import React from 'react'
import { Slider } from '../../components'
import ProductList from '../../components/ProductList'
const Home = () => {
  return (
    <div className='px-[50px]'>
      <Slider/>
      <ProductList/>
    </div>
  )
}

export default Home