import React from "react";
import { useNavigate } from "react-router-dom";

const LimitedOfferThumbnail = () => {
  const navigate = useNavigate();

  const limitedImage =
    "https://i.postimg.cc/tTpLCmzy/IMG-20250920-092714.png";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-center text-3xl font-bold text-black mb-6">
        ⏳ Limited Offer
      </h2>

      {/* Gold Gradient Border Wrapper */}
      <div
        className="cursor-pointer relative p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg hover:shadow-2xl transition"
        onClick={() => navigate("/limited-offer")}
      >
        {/* Inner Card */}
        <div className="bg-white rounded-lg overflow-hidden">
          <img
            src={limitedImage}
            alt="Limited Offer"
            className="h-72 w-full object-cover"
          />
          <div className="p-4 text-center">
            <h4 className="text-center text-3xl font-extrabold mb-6">
              <span className="animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Hurry Now !
              </span>{" "}
              🛒
            </h4>


          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedOfferThumbnail;
