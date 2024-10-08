import { Dict } from "@/types"
import axios from "axios"

const CORE_API_BASE_URL = import.meta.env.VITE_CORE_API_BASE_URL
const API_VERSION = import.meta.env.VITE_API_VERSION

const axiosInstance = axios.create({
  baseURL: `${CORE_API_BASE_URL}/${API_VERSION}`,
})

const API = {
  get: (url: string, params?: any) =>
    axiosInstance.get(url, { params }).then((response: Dict) => response.data),
  post: (url: string, data: any) =>
    axiosInstance.post(url, data).then((response: Dict) => response.data),
  put: (url: string, data?: any) =>
    axiosInstance.put(url, data).then((response: Dict) => response.data),
  delete: (url: string) =>
    axiosInstance.delete(url).then((response: Dict) => response.data),
}

export default API
