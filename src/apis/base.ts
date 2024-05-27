import { Dict } from "@/types"
import axios from "axios"
import { CORE_API_BASE_URL, API_VERSION } from "../config"

const axiosInstance = axios.create({
  baseURL: `${CORE_API_BASE_URL}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    // ... other default headers
  },
})

// Handle request and response interceptors if needed

const API = {
  get: (url: string, params?: any) =>
    axiosInstance.get(url, { params }).then((response: Dict) => response.data),
  post: (url: string, data: any) =>
    axiosInstance.post(url, data).then((response: Dict) => response.data),
  put: (url: string, data?: any) =>
    axiosInstance.put(url, data).then((response: Dict) => response.data),
  delete: (url: string) =>
    axiosInstance.delete(url).then((response: Dict) => response.data),
  // ... other methods if needed
}

export default API
