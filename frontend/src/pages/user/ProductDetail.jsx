import React, { useState } from 'react'
import { useEffect } from 'react';
import Magnifier from 'react-magnifier';
const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const [selectedSize, setSelectedSize] = useState('')
  const handleChooseSize = (size) => {
    setSelectedSize((prevSize) => prevSize === size ? '' : size)
  };
  return (
    <div className='mt-[60px] px-[50px] flex  justify-between w-full'>
      <Magnifier className=' mt-[120px] h-[500px] object-cover border border-4 rounded-lg border-black' width={500} zoomFactor={1}
        src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png'></Magnifier>
      <div className='flex flex-col w-[60%] mt-[120px] gap-8' >
        <span className='font-bold text-2xl'>Nike Air Force 1 High By You</span>
        <span className='font-bold'>$ 2000</span>
        <span className='italic opacity-90'>Let your design shine in satin, keep it classic in canvas, and get luxe with leather. No matter what you choose, these AF1s are all about you. 12 classic color choices and an additional gum option for the sole mean your shoe is destined to be one of a kind, just like you.</span>
        <span className='flex gap-2'>
          <span onClick={() => handleChooseSize(41)} className={`${selectedSize === 41 ? 'bg-bgOrange text-white' : ''} border rounded-full border-borderOrange hover:bg-bgOrange hover:text-white cursor-pointer px-1`}>41</span>
          <span onClick={() => handleChooseSize(42)} className={`${selectedSize === 42 ? 'bg-bgOrange text-white' : ''} border rounded-full border-borderOrange hover:bg-bgOrange hover:text-white cursor-pointer px-1`}>42</span>
          <span onClick={() => handleChooseSize(43)} className={`${selectedSize === 43 ? 'bg-bgOrange text-white' : ''} border rounded-full border-borderOrange hover:bg-bgOrange hover:text-white cursor-pointer px-1`}>43</span>
        </span>
        <div className='flex justify-center gap-4 font-semibold text-lg'>
          <button className='border border-[2px] border-borderOrange rounded-lg p-4 hover:bg-bgOrange hover:text-white duraion-300 '>Add to cart</button>
          <button className='border border-[2px] border-borderOrange rounded-lg p-4 hover:bg-bgOrange hover:text-white duraion-300 '>Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
