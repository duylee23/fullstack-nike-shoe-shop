import React, { useState } from 'react'
import icons from '../utils/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SearchBar = () => {
  const {AiOutlineSearch} = icons
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.get(`http://localhost:8080/user/products/search`, {
        params: {
          name : searchQuery
        }
      })
      console.log(res.data)
      navigate('/user/products', {state: searchQuery})
    } catch(error) {
      console.error('Error searching products:', error);
    }
  }
  return (
    <form onSubmit={handleSubmitSearch} className='border rounded-lg  h-[40px] flex items-center px-4 gap-4 duration-300 focus-within:border-[#ff6501]'>
      <div className='cursor-pointer p-1 hover:text-textOrange' onClick={handleSubmitSearch}>
        <AiOutlineSearch size={24}/>
      </div>
        <input placeholder='Search' className='focus:outline-none' onChange={(e) => handleInputChange(e)}></input>
    </form>
  )
}

export default SearchBar