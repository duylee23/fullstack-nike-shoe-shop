import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { NavLink, useNavigate } from 'react-router-dom';
import {navBarMenu} from '../utils/menu'
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
const Header = () => {
  const activeStyle = 'text-textOrange border rounded-full bg-[#333] px-8'
  const notActiveStyle = 'hover:text-textOrange px-8'
  const navigate = useNavigate()

  const handleToast = () => 
    toast("Logout successfully", {
      position: "top-right",
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
    try{
      const res = await axios.post("http://localhost:8080/logout")
      Cookies.remove('username');
      console.log('logout successfull', res.data)
      navigate('/login')
      handleToast()
    }catch (error) {
        console.log('Login failed: ', error)
    }
  }
  return (
      <div className='fixed z-20 border w-full h-[60px] flex items-center top-0 justify-between px-[60px] bg-[#fff]'>
        <div className=''>
          <img src='https://img.etimg.com/thumb/msid-59738997,width-480,height-360,imgsize-21421,resizemode-75/nike.jpg' className='w-[58px] h-[58px] object-cover'/>
        </div>

        <div className=' bg-[#fcd3b3] w-[40%] flex justify-between relative font-semibold border rounded-full border-borderOrange'>
         {navBarMenu?.map((item, index) => (
             <NavLink
             key={index}
             to={item.path}
             className={({ isActive }) => (isActive ? activeStyle  : notActiveStyle)}
           >
             {item.text}
           </NavLink>))}
        </div>
        <div className='flex items-center w-[30%] flex gap-4 justify-center'>
          <SearchBar/>
          {Cookies.get('username') ? (
            <>
              <NavLink to='/profile' className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>{Cookies.get('username')}</NavLink>
              <button onClick={handleLogout} className='cursor-pointer'>Logout </button>
            </>
          ) : (
            <>
              <NavLink to='/login' className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>Login</NavLink>
              <NavLink to='/register' className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>Register</NavLink>
            </>
          )}
        
        </div>
      </div>
  )
}

export default Header