import { axiosInstance, JsonResponseToken } from "./axios.service";


export interface IOwner {
    name: string;
    email: string;
    phone: string;
    token: string;
}


class AuthService {
    async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post<JsonResponseToken<IOwner>>(`auth/login/owner`, { email, password });
            const data = response.data.data;
            console.log(data)
            console.log(response.data.data)
            return data;
          } catch (error) {
            console.error("Error loging in:", error);
            // Manejar el error de forma adecuada
          }
    }

    async register(name: string, phone: string, email: string, password: string) {
        try {
            const response = await axiosInstance.post<JsonResponseToken<IOwner>>(`auth/register/owner`, { name, phone, email, password });
            const data = response.data;
            return data.data;
          } catch (error) {
            console.error("Error loging in:", error);
            // Manejar el error de forma adecuada
          }
    }
}


const  register =  async  (token: string) => {
  try {
      const response = await axiosInstance.post<JsonResponseToken<IOwner>>(`auth/register/owner`, );
      const data = response.data;
      return data.data;
    } catch (error) {
      console.error("Error loging in:", error);
      // Manejar el error de forma adecuada
    }
}

export default new AuthService()