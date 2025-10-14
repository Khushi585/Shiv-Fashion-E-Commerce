import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/Firebase";
import { useNavigate } from "react-router-dom";

export default function OfferProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "offers"));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition"
          onClick={() => navigate("/product-details", { state: product })}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-52 object-contain rounded-lg"
          />
          <h3 className="mt-3 font-bold text-gray-800">{product.name}</h3>
          <p className="text-green-600 font-semibold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
