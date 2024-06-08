import React, { useEffect, useState } from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchUserCart } from '../redux/slices/userSlice'
import { setProduct } from '../redux/slices/productSlice'

const ProductItem = ({data}) => {
    const {BsCartPlus, FaRegEye} = icons
    const user_email = Cookies.get("user_email")
    const {isLoggedIn} = useSelector(state => state.users)
    const dispatch = useDispatch();

    const handleAddtoCart =  async (id) => {
        if (isLoggedIn) {
            try {
                const res = await axios.post(`http://localhost:8080/user/add-product-to-cart/${id}`,null, {
                    params: { email: user_email}
                })
                console.log(res.data);
                dispatch(fetchUserCart(user_email))
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        } else {
            alert("you must loggin before adding product to cart!")
        }
    }
  
  return (
      <div>
              <div className='h-[520px] w-full border rounded-lg flex flex-col relative' > 
                  <div className='group'>
                      <img className='w-full h-[400px] cursor-pointer object-cover group-hover:opacity-20 duration-500 group'
                          src= {`http://localhost:8080/user/product/image/${data.image}`} ></img>
                      <div className='h-10 w-[20%] absolute cursor-pointer text-[#333] top-[40%] left-[40%] flex  gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <span className='text-3xl  hover:text-textOrange' ><BsCartPlus onClick={() => handleAddtoCart(data.id)}/></span>
                          <span className='text-3xl hover:text-textOrange'>
                              <Link to='/user/product/{id}' onClick={() => dispatch(setProduct(data))}>
                                  <FaRegEye />
                              </Link>
                          </span>
                      </div>
                  </div>
                  <div className='flex flex-col p-2'>
                      <span className='cursor-pointer font-semibold text-lg hover:text-textOrange '>{data.name}</span>
                      <div className='flex gap-2'>
                        {data.sizes?.map((size, index) => (
                            <span key={index} className='border border-[#333] my-2 rounded-full px-1'>
                                {size.sizeNumber}
                            </span>
                        ))}
                      </div>
                      <span className='font-semibold text-textOrange'>$ {data.price}</span>
                  </div>
              </div>
      </div>
  )
}
export default ProductItem