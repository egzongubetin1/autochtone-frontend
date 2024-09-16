import axiosInstance from "../axiosInstance";

export class ContactService {
  static async contact(contactData) {
    const response = await axiosInstance.post("/contact", contactData);

    return response.data;
  }
}
