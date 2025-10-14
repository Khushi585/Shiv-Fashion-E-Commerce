import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../data/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from "../context/CartContext";

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const categoryTitles = {
    mens: "Men's Collection",
    womens: "Women's Collection",
    kids: "Kids Collection",
    jeans: "Jeans Collection",
    offer: "20% OFF Deals",
  };

  useEffect(() => {
    if (!category) return;
    const unsub = onSnapshot(collection(db, category), (snapshot) => {
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [category]);

  // 🔍 Filter Items with Search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-3 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl mt-9 font-bold mb-6 text-center leading-snug">
        <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
          {categoryTitles[category] || category.toUpperCase()} Products
        </span>
      </h2>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-l-xl border border-yellow-500 focus:outline-none text-gray-700 shadow-md"
        />
        <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold rounded-r-xl shadow-md hover:scale-105 transition">
          Search
        </button>
      </div>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative cursor-pointer p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              onClick={() => navigate(`/product/${item.id}`, { state: item })}
            >
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="relative h-36 sm:h-44 w-full overflow-hidden rounded-t-xl">
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {category === "offer" ? "20% OFF" : "10% OFF"}
                  </span>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">{item.about}</p>

                  <div className="mt-2">
                    <p className="text-gray-400 text-xs line-through">₹{item.price}</p>
                    <p className="text-yellow-600 font-bold text-sm sm:text-lg">
                      ₹
                      {category === "offer"
                        ? Math.round(item.price * 0.8)
                        : Math.round(item.price * 0.9)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="mt-3 w-full py-2 rounded-lg text-xs sm:text-sm font-semibold text-black 
    bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 
    bg-[length:200%_auto] animate-shine border-2 border-yellow-400 
    hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700 
    transition-all duration-300">
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          ⚠ No items in this category yet.
        </p>
      )}
    </div>
  );
}
