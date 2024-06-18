import {
  axiosInstance,
  JsonResponseToken,
} from "../../../../services/axios.service";
import { IAppointment, IRoom } from "../../Rooms/services/Rooms.service";


export interface ClientDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  isRegister: boolean;
}


export const getRoomHTTP = async (idRoom: string) => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<IRoom>>(
      `rooms/room/${idRoom}`
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const getClientsHTTP = async () => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<ClientDTO[]>>(
      `clients//client-not-client/`
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const getClientsRegisterHTTP = async () => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<ClientDTO[]>>(
      `clients//client/`
    );
    const data = response.data;

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};


export const postNotClientsHTTP = async (newNotClient: {name: string;
  email: string;
  phone: string;}) => {
  try {
    const response = await axiosInstance.post<JsonResponseToken<any>>(`not-clients/client`, {...newNotClient});
    const data = response.data;
    console.log("new not client", data)

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const postAppointmentHTTP = async (idRoom: string, appointment: IAppointment) => {
  try {
    const response = await axiosInstance.post<JsonResponseToken<IAppointment[]>>(`appointments/new/appointment/${idRoom}`, {...appointment});
    const data = response.data;
    console.log("new not client", data)

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};


export const putAppointmentHTTP = async (idRoom: string, appointmentId: string, appointment: IAppointment) => {
  try {
    const response = await axiosInstance.put<JsonResponseToken<IAppointment[]>>(`appointments/room/${idRoom}/appointment/${appointmentId}`, {...appointment});
    const data = response.data;
    console.log("update appointment", data)

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
};

export const deleteAppointmentHTTP = async (idRoom: string, appointmentId: string) => {
  try {
    const response = await axiosInstance.delete<JsonResponseToken<IAppointment[]>>(`appointments/room/${idRoom}/appointment/${appointmentId}`);
    const data = response.data;
    console.log("update appointment", data)

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
}

export interface AppointmentClientDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const getAppointmentClientsHTTP = async (idRoom: string, appointmentId: string) => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<AppointmentClientDTO[]>>(`appointments/appointment-all-clients/room/${idRoom}/appointment/${appointmentId}`);
    const data = response.data;
    console.log("clients app", data)

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
}


export const getAppointmentClientOrganizadorHTTP = async (idRoom: string, appointmentId: string) => {
  try {
    const response = await axiosInstance.get<JsonResponseToken<AppointmentClientDTO>>(`appointments/organizador/room/${idRoom}/appointment/${appointmentId}`);
    const data = response.data;
    console.log("clients app", data)

    return data.data;
  } catch (error) {
    console.error("Error loging in:", error);
    // Manejar el error de forma adecuada
  }
}
