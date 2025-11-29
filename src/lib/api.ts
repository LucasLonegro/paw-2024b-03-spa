import axios from 'axios';
// (Opcional) Importas tu store para leer el token luego
// import { store } from '@/redux/store'; 

const api = axios.create({
  // 1. Configuras la URL base (así solo pones '/login' después)
  baseURL: 'http://localhost:8080/api', 
  
  // 2. Configuras headers comunes
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. (Opcional pero recomendado) INTERCEPTOR DE REQUEST
// Esto se ejecuta antes de cada petición
api.interceptors.request.use((config) => {
  // Aquí leerías el token de Redux o LocalStorage
  const token = localStorage.getItem('token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 4. (Opcional) INTERCEPTOR DE RESPONSE
// Esto sirve para detectar si el token expiró (401) y sacar al usuario
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido o expirado: Redirigir al login o limpiar estado
      console.log("Sesión expirada");
      localStorage.removeItem('token');
      // window.location.href = '/login'; // Redirección forzada
    }
    return Promise.reject(error);
  }
);

export default api;