import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <h2 className="text-center mt-20 text-gray-500 text-2xl font-medium">
        Your Cart is Empty 🛒
      </h2>
    );

  const handleRemove = (id, size) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        ❌ Do you want to delete this item?
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              removeFromCart(id, size);
              toast.dismiss(t.id);
              toast.success("🗑️ Item removed from cart!");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const handleWhatsApp = (item) => {
    const upiId = "6354718236-3@ybl";
    const phoneNumber = "916354718236";

    const message = `🛍️ *New Order Request*
━━━━━━━━━━━━━━━
📌 *Product:* ${item.name}
🖼️ *Image:* ${item.imageUrl}
📏 *Size:* ${item.size || "Not selected"}
🔢 *Quantity:* ${item.quantity || 1}
💰 *Price:* ₹${item.price}

ℹ️ *About:* ${item.about || "N/A"}

━━━━━━━━━━━━━━━
✅ Please *confirm my order*.
📲 Payment via *UPI ID:* ${upiId}
After payment, I will send the screenshot here.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center text-pink-600">
        🛍️ Shopping Cart
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${item.id}`, { state: item })}
          >
            <div className="relative h-36 sm:h-44 w-full overflow-hidden rounded-t-xl">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 sm:p-4 text-center">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                {item.name}
              </h3>
              {item.size && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Size: {item.size}
                </p>
              )}
              <p className="text-pink-600 font-bold text-sm sm:text-lg mt-1">
                ₹{item.price}{" "}
                {item.quantity && (
                  <span className="text-xs text-gray-600">
                    x {item.quantity}
                  </span>
                )}
              </p>
              <div className="flex flex-col gap-2 mt-3">
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleRemove(item.id, item.size);
    }}
    className="w-full bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition text-sm font-medium"
  >
    Remove
  </button>

  {/* ✅ Add To Cart हटाया गया */}

  <button
    onClick={(e) => {
      e.stopPropagation();
      navigate("/pay-online", { state: item });
    }}
    className="w-full bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm font-medium"
  >
    Pay Online
  </button>
  <button
    onClick={(e) => {
      e.stopPropagation();
      handleWhatsApp(item);
    }}
    className="w-full bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
  >
    WhatsApp Buy
  </button>
</div>

            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-semibold text-gray-700">
          Total:{" "}
          <span className="text-pink-600">₹{totalPrice.toFixed(2)}</span>
        </p>
        <button
          onClick={() => navigate("/pay-online", { state: cart })}
          className="mt-4 sm:mt-0 bg-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-pink-700 transition shadow-md"
        >
          Checkout & Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
