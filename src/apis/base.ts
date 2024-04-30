import axios from "axios"
import { MOCK_API_BASE_URL } from "../config"

const axiosInstance = axios.create({
  baseURL: `${MOCK_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    // ... other default headers
  },
})

// Handle request and response interceptors if needed

const API = {
  get: (url: string, params?: any) =>
    axiosInstance.get(url, { params }).then((response) => response.data),
  post: (data: any) =>
    axiosInstance.post(data).then((response) => response.data),
  put: (url: string, data?: any) =>
    axiosInstance.put(url, data).then((response) => response.data),
  delete: (url: string) =>
    axiosInstance.delete(url).then((response) => response.data),
  // ... other methods if needed
}

export default API
