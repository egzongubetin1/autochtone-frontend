import axiosInstance from "../axiosInstance";

export class AuthService {
  static async login(credentials) {
    const response = await axiosInstance.post("/auth/login", credentials);

    return response.data;
  }

  static async register(registerData) {
    const response = await axiosInstance.post("/auth/register", registerData);

    return response.data;
  }

  static async forgetPassword(email) {
    const response = await axiosInstance.post(`/auth/reset/email`, email);
    return response.data;
  }
  static async resetPassword({ token, body }) {
    const response = await axiosInstance.post(
      `/auth/reset?token=${token}`,
      body
    );
    return response.data;
  }

  static async changePassword(data) {
    console.log("body", data);
    const response = await axiosInstance.post(`/auth/password`, data);
    return response.data;
  }

  static async getUser() {
    const response = await axiosInstance.addAuthHeader().get("/auth/user");

    const { result } = response.data;
    return result;
  }

  static async verifyToken() {
    const response = await axiosInstance.addAuthHeader().get(`/auth`);
    return response.data;
  }
}
