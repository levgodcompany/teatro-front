import { axiosInstance, JsonResponseToken } from "./axios.service";

export interface ILocalID {
    id: string;
}


export const getHttpLocalID = async ()=> {
    try {
        const response = await axiosInstance.get<JsonResponseToken<ILocalID>>(`local/id`);
        const data = response.data;
        console.log(data)

        return data.data;
      } catch (error) {
        console.error("Error loging in:", error);
        // Manejar el error de forma adecuada
      }
}