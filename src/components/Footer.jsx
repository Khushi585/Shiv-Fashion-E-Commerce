import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Shiv Fashion</h2>
          <p className="mt-3 text-sm text-gray-400">
            Trendy, Comfortable & Affordable fashion for everyone.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Products</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-white transition">Shipping</a></li>
            <li><a href="/returns" className="hover:text-white transition">Returns</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Get in Touch</h3>
          <p className="text-sm text-gray-400">📍 Ahmedabad , Gujrat ,India</p>
          <p className="text-sm text-gray-400">📞 +91 98XXXXXXXX</p>
          <p className="text-sm text-gray-400">✉️ support@shivfashion.com</p>
          <div className="flex space-x-4 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/alakh_fashion__paldi" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition">
              <FaTwitter />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} <span className="text-white font-semibold">Shiv Fashion</span> | All Rights Reserved</p>
        <p className="mt-1">Designed with ❤️ by <span className="text-pink-500 font-semibold">Khushi Shekhawat</span></p>
      </div>
    </footer>
  );
}
