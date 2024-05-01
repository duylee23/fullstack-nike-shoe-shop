import React, { useEffect, useState } from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
const ProductItem = ({data}) => {
    const {BsCartPlus, FaRegEye} = icons
  return (
      <div>
              <div className='h-[500px] w-full border rounded-lg flex flex-col relative' > 
                  <div className='group'>
                      <img className='w-full h-[400px] cursor-pointer object-cover group-hover:opacity-20 duration-500 group'
                          src= {`http://localhost:8080/user/product/image/${data.image}`} ></img>
                      <div className='h-10 w-[20%] absolute cursor-pointer text-[#333] top-[40%] left-[40%] flex  gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <span className='text-3xl  hover:text-textOrange'><BsCartPlus /></span>
                          <span className='text-3xl hover:text-textOrange'>
                              <Link to='/user/product/{id}' data ={data}>
                                  <FaRegEye />
                              </Link>
                          </span>
                      </div>
                  </div>
                  <div className='flex flex-col p-2'>
                      <span className='cursor-pointer font-semibold text-lg hover:text-textOrange '>{data.name}</span>
                      <span>Air Force 1 shoe</span>
                      <span className='font-semibold text-textOrange'>$ {data.price}</span>
                  </div>
              </div>
      </div>
  )
}
export default ProductItem