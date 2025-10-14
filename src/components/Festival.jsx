import React, { useEffect, useState } from "react";
import { db } from "../data/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export default function Festival() {
  const [products, setProducts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "festival"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });
    return () => unsub();
  }, []);

  // 🎉 Confetti 5 seconds ke liye chale
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const groupedFestivals = products.reduce((groups, item) => {
    const fest = item.festivalName || "Other Festivals";
    if (!groups[fest]) groups[fest] = [];
    groups[fest].push(item);
    return groups;
  }, {});

  const diwaliImage = "https://i.postimg.cc/j51QkD29/image-23.png";

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* 🎇 Confetti Effect */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}

      <h2 className="text-3xl font-bold mb-6 text-center leading-snug">
        <span className="text-yellow-500">🎊 Festival </span>
        <span className="text-black">Collection</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.keys(groupedFestivals).map((festival) => {
          const festImage =
            festival === "Diwali sale"
              ? diwaliImage
              : groupedFestivals[festival][0]?.festivalImage ||
              groupedFestivals[festival][0]?.imageUrl;

          return (
            <div
              key={festival}
              className="cursor-pointer relative p-[2px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg hover:shadow-2xl transition"
              onClick={() => navigate(`/festival/${festival}`)}
            >
              {/* Inner Card */}
              <div className="bg-white rounded-lg overflow-hidden">
                {festImage && (
                  <img
                    src={festImage}
                    alt={festival}
                    className="h-72 w-full object-cover"
                  />
                )}
                <div className="p-4 text-center">
                  <h2 className="text-center text-3xl font-extrabold mb-6">
                    <span className="animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                      {festival}
                    </span>{" "}
                    🎉
                  </h2>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
