import {
  axiosInstance,
  JsonResponseToken,
} from "../../../../services/axios.service";

export interface IShiftsDTO {
  days: IDaysDTO[];
  openingCloseHoursTurnos: IOpeningCloseHoursShiftsDTO[];
  roomId: string[];
}

export interface IDaysDTO {
  date: Date;
}

export interface IOpeningCloseHoursShiftsDTO {
  startHours: string; // Hora de entrada
  endHours: string; // Hora de salida
  title: string; // Título del turno
  description: string; // Descripción del turno
  available: boolean; // Para saber si el turno está o no disponible
}

export interface RoomIdName {
  id: string;
  name: string;
}

export const getAllIdsRooms = async () => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<RoomIdName[]>>(
      `rooms/room/ids`
    );
    const data = response.data;
    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const saveShifs = async (shifs: IShiftsDTO) => {
  try {
    const response = await axiosInstance.post<JsonResponseToken<any>>(
      `appointments/appointment/all`,
      { ...shifs }
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};
