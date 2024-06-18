import axios from "axios";
import { initialStateToken, IToken, UserKey } from "../redux/slices/token.slice";
import { getLocalStorage } from "../utilities/localStorage.utility";
export const baseUrl = "http://localhost:3000/api/v1/";

// Define tu token JWT
const token: IToken = getLocalStorage(UserKey) ? JSON.parse(getLocalStorage(UserKey) as string) : initialStateToken

export interface JsonResponseToken<T> {
  message: string;
  status: number;
  success: boolean;
  data: T
}


// Configura Axios con el token en el encabezado de autorización
export const axiosInstance = axios.create({
  baseURL: `${baseUrl}`, // Reemplaza esto con tu URL base
  headers: {
    'Authorization': `${token.token}`
  }
});