import React, { useContext } from "react";
import CartContext from "./CartContext";

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 border-b pb-2"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.title)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQuantity(item.title)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <button
            onClick={onCheckout}
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
