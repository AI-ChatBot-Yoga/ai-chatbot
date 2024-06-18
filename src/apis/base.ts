import { Dict } from "@/types"
import axios from "axios"
import { config } from "@/configs"

const axiosInstance = axios.create({
  baseURL: `${config.CORE_API_BASE_URL}/${config.API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": config.X_API_KEY,
    Authorization: config.AUTHORIZATION_KEY,
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
