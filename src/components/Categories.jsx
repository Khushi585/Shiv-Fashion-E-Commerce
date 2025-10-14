import React from "react";
import { useNavigate } from "react-router-dom";
import Reviews from "./Reviews";
import SpecialItems from "./SpecialItems";
import SpecialBanner from "./SpecialBanner";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    { title: "20% OFF", img: "https://png.pngtree.com/png-vector/20221226/ourmid/pngtree-20-off-tage-design-creative-offer-png-image_6537832.png", value: "offer" },
    { title: "Mens Collection", img: "https://img.freepik.com/premium-vector/logo-men-s-clothing-store-that-says-men-s-clothing-store_1275330-524.jpg?semt=ais_hybrid&w=740&q=80", value: "mens" },
    { title: "Womens Collection", img: "https://designduality.studio/cdn/shop/collections/7b390e85c823fb7c42b06cdcdc1c0735.jpg?v=1698410336", value: "womens" },
    { title: "Kids Collection", img: "https://static.vecteezy.com/system/resources/previews/053/257/242/non_2x/children-clothing-kids-store-baby-clothes-garment-shop-circle-emblem-logo-design-illustration-vector.jpg", value: "kids" },
    { title: "Jeans", img: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/line-art-jeans-logo-template-cgnp5c311aace7.webp", value: "jeans" },
  ];

  return (
    <div className="w-full py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        🛍️ Shop by Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => navigate(`/category/${cat.value}`)}
          >
            {/* Gold Gradient Border Wrapper */}
            <div className="w-28 h-28 md:w-32 md:h-32 p-[2px] rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-md hover:shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-center text-sm md:text-base font-medium text-gray-700 mt-3 group-hover:text-yellow-600 transition">
              {cat.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <SpecialBanner />
      </div>

      <div className="mt-12">
        <Reviews />
      </div>
    </div>
  );
}
