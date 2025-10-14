import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl my-10 border-t-4 border-yellow-500">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-500 text-center animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        Privacy Policy
      </h1>

      <p className="text-gray-700 mb-6 leading-relaxed text-justify">
        At <strong className="text-yellow-500">Alakh Fashion</strong>, we respect your privacy and are
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, and safeguard your data when you use our
        website and services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
        <li>Personal details like name, email, phone number, and address.</li>
        <li>Payment and billing information when making a purchase.</li>
        <li>Browsing and usage data (cookies, IP address, device type).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
        <li>To process your orders and deliver products.</li>
        <li>To improve our website, products, and services.</li>
        <li>To send you exclusive offers, discounts, and updates.</li>
        <li>For legal and security purposes.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        3. Sharing of Information
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed text-justify">
        We do not sell or trade your personal data. However, we may share it
        with trusted third-party service providers (like delivery partners and
        payment gateways) strictly for fulfilling your orders.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        4. Data Security
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed text-justify">
        We implement industry-standard security measures to protect your
        information from unauthorized access, disclosure, or misuse.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        5. Your Rights
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed text-justify">
        You have the right to access, update, or request deletion of your
        personal data. For any privacy-related queries, contact us at:{" "}
        <span className="font-semibold text-yellow-500">
          support@shivfashion.com
        </span>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-yellow-500 animate-shine bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
        6. Changes to this Policy
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed text-justify">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with the updated date.
      </p>

      <p className="text-gray-500 mt-8 italic text-right">
        Last Updated: <strong>Oct 1, 2025</strong>
      </p>
    </div>
  );
}
