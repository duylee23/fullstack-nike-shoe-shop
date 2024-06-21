import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import ImageData from './ImageData'
import { fetchUserCart } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
    const ProductList = () => {
        const [products, setProducts] = useState([])
        const location = useLocation();
        const token = Cookies.get('token')
        const user_email = Cookies.get('user_email')
        const dispatch = useDispatch()
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/admin/product`, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                        }
                    })
                    setProducts(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }, [])

        const handleDeleteProduct = (id) => {
            axios.delete(`http://localhost:8080/admin/product/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                }
            })
                .then(response => {
                    if (response.status === 204) {
                        console.log('delete successfully')
                        setProducts(products.filter(product => product.id !== id));
                        dispatch(fetchUserCart(user_email))
                    } else {
                        throw new Error('failed to delete product')
                    }
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                })
        }

        return (
            <div className='flex flex-col w-full h-full'>
                <div className='w-full flex items-center justify-between'>
                    <Link to="/admin/product/new-product" className='border-[#ff6501] hover:bg-bgOrange hover:text-white rounded-lg cursor-pointer border py-4 px-8 rounded-lg'>
                        Add new
                    </Link>
                </div>

                {/* table */}
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-black-700 uppercase ">
                        <tr><th scope="col" className="px-6 py-3">
                            Id
                        </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sold
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                        {products?.map((item, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4">
                                    {item.id}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    {item.name}
                                </th>
                                <td className="px-6 py-4">
                                    <ImageData imageName={item.image} imageType='product'/>
                                </td>
                                <td className="px-6 py-4">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4">
                                    {item.sizes?.map(size => size.sizeNumber).join(', ')}
                                </td>
                                <td className="px-6 py-4">
                                    $ {item.price} 
                                </td>
                                <td className="px-6 py-4">
                                    {item.sold}
                                </td>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className=" py-4">
                                    <Link to={`/admin/product/edit/${item.id}`} className=' border px-4 py-2 rounded-lg mr-4 border-blue-500 hover:bg-blue-500 hover:text-white'>Edit</Link>
                                    <Link className='border px-4 py-2 rounded-lg border-red-500 hover:bg-red-500 hover:text-white' onClick={() => handleDeleteProduct(item.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* end table */}
            </div>
        )
    }

export default ProductList