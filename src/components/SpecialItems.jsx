import React, { useEffect, useState } from "react";
import { db } from "../data/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SpecialItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 Search state
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "special"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    });
    return () => unsub();
  }, []);

  const handleClick = (item) => {
    navigate("/product-details", { state: item });
  };

  // 🔍 Filter items by search
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-3 py-8 max-w-7xl mx-auto">
      <h1 className="mt-8 sm:mt-12 text-2xl sm:text-3xl font-bold text-center text-yellow-500 mb-6">
        🌟 Alakh Fashion Special Collection
      </h1>

      {/* 🔍 Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-yellow-500 rounded-lg shadow 
                     focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-yellow-500 rounded-xl shadow hover:shadow-2xl transition duration-300 cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <div className="relative h-28 sm:h-40 w-full overflow-hidden rounded-t-xl">
                {item.offer && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                    {item.offer}
                  </span>
                )}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-2 sm:p-4 text-center">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-yellow-500 font-bold text-sm sm:text-lg">
                  ₹{item.price}
                </p>

              <button
  onClick={(e) => {
    e.stopPropagation();
    handleClick(item);
  }}
  className="mt-2 w-full py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-black
    bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
    bg-[length:200%_auto] animate-shine border-2 border-yellow-400
    hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700
    transition-all duration-300"
>
  View Details
</button>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          ⚠ {search ? "No matching items found" : "No special items available"}
        </p>
      )}
    </div>
  );
}
