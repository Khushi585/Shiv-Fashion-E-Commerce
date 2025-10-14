import React from "react";
import { FaInstagram } from "react-icons/fa";
import {
  FaUser,
  FaStore,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import "../styles/animate-shine.css"; // optional if you want golden shine

export default function Contact() {
  return (
    <section className="contact py-10 bg-gray-50 mt-8">
      <div className="contact-container max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          We’d love to hear from you! Get in touch with us through the following:
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Shop */}
          <div className="contact-item bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-2xl transition border-2 border-yellow-400">
            <FaStore className="contact-icon text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Shop Name
            </h3>
            <p className="text-gray-700">Shiv Fashion</p>
          </div>

          {/* Owner */}
          <div className="contact-item bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-2xl transition border-2 border-yellow-400">
            <FaUser className="contact-icon text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Owner
            </h3>
            <p className="text-gray-700">Shiv</p>
          </div>

          {/* Address */}
          <div className="contact-item bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-2xl transition border-2 border-yellow-400">
            <FaMapMarkerAlt className="contact-icon text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Address
            </h3>
            <p className="text-gray-700">
              Ahmedabad
            </p>
          </div>

          {/* Email */}
          <div className="contact-item bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-2xl transition border-2 border-yellow-400">
            <FaEnvelope className="contact-icon text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Email
            </h3>
            <a
              href="mailto:hadmatmistry@gmail.com"
              className="text-gray-700 hover:text-yellow-500"
            >
              shivfashion@gmail.com
            </a>
          </div>

          {/* Mobile */}
          <div className="contact-item bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-2xl transition border-2 border-yellow-400">
            <FaPhoneAlt className="contact-icon text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Mobile
            </h3>
            <a
              href="tel:+9163XXXXXXXX"
              className="text-gray-700 hover:text-yellow-500"
            >
              +91 63XXXXXXX
            </a>
          </div>

          {/* Developer Info */}
          <div className="contact-item bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-2xl transition border-2 border-yellow-400">
            <FaUser className="contact-icon text-yellow-500 text-3xl mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Designed by Khushi Shekhawat
            </h3>
            <p className="text-gray-700 mb-2 italic">
              contact developer 👨‍💻
            </p>

            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:shekhawatkhushi7340@gmail.com"
                className="hover:text-yellow-500"
              >
                shekhawatkhushi7340@gmail.com
              </a>
            </p>

            <p className="text-gray-700">
              <strong>Mobile:</strong>{" "}
              <a href="tel:+917698778390" className="hover:text-yellow-500">
                +91 76XXXXXXXXX
              </a>
            </p>

            
          </div>
        </div>
      </div>
    </section>
  );
}
