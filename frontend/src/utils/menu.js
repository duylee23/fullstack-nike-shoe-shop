import React from 'react'
import icons from './icons'
const { MdProductionQuantityLimits, 
        FaRegUser,
        MdOutlineLocalShipping,
        FaDoorOpen } = icons
        
export const sideBarMenu = [
    {
        path: '/admin/product',
        text: 'Product',
        icon: <MdProductionQuantityLimits size={24}/>
    },
    {
        path: '/admin/user',
        text: 'User',
        icon: <FaRegUser size={24}/>
    },
    {
        path: '/admin/order',
        text: 'Order',
        icon: <MdOutlineLocalShipping size={24}/>
    },
    {
        path: '/',
        text: 'Back to Home',
        icon: <FaDoorOpen size={24}/>
    }
]