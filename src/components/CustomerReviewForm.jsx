import React, { useState } from 'react';
import './CustomerReviewForm.css';

function CustomerReviewForm() {
  const [customerName, setCustomerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [photoURL, setPhotoURL] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name: customerName,
      review: reviewText,
      photo: photoURL,
      date: new Date().toLocaleDateString()
    };

    console.log('नया रिव्यू:', newReview);

    setCustomerName('');
    setReviewText('');
    setPhotoURL('');
  };

  return (
    <div className="review-form-container">
      <h2>Add a New Customer Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewText">Customer Review:</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="photoURL">Customer Photo URL:</label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default CustomerReviewForm;