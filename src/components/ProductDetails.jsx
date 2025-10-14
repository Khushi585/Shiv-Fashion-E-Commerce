import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";
import "../styles/animate-shine.css"; // ✅ Shine animation CSS

export default function ProductDetails() {
  const location = useLocation();
  const product = location.state;

  const { isLoggedIn } = useAuth();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isInCart = cart.some(
    (item) =>
      item.id === product?.id &&
      (item.size ? item.size === selectedSize?.label : true)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowStickyBar(false);
      else setShowStickyBar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!product) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        ⚠️ Product not found
      </p>
    );
  }

  const sizes = product.sizes || [];
  const basePrice = selectedSize ? (selectedSize.price || product.price) : product.price;
  const totalPrice = basePrice * quantity;
  const discount =
    product.oldPrice && basePrice
      ? Math.round(((product.oldPrice - basePrice) / product.oldPrice) * 100)
      : 0;

  const handleBuyOnWhatsApp = () => {
    if (sizes.length > 0 && !selectedSize) {
      Swal.fire({
        toast: true,
        icon: "warning",
        title: "⚠️ Please select a size before buying.",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const phoneNumber = "916354718236";
    const sizeText = selectedSize
      ? `\n📏 Size: ${selectedSize.label} (₹${basePrice})`
      : "";

    const message = `🛒 *Order Request*  

👕 Product: ${product.name}  
💰 Price: ₹${basePrice}  
🔢 Quantity: ${quantity}  
💵 Total: ₹${totalPrice}${sizeText}  

🖼️ Product Image: ${product.imageUrl}  

Please confirm availability. ✅`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      Swal.fire({
        toast: true,
        icon: "warning",
        title: "⚠️ Please login first!",
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/login");
      return;
    }

    addToCart(product, selectedSize, quantity);

    Swal.fire({
      toast: true,
      icon: "success",
      title: "✅ Product added to cart!",
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });

    navigate("/cart");
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-16">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Product Image & Offer */}
        <div className="bg-gray-50 flex justify-center items-center relative">
          {product.offer && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
              {product.offer}
            </span>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[350px] object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-gray-800 text-sm font-semibold">
              {product.rating || "5.0"}
            </span>
          </div>
          <p className="text-blue-600 font-semibold text-sm mt-2">
            {product.subtitle || "Beard & Body Grooming with Dual Heads"}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {product.about || "No nicks, no fuss, no switching devices. Body to beard in one smooth move. Ceramic cool, steel sharp."}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-center gap-2">
            <p className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent animate-shine">
                ₹{basePrice}
              </span>
            </p>
            {discount > 0 && (
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-semibold px-2 py-1 rounded animate-shine">
                Save {discount}%
              </span>
            )}
          </div>
          {product.oldPrice && (
            <p className="text-gray-400 text-sm line-through">₹{product.oldPrice}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">(Inclusive of all taxes)</p>

          {/* Sizes */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size, index) => {
                  const sizeLabel = typeof size === "string" ? size : size.label || size.size;
                  const sizePrice = typeof size === "object" ? size.price : null;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedSize({ label: sizeLabel, price: sizePrice })}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition
                        ${selectedSize?.label === sizeLabel
                          ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black border-yellow-400 shadow-lg scale-105 animate-shine"
                          : "bg-white text-gray-700 border-gray-300 hover:border-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 hover:text-black transition-all duration-300"}`
                      }
                    >
                      {sizeLabel}
                      {sizePrice && <span className="block text-xs">₹{sizePrice}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Select Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-4 py-2 bg-gray-200 rounded-full text-lg font-bold hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-200 rounded-full text-lg font-bold hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <p className="mt-3 text-md font-medium text-gray-800">
              💵 Total Payment:{" "}
              <span className="text-green-600 font-bold">₹{totalPrice}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-8 mb-6">
            <button
              onClick={handleBuyOnWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
            >
              <FaWhatsapp size={22} /> Buy on WhatsApp
            </button>

            {!isInCart ? (
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black
                  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                  bg-[length:200%_auto] animate-shine border-2 border-yellow-400
                  hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700
                  transition-all duration-300"
              >
                🛒 Add to Cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black
                  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                  bg-[length:200%_auto] animate-shine border-2 border-yellow-400
                  hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700
                  transition-all duration-300"
              >
                ✅ Go to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-xl p-4 flex justify-between items-center transition-transform duration-300 z-50
        ${showStickyBar ? "translate-y-0" : "translate-y-full"}`}
      >
        <div>
          <p className="text-red-600 font-bold text-lg">
            ₹{basePrice} x {quantity}
          </p>
          <p className="text-green-700 font-bold">Total: ₹{totalPrice}</p>
          {product.oldPrice && (
            <p className="text-gray-500 line-through text-sm">
              ₹{product.oldPrice} <span className="text-red-600 text-xs ml-1">{discount}% off</span>
            </p>
          )}
        </div>
        <div className="flex flex-col items-end w-40">
          {!isInCart ? (
            <button
              onClick={handleAddToCart}
              className="w-full py-2 rounded-lg text-xs sm:text-sm font-semibold text-black
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                bg-[length:200%_auto] animate-shine border-2 border-yellow-400
                hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700
                transition-all duration-300"
            >
              🛒 ADD TO CART
            </button>
          ) : (
            <button
              onClick={() => navigate("/cart")}
              className="w-full py-2 rounded-lg text-xs sm:text-sm font-semibold text-black
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                bg-[length:200%_auto] animate-shine border-2 border-yellow-400
                hover:border-yellow-500 hover:from-yellow-500 hover:to-yellow-700
                transition-all duration-300"
            >
              ✅ Go to Cart
            </button>
          )}
          <p className="text-xs text-gray-500 mt-1">Free Shipping Over ₹299</p>
        </div>
      </div>
    </div>
  );
}
