import React from "react";
import "./Offer.css";
import LimitedOfferThumbnail from "../components/LimitedOfferThumbnail";
import LimitedOfferPage from "../components/LimitedOfferPage";

export default function Offer() {
  const offers = [
    {
      id: 1,
      title: "Stylish T-Shirt",
      price: "₹499",
      img: "https://images.meesho.com/images/products/532111631/htlak_512.avif?width=300",
    },
    {
      id: 2,
      title: "Casual Jeans",
      price: "₹999",
      img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQn4ASTDd_6Mmdc8wW4ACgfUgFd4x7-01LoG6pXn0wLDmMCXl7rcU-4w7NCD3-3vX1-K98BiwlmNLck8ZRs0456Q_KiIxwcjFCChqt-kULQ",
    },
    {
      id: 3,
      title: "Trendy Jacket",
      price: "₹1499",
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTljDy0ZH7WDsiKUb6J1vL8uXEKS_IYF70wXU5XnEYpLM2tKwZhdg4maq9AuDkm9mVy4ajZMuMQZ9hGZVU9vA_mk1n04u7huYxjeLA7MdA",
    },
    {
      id: 4,
      title: "Denim Jacket",
      price: "₹1499",
      img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR-46__crnBPPNXwjkPnVaLydVHYbB8oz1zPmKhycIV9CN-DAgJ7sW05PrFRAlQaAeLaqD2b3hkYMvNIV0MtAgp2EG7VT2TkhxQWYAng8nBuTtFviTC4uSi",
    },
  ];

  return (
    <section className="offer-section">
      <h2>🔥 Big Sale on Alakh Fashion</h2>
      <div className="offer-grid">
        {offers.map((item) => (
          <div className="offer-card" key={item.id}>
            <div className="offer-tag">20% OFF</div>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="price">{item.price}</p>
            <div className="button-group">
              <button className="buy-btn">Buy Now</button>
              <button className="cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    {/* <LimitedOfferThumbnail /> */}
    </section>
  );
}
