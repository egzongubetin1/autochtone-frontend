import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartAsync,
  fetchCartAsync,
  updateCartAsync,
  removeItemAsync,
  removeItemsAsync,
  replayItemAsync,
} from "./cartThunks";

const initialState = {
  cart: [],
  status: "idle",
  error: null,
  subTotal: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = [];
      state.subTotal = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const { CartItems, subTotal, total } = action.payload;
        state.cart = CartItems;
        state.subTotal = subTotal;
        state.total = total;
        state.status = "succeeded";
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(replayItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(replayItemAsync.fulfilled, (state, action) => {
        const { CartItems, subTotal, total } = action.payload;
        state.cart = CartItems;
        state.subTotal = subTotal;
        state.total = total;
        state.status = "succeeded";
      })
      .addCase(replayItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const { CartItems, subTotal, total } = action.payload;
          state.cart = CartItems;
          state.subTotal = subTotal;
          state.total = total;
        }
        state.status = "succeeded";
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        const { CartItems, subTotal, total } = action.payload;
        state.cart = CartItems;
        state.subTotal = subTotal;
        state.total = total;
        state.status = "succeeded";
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemAsync.fulfilled, (state, action) => {
        const { CartItems, subTotal, total } = action.payload;
        state.cart = CartItems;
        state.subTotal = subTotal;
        state.total = total;
        state.status = "succeeded";
      })
      .addCase(removeItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeItemsAsync.fulfilled, (state, action) => {
        const { CartItems, subTotal, total } = action.payload;
        state.cart = CartItems;
        state.subTotal = subTotal;
        state.total = total;
        state.status = "succeeded";
      })
      .addCase(removeItemsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
