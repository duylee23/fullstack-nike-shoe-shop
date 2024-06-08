import React, { useState } from 'react'
import { useEffect } from 'react';
import Magnifier from 'react-magnifier';
import icons from '../../utils/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import banner_image from '../../assets/images/Nike_banner.jpg'

const ProductDetail = () => {
  const navigate = useNavigate()
  const { FaCircleArrowLeft } = icons
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const handleChooseSize = (size) => {
    setSelectedSize((prevSize) => prevSize === size ? '' : size)
  };
  console.log(selectedSize)
  const { data } = useSelector(state => state.product)

  return (
    <div className='mt-[60px] px-[50px] mx-auto relative bg-[#f2f2f2]'>
      <div className=' cursor-pointer mt-20 hover:text-textOrange absolute' onClick={() => navigate("/")}>
        <FaCircleArrowLeft size={40} />
      </div>
      <img src={banner_image} className=' mx-auto h-[300px] object-contain'></img>
      <div className='flex mx-auto justify-between w-[70%] my-10 px-[35px]'>
        <Magnifier className=' h-[500px] object-cover rounded-lg border overflow-hidden' width={500} zoomFactor={1}
          src={`http://localhost:8080/user/product/image/${data.image}`}></Magnifier>
        <div className='flex w-[50%] flex-col gap-8' >
            <span className='font-bold text-2xl'>{data?.name}</span>
            <span className='font-bold'>$ {data?.price}</span>
            <span className='italic opacity-90'>{data?.description}</span>
            <span className='flex gap-2 font-semibold'>
              {data?.sizes?.map((size, index) => (
                <span onClick={() => handleChooseSize(size.sizeNumber)} className={` ${selectedSize == size.sizeNumber ? 'bg-bgOrange text-white' : ''} border border-borderOrange rounded-full px-1 cursor-pointer hover:bg-bgOrange hover:text-white`}>
                  {size.sizeNumber}
                </span>
              ))}
            </span>
          <div className=' border flex justify-around gap-4 font-semibold text-lg'>
            <button className='border border-[2px] flex-1 border-borderOrange rounded-lg p-4 hover:bg-bgOrange hover:text-white duraion-300 '>Add to cart</button>
            <Link className='border border-[2px] flex-1 border-borderOrange rounded-lg p-4 hover:bg-bgOrange hover:text-white duraion-300 text-center' to="/user/purchase">Buy now</Link>
          </div>
          <span className='italic opacity-80'>Please firstly add the product to your cart if you want to buy a larger quantity.</span>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail
