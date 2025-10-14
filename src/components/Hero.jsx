import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ImageSlider from "./ImageSlider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/Firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.css";

export default function Hero() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "slider"));
        const imageList = querySnapshot.docs.map((doc) => doc.data().image);
        setImages(imageList);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };
    fetchSliderImages();
  }, []);

  const handleShopNow = () => {
    Swal.fire({
      title: "🎉 Big Sale!",
      text: "20% OFF on all products. Shop Now!",
      icon: "success",
      confirmButtonText: "Let's Go!",
      confirmButtonColor: "#ff5a5f",
    });
  };

  return (
    <section className="hero bg-gray-50 m-0 p-1 border-red-500 border-0 rounded-lg shadow-lg">
      {/* <div className="text-center m-0 p-2">
        <button
          onClick={handleShopNow}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow transition"
        >
          Shop Now
        </button>
      </div> */}
      <div className="slider-container m-0 p-0">
        <ImageSlider images={images} />
      </div>
    </section>
  );
}
