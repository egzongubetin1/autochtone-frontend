import axiosInstance from "../axiosInstance";

export class NotificationService {
  static async get() {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  }
}
