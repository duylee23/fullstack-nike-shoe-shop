import React, { useEffect } from 'react'
import { useState } from 'react';
import logo from '../../assets/images/logoNike.svg';
import jordanLogo from '../../assets/images/Jumpman_logo.png';
import background2 from '../../assets/images/background2.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [regisData, setRegisData] = useState({
    firstName : '',
    lastName : '',
    email : '',
    password : ''
  })
  const navigate = useNavigate()

          const handleToast = () => 
            toast('Signing up successfully! ', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
          
  const handleSubmitRegister = async (e) => {
    e.preventDefault()
    const {firstName, lastName, email, password} = regisData
    const fullName = `${firstName} ${lastName}`
    const user = {fullName, email, password}
    try{
      const response = await axios.post('http://localhost:8080/auth/register', user)

      console.log('registation successfull', response.data)
      handleToast()
      navigate("/")
    } catch (error) {
      console.error('There was an error when trying to register a new user', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className='mt-[60px]' style={{ backgroundImage: `url(${background2})`, backgroundSize: 'cover' }}>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="mt-4 flex flex-col justify-center  items-center mb-6 text-2xl font-semibold text-gray-900 ">
              <div className='flex mb-4'>
                <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                <img className="w-8 h-8 mr-2" src={jordanLogo} alt="logo" />
              </div>
              Nike, Just do it!
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitRegister}>
                <div className='flex gap-4'>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your first name</label>
                    <input type="text" name="firstName"  value={regisData.firstName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter your first name" required="" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your last name</label>
                    <input type="text" name="lastName"  value={regisData.lastName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter your last name" required="" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" name="email" id="email" value={regisData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter your email" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                  <input type="password" name="password" id="password" value={regisData.password} onChange={handleChange} placeholder="Enter password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                </div>
            
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 " required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <a className="font-medium text-primary-600 hover:underline " href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-textOrange border border-borderOrange hover:text-white hover:bg-bgOrange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300 ">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline ">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
