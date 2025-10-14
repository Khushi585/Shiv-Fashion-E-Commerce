import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../data/Firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (name && email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Signup successful! Now you can login.");
      } else {
        alert("Please fill all fields");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, GoogleAuthProvider);
      alert("✅ Google Signup successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 pt-24">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm"
      >
        <h1
          className="text-2xl font-extrabold text-center mb-2"
          style={{ color: "#c7a54b" }}
        >
          Welcome to Alakh Fashion
        </h1>
        <p className="text-gray-600 text-center mb-6">Create your account</p>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Signup
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Signup with Google
        </button>
      </form>
    </div>
  );
}
