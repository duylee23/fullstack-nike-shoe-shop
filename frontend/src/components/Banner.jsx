import React from 'react'

const Banner = ({name, description, image}) => {
  return (
    <div className=" relative flex flex-col mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl ">
        <div className="w-full lg:w-1/2 lg:h-auto">
            <img className="h-[500px] w-full object-cover" src={image} alt="Newest Product" />
        </div>

        <div
        className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
        <div className="flex flex-col p-12 md:px-16">
            <h2 className="text-2xl font-medium uppercase text-[#ff6501] lg:text-4xl">{name}</h2>
            <p className="mt-4">
           {description}
            </p>
            <div className="mt-8">
            <a href="#"
                className="inline-block w-full text-center text-lg font-medium border-solid border-2 border-gray-600 py-4 px-10 duration-300 hover:bg-[#ff6501] hover:text-[#fff] hover:shadow-md md:w-48">Read
                More</a>
            </div>
        </div>
        </div>
  </div>
  )
}

export default Banner