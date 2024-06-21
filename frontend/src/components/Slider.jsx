import React from 'react'
import  { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Banner from './Banner';
const Slider = () => {
 
  return (
    <div className='w-full h-[600px] mt-[80px] '>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay ]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{ 
        delay: 3000, // 3 seconds
        disableOnInteraction: false // Continue autoplay after user interactions
      }}
      >
        <SwiperSlide  style={{
            backgroundImage: `url(https://mandc-bl-assets.s3.amazonaws.com/live/teessideshopping/2024/01/16165701/NFS01374_TEESSIDE_RCA_PRE-LAUNCH_1440x420.jpg)`,
          }} >
          <Banner name="Fear of GOD"
            description="From musicians to artists to streetwear icons, the Air Force 1 has always been more than a sneaker. Everywhere it's gone, it's changed the game. But the past 40 years are behind us, so let's set the stage for the next 40. Because Force has always been strongest when we do it together."
            image="https://mir-s3-cdn-cf.behance.net/project_modules/hd/18a09992258491.5e468450c5e07.png"
          />
        </SwiperSlide>
        <SwiperSlide  style={{
            backgroundImage: `url(https://i.pinimg.com/736x/fb/26/c6/fb26c6857a13cde8de3c7bb2d5827699.jpg)`,
          }} >
          <Banner name = "Nike air force 1" 
                  description = "From musicians to artists to streetwear icons, the Air Force 1 has always been more than a sneaker. Everywhere it's gone, it's changed the game. But the past 40 years are behind us, so let's set the stage for the next 40. Because Force has always been strongest when we do it together."
                  image = "https://i.pinimg.com/originals/90/00/b9/9000b9f79687da8121dd9e5939fa85da.png"
                  />
        </SwiperSlide>
        <SwiperSlide  style={{
            backgroundImage: `url(https://i.pinimg.com/originals/af/db/d1/afdbd11d420f0d964fb13ec778bd26b8.jpg)`,
          }} >
          <Banner name = "Nike Blazer" 
                  description = "From musicians to artists to streetwear icons, the Air Force 1 has always been more than a sneaker. Everywhere it's gone, it's changed the game. But the past 40 years are behind us, so let's set the stage for the next 40. Because Force has always been strongest when we do it together."
                  image = "https://mir-s3-cdn-cf.behance.net/project_modules/hd/3d3d62150547845.62fc44baa82b1.jpg"
                  />
        </SwiperSlide>
        <SwiperSlide  style={{
            backgroundImage: `url(https://i.pinimg.com/564x/83/ef/39/83ef3975ff1d994f2c959a36be89214a.jpg)`,
          }} >
          <Banner name = "Nike jordan " 
                  description = "The first Air Jordan shoe was produced for basketball player Michael Jordan during his time with the Chicago Bulls on November 17, 1984 and released to the public on April 1, 1985. The shoes were designed for Nike by Peter Moore, Tinker Hatfield, and Bruce Kilgore"
                  image = "https://i.pinimg.com/564x/c4/8c/cc/c48cccfc50d7e3a1ceb0d38ff3e582f4.jpg"
                  />
        </SwiperSlide>
        
        <SwiperSlide  style={{
            backgroundImage: `url(https://sneakernews.com/wp-content/uploads/2022/12/eBay-Nike-SB-Dunk-Charity-Auction-Banner.jpg?w=1140)`,
          }} >
          <Banner name = "Nike SB" 
                  description = "Nike Skateboarding, primarily known as Nike SB, is the Nike brand for its line of shoes, clothing, and equipment for skateboarding."
                  image = "https://precinctskateshop.com.au/wp-content/uploads/2023/10/Nike-SB-Aqua-Noise-Poster-NEW-800x1000.jpg"
                  />
        </SwiperSlide>

        <SwiperSlide  style={{
            backgroundImage: `url(https://www.sneakerlab.com/cdn/shop/articles/Air_Max_Day_Blog_Banner-01.jpg?v=1616504318)`,
          }} >
          <Banner name = "Nike Air Max" 
                  description = "Nike Skateboarding, primarily known as Nike SB, is the Nike brand for its line of shoes, clothing, and equipment for skateboarding."
                  image = "https://mir-s3-cdn-cf.behance.net/project_modules/hd/09941264679049.5ad9f63decd19.png"
                  />
        </SwiperSlide>

    </Swiper>
    </div>
  )
}

export default Slider