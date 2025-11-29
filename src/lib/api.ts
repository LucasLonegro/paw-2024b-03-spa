import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"
import { logout, selectToken } from "@/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"

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
    const token = useAppSelector(selectToken)

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
    const dispatch = useAppDispatch()

    if (status === 401)
      dispatch(logout())

    return Promise.reject(error)
  },
)

export type ApiConfig = AxiosRequestConfig

export default api