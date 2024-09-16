"use client"
import axios from "axios"
import { LOCAL_STORAGE_TOKEN_NAME } from "../data/constants"

const authMixin = {
  addAuthHeader: function(token) {
    if (typeof window !== "undefined") {
      this.defaults.headers.common["Authorization"] = `Bearer ${token ||
        localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)}`
    }

    return this
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" }
})

Object.assign(axiosInstance, authMixin)

// Hardcode the token
axiosInstance.addAuthHeader()

export default axiosInstance
