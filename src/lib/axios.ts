import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"
import { store } from "@/app/store"
import { logout, setTokens, selectToken, selectRefreshToken } from "@/features/auth/authSlice"

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

// Función para refrescar el token (sin usar el interceptor)
const refreshTokenRequest = async (refreshTokenValue: string) => {
  const refreshEndpoint = import.meta.env.VITE_REFRESH_TOKEN_ENDPOINT || "";
  
  // Instancia de axios sin interceptores para el refresh token
  const refreshApi = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  })

  const response = await refreshApi.post(
    refreshEndpoint,
    {},
    {
      headers: {
        'X-Refresh-Token': refreshTokenValue,
      },
      validateStatus: (status) => {
        return status === 200 || status === 404;
      },
    }
  );
  
  const authHeader =
    response.headers.authorization || response.headers.Authorization;
  
  if (!authHeader) {
    throw new Error("No se recibió token de autenticación");
  }
  
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;
  
  const refreshTokenHeader =
    response.headers['x-refresh-token'] || response.headers['X-Refresh-Token'];
  
  if (!refreshTokenHeader) {
    throw new Error("No se recibió refresh token");
  }
  
  const newRefreshToken = refreshTokenHeader.startsWith("Bearer ")
    ? refreshTokenHeader.substring(7)
    : refreshTokenHeader;
  
  return { token, refreshToken: newRefreshToken };
};


// Flag para evitar múltiples refreshes simultáneos
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const status = error.response?.status

    if (status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Si ya se está refrescando, esperar en la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const state = store.getState()
      const currentRefreshToken = selectRefreshToken(state)

      if (!currentRefreshToken) {
        // No hay refresh token, hacer logout
        store.dispatch(logout())
        processQueue(error, null)
        isRefreshing = false
        window.location.href = '/login' 
        return Promise.reject(error)
      }

      try {
        // Intentar refrescar el token
        const { token: newToken, refreshToken: newRefreshToken } = await refreshTokenRequest(currentRefreshToken)
        
        // Actualizar tokens en Redux
        store.dispatch(setTokens({
          token: newToken,
          refreshToken: newRefreshToken,
        }))

        // Procesar la cola de peticiones esperando
        processQueue(null, newToken)
        isRefreshing = false

        // Reintentar la petición original
        return api(originalRequest)
      } catch (refreshError) {
        // El refresh falló, hacer logout
        processQueue(refreshError as AxiosError, null)
        isRefreshing = false
        store.dispatch(logout())
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export type ApiConfig = AxiosRequestConfig

export default api