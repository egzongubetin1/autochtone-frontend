import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/authSlice"
import cartReducer from "../redux/features/cart/cartSlice"
import wishlistReducer from "../redux/features/wishlist/wishlistSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production"
})
