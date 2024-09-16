import {
  fetchWishlistRequest,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addWishlistItem,
  removeWishlistItem,
} from "./wishlistSlice";
import { WishlistService } from "@/services/WishlistService";

export const fetchWishlist = () => async (dispatch) => {
  dispatch(fetchWishlistRequest());
  try {
    const response = await WishlistService.getAll();
    dispatch(fetchWishlistSuccess(response));
  } catch (error) {
    dispatch(fetchWishlistFailure(error.message));
  }
};

export const addToWishlist =
  (item) => async (dispatch) => {
    try {
      const response = await WishlistService.create(item);
      dispatch(addWishlistItem(response));
      return response
    } catch (error) {
      dispatch(fetchWishlistFailure(error.message));
      return rejectWithValue(error.message)
    }
  };


  
export const deleteFromWishlist =
  (id) => async (dispatch) => {
    try {
      console.log("Attempting to delete:", id);
      await WishlistService.delete(id);
      console.log("Deleted successfully:", id);
      dispatch(removeWishlistItem(id));
    } catch (error) {
      console.error("Error deleting:", error);
      dispatch(fetchWishlistFailure(error.message));
    }
  };
