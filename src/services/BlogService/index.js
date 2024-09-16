import axiosInstance from "../axiosInstance"

export class BlogService {
  static async getFeaturedWinnerBlog() {
    const response = await axiosInstance.get("/blog/featured/winner", )
    return response.data
  }
  
  static async getCompetitionWinnerBlog(competitionId) {
    const response = await axiosInstance.get(`/blog/${competitionId}/winner`, {})
    console.log(response);
    return response.data
  }
}