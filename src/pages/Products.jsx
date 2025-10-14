import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/Firebase";
import "../styles/animate-shine.css"; // ✅ CSS file में shine animation

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const categories = [
    "mens",
    "womens",
    "kids",
    "jeans",
    "special",
    "product",
    "festival",
    "limited-offer",
    "offer",
  ];

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let all = [];
        for (let cat of categories) {
          const snap = await getDocs(collection(db, cat));
          const data = snap.docs.map((doc) => ({
            id: doc.id,
            category: cat,
            ...doc.data(),
          }));
          all = [...all, ...data];
        }
        setAllProducts(all);
        setFiltered(all);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // ✅ Search handler
  const handleSearch = () => {
    const query = searchText.toLowerCase();
    if (query) {
      const results = allProducts.filter((item) =>
        item.name?.toLowerCase().includes(query)
      );
      setFiltered(results);
    } else {
      setFiltered(allProducts);
    }
  };

  // ✅ Navigate to ProductDetails
  const handleProductClick = (product) => {
    navigate("/product-details", { state: product });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mt-12 font-bold mb-4 text-yellow-400">Products</h2>

      {/* Search Input & Button */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-3 py-2 border border-yellow-400 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600 font-medium">
            ⏳ Loading... Please wait
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p>No product found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item)}
              className="border border-yellow-400 p-2 rounded shadow hover:shadow-xl transition cursor-pointer hover:scale-105"
            >
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-sm font-semibold mt-2 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 font-bold animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ₹{item.price} • {item.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
