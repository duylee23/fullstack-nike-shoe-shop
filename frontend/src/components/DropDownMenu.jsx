import React, { useState, useRef, useEffect } from 'react'
import icons from '../utils/icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setLoggin, resetUserCart } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';

const DropDownMenu = ({ isLoggedIn }) => {
    const dispatch = useDispatch()
    const { CiUser, CiShoppingCart } = icons
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
    const token = Cookies.get('token')
    const user_email = Cookies.get("user_email")
    const [isMouseEnter, setIsMouseEnter] = useState(false)
    const { user_cart } = useSelector(state => state.users)

    // for clicking dropdown menu
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, []);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    };

    const handleToast = () =>
        toast("Logout successfully", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });


    const handleLogout = async () => {
        try {
            // Make an API call to logout the user
            await axios.get('http://localhost:8080/auth/logout',
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                }
            )
            Cookies.remove('token');
            Cookies.remove('username')
            dispatch(setLoggin(false))
            dispatch(resetUserCart())
            navigate('/login');
            handleToast()
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleViewCart = () => {
        console.log('items')
        console.log(user_cart)
    }

    const handleMouseEnter = async () => {
        setIsMouseEnter(true)
    }

    const handleMouseLeave = () => {
        setIsMouseEnter(false)
    }

    return (
        <div className="user-icon-wrapper relative " ref={dropdownRef}>
            {isLoggedIn ? (
                <>
                    <div className='flex items-center gap-2'>
                        <a onClick={toggleDropdown} className='cursor-pointer hover:text-textOrange '>{Cookies.get('username')}</a>
                        <div className=' relative hover:text-textOrange' onClick={handleViewCart}>
                                <Link to='/user/user-cart' className='group'>
                                    <CiShoppingCart size={28} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                                    <span className='absolute top-[-10px] right-[-15px] border rounded-full bg-[#333] text-white text-sm px-[6px] group-hover:bg-bgOrange'>{user_cart?.cart_detail.length}</span>
                                </Link>
                            {isMouseEnter ? (
                                <div className='flex flex-col border bg-white shadow rounded absolute h-[400px] w-[400px] text-black right-0 pt-4' onMouseEnter={() => setIsMouseEnter(true)} onMouseLeave={handleMouseLeave}>
                                    {user_cart?.cart_detail?.slice(-4).reverse().map((item, index) => (
                                        <div key={index} className='p-2 cursor-pointer flex h-16 justify-between hover:bg-bgOrange hover:text-white duration-300'>
                                            <div className='flex gap-2'>
                                                <img className=' rounded w-[50px] h-[50px] cursor-pointer object-contain group-hover:opacity-20 duration-500 group'
                                                    src={`http://localhost:8080/user/product/image/${item?.product?.image}`} ></img>
                                                <span className='text-sm'>
                                                    {item?.product?.name}
                                                </span>
                                            </div>
                                            <span className='justify-items-end  text-sm mr-0'>
                                                ${item?.product?.price}
                                            </span>
                                        </div>
                                    ))}
                                    <div className='flex items-center p-2 justify-between '>
                                        <h3 className='text-sm opacity-50 self-end'>{user_cart?.cart?.sum} products added to cart </h3>
                                        <Link to="/user/user-cart" className='px-4 py-2 mt-4 border rounded hover:bg-bgOrange hover:text-white'>View cart</Link>
                                    </div>
                                </div>
                            ) : (<div className='hidden'></div>)
                            }
                        </div>
                    </div>
                    <div className={`border rounded-md h-26 flex flex-col py-4 justify-center items-center bg-bgOrange absolute
                    ${showDropdown ? 'block' : 'hidden'}`} ref={dropdownRef}>
                        <Link className="text-white mb-2 cursor-pointer px-6 w-full hover:bg-[#333]" to="/profile">Profile</Link>
                        <Link className="text-white mb-2 cursor-pointer px-6 w-full hover:bg-[#333]" to="/profile">Order</Link>
                        <Link className="text-white mb-2 cursor-pointer px-6 w-full hover:bg-[#333]" onClick={handleLogout}>Logout</Link>
                    </div>
                </>
            ) : (
                <>
                    <CiUser size={24} onClick={toggleDropdown} className='cursor-pointer' />
                    <div className={`border rounded-md h-20 flex flex-col py-4 justify-center items-center bg-bgOrange absolute
                        ${showDropdown ? 'block' : 'hidden'}`} ref={dropdownRef}>
                        <Link className="text-white mb-2 cursor-pointer px-6 w-full hover:bg-[#333]" to="/login">Login</Link>
                        <Link className="text-white mb-2 cursor-pointer px-6 w-full hover:bg-[#333]" to="/register">Register</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default DropDownMenu