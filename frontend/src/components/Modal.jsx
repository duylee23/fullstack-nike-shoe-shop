import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setIsModalShown } from '../redux/slices/productSlice';
import axios from 'axios';
import Cookies from 'js-cookie'
import { fetchUserCart } from '../redux/slices/userSlice';

const Modal = () => {
    const dispatch = useDispatch();
    const {data, isModalShown} = useSelector(state => state.product)
    const [selectedSize, setSelectedSize] = useState(null)
    const user_email = Cookies.get("user_email")
    const onClose = () => {
        dispatch(setIsModalShown(false))
        setSelectedSize(null)
    }
    const handleChooseSize = (size) => {
        setSelectedSize(size.sizeNumber)
    }
    const handleAddToCart = async (id) => {
            try {
                const res = await axios.post(`http://localhost:8080/user/add-product-to-cart/${id}`,null, {
                    params: { 
                        email: user_email,
                        size: selectedSize
                    }
                })
                dispatch(fetchUserCart(user_email))
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50  ${isModalShown ? '' : 'hidden' }`}>
            <div className="bg-white rounded-lg p-4 w-[40%] h-[50%]">
                <h2 className="text-lg font-semibold text-center mb-6">Please choose product's size before adding to cart</h2>
                <img className='w-[50%] h-[200px] cursor-pointer object-cover m-auto'
                    src= {`http://localhost:8080/user/product/image/${data?.image}`} ></img>
                <div className='flex flex-col items-center mt-2'>
                    <span className='italic'>{data?.name}</span>
                    <span className='font-bold text-textOrange'>{data?.price}</span>          
                </div>          
                          
                <div className="flex gap-2 justify-center">
                    {data?.sizes.map((size, index) => (
                        <span 
                            key={index} 
                            className={`${selectedSize === size.sizeNumber ? "bg-bgOrange text-white border-none" : ''} border border-[#333] rounded-full px-2 py-1 cursor-pointer`}
                            onClick={() => handleChooseSize(size)}
                        >
                            {size.sizeNumber}
                        </span>
                    ))}
                </div>
                <div className='flex justify-end gap-3 mt-6 mr-2'>
                    <button className="mt-4 px-4 py-2 border border-[#333] rounded hover:text-white hover:bg-[#333]" onClick={onClose}>Close</button>
                    <button disabled={selectedSize === null} className="mt-4 px-4 py-2 border border-borderOrange rounded hover:bg-bgOrange hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleAddToCart(data.id)}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Modal