import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import GiftItem from "../components/GiftItem.jsx";
import UserProfile from "../components/UserProfile.jsx";
import PurchaseForm from "../components/PurchaseForm.jsx";
import CartContext from "../components/CartContext.jsx";
import CartDrawer from "../components/CrtDrawer.jsx";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";

const Home = () => {
  const { isAuthenticated, signIn, signOut, getBasicUserInfo, getAccessToken } = useAuthContext();
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = isAuthenticated ? await getAccessToken() : null;
        const res = await axios.get("https://localhost:8443/api/products", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, getAccessToken]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const info = await getBasicUserInfo();
        setUser(info);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [isAuthenticated, getBasicUserInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        user={user}
        signIn={signIn}
        signOut={signOut}
        isAuthenticated={isAuthenticated}
      />

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 -mr-40 mt-16 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45.1,-58.1C63.2,-49.2,85.4,-45.4,94.2,-32.5C103,-19.7,98.4,2.2,88.8,20.1C79.2,38,64.6,51.9,48.3,61.7C32,71.5,14,77.2,-1.4,79.1C-16.8,81,-33.6,79.1,-45.3,69.6C-57,60.1,-63.6,43,-68.3,25.5C-73,8,-75.7,-9.9,-69.8,-23.4C-63.9,-36.9,-49.3,-46.1,-35.2,-56.2C-21.1,-66.3,-7.1,-77.4,4.4,-83.4C15.9,-89.4,27,-90.4,45.1,-58.1Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Welcome to Giftify!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-95">
            Discover the perfect gift for every occasion. Our curated selection makes gift-giving effortless.
          </p>
          <a 
            href="#shop" 
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16" id="shop">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Gift Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked gifts that bring joy to your loved ones. Each item is carefully selected for quality and uniqueness.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-lg max-w-2xl mx-auto text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-red-700 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((gift, idx) => (
              <GiftItem key={idx} {...gift} />
            ))}
          </div>
        )}
      </main>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Giftify?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make gift shopping a delightful experience with our carefully curated collection and seamless process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Collection</h3>
              <p className="text-gray-600">Each gift is handpicked for quality and uniqueness, ensuring your present stands out.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
              <p className="text-gray-600">Your transactions are safe with our encrypted payment processing system.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We partner with reliable shipping services to ensure your gifts arrive on time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Giftify</h3>
              <p className="text-gray-400">Making gift shopping effortless and delightful since 2023.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#shop" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get special offers and gift ideas.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Giftify. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {user && <UserProfile />}

      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          setShowCart(false);
          setShowForm(true);
        }}
      />

      {showForm && <PurchaseForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Home;