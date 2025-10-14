import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import myqr from "../assets/myqr.jpg";

export default function PayOnline() {
  const { state: item } = useLocation();
  const navigate = useNavigate();

  if (!item)
    return (
      <p className="text-center mt-10 text-gray-600">No product selected.</p>
    );

  const price = Number(item.price);
  const upiId = "63XXXXXXXX3@ybl";
  const phonePeLink = `https://www.phonepe.com/pay?pa=${upiId}&pn=AlakhFashion&am=${price}`;

  const whatsappNumber = "916354718236";

  const whatsappMessage = `
Hi!👋 Alakh Fashion, I want to confirm my order:

🛍️ Product Details:
- Name: ${item.name}
- Price: ₹${price.toFixed(2)}
- Size: ${item.size || "Not Selected"}
- Image Link: ${item.imageUrl}

📞 My Contact:
${item.contact || "Not Provided"}

🛒 Order Summary:
UPI ID: ${upiId}
Please share your QR Code for confirmation.
`;

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    const apiUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    window.open(waUrl, "_blank") || window.open(apiUrl, "_blank");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        💳 Complete Your Payment
      </h2>
      <div className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-xl shadow-md mb-6">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-32 h-32 object-cover rounded-lg mr-0 sm:mr-6 mb-3 sm:mb-0"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 mt-1">
            {item.about?.substring(0, 60)}...
          </p>
          <p className="mt-2 text-pink-600 font-bold text-lg">
            ₹{price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="text-center bg-white p-4 rounded-xl shadow-md mb-6">
        <p className="font-semibold mb-2 text-lg">
          Scan this QR to complete payment
        </p>
        <img
          src={myqr}
          alt="UPI QR"
          className="w-56 h-56 mx-auto mb-4 border-4 border-pink-600 rounded-lg shadow-lg"
        />
        <p className="text-gray-700 font-semibold text-lg">
          Total: ₹{price.toFixed(2)}
        </p>
        <button
          onClick={() => navigate("/checkout", { state: item })}
          className="mt-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Checkout & Pay Online
        </button>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center mb-6">
        <h4 className="font-semibold mb-2">PhonePe</h4>
        <button
          onClick={() => window.open(phonePeLink, "_blank")}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Pay ₹{price.toFixed(2)} via PhonePe
        </button>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center">
        <h4 className="font-semibold mb-2">Share on WhatsApp</h4>
        <button
          onClick={openWhatsApp}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Order & QR via WhatsApp
        </button>
      </div>
    </div>
  );
}
