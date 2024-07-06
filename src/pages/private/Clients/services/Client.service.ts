import {
  axiosInstance,
  JsonResponseToken,
} from "../../../../services/axios.service";
import { redirectTo } from "../../../../utilities/redirect";
import { IClient, IRoom } from "../../Rooms/services/Rooms.service";

export const getAllRoomHTTP = async () => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<IRoom[]>>(
      `rooms/room`
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const clientByIDHttps = async (idClient: string) => {
  try {
    const response = await axiosInstance.get<IClient>(
      `clients/client/${idClient}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    redirectTo("/singin")
    // Manejar el error de forma adecuada
  }
};

export const editClientByID = async (
  idClient: string,
  client: Partial<IClient>
) => {
  try {
    const response = await axiosInstance.put(`clients/client/${idClient}`, {
      ...client,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};
