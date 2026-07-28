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
      const productId = product._id || product.id;

      const existing = state.items.find(
        (item) => (item._id || item.id) === productId
      );

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
      const targetId = action.payload;
      state.items = state.items.filter(
        (item) => (item._id || item.id) !== targetId
      );
    },

    // INCREASEQUANTITY AND DECREASEQUANTITY
    increaseQuantity(state, action) {
      const targetId = action.payload;
      const item = state.items.find(
        (item) => (item._id || item.id) === targetId
      );

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity(state, action) {
      const targetId = action.payload;
      const item = state.items.find(
        (item) => (item._id || item.id) === targetId
      );

      if (item) {
        item.quantity--;

        if (item.quantity === 0) {
          state.items = state.items.filter(
            (item) => (item._id || item.id) !== targetId
          );
        }
      }
    },

    clearItem: (state, action) => {
      const targetId = action.payload;
      state.items = state.items.filter(
        (item) => (item._id || item.id) !== targetId
      );
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearItem } = cartSlice.actions;

export default cartSlice.reducer;