import {
  initialStateLocalID,
  LocalIDKey,
} from "../../../../redux/slices/LocalID.slice";
import {
  axiosInstance,
  JsonResponseToken,
} from "../../../../services/axios.service";
import { ILocalID } from "../../../../services/LocalID.service";
import { getLocalStorage } from "../../../../utilities/localStorage.utility";

export interface ILocal {
  name: string; // Nombre del local
  address: string; // Dirección del local
  phone: string; // Número de teléfono del local
  email: string; // Correo electrónico del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
}

export interface IOpeningDays {
  monday: IOpeningCloseHours; // Horario de apertura los lunes
  tuesday: IOpeningCloseHours; // Horario de apertura los martes
  wednesday: IOpeningCloseHours; // Horario de apertura los miércoles
  thursday: IOpeningCloseHours; // Horario de apertura los jueves
  friday: IOpeningCloseHours; // Horario de apertura los viernes
  saturday: IOpeningCloseHours; // Horario de apertura los sábados
  sunday: IOpeningCloseHours; // Horario de apertura los domingos
}

export interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface IImage {
  url: string; // URL de la imagen
  description?: string; // Descripción opcional de la imagen
}

// Define tu token JWT
const localID: ILocalID = getLocalStorage(LocalIDKey)
  ? JSON.parse(getLocalStorage(LocalIDKey) as string)
  : initialStateLocalID;

export const getLocal = async () => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<ILocal>>(
      `local/local/${localID.id}`
    );
    const data = response.data;
    console.log(data);

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const editLocal = async (local: Partial<ILocal>) => {
  try {
    const response = await axiosInstance.put<JsonResponseToken<ILocal>>(
      `local/local/${localID.id}`,
      { ...local }
    );
    const data = response.data;
    console.log(data);

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};
