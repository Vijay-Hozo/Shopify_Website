import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // ADDTOCART
    addToCart(state, action) {
      const product = action.payload;

      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },


    // REMOVEFROMCART
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },


    // INCREASEQUANTITY AND DECREASEQUANTITY
    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity--;

        if (item.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
    },

    clearItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearItem } = cartSlice.actions;

export default cartSlice.reducer;