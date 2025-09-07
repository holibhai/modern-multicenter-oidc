import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: null,
  quantity: 1,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.quantity = 1;
    },
    clearProduct: (state) => {
      state.selectedProduct = null;
      state.quantity = 1;
    },
    increaseQuantity: (state) => {
      state.quantity += 1;
    },
    decreaseQuantity: (state) => {
      if (state.quantity > 1) state.quantity -= 1;
    },
  },
});

export const { selectProduct, clearProduct, increaseQuantity, decreaseQuantity } = productSlice.actions;
export default productSlice.reducer;
