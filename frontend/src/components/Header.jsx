import React from 'react'
import SearchBar from './SearchBar';
const Header = () => {
  return (
      <div className='fixed z-20 border w-full h-[60px] flex items-center top-0 justify-between px-[60px] bg-[#fff]'>
        <div className=''>
          <img src='https://img.etimg.com/thumb/msid-59738997,width-480,height-360,imgsize-21421,resizemode-75/nike.jpg' className='w-[58px] h-[58px] object-cover'/>
        </div>

        <div>
          navbar
        </div>

        <div className='flex items-center w-[30%] flex gap-4 justify-around'>
          <SearchBar/>
          <a>Sign in</a>
          <a>Sign up</a>
        </div>
      </div>
  )
}

export default Header