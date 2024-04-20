import React from 'react'
import  { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Banner from './Banner';
const Slider = () => {
 
  return (
    <div className='w-full h-[600px] mt-[80px] border'>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <Banner name = "Nike air force 1" 
                  description = "From musicians to artists to streetwear icons, the Air Force 1 has always been more than a sneaker. Everywhere it's gone, it's changed the game. But the past 40 years are behind us, so let's set the stage for the next 40. Because Force has always been strongest when we do it together."
                  image = "https://i.pinimg.com/originals/90/00/b9/9000b9f79687da8121dd9e5939fa85da.png"
                  />
        </SwiperSlide>
        <SwiperSlide>
          <Banner name = "Nike jodan 1" 
                  description = "The first Air Jordan shoe was produced for basketball player Michael Jordan during his time with the Chicago Bulls on November 17, 1984 and released to the public on April 1, 1985. The shoes were designed for Nike by Peter Moore, Tinker Hatfield, and Bruce Kilgore"
                  image = "https://masterbundles.com/wp-content/uploads/2023/12/2-295.png"
                  />
        </SwiperSlide>
        
        <SwiperSlide>
          <Banner name = "Nike SB" 
                  description = "Nike Skateboarding, primarily known as Nike SB, is the Nike brand for its line of shoes, clothing, and equipment for skateboarding."
                  image = "https://precinctskateshop.com.au/wp-content/uploads/2023/10/Nike-SB-Aqua-Noise-Poster-NEW-800x1000.jpg"
                  />
        </SwiperSlide>

    </Swiper>
    </div>
  )
}

export default Slider