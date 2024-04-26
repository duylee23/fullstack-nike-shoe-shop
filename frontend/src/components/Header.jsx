import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';
import {navBarMenu} from '../utils/menu'
const Header = () => {
  const activeStyle = 'text-textOrange'
  const notActiveStyle = 'hover:text-textOrange'
  return (
      <div className='fixed z-20 border w-full h-[60px] flex items-center top-0 justify-between px-[60px] bg-[#fff]'>
        <div className=''>
          <img src='https://img.etimg.com/thumb/msid-59738997,width-480,height-360,imgsize-21421,resizemode-75/nike.jpg' className='w-[58px] h-[58px] object-cover'/>
        </div>

        <div className=' w-[40%] flex justify-around relative font-semibold'>
         {navBarMenu?.map((item, index) => (
             <NavLink
             key={index}
             to={item.path}
             className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
           >
             {item.text}
             {/* Apply styles to the span element based on the isActive prop */}
             {/* <span
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-[#d3a850] transition-all duration-500 opacity-0 ease-in-out group-hover:opacity-100 ${isActive ? 'opacity-100' : 'group-hover:w-[30%]'}`}
      /> */}
           </NavLink>))}
        </div>

        <div className='flex items-center w-[30%] flex gap-4 justify-around'>
          <SearchBar/>
          <NavLink to='/login' className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>Login</NavLink>
          <NavLink to='/register' className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}>Sign up</NavLink>
        </div>
      </div>
  )
}

export default Header