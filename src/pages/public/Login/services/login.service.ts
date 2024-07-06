import { axiosInstance } from "../../../../services/axios.service";

export const resetPass = async (email: string) => {
  try {
    const response = await axiosInstance.put(`auth/new-password`, { email });
    const data = response.data;
    return data;
  } catch (error) {
    // Manejar el error de forma adecuada
  }
};
