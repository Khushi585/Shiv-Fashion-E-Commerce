import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/Firebase";
import { FaSort } from "react-icons/fa";


function SearchBar() {
  const [queryText, setQueryText] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [showMobileSort, setShowMobileSort] = useState(false);
  const navigate = useNavigate();

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
          const snapshot = await getDocs(collection(db, cat));
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            category: cat,
            ...doc.data(),
          }));
          all = [...all, ...data];
        }
        setAllProducts(all);
      } catch (err) {
        console.error("❌ Error fetching all products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (!queryText.trim()) {
      setResults([]);
      return;
    }

    let filtered = allProducts.filter((item) =>
      item.name?.toLowerCase().includes(queryText.toLowerCase())
    );

 
    if (sortOption === "priceLowHigh") {
      filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOption === "priceHighLow") {
      filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortOption === "nameAZ") {
      filtered = filtered.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    } else if (sortOption === "nameZA") {
      filtered = filtered.sort((a, b) =>
        (b.name || "").localeCompare(a.name || "")
      );
    }

    setResults(filtered.slice(0, 6));
  }, [queryText, allProducts, sortOption]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (queryText.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(queryText)}&sort=${sortOption}`);
      setQueryText("");
      setResults([]);
    }
  };

  return (
    <div className="relative w-[95%] max-w-lg mx-auto mt-2">
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white border border-gray-300 shadow-sm px-2 py-1 rounded-lg gap-2 overflow-x-auto"
      >

        <input
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Search products..."
          className="px-2 py-1 outline-none flex-1 min-w-[100px] text-sm text-gray-700"
        />

        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white w-[110px]">
          <FaSort className="text-gray-600 mr-1" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="text-sm outline-none bg-transparent w-full"
          >
            <option value="">Sort</option>
            <option value="priceLowHigh">Low → High</option>
            <option value="priceHighLow">High → Low</option>
            <option value="nameAZ">A → Z</option>
            <option value="nameZA">Z → A</option>
          </select>
        </div>

 
        <button
          type="submit"
          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition w-[90px]"
        >
          Search
        </button>
      </form>

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
                <p className="text-xs text-gray-500">
                  ₹{item.price || 0} • {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { cart } = useCart();

  const handleCartClick = () => {
    if (!isLoggedIn) {
      toast.error("⚠️ Please login first");
      navigate("/login");
    } else {
      toast.success("🛒 Opening your cart...");
      navigate("/cart");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("👋 Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <header className="header w-full max-w-[100vw] overflow-x-hidden">
        <div className="header-container flex justify-between items-center px-4 py-0">
          <div className="flex items-center gap-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7JnuuNyWi542Y8PiKI8IIvM4rHTeikgsprg&s" alt="Alakh Fashion Logo" className="logo-img w-10 h-10" />
            <h1 className="logo-text text-lg font-bold">Shiv Fashion</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  onClick={() => toast("🔑 Please login to continue")}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => toast("🆕 Create a new account")}
                >
                  Signup
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </nav>
          <div className="flex items-center gap-4">
            <div
              className="cart relative cursor-pointer"
              onClick={handleCartClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cart-icon w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
                />
              </svg>
              {cart.length > 0 && (
                <span className="cart-count absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </div>
            <div
              className="md:hidden hamburger cursor-pointer"
              onClick={() => setMenuOpen(true)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </header>
      {location.pathname === "/" && (
        <div className="searchbar-wrapper w-full bg-gray-100 py-2">
          <SearchBar />
        </div>
      )}

      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header flex justify-between items-center">
          <img  alt="Logo" className="drawer-logo w-10" />
          <span className="close-btn" onClick={() => setMenuOpen(false)}>
            ×
          </span>
        </div>

        <nav className="drawer-menu flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/privacy-policy" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                onClick={() => {
                  toast("🔑 Please login");
                  setMenuOpen(false);
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => {
                  toast("🆕 Signup here");
                  setMenuOpen(false);
                }}
              >
                Signup
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="logout-btn"
            >
              Logout
            </button>
          )}
        </nav>

        <div className="drawer-footer text-center mt-6">
          <p>© 2025 Alakh Fashion</p>
        </div>
      </div>

      {menuOpen && (
        <div className="backdrop" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}
