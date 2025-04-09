import axios from "./axiosInstance"

export interface AuthResponse {
  access_token: string
  refresh_token: string
  access_expired_at: number
  refresh_expired_at: number
}

export const login = (email: string, password: string) => {
  return axios.post<AuthResponse>("/auth/token-generate", { email, password })
}

export const refreshToken = (refreshToken: string) => {
  return axios.post<AuthResponse>("/auth/token-refresh", {
    refresh_token: refreshToken,
  })
}
