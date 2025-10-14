import React from "react";
import Slider from "react-slick";

export default function HeroBannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const banners = [
    {
      img: "https://cdn.smartslider3.com/wp-content/uploads/2018/05/fashionslider.jpg",
      title: "Maha Indian Savings Sale",
      subtitle: "Up to 70% OFF",
      btn: "Shop Now",
    },
    {
      img: "https://champu.in/wp-content/uploads/2019/06/shop23_home_slide1.jpg",
      title: "New Arrivals On Alakh Fashion",
      subtitle: "Trendy & Stylish Collection",
      btn: "Explore",
    },
    {
      img: "https://i.postimg.cc/T1kJCJpk/IMG-20250822-WA0006.jpg",
      title: "Festive Offers",
      subtitle: "Lowest Prices Ever",
      btn: "Grab Now",
    },
  ];

  return (
    <div className="w-full">
      <div className="rounded-none md:rounded-2xl overflow-hidden shadow-lg">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="relative">
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-[300px] md:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-16">
                <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-2xl text-yellow-300 mt-2">
                  {banner.subtitle}
                </p>
                <button className="mt-4 bg-yellow-400 hover:bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition">
                  {banner.btn}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
