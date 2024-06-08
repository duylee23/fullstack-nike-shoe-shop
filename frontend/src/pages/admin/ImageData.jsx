import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
const ProductImage = ({imageName, imageType}) => {
    const token = Cookies.get('token')

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/${imageType}/image/${imageName}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    responseType: 'blob', // Important for handling binary data
                });

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                };
                reader.readAsDataURL(response.data);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [imageName]);
  return (
    <div>
        {imageSrc ? (
                <img className='w-[100px] h-[100px] object-contain border' src={imageSrc} alt="Product" />
            ) : (
                <p>Loading...</p>
            )}
    </div>
  )
}

export default ProductImage