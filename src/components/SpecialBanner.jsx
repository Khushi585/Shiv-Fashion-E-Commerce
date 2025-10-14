import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SpecialBanner() {
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      img: "https://i.postimg.cc/9MyWqzD0/file-000000003e0c620a8f6aed0a29472498.png",
    },
    {
      id: 2,
      img: "https://i.postimg.cc/0jpd3Gbv/file-00000000a16c61f694c9017ba47b85a5.png",
    },
    {
      id: 3,
      img: "https://i.postimg.cc/W19mQ1bd/file-00000000a2cc620a94ce556ea7f976da.png",
    },
  ];

  return (
    <div className="w-full py-10 text-center mt-12">
      <h1 className="text-2xl font-bold text-gray-800 border-b-4 border-yellow-500 inline-block pb-1">
          🌟 Special Items Alakh Fashion
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Best & Comfortable Items
        </p>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.img}
              alt={`banner-${banner.id}`}
              onClick={() => navigate("/special")}
              className=" mt-6 w-full h-96 md:h-[400px] object-cover border-4 border-yellow-400 rounded-xl cursor-pointer 
                         transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
