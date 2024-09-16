import { createAsyncThunk } from "@reduxjs/toolkit"
import { CartService } from "@/services/CartService"

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await CartService.addCart(cartItem)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CartService.getCart()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async ({ cartItemId, positionData }, { rejectWithValue }) => {
    try {
      const response = await CartService.updateCart(cartItemId, positionData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeItemAsync = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await CartService.removeCartItem(cartItemId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const removeItemsAsync = createAsyncThunk(
  "cart/removeItems",
  async ({ competitionId, itemId }, { rejectWithValue }) => {
    try {
      const response = await CartService.removeCartItems(competitionId, itemId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const replayItemAsync = createAsyncThunk(
  "cart/replayItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const response = await CartService.replayCartItem(cartItemId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)