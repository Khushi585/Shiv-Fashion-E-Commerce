import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about py-16 bg-gray-50">
      <div className="about-container max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">

        {/* Logo */}
        <div className="Shiv-fashion flex-shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7JnuuNyWi542Y8PiKI8IIvM4rHTeikgsprg&s"
            alt="Shiv-fashion"
            className="w-48 md:w-64 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text */}
        <div className="about-text flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cold-gold-shimmer">
            About Us
          </h2>

          <p className="text-gray-700 mb-4 leading-relaxed">
            Welcome to <span className="text-yellow-500 font-semibold">Shiv Fashion</span> — your destination for
            trendy, comfortable, and affordable fashion. We believe in delivering
            high-quality clothing that blends modern style with traditional charm.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From ethnic wear to casual outfits, we bring you collections that make
            you stand out while feeling your best.
          </p>
        </div>

      </div>
    </section>
  );
}
