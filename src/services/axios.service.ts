// axios.service.ts
import axios from "axios";
import { getLocalStorage } from "../utilities/localStorage.utility";
import { IToken, initialStateToken, UserKey } from "../redux/slices/token.slice";

export const baseUrl = "https://teatro-back.onrender.com/api/v1/";

export interface JsonResponseToken<T> {
  message: string;
  status: number;
  success: boolean;
  data: T;
}

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Añadir un interceptor para añadir el token a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token: IToken = getLocalStorage(UserKey)
      ? JSON.parse(getLocalStorage(UserKey) as string)
      : initialStateToken;

    if (token.token) {
      config.headers.Authorization = `${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
