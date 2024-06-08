import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Slider, ProductItem } from '../../components'
import { Link } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    const getProducs = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/`)
        setData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducs()
  }, [])

  return (
    <div className='px-[50px]'>
      <Slider />
      <div className='flex justify-between w-full border my-8 text-white font-semibold bg-[#333] rounded-full px-8 py-[2px]'>
        <span>Our products</span>
        <Link to='/user/products' className='underline'>See more</Link>
      </div>
      <div className='grid grid-cols-4 gap-8 w-full'>
        {
          data?.map((item, index) => (
            <ProductItem
              key={index}
              data={item}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home