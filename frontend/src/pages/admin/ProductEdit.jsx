import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const ProductEdit = () => {
    const { productId } = useParams();
    const [image, setImage] = useState(null)
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        image: null
    })
    const [isPreFilling, setIsPreFilling] = useState(false); // Optional flag for pre-filling status
    useEffect(() => {
        const fetchAProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/admin/product/${productId}`);
                setProduct(res.data)
                console.log(res.data)
            } catch (err) {
                console.error('Error when fetching a product:', err);
            }
        }
        fetchAProduct();
    }, [productId]);

    const preFillImage = async () => {
        if (product && product.image) {
            setIsPreFilling(true); // Set flag if applicable

            const reader = new FileReader();
            reader.readAsDataURL(new Blob([], { type: 'image/*' })); // Create an empty blob with appropriate type
            reader.onload = (event) => {
                const preFilledFile = new File([event.target.result], `http://localhost:8080/admin/product/image/${product.image}`);
                setImage(preFilledFile)
                setIsPreFilling(false); // Reset flag if applicable
            };
            reader.onerror = (error) => {
                console.error('Error pre-filling image:', error);
                setIsPreFilling(false); // Reset flag if applicable
            };
        }
    };

    useEffect(() => {
        preFillImage();
        
    }, [product]);

  

    const handleChangeImage = (e) => {
        const imagePreview = document.getElementById("imagePreview");
        // Check if a file is selected
        if (e.target.files.length > 0) {
            // Create URL for the selected file
            const file = e.target.files[0];
            setImage(file)
            if (file) {
                const imgURL = URL.createObjectURL(file);
                // Set image source and display style
                imagePreview.setAttribute("src", imgURL);
                imagePreview.style.display = "block";
            }
        }
    }

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        try {
            // Check if productId is defined and valid
            if (!productId) {
                console.error('Product ID is not defined.');
                return;
            }
    
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('quantity', product.quantity);
            formData.append('price', parseFloat(product.price));
            formData.append('file', image); // Ensure product.image contains the file object
            
            const response = await axios.post(`http://localhost:8080/admin/product/update/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });    
            console.log(response.data);
            alert('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again later.');
        }
    }

    const handleInput = (event) => {
        setProduct({...product, [event.target.name] : event.target.value})
    }

  return (
      <div className='w-full'>
          <div className='w-full flex items-center justify-between'>
              <Link to="/admin/product" className='border-[#ff6501] hover:bg-bgOrange hover:text-white rounded-lg cursor-pointer border py-4 px-8 rounded-lg '>
                  Go back
              </Link>
          </div>
            <h2 className='text-center my-8 font-bold text-textOrange'>EDIT PRODUCT</h2>

        {/* form start */}
          <form className="w-[70%] mx-auto" onSubmit={handleSubmitEdit}>
              <div className=' flex justify-around gap-4'>
                  <div className='flex-1'>
                      <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Product name</label>
                      <input type="text" name='name' id="small-input" onChange={(event) => handleInput(event)} value={product.name} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " />
                  </div>
                  <div className='flex-1'>
                      <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Product price</label>
                      <input type="text" id="small-input" onChange={(event) => handleInput(event) } value={product.price} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " />
                  </div>
              </div>
              <div className='flex justify-around gap-4'>
                {/* <div className='flex-1'>
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Product size</label>
                    <input type="text" id="small-input" onChange={(event) => handleInput(event) } value={product.sizes?.map(size => size.sizeNumber)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " />
                </div> */}
                <div className="mb-5 flex-1">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 ">Product quantity</label>
                    <input type="text" id="base-input" onChange={(event) => handleInput(event) } value={product.quantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
              </div>
              <div className="mb-5">
                  <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 ">Product description</label>
                  <input type="text" id="large-input"  onChange={(event) => handleInput(event) } value={product.description} className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 " />
              </div>
              <div className='w-[50%]'>
                  <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Product image</label>
                  <input type="file"  onChange={(e) => handleChangeImage(e)} name="file" id="file" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 " accept='.png, .jpg, .jpeg'/>
              </div>
              {/* Image preview */}
              <div className="mb-12 ">
                  <img style={{ maxHeight: '250px' }}  alt="avatar preview" id="imagePreview" src={`http://localhost:8080/admin/product/image/${product.image}`} />
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

export default ProductEdit
