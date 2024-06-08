import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { navBarMenu } from '../utils/menu'
import Cookies from 'js-cookie';
import icons from '../utils/icons';
import DropDownMenu from './DropDownMenu';
import { FaBullseye } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
const Header = () => {
  const { CiLocationOn } = icons
  const activeStyle = 'text-textOrange border rounded-full bg-[#333] px-8'
  const notActiveStyle = 'hover:text-textOrange px-8'
  const { isLoggedIn } = useSelector(state => state.users)

  return (
    <div className='fixed z-20 border w-full h-[60px] flex items-center top-0 justify-between px-[60px] bg-[#fff]'>
      <div className=''>
        <img src='https://img.etimg.com/thumb/msid-59738997,width-480,height-360,imgsize-21421,resizemode-75/nike.jpg' className='w-[58px] h-[58px] object-cover' />
      </div>

      <div className=' bg-[#fcd3b3] w-[40%] flex justify-between relative font-semibold border rounded-full border-borderOrange'>
        {navBarMenu?.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
          >
            {item.text}
          </NavLink>))}
      </div>
      <div className='items-center w-[30%] flex gap-4 justify-center'>
        <SearchBar />
        <div className='flex items-center gap-4 '>
          {!Cookies.get('username') ? (
            <>
              <div className=' flex w-full hover:text-textOrange'>
                <DropDownMenu isLoggedIn={false} />
              </div>
            </>
          ) : (
            <>
               <div className=' flex w-full '>
                <DropDownMenu isLoggedIn={true} />
              </div>
            </>
          )}
          <div>
            <CiLocationOn size={24} className='hover:text-textOrange cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header