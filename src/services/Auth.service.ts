import { axiosInstance, JsonResponseToken } from "./axios.service";


export interface IClient {
    _id: string;
    name: string;
    email: string;
    phone: string;
    token: string;
}


class AuthService {
    async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post<JsonResponseToken<IClient>>(`auth/login`, { email, password });
            const data = response.data.data;
            return data;
          } catch (error) {
            console.error("Error loging in:", error);
            // Manejar el error de forma adecuada
          }
    }

    async register(name: string, phone: string, email: string, password: string) {
        try {
            const response = await axiosInstance.post<JsonResponseToken<IClient>>(`auth/register`, { name, phone, email, password });
            const data = response.data;
            return data.data;
          } catch (error) {
            console.error("Error loging in:", error);
            // Manejar el error de forma adecuada
          }
    }
}

export const clientByID = async (idClient: string)=> {
  try {
    const response = await axiosInstance.get<IClient>(`clients/client/${idClient}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
}

export default new AuthService()