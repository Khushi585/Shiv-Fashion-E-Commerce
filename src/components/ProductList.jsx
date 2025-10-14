import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/Firebase";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import Categories from "./Categories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Festival from "./Festival";
import LimitedOfferThumbnail from "./LimitedOfferThumbnail";

export default function OfferProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "slider"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const goToDetails = (item) => {
    navigate(`/product/${item.id}`, { state: item });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-white mt-10">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
        🔥 Big Sale on Shiv Fashion
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600 font-medium">
            ⏳ Loading... Please wait
          </p>
        </div>
      ) : (
        <Slider {...settings}>
          {products.map((item) => (
            <div key={item.id} className="px-1">
              {/* Gold Gradient Border Wrapper */}
              <div
                className="p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
                           rounded-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => goToDetails(item)}
              >
                <div className="bg-white border rounded-xl shadow-md flex flex-col h-64 sm:h-72 group overflow-hidden">
                  <div className="relative w-full h-28 sm:h-36 flex items-center justify-center bg-gray-50 rounded-t-xl overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow px-2 py-2 text-center">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-sm sm:text-base font-bold mt-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                      ₹{item.price}
                    </span>

                    <div className="mt-auto">
                      <button className="w-full py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-black 
  rounded-lg shadow-lg border-2 border-yellow-400 
  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
  bg-[length:200%_auto] animate-shine 
  hover:border-yellow-500 transition-all duration-300">
                        View Details
                      </button>





                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      <div className="mt-10">
        <LimitedOfferThumbnail />
        <Festival />
        <Categories />
      </div>
    </div>
  );
}
