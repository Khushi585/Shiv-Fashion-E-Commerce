import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db, storage, auth } from "../data/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import "./Admin.css";

export default function Admin({ setHideHeader }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setHideHeader(true);
      } else {
        setUser(null);
        setHideHeader(false);
      }
    });

    return () => unsubscribe();
  }, [setHideHeader]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Login Successful 🎉", "Welcome Admin!", "success");
    } catch (error) {
      Swal.fire("Login Failed ❌", error.message, "error");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    Swal.fire("Logged Out", "You have been signed out.", "info");
  };

  const [category, setCategory] = useState("slider");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pattern, setPattern] = useState("");
  const [neck, setNeck] = useState("");
  const [ageYear, setAgeYear] = useState("");
  const [sizes, setSizes] = useState([]);
  const [offer, setOffer] = useState("");
  const [festivalName, setFestivalName] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const handleSizeChange = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const handleUpload = async () => {
    try {
      let finalImageUrl = imageUrl;

      if (file) {
        const storageRef = ref(storage, `${category}/${file.name}`);
        await uploadBytes(storageRef, file);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, category), {
        name,
        price,
        about,
        imageUrl: finalImageUrl,
        pattern,
        neck,
        ageYear,
        sizes,
        offer,
        festivalName: category === "festival" ? festivalName : "",
        createdAt: new Date(),
      });

      Swal.fire("Success 🎉", "Item uploaded successfully!", "success");
      resetForm();
    } catch (error) {
      Swal.fire("Error ❌", error.message, "error");
    }
  };
  useEffect(() => {
    if (!category) return;

    const unsub = onSnapshot(collection(db, category), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    });

    return () => unsub();
  }, [category]);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, category, id));
    Swal.fire("Deleted ✅", "Item removed successfully!", "success");
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
    setAbout(item.about);
    setImageUrl(item.imageUrl);
    setPattern(item.pattern || "");
    setNeck(item.neck || "");
    setAgeYear(item.ageYear || "");
    setSizes(item.sizes || []);
    setOffer(item.offer || "");
    setFestivalName(item.festivalName || "");
  };

  const handleUpdate = async () => {
    if (!editId) return;
    await updateDoc(doc(db, category, editId), {
      name,
      price,
      about,
      imageUrl,
      pattern,
      neck,
      ageYear,
      sizes,
      offer,
      festivalName: category === "festival" ? festivalName : "",
    });
    Swal.fire("Updated 🎉", "Item updated successfully!", "success");
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setAbout("");
    setImageUrl("");
    setPattern("");
    setNeck("");
    setAgeYear("");
    setSizes([]);
    setOffer("");
    setFestivalName("");
    setFile(null);
  };
  return (
    <div className="admin-panel">
      {!user ? (
        <div className="login-box">
          <h2>Admin Login</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, Admin</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
          <div className="form-group">
            <label>Select Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="slider">Slider Images</option>
              <option value="festival">🎉 Festival Collection</option>
              <option value="limited-offer">🔥 Limited Offer</option>
              <option value="home">Home Images</option>
              <option value="offer">Offer Images</option>
              <option value="product">Product Images</option>
              <option value="mens">Mens Collection</option>
              <option value="womens">Womens Collection</option>
              <option value="kids">Kids Collection</option>
              <option value="jeans">Jeans</option>
              <option value="special">Special Items</option>
            </select>
          </div>
          <div className="upload-card">
            <h3>{editId ? "✏ Update Product" : "📤 Upload Product"}</h3>
            {category === "festival" && (
              <input
                type="text"
                placeholder="Festival Name (e.g. Diwali Dhamaka, Navratri Special)"
                value={festivalName}
                onChange={(e) => setFestivalName(e.target.value)}
              />
            )}

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="About product"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <input
              type="text"
              placeholder="Neck Type"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age/Year"
              value={ageYear}
              onChange={(e) => setAgeYear(e.target.value)}
            />
            <div className="size-selection">
              <label>Select Sizes:</label>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    checked={sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
            <input
              type="text"
              placeholder="Offer (e.g. 10%, 20%)"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {(file || imageUrl) && (
              <div className="preview">
                <img
                  src={file ? URL.createObjectURL(file) : imageUrl}
                  alt="preview"
                  width="120"
                />
              </div>
            )}

            <div className="btn-group">
              {editId ? (
                <>
                  <button className="update-btn" onClick={handleUpdate}>
                    Update
                  </button>
                  <button className="cancel-btn" onClick={resetForm}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="upload-btn" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </div>
          <h3>📌 {category.toUpperCase()} Items</h3>
          <div className="item-list">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-info">
                  {item.festivalName && (
                    <p className="festival-label">
                      🎉 {item.festivalName}
                    </p>
                  )}
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <small>{item.about}</small>
                  <p><b>Pattern:</b> {item.pattern}</p>
                  <p><b>Neck:</b> {item.neck}</p>
                  <p><b>Age/Year:</b> {item.ageYear}</p>
                  <p><b>Sizes:</b> {item.sizes?.join(", ")}</p>
                  {item.offer && <p><b>Offer:</b> {item.offer}</p>}
                </div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(item)}>✏ Edit</button>
                  <button onClick={() => handleDelete(item.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p style={{ marginTop: "10px", color: "gray" }}>
                ⚠ No items found in this category
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
