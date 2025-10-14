import React, { useState, useEffect } from "react";
import { collection, query, orderBy, startAt, endAt, getDocs } from "firebase/firestore";
import { db } from "../data/Firebase";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [queryText, setQueryText] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchResults = async (text) => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      const q = query(
        collection(db, "products"),
        orderBy("name"),
        startAt(text),
        endAt(text + "\uf8ff")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setResults(data);
    } catch (err) {
      console.error("❌ Firebase Search Error:", err);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchResults(queryText);
    }, 400);

    return () => clearTimeout(delay);
  }, [queryText]);

  return (
    <div className="relative w-[95%] max-w-lg mx-auto mt-2">
      <div className="flex items-center bg-white border border-gray-300 shadow-sm px-2 py-1 rounded-lg">
        <input
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Search products..."
          className="px-2 py-1 outline-none flex-1 text-sm text-gray-700"
        />
        <button
          onClick={() => fetchResults(queryText)}
          className="w-full px-3 py-1 rounded-md text-sm font-semibold text-black
    bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
    bg-[length:200%_auto] animate-shine border-2 border-yellow-400
    hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700
    transition-all duration-300"
        >
          Search
        </button>

      </div>
      {results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-72 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQueryText("");
                setResults([]);
                navigate(`/product/${item.id}`, { state: item });
              }}
            >
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
                className="w-10 h-10 object-cover rounded"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {item.name || "Unnamed Product"}
                </h3>
                <p className="text-xs text-gray-500">₹{item.price || 0}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
