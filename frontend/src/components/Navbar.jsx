import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { ShoppingCart } from "lucide-react";

const Navbar = ({ cartCount, onCartClick }) => {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold text-pink-600">Giftify</div>
      <ul className="flex gap-8 text-lg font-medium">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>

      <div className="flex items-center gap-4">
        
        <button className="relative" onClick={onCartClick}>
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0 text-xs">
              {cartCount}
            </span>
          )}
        </button>

       
        {state.isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <span className="font-medium">{state.username || "User"}</span>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={signOut}
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={signIn}
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
