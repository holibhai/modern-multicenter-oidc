import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, clearProduct } from '../productSlice';

const ProductModal = () => {
  const dispatch = useDispatch();
  const { selectedProduct, quantity } = useSelector(state => state.product);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
        <button onClick={() => dispatch(clearProduct())} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
        <img src={selectedProduct.image} alt={selectedProduct.title} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">{selectedProduct.title}</h2>
        <p className="text-gray-600 mb-4 text-center">{selectedProduct.description}</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <button onClick={() => dispatch(decreaseQuantity())} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg">-</button>
          <span className="text-xl font-bold">{quantity}</span>
          <button onClick={() => dispatch(increaseQuantity())} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg">+</button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductModal; 