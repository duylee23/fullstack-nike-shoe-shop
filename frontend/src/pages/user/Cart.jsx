import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../utils/icons'
import { useState, useEffect } from 'react'
import { increaseQuantity, decreaseQuantity, fetchUserCart, addSelectedCartItems } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import Checkbox from "react-custom-checkbox";
import { FaRegWindowClose } from 'react-icons/fa'
import axios from 'axios'
import Cookies from 'js-cookie'

const Cart = () => {
    const { user_cart } = useSelector(state => state.users)
    const { IoIosRemoveCircleOutline, IoIosAddCircleOutline, FaCheck } = icons
    const dispatch = useDispatch()
    const [isFixed, setIsFixed] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [checked, setChecked] = useState(false)
    const email = Cookies.get('user_email')
    //handle scrolling
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById('footer');
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (footerTop <= windowHeight) {
                setIsFixed(false);
            } else {
                setIsFixed(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        const newTotalCost = selectedProducts.reduce((total, item) => total + (item.quantity * item.product?.price), 0)
        setTotalCost(newTotalCost)

    }, [selectedProducts])

    const handleCheckboxChange = (isChecked, item) => {
        if (isChecked) {
            setSelectedProducts([...selectedProducts, item])
        } else {
            setSelectedProducts(selectedProducts.filter(product => product.id !== item.id))
        }
    }

    const updateSelectedProducts = (index, changeNumber) => {
        const updatedCartDetail = user_cart.cart_detail?.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + changeNumber }
            }
            return item
        })
        setSelectedProducts(updatedCartDetail.filter(item => selectedProducts.some(selected => selected.product?.id === item.product?.id)));
    }



    const handleIncreaseQuantity = (index) => {
        dispatch(increaseQuantity(index))
        updateSelectedProducts(index, 1);

    }

    const handleDecreaseQuantity = (index) => {
        dispatch(decreaseQuantity(index));
        updateSelectedProducts(index, - 1);
    };

    const handleChooseAll = (isChecked) => {
        if(isChecked) {
            setSelectedProducts(user_cart.cart_detail)
            setChecked(true)
        } else {
            setSelectedProducts([])
            setChecked(false)
        }
    }

    const handleDeleteCartItem = async (id) => {
        try{
            const res = await axios.delete(`http://localhost:8080/user/delete-cart/${id}`) 
            if (res.status === 204) {
                                console.log('delete successfully')
                                dispatch(fetchUserCart(email))
                            } else {
                                throw new Error('failed to delete product')
                            }
        } catch (error) {
            console.log(error)
        }
 
    }

    // const handleDeleteProduct = (id) => {
    //     axios.delete(`http://localhost:8080/admin/product/delete/${id}`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    //         }
    //     })
    //         .then(response => {
    //             if (response.status === 204) {
    //                 console.log('delete successfully')
    //                 setProducts(products.filter(product => product.id !== id));
    //             } else {
    //                 throw new Error('failed to delete product')
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error deleting product:', error);
    //         })
    // }

    const handlePurchase = () => {
       dispatch(addSelectedCartItems(selectedProducts))
    }


    return (
        <div className='px-[50px] border my-20 w-full flex flex-col relative'>
            {/* table */}
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-black-700 uppercase ">
                    <tr>

                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {user_cart?.cart_detail?.map((item, index) => (
                        <tr key={index} className="border-b w-200">
                            <td className=" flex items-center gap-4 py-10">
                                <Checkbox
                                    checked = {checked}
                                    borderColor="#ff6501"
                                    size={25}
                                    icon={<FaCheck />}
                                    className='input'
                                    onChange={(isChecked) => handleCheckboxChange(isChecked, item)}
                                />
                                <img className=' rounded w-[120px] h-[120px] cursor-pointer object-contain group-hover:opacity-20 duration-500 group'
                                    src={`http://localhost:8080/user/product/image/${item.product?.image}`} />
                                {item.product?.name}
                            </td>
                            <td className="px-6 py-4">
                                $ {item.product?.price}
                            </td>
                            <td className=" py-4">
                                <div className=' flex items-center justify-between w-[50%] '>
                                    {item.quantity === 1 ? 
                                    (<IoIosRemoveCircleOutline size={40} className='opacity-10' />) 
                                    : (<IoIosRemoveCircleOutline size={40} onClick={() => handleDecreaseQuantity(index)} className='cursor-pointer'/>)
                                    }
                                    
                                    {item.quantity}
                                    <IoIosAddCircleOutline size={40} onClick={() => handleIncreaseQuantity(index)} className='cursor-pointer' />
                                </div>
                            </td>
                            <td className="px-6 py-4 text-textOrange bold">
                                $ {item.quantity * item.product?.price}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleDeleteCartItem(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={`w-full h-[100px] bg-[#333] transition-all duration-300 flex text-white items-center justify-around
                         ${isFixed ? 'sticky bottom-0 ':''}`}>
                <Checkbox
                    className='input'
                    name="my-input"
                    borderColor="#ff6501"
                    label="Choose all products"
                    size={30}
                    icon={<FaCheck />}
                    onChange= {(isChecked) => handleChooseAll(isChecked)}
                />

                <span className='cursor-pointer'>Delete</span>
                <span> Total cost  ({selectedProducts.length} products) : <span className=" text-3xl text-textOrange">$ {totalCost}</span>
                </span>
                <div>
                    <Link className='h-10 border py-4 px-10 rounded-lg border-borderOrange hover:bg-bgOrange' onClick={handlePurchase} to="/user/purchase">BUY</Link>
                </div>
            </div>
        </div>
    )
}

export default Cart