import {
  axiosInstance,
  JsonResponseToken,
} from "../../../../services/axios.service";
import { IOpeningDays } from "../../Local/services/Local.service";


export interface IAppointment {
  _id: string;
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  price: number;
  title: string; // Título del turno
  description: string; // Descripción del turno
  available: boolean; // Para saber si el turno esta o no disponible
  client: IClient["_id"] | null; // Cliente que reservó el turno
  GuestListClient: IClient["_id"][] // lista de invitados a al turno de clientes registrado en la app
  GuestListNotClient: IClientNotRegister["_id"][]// lista de invitados a al turno de clientes no registrado en la app
}


export interface IClient {
  _id: string;
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  password: string; // Contraseña del cliente
  phone: string; // Número de teléfono del cliente
  token: string; // Token del usuario (Esto se tiene que modificar a toda costa, esto no se hace de esta forma)
}

export interface IClientNotRegister extends Document{
  _id: string;
  name: string;
  email: string;
  phone: string;
  bookedAppointments: IAppointment["_id"][]; // Lista de turnos reservados por el cliente
}

export interface DtoRoom {
  startHour: string;
  endHour: string;
  dto: number
}

export interface IRoom {
  _id: string;
  priceBase: number;
  name: string; // Nombre de la sala
  capacity: number; // Capacidad máxima de personas en la sala
  availableAppointments: IAppointment[]; // Lista de turnos disponibles en la sala
  phone: string; // Número de teléfono del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
  dtoRoomHours: DtoRoom[]
}

export interface IImage {
  url: string; // URL de la imagen
  description?: string; // Descripción opcional de la imagen
}

export const getRoomsHTTP = async () => {
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

export const getClientAppointment = async (
  roomId: string,
  clientId: string,
  appointmentId: string
) => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<IClient>>(
      `clients/client/book-appointment/room/${roomId}/client/${clientId}/add/${appointmentId}`
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export interface RoomDTO {
  name: string; // Nombre de la sala
  price: number;
  capacity: number; // Capacidad máxima de personas en la sala
  phone: string; // Número de teléfono del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
  dtoRoomHours: DtoRoom[]
}

export const newRoom = async (
  room: RoomDTO,
) => {
  try {
    const response = await axiosInstance.post<JsonResponseToken<IRoom>>(`rooms/room`, {...room} );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};


export const updateRoomHTTP = async (idRoom: string, room: Partial<IRoom>) => {
  try {
    const response = await axiosInstance.put<JsonResponseToken<IRoom>>(
      `rooms/room/${idRoom}`,
      { ...room }
    );
    const data = response.data;
    console.log(data);

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};