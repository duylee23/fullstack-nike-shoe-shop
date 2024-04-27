import React from 'react'
import icons from '../utils/icons'
const ProductItem = () => {
    const {BsCartPlus, FaRegEye} = icons
  return (
    <div className='h-[500px] w-full border rounded-lg flex flex-col relative'>
        <div className='group'>
            <img className='w-full h-[400px] cursor-pointer object-cover group-hover:opacity-20 duration-500 group'  
            src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png'></img>
            <div className='h-10 w-[20%] absolute cursor-pointer text-[#333] top-[40%] left-[40%] flex  gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <span className='text-3xl  hover:text-textOrange'><BsCartPlus/></span>
                <span className='text-3xl hover:text-textOrange'><FaRegEye /></span>
            </div>
        </div>
        <div className='flex flex-col p-2'>
            <span className='cursor-pointer font-semibold text-lg hover:text-textOrange '>Nike Air Force 1 High By You</span>
            <span>Air Force 1 shoe</span>
            <span className='font-semibold text-textOrange'>$ 2000</span>
        </div>
    </div>
  )
}

export default ProductItem