import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { IoTimeSharp } from 'react-icons/io5'
const ProductList = () => {
    const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8080`)
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='flex-auto w-full border h-full border'>
        {/* table */}
       
            <table class="w-full text-sm text-left rtl:text-right">
                <thead class="text-xs text-black-700 uppercase ">
                    <tr><th scope="col" class="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sold
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4">
                            1
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            Nike Air force 1 LV8
                        </th>
                        <td class="px-6 py-4">
                            <img className='w-[100px] h-[100px] object-contain border' src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/26c4c580-6ac0-4727-8bab-5a0cb98be03a/air-force-1-lv8-older-shoes-DZw05k.png'></img>
                        </td>
                        <td class="px-6 py-4">
                            34, 35 , 36
                        </td>
                        <td class="px-6 py-4">
                            Air force 1
                        </td>
                        <td class="px-6 py-4">
                            $2000
                        </td>
                        <td class="px-6 py-4">
                            21
                        </td>
                        <td class="px-6 py-4">
                            100
                        </td>
                    </tr>

                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4">
                            1
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            Nike Air force 1 LV8
                        </th>
                        <td class="px-6 py-4">
                            <img className='w-[100px] h-[100px] object-contain border' src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/26c4c580-6ac0-4727-8bab-5a0cb98be03a/air-force-1-lv8-older-shoes-DZw05k.png'></img>
                        </td>
                        <td class="px-6 py-4">
                            34, 35 , 36
                        </td>
                        <td class="px-6 py-4">
                            Air force 1
                        </td>
                        <td class="px-6 py-4">
                            $2000
                        </td>
                        <td class="px-6 py-4">
                            21
                        </td>
                        <td class="px-6 py-4">
                            100
                        </td>
                    </tr>

                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4">
                            1
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            Nike Air force 1 LV8
                        </th>
                        <td class="px-6 py-4">
                            <img className='w-[100px] h-[100px] object-contain border' src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/26c4c580-6ac0-4727-8bab-5a0cb98be03a/air-force-1-lv8-older-shoes-DZw05k.png'></img>
                        </td>
                        <td class="px-6 py-4">
                            34, 35 , 36
                        </td>
                        <td class="px-6 py-4">
                            Air force 1
                        </td>
                        <td class="px-6 py-4">
                            $2000
                        </td>
                        <td class="px-6 py-4">
                            21
                        </td>
                        <td class="px-6 py-4">
                            100
                        </td>
                    </tr>

                    <tr class="bg-white border-b ">
                        <td class="px-6 py-4">
                            1
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                            Nike Air force 1 LV8
                        </th>
                        <td class="px-6 py-4">
                            <img className='w-[100px] h-[100px] object-contain border' src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/26c4c580-6ac0-4727-8bab-5a0cb98be03a/air-force-1-lv8-older-shoes-DZw05k.png'></img>
                        </td>
                        <td class="px-6 py-4">
                            34, 35 , 36
                        </td>
                        <td class="px-6 py-4">
                            Air force 1
                        </td>
                        <td class="px-6 py-4">
                            $2000
                        </td>
                        <td class="px-6 py-4">
                            21
                        </td>
                        <td class="px-6 py-4">
                            100
                        </td>
                    </tr>
                </tbody>
            </table>
        {/* end table */}
    </div>
)
}

export default ProductList