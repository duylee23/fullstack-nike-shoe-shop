import axios from 'axios'
import React, { useState } from 'react'
import {ProductItem} from '../../components'
import icons from '../../utils/icons'
const ProductsShow = () => {
  const {MdKeyboardArrowDown} = icons
  const [products,setProducts] = useState([])
  useState(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/`)
        setProducts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  console.log(products)

  return (
    <div className='px-[50px] mt-40'>
      <div className='w-full border h-20 flex items-center justify-around'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <span>Size</span>
          <MdKeyboardArrowDown size={24}/> 
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <span>Price</span>
          <MdKeyboardArrowDown size={24}/> 
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <span>Showing...products</span>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <span>Short by...</span>
          <MdKeyboardArrowDown size={24}/> 
        </div>

      </div>
    <div className='grid grid-cols-4 gap-8 w-full'>
      {products.map((item, index) => (
        <ProductItem data = {item}/>
      ))}
    </div>
    </div>

  )
}

export default ProductsShow
