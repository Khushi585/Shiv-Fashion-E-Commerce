// src/data/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEQAz_3fzxBDaBX_Z0Ng6S1ZbcBMJsmT0",
  authDomain: "alakh-fashion.firebaseapp.com",
  projectId: "alakh-fashion",
  storageBucket: "alakh-fashion.appspot.com",
  messagingSenderId: "297027277469",
  appId: "1:297027277469:web:a8373549df730df03f3a74",
  measurementId: "G-GTE3ZJN4CM"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Services
const auth = getAuth(app); 
const storage = getStorage(app);
const db = getFirestore(app);

// ✅ Export all
export { auth, storage, db };
