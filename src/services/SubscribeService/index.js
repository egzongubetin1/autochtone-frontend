import axiosInstance from "../axiosInstance";

export class SubscribeService {
  static async subscribe(subscribeData) {
    const response = await axiosInstance.post("/subscriber", subscribeData);

    return response.data;
  }

  static async verify(subscribeToken) {
    const response = await axiosInstance.get(`/subscriber:${subscribeToken}`);

    return response.data;
  }

  static async remove(subscribeId) {
    // const response = await axiosInstance.post("/subscriber", subscribeData);
    // return response.data;
  }
}
