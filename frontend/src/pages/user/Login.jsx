import React, { useState } from 'react'
import background from '../../assets/images/background.jpg';
import logo from '../../assets/images/logoNike.svg';
import jordanLogo from '../../assets/images/Jumpman_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

    const handleToast = () => 
        toast(`Hello ${Cookies.get('username')}, Welcome back!`, {
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

    const handleChange = (e) => {
        const {name, value} = e.target
        setLoginData((prev) => ({
            ...prev, [name] : value,
        }))
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try{     
            const res = await axios.post("http://localhost:8080/auth/login", loginData)
            Cookies.set('username', res.data?.user_name)
            handleToast()
            navigate("/")
        } catch (error) {
            console.log('Login failed: ', error)
        }
    }
  return (
      <div className='mt-[60px] border  w-full '  style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
          <section className="">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                  <div className ="mt-4 flex flex-col justify-center items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <div className='flex mb-4'>
                      <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                      <img className="w-8 h-8 mr-2" src={jordanLogo} alt="logo" />
                    </div>
                      Nike, Just do it!
                  </div>
                      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                              Sign in to your account
                          </h1>
                          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin}>
                              <div>
                                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                  <input type="email" value={loginData.email} name="email" id="email" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter your email " required="" />
                              </div>
                              <div>
                                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                  <input type="password" value={loginData.password} name="password" id="password" onChange={handleChange} placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                              </div>
                              <div className="flex items-center justify-between">
                                  <div className="flex items-start">
                                      <div className="flex items-center h-5">
                                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                      </div>
                                      <div className="ml-3 text-sm">
                                          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                      </div>
                                  </div>
                                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                              </div>
                              <button type="submit" className="w-full text-textOrange border-borderOrange border hover:text-white hover:bg-bgOrange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300 ">Sign in</button>
                              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                  Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline ">Sign up</Link>
                              </p>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}

export default Login
