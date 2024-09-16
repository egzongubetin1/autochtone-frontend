import axiosInstance from "../axiosInstance";

export class UserService {
  static async getCreditsHistory(data) {
    const response = await axiosInstance.get("/cart/credits", data);
    return response.data;
  }

  static async getPlayedCompetitions(data) {
    const response = await axiosInstance.get("/cart/competition", data);
    return response.data;
  }

  static async getCompetitionDetail(competitionId) {
    const response = await axiosInstance.get(
      `/cart/competition/${competitionId}`
    );
    return response.data;
  }

  static async update(data) {
    const response = await axiosInstance.put("/auth", data, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
}
