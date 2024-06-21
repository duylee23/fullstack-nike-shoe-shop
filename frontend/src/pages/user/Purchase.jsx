import React, { useState } from 'react'
import icons from '../../utils/icons'
import { useSelector } from 'react-redux'
import banner_image from '../../assets/images/banner2.jpg'
import axios from 'axios'
const Purchase = () => {
  const {CiLocationOn} = icons
  const {selectedCartItems} = useSelector(state => state.users)

 
  const calculateTotalPayment = () => {
    const total = selectedCartItems.reduce((accomulator, item) => {
      return accomulator + item.quantity * item.product.price
    }, 50)
    return total
  }

  const handleOrder = async () => {
    try{
      const res = await axios.post(`http://localhost:8080/user/place-order`,order, {
        params: {
          email : 'admin@gmail.com',
        }
      })
    } catch (error) {
      console.log('error when ordering product!')
    }
  }

  const [order,setOrder] = useState({
    receiverName: '',
    receiverAddress : '',
    receiverPhone : '', 
    totalPayment : calculateTotalPayment(),
    orderDetail: [
        {
        quantity: null,
        price: null,
        size: '',
        productId: null
        },
      ]
  })

  return (
    <div className='bg-[#f3f3f3] mt-12'>
      <img src={banner_image} className=' mx-auto h-[300px] object-contain'></img>
      <div className='mt-20 min-h-screen w-[80%] px-[60px] mx-auto '>
        <div className='flex flex-col bg-white'>
          <div className='flex items-center '>
            <CiLocationOn/> 
            <span>
              Delivery Address
            </span>
          </div>
          <div className='flex gap-4'>
            <span>Le Duy (+84) 352846368</span>
            <span>Ha Noi</span>
          </div>
        </div>

        <div className='mt-10 bg-white'>
          <span>Product</span>
          <div className='flex'>
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-black-700 uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total price
                  </th>
                </tr>
              </thead>
              {/* body */}
              <tbody >
                {selectedCartItems?.map((item, index) => (
                  <tr key={index} className="border-b w-200 w-full">
                    <td className=" flex items-center gap-4 py-10"> 
                      <img className=' rounded w-[100px] h-[100px] cursor-pointer object-contain group-hover:opacity-20 duration-500 group'
                                        src={`http://localhost:8080/user/product/image/${item.product?.image}`} />
                                    {item.product?.name}
                    </td>
                    <td className="px-6 py-4">
                      {item.size}
                    </td>
                    <td className="px-6 py-4">
                      $ {item.product?.price}
                    </td>
                    <td className="px-6 py-4 ">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-textOrange bold text-lg">
                        $ {item.quantity * item.product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
          <div className=' bg-white my-10 flex flex-col p-4 gap-4'>
            <span>Payment method: Cash on delivery</span>
            <span>Shipping fee: $50</span>
            <span className='text-xl text-textOrange'>Total payment: $ {calculateTotalPayment()} </span>  
            <button className='p-2 rounded-lg bg-bgOrange font-bold text-white text-lg' onClick={handleOrder}>Order</button>
          </div>
      </div>
    </div>
  )
}
export default Purchase