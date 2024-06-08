import React from 'react'
import icons from '../utils/icons'

const SearchBar = () => {
  const {AiOutlineSearch} = icons
  return (
    <div className='border rounded-lg  h-[40px] flex items-center px-4 gap-4 duration-300 focus-within:border-[#ff6501]'>
        <AiOutlineSearch size={24}/>
        <input placeholder='Search' className='focus:outline-none'></input>
    </div>
  )
}

export default SearchBar