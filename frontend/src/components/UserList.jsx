import React from 'react'

const UserList = () => {
    return (
        <div className='flex-auto w-full border h-full border'>
            {/* table */}
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs text-black-700 uppercase ">
                        <tr><th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                        </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                        <tr class="bg-white border-b ">
                            <td class="px-6 py-4">
                                1
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                Le Duy Ninh
                            </th>
                            <td class="px-6 py-4">
                                <img className='w-[100px] h-[100px] object-contain border'
                                 src='https://i.pinimg.com/736x/00/48/2e/00482ee4c3d076360699efcfc53036ce.jpg'></img>
                            </td>
                            <td class="px-6 py-4">
                                coobedangyeuu@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                0352846368
                            </td>
                            <td class="px-6 py-4">
                                Ha Nam
                            </td>
                            <td class="px-6 py-4">
                                ADMIN
                            </td>
                        </tr>

                        <tr class="bg-white border-b ">
                            <td class="px-6 py-4">
                                1
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                Le Duy Ninh
                            </th>
                            <td class="px-6 py-4">
                                <img className='w-[100px] h-[100px] object-contain border'
                                 src='https://i.pinimg.com/736x/00/48/2e/00482ee4c3d076360699efcfc53036ce.jpg'></img>
                            </td>
                            <td class="px-6 py-4">
                                coobedangyeuu@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                0352846368
                            </td>
                            <td class="px-6 py-4">
                                Ha Nam
                            </td>
                            <td class="px-6 py-4">
                                ADMIN
                            </td>      
                        </tr>

                        <tr class="bg-white border-b ">
                            <td class="px-6 py-4">
                                1
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                Le Duy Ninh
                            </th>
                            <td class="px-6 py-4">
                                <img className='w-[100px] h-[100px] object-contain border'
                                 src='https://i.pinimg.com/736x/00/48/2e/00482ee4c3d076360699efcfc53036ce.jpg'></img>
                            </td>
                            <td class="px-6 py-4">
                                coobedangyeuu@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                0352846368
                            </td>
                            <td class="px-6 py-4">
                                Ha Nam
                            </td>
                            <td class="px-6 py-4">
                                ADMIN
                            </td>      
                        </tr>

                        <tr class="bg-white border-b ">
                            <td class="px-6 py-4">
                                1
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                Le Duy Ninh
                            </th>
                            <td class="px-6 py-4">
                                <img className='w-[100px] h-[100px] object-contain border'
                                 src='https://i.pinimg.com/736x/00/48/2e/00482ee4c3d076360699efcfc53036ce.jpg'></img>
                            </td>
                            <td class="px-6 py-4">
                                coobedangyeuu@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                0352846368
                            </td>
                            <td class="px-6 py-4">
                                Ha Nam
                            </td>
                            <td class="px-6 py-4">
                                ADMIN
                            </td>      
                        </tr>

                        <tr class="bg-white border-b ">
                            <td class="px-6 py-4">
                                1
                            </td>
                            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                Le Duy Ninh
                            </th>
                            <td class="px-6 py-4">
                                <img className='w-[100px] h-[100px] object-contain border'
                                 src='https://i.pinimg.com/736x/00/48/2e/00482ee4c3d076360699efcfc53036ce.jpg'></img>
                            </td>
                            <td class="px-6 py-4">
                                coobedangyeuu@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                0352846368
                            </td>
                            <td class="px-6 py-4">
                                Ha Nam
                            </td>
                            <td class="px-6 py-4">
                                ADMIN
                            </td>      
                        </tr>
                    </tbody>
                </table>
            {/* end table */}
        </div>
    )
}
export default UserList
