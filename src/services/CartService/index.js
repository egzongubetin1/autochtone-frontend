import axiosInstance from "../axiosInstance"

export class CartService {
  static async addCart(cartItem) {
    const response = await axiosInstance.post("/cart", cartItem)
    return response.data
  }
  
  static async replayCartItem(cartItemId) {
    const response = await axiosInstance.post(`/cart/${cartItemId}/replay`, {})
    return response.data
  }

  static async getCart() {
    const response = await axiosInstance.get("/cart")
    return response.data
  }

  static async updateCart(cartItemId, positionData) {
    const response = await axiosInstance.put(
      `/cart/${cartItemId}`,
      positionData
    )
    return response.data
  }

  static async removeCartItem(cartItemId) {
    const response = await axiosInstance.delete(`/cart/${cartItemId}`)
    return response.data
  }

  static async removeCartItems(competionsId, itemId) {
    const response = await axiosInstance.delete(
      `/cart/${competionsId}/${itemId}`
    )
    return response.data
  }
}
