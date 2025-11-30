import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"
import { store } from "@/app/store"
import { logout, selectToken } from "@/features/auth/authSlice"

const baseURL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api"

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const state = store.getState()
    const token = selectToken(state)

    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
)

api.interceptors.response.use(
  response => response,
  (error: AxiosError): Promise<never> => {
    const status = error.response?.status

    if (status === 401) {
      store.dispatch(logout())
    }

    return Promise.reject(error)
  },
)

export type ApiConfig = AxiosRequestConfig

export default api