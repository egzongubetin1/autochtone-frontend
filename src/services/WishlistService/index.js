import axiosInstance from "../axiosInstance";

export class WishlistService {
  static async getAll() {
    const response=
      await axiosInstance.get("/wishlist");

    return response.data;
  }

  static async create(item) {
    const response=
      await axiosInstance.post("/wishlist", item);

    return response.data;
  }

  static async delete(itemId) {
    const response =
      await axiosInstance.delete(`/wishlist/${itemId}`);

    return response.data;
  }
}
