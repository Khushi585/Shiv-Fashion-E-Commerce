import React, { useEffect, useState } from "react";
import { db } from "../data/Firebase";
import {collection,addDoc,getDocs,updateDoc,deleteDoc,doc,serverTimestamp,} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./PaymentPage";
import HappyCustomers from "./HappyCustomers";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [editingId, setEditingId] = useState(null);

  const reviewsRef = collection(db, "reviews");
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const fetchReviews = async () => {
    const snapshot = await getDocs(reviewsRef);
    const reviewList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReviews(reviewList.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message || rating === 0) {
      toast.error("⚠️ Please fill all fields and select a rating!", { position: "top-right" });
      return;
    }

    try {
      if (editingId) {
        const reviewDoc = doc(db, "reviews", editingId);
        await updateDoc(reviewDoc, {
          name,message,rating,timestamp: serverTimestamp(),});
        toast.success("✅ Review updated successfully!", { position: "top-right" });
        setEditingId(null);
      } else {
        await addDoc(reviewsRef, { name, message, rating, userId: currentUser?.uid || "guest", timestamp: serverTimestamp(),
        });
        toast.success("🎉 Review added successfully!", { position: "top-right" });
      }

      setName("");
      setMessage("");
      setRating(0);
      fetchReviews();
    } catch (error) {
      toast.error("❌ Error saving review!", { position: "top-right" });
      console.error("Error saving review: ", error);
    }
  };

  const handleEdit = (review) => {
    setName(review.name);
    setMessage(review.message);
    setRating(review.rating);
    setEditingId(review.id);
    toast.info("✏️ Editing review...", { position: "top-right" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      toast.warn("🗑️ Review deleted!", { position: "top-right" });
      fetchReviews();
    } catch (error) {
      toast.error("❌ Error deleting review!", { position: "top-right" });
      console.error("Error deleting review: ", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        ⭐ Customer Reviews
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-500 outline-none"
        />

        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-pink-500 outline-none"
          rows="4"
        ></textarea>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
        >
          {editingId ? "Update Review" : "Submit Review"}
        </button>
      </form>
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-pink-500 text-center">No reviews yet. Be the first!</p>
        )}

        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="border p-4 rounded-md shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{rev.name}</h3>
              <span className="text-yellow-500">
                {"★".repeat(rev.rating)}{" "}
                <span className="text-gray-400">
                  {"★".repeat(5 - rev.rating)}
                </span>
              </span>
            </div>
            <p className="text-gray-700">{rev.message}</p>
            {rev.userId === currentUser?.uid && (
              <div className="flex space-x-3 mt-3">
                <button
                  onClick={() => handleEdit(rev)}
                  className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer />
       <PaymentPage />
       {/* <HappyCustomers /> */}
       {/* <CustomerReviewForm /> */}
    </div>
  );
}
