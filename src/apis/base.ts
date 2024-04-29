import axios, { AxiosError, AxiosInstance } from "axios"
import { TEST_API_BASE_URL } from "../configs"

class AxiosService {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = ""
    this.instance = axios.create({
      baseURL: TEST_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.instance.interceptors.request.use(
      (config) => {
        const token = {
          accessToken: this.accessToken,
          refreshToken: "refresh-token",
        }

        if (token?.accessToken) {
          config.headers.Authorization = `Bearer ${token.accessToken}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError<any>) => {
        console.error(error)

        return Promise.reject(error)
      }
    )
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  getAccessToken() {
    return this.accessToken
  }
}

const axiosService = new AxiosService()
export default axiosService
