import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Categories from "./components/Categories";
import CategoryPage from "./components/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import PayOnline from "./components/PayOnline";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpecialItems from "./components/SpecialItems";
import PaymentPage from "./components/PaymentPage";
import { Toaster } from "react-hot-toast";
import Festival from "./components/Festival";
import FestivalDetail from "./components/FestivalDetail";
import HappyCustomers from "./components/HappyCustomers";
import CustomerReviewForm from "./components/CustomerReviewForm";
import LimitedOfferThumbnail from "./components/LimitedOfferThumbnail";
import LimitedOfferPage from "./components/LimitedOfferPage";
import SearchBar from "./components/SearchBar";

function Layout({ children }) {
  const location = useLocation();
  const hideFooter =
    [
      "/admin",
      "/cart",
      "/pay-online",
      "/product",
    ].some((path) => location.pathname.startsWith(path)) ||
    location.pathname.startsWith("/category") ||
    location.pathname === "/special";

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="min-h-screen">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pay-online" element={<PayOnline />} />
              <Route path="/payment-methods" element={<PaymentPage />} />
              <Route path="/festival" element={<Festival />} />
              <Route path="/festival/:festivalName" element={<FestivalDetail />} />
              <Route path="/happy-customers" element={<HappyCustomers />} />
              <Route path="/admin" element={<CustomerReviewForm />} />
              <Route path="/special" element={<SpecialItems />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/" element={<LimitedOfferThumbnail />} />
              <Route path="/limited-offer" element={<LimitedOfferPage />} />
              <Route path="/SearchBar" element={<SearchBar />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </Layout>
        </CartProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </AuthProvider>
    </Router>
  );
}

export default App;
