import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';

const ProductAdd = () => {

    // const [productName, setProductName] = useState('');
    // const [productPrice, setProductPrice] = useState('');
    // const [productSize, setProductSize] = useState('')
    // const [productQuantity, setProductQuantity] = useState('');
    // const [productDescription, setProductDescription] = useState('');
    // const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate()
    const token = Cookies.get('token')
    const handleChangeImage = (e) => {
        const imagePreview = document.getElementById("imagePreview");
        // Check if a file is selected
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setProduct({ ...product, image: file });
            // Create URL for the selected file
            if (file) {
                const imgURL = URL.createObjectURL(file);
                // Set image source and display style
                imagePreview.setAttribute("src", imgURL);
                imagePreview.style.display = "block";
            }
        } else {
            // If no file is selected, hide the image preview
            imagePreview.removeAttribute("src");
            imagePreview.style.display = "none";
        }
    }
    const sizes = ['36','37','38','39','40','41','42','43', '44' ]
    const handleInput =  (event) => {
        setProduct({...product, [event.target.name] : event.target.value})
    }
    const [product,setProduct] = useState({
        name : '',
        price : '',
        description : '',
        quantity : '',
        size: '',
        image : null,
    })

    const [chosenSize,setChosenSize] = useState([])
    const [sum, setSum] = useState(0);
    const [sizeValues, setSizeValues] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('quantity', sum);
            formData.append('size', JSON.stringify(sizeValues));        
            formData.append('price',  parseFloat(product.price));
            formData.append('file', product.image);
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            const response = await axios.post('http://localhost:8080/admin/product/create',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });
            console.log(response.data); 
            alert('Product created successfully!');
            navigate('/admin/product')
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again later.');
        }
    }

    const handleChooseSize = (size) => {
        let newChosenSize;
        let newSizeValues = { ...sizeValues };
    
        if (chosenSize.includes(size)) {
          newChosenSize = chosenSize.filter(s => s !== size);
          delete newSizeValues[size]; // Remove the value for the deselected size
            document.getElementById(`input-${size}`).value = 0;
            handleNumber({ target: { value: '0' } }, size);
        } else {
          newChosenSize = [...chosenSize, size];
        }
        setChosenSize(newChosenSize);
        setSizeValues(newSizeValues);
    
        // Recalculate the sum
        const newSum = Object.values(newSizeValues).reduce((acc, num) => acc + num, 0);
        setSum(newSum);
    }


    const handleNumber = (event, size) => {
        const value = parseInt(event.target.value, 10);
        const newSizeValues = {
          ...sizeValues,
          [size]: value || 0
        };
        setSizeValues(newSizeValues);
    
        const newSum = Object.values(newSizeValues).reduce((acc, num) => acc + num, 0);
        setSum(newSum);
      };
      console.log(sizeValues)
      
  return (
      <div className='w-full'>
          <div className='w-full flex items-center justify-between'>
              <Link to="/admin/product" className='border-[#ff6501] hover:bg-bgOrange hover:text-white rounded-lg cursor-pointer border py-4 px-8 rounded-lg '>
                  Go back
              </Link>
          </div>
            <h2 className='text-center my-8 font-bold text-textOrange'>ADD NEW PRODUCT</h2>

        {/* form start */}
          <form className="w-[70%] mx-auto" onSubmit={handleSubmit} >
             <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="name" id="productName"  onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product name</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="price" id="productPrice" onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product price</label>
                  </div>
              </div>
            
              <div className=" z-0 group w-full">
                  <label htmlFor="floating_first_name" className="text-sm text-gray-500  ">Product size( from 34 to 44)</label>
                  {/* <input type="text" name="size" id="productSize" onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required /> */}
                  <div className='flex mt-4 justify-around'>
                      {sizes.map((size, index) => (
                        <div className='relative text-center p-2 '>
                          <div className= {`${chosenSize.includes(size) ? 'bg-bgOrange text-white border border-borderOrange rounded-full py-2 px-3 cursor-pointer' : 'border border-borderOrange rounded-full py-2 px-3 cursor-pointer'}`} key={index} onClick={() =>{handleChooseSize(size)
                           
                           }} >
                              {size}
                          </div>
                          <input type="text" name="description"  id={`input-${size}`} onChange={(e) => handleNumber(e, size)}  value={sizeValues[size] || ''} className={` ${chosenSize.includes(size) ? '' : 'hidden'}  absolute text-center left-0 block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600  `}  placeholder="number" />
                        </div>
                      ))
                      }
                      <div className="mt-4">
                          <strong>Total Sum:</strong> {sum}
                      </div>
                  </div>
              </div>

              {/* <div className="relative z-0 w-full mb-5 group">
                      <input type="text" name="quantity" id="productQuantity" onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity per size</label>
                </div> */}
              <div className="relative z-0 w-full mb-5 group mt-14 ">
                  <input type="text" name="description" id="productDescription" onChange={handleInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product description</label>
              </div>
                
              <div className="relative z-0 w-[20%] mb-5 group">
                  <input onChange={(e) => handleChangeImage(e)} type="file" name="file" id="productImage" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" accept='.png, .jpg, .jpeg' />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product image</label>
              </div>
            {/* Image preview */}
              <div className="mb-12">
                  <img style={{ maxHeight: '250px', display: 'none' }} alt="avatar preview" id="imagePreview" />
              </div>
              {/* Submit button */}
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
              </button>
          </form>
          {/* form end */}
      </div>
  )
}

export default ProductAdd
