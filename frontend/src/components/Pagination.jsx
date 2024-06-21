import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange, activePage }) => {
    const style = {
        actived: 'text-white bg-bgOrange shadow-md shadow-gray-900/10 transition-all',
        notActived: ''
    }
    const [pages, setPages] = useState([])

    // const handlePageChange = (page) => {
    //     onPageChange(page)
    // }

    const page = (number) => {
        const pages = [];
        for (let i = 0; i <= number; i++) {
          pages.push(i);
        }
        setPages(pages);
    }
    const createPagesArray = (number) => {
        return Array.from({ length: number }, (_, index) => index + 1);
    };
    const pagesList = createPagesArray(totalPages);
    

    const handleChoosePage = (pageNumber) => {
        onPageChange(pageNumber - 1)
    }
    const handlePrevPage = () => {
        onPageChange(activePage - 1)
    } 
    return (
        <div>
            <div className="flex items-center gap-4">
                <button
                    onClick={handlePrevPage}
                    className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 
                                active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
                                `}
                    disabled={activePage === 0}
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                    </svg>
                    Previous
                </button>
                {
                    <div className="flex items-center gap-2">
                    {
                        pagesList?.map((pageNumber,index) => (
                            <button key={index} 
                                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase 
                            ${pageNumber - 1 === activePage? style.actived : style.notActived}
                            hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                type="button"
                                onClick={() => handleChoosePage(pageNumber)}
                                >
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {pageNumber}
                                </span>
                            </button>
                        ))
                    }
                    </div>
                }
                <button
                    className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 
                        active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
                        `}
                    disabled={activePage === totalPages - 1}    
                    type="button">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Pagination