import axios from 'axios'
import React, { useState } from 'react'
import { Pagination, ProductItem } from '../../components'
import icons from '../../utils/icons'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const ProductsShow = () => {
  const { MdKeyboardArrowDown } = icons
  const [products, setProducts] = useState([])
  const location = useLocation();
  const searchQuery = location.state
  const [page, setPage] = useState(0);
  const size = 12;
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState('')
  const categoryList = [
    'Air Force 1', 'Air Max', 'SB Dunk', 'Blazer', 'Zoom', 'Air VaporMax', 'Air Huarache', 'Jordan', 'LeBron 18', 'Air Presto', 'Air Max Plus', 'Kyrie', 'React', 'Fear of God', 'Adapt'
  ]
  const sortedCategory = [...categoryList].sort();
  const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44',]
  const [cateFilter,setCateFilter] = useState('')
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [sizeFilter, setSizeFilter] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)
   // Sort the category array alphabetically
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/products/search`, {
          params: {
            page,
            size,
            name: searchQuery,
            minPrice,
            maxPrice,
            category: cateFilter,
            productSize: sizeFilter,
            sortDirection
          },
        });
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalElements)
        console.log('done')
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [page, searchQuery, minPrice, maxPrice, cateFilter, sizeFilter, sortDirection ]);


  const handlePageChange = (page) => {
    setPage(page);
  };
  const handleChange = (event) => {
    switch (event.target.value) {
      case 'All prices':
        setMinPrice(null)
        setMaxPrice(null)
        setSortDirection(null)
        break;
      case 'Increasing':
        setMinPrice(null)
        setMaxPrice(null)
        setSortDirection('asc')
        break;
      case 'Decreasing':
        setMinPrice(null)
        setMaxPrice(null)
        setSortDirection('desc')
        break;
      case 'Lower than $200':
        setMinPrice(null)
        setMaxPrice(200)
        break;
      case 'From $200 to $400':
        setMinPrice(200)
        setMaxPrice(400)
        break;
      case 'Larger than $400':
        setMinPrice(400)
        setMaxPrice(null)
        break;
    }
  }
  const handleFilterCategory = (event) => {
    if (event.target.value === 'All categories') {
      setCateFilter(null);
    } else {
      setCateFilter(event.target.value);
    }
  };
  
  const handleFilterSize = (event) => {
    if (event.target.value === 'All sizes') {
      setSizeFilter(null);
    } else {
      setSizeFilter(event.target.value);
    }
  };
  return (
    <div className='px-[50px] mt-40'>
      <div className='w-full bg-[#f2f2f2] my-4 border rounded-lg h-20 flex items-center justify-around'>
        <div className='flex items-center gap-2 cursor-pointer'>
          <span className='font-semibold text-textOrange'>Size</span>
          <select className='custom-select text-white bg-[#333] cursor-pointer rounded p-2  focus:outline-none  focus:border-borderOrange' 
                  onChange={handleFilterSize}>
            <option className='hover:bg-bgOrange'>
              All sizes
            </option>
            {sizes.map((item, index) => (
              <option key={index}>
                {item}
              </option>
            ))}
          
          </select>
        </div>
        <div className='flex items-center gap-2 cursor-pointer'>
          <span className='font-semibold text-textOrange'>Price</span>
          <select className='custom-select text-white bg-[#333] cursor-pointer rounded p-2 focus:outline-none  focus:border-borderOrange' onChange={handleChange}>
            <option>
              All prices
            </option>
            <option>
              Increasing
            </option>
            <option>
              Decreasing
            </option>
            <option>
              Lower than $200
            </option>
            <option>
              From $200 to $400
            </option>
            <option>
              Larger than $400
            </option>
          </select>
        </div>

        <div className='flex items-center gap-2 cursor-pointer'>
          <span className='font-semibold text-textOrange'>Category</span>
          <select className='custom-select text-white bg-[#333] cursor-pointer rounded p-2  focus:outline-none  focus:border-borderOrange' onChange={handleFilterCategory}>
            <option>
              All categories
            </option>
            {sortedCategory.map((category, index) => (
              <option key={index}>
                  {category}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-2 cursor-pointer'>
          <span className='font-semibold text-textOrange'>Showing {totalProducts} products</span>
        </div>

      </div>
      <div className='grid grid-cols-4 gap-8 w-full'>
        {products.map((item, index) => (
          <ProductItem data={item} key={index}/>
        ))}
      </div>
      <div className='flex justify-center w-full my-20'>
        <Pagination 
          onPageChange={handlePageChange}
          totalPages = {totalPages}
          activePage = {page}
        />
      </div>
    </div>
  )
}

export default ProductsShow
