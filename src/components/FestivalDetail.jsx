import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../data/Firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function FestivalDetail() {
  const { festivalName } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 search state
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "festival"), (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.festivalName === festivalName);
      setProducts(data);
    });
    return () => unsub();
  }, [festivalName]);

  const handleClick = (item) => {
    navigate("/product-details", { state: item });
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-3 py-8 max-w-7xl mx-auto">
        <h1 className="mt-8 sm:mt-12 text-2xl sm:text-3xl font-bold text-center text-yellow-600 mb-6">
        🌟 {festivalName} Special Collection
      </h1>

      {/* 🔍 Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         className="w-full sm:w-1/2 px-4 py-2 border-2 border-yellow-500 rounded-lg shadow 
                     focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow-lg cursor-pointer p-[2px] 
                         hover:shadow-2xl transition duration-300"
              onClick={() => handleClick(item)}
            >
              {/* Gradient Gold Border */}
           <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>

              {/* Inner Card */}
              <div className="relative bg-white rounded-xl h-full">
                {/* Image */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-xl">
                  {item.offer && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                      {item.offer}
                    </span>
                  )}
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.name}
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3 text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                   <p className="text-yellow-600 font-bold text-sm sm:text-lg">
                    ₹{item.price}
                  </p>

                  {/* Golden Button */}
                 <button
  onClick={(e) => {
    e.stopPropagation();
    handleClick(item);
  }}
  className="mt-3 w-full py-2 rounded-lg text-xs sm:text-sm font-semibold text-black 
    bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
    bg-[length:200%_auto] animate-shine border-2 border-yellow-400 
    hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700 
    transition-all duration-300"
>
  🛒 ADD TO CART
</button>


                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          ⚠️ {search ? "Product Matching Not Found 🥲" : `Now ${festivalName}  Products Is Not Available`}
        </p>
      )}
    </div>
  );
}
