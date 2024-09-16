// wishlistSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.wishlistItems = [];
    },
    fetchWishlistRequest: (state) => {
      state.loading = true;
    },
    fetchWishlistSuccess: (state, action) => {
      state.wishlistItems = action.payload;
      state.loading = false;
    },
    fetchWishlistFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addWishlistItem: (state, action) => {
      state.wishlistItems.push(action.payload);
    },
    updateWishlistItem: (state, action) => {
      const index = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.wishlistItems[index] = action.payload;
      }
    },
    removeWishlistItem: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.wishlistId !== action.payload
      );
    },
  },
});

export const {
  resetCart, 
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addWishlistItem,
  updateWishlistItem,
  removeWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
