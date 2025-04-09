import axios from "axios"
import Cookies from "js-cookie"
import { refreshToken } from "./auth"

const instance = axios.create({
  baseURL: "http://rest-test.machineheads.ru",
  headers: {
    "Content-Type": "application/json",
  },
})

instance.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = "Bearer " + token
              resolve(axios(originalRequest))
            },
            reject: (err: any) => reject(err),
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refresh_token = Cookies.get("refresh_token")
        if (!refresh_token) throw new Error("No refresh token")

        const { data } = await refreshToken(refresh_token)

        Cookies.set("access_token", data.access_token)
        Cookies.set("refresh_token", data.refresh_token)

        processQueue(null, data.access_token)

        originalRequest.headers.Authorization = "Bearer " + data.access_token
        return axios(originalRequest)
      } catch (err) {
        processQueue(err, null)
        Cookies.remove("access_token")
        Cookies.remove("refresh_token")
        window.location.href = "/login"
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default instance
