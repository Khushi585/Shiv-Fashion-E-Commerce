import React, { useState, useEffect } from "react";
import { db } from "../data/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "./HappyCustomers.css";

function HappyCustomers() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(data);
    });
    return () => unsub();
  }, []);

  return (
    <div className="happy-customers-section">
      <h3>Our Happy Customers</h3>
      <div className="reviews-list">
        {reviews.map((customer) => (
          <div key={customer.id} className="review-card">
            <img
              src={customer.photo}
              alt={customer.name}
              className="customer-photo"
            />
            <p className="customer-review-text">"{customer.review}"</p>
            <p className="customer-name">- {customer.name}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p style={{ marginTop: "10px", color: "gray" }}>
            ⚠ No reviews yet
          </p>
        )}
      </div>
    </div>
  );
}

export default HappyCustomers;
