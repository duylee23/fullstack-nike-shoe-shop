import React from 'react'
import { NavLink } from 'react-router-dom'
import ProductList from './ProductList'
import UserList from './UserList'
import { sideBarMenu } from '../utils/menu'

const NavBar = () => {
  const activeStyle = 'text-textOrange'
  const notActiveStyle = 'text-[#333] hover:text-textOrange duration-300'
  return (
    <div className='w-[16%] text-textOrange font-bold overflow-hidden flex-none flex-auto '>
      {sideBarMenu?.map((item, index) => (
          <NavLink to={item.path} key={index} className={({isActive}) => isActive ? activeStyle : notActiveStyle}>
            <div className='w-full h-[60px] flex items-center gap-4 pl-4'>
              <span>{item.icon}</span>
              <span>
                {item.text}
              </span>
            </div>
          </NavLink>
      ))}
    </div>
  )
}
export default NavBar
