import axios from "axios";
export const baseUrl = "http://localhost:3000/api/v1/";

// Define tu token JWT
const token: string = "0123456789"

// Configura Axios con el token en el encabezado de autorización
export const axiosInstance = axios.create({
  baseURL: `${baseUrl}`, // Reemplaza esto con tu URL base
  headers: {
    'Authorization': `${token}`
  }
});