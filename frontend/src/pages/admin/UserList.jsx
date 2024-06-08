import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDispatch,  useSelector } from 'react-redux'
const UserList = () => {
    // const [userList, setUserlist] = useState([])
    const token = Cookies.get('token')

    const dispatch = useDispatch();
    const {loading, error } = useSelector(state => state.users);
    const[usersList, setUsersList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const res = await axios.get(`http://localhost:8080/admin/user`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                })
                setUsersList(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    
    return (
        <div className='flex-auto w-full border h-full border'>
            {/* table */}
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-black-700 uppercase ">
                        <tr><th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                        </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                        {usersList?.map((item, index) => (
                            <tr className="bg-white border-b " key={index}>
                                <td className="px-6 py-4">
                                    {item.id}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    {item.fullName}
                                </th>
                                <td className="px-6 py-4">
                                    <img className='w-[100px] h-[100px] object-contain border'
                                    src='https://i.pinimg.com/736x/00/48/2e/00482ee4c3d076360699efcfc53036ce.jpg'></img>
                                </td>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.phoneNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {item.address}
                                </td>
                                <td className="px-6 py-4">
                                    {/* {item.role} */}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            {/* end table */}
        </div>
    )
}
export default UserList
