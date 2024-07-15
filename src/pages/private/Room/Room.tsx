import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { IRoom } from "../Rooms/services/Rooms.service";
import { getRoomHTTP } from "./service/Room.service";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import RoomStyle from "./css/Room.module.css";
import RoomInfo from "./components/RoomInfo/RoomInfo";
import DateSelector from "./components/DateSelector/DateSelector";
import { useAppSelector } from "../../../redux/hooks";
import Footer from "../../../components/Footer/Footer";
import { clientByID, IClient } from "../../../services/Auth.service";
import { IClientID } from "../../../redux/slices/ClientID.slice";
import Loading from "../../../components/Loading/Loading";

const Room = () => {
  const location = useLocation();
  const idRoom = new URLSearchParams(location.search).get("id");

  // Sates
  const [isDateSelect, setIsDateSelect] = useState<boolean>(false);
  const clientSelector: IClientID = useAppSelector((state) => state.clientID);
  const [client, setClient] = useState<IClient>({
    _id: "",
    email: "",
    name: "",
    phone: "",
    token: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState<IRoom>({
    _id: "",
    name: "", // Nombre de la sala
    capacity: 0, // Capacidad máxima de personas en la sala
    availableAppointments: [], // Lista de turnos disponibles en la sala
    phone: "", // Número de teléfono del local
    priceBase: 0,
    dtoRoomHours: [],
    length: "",
    typeRoom: "",
    Width: "",
    openingHours: {
      monday: {
        isOpen: false,
        close: "",
        open: "",
      },
      tuesday: {
        isOpen: false,
        close: "",
        open: "",
      },
      wednesday: {
        isOpen: false,
        close: "",
        open: "",
      },
      thursday: {
        isOpen: false,
        close: "",
        open: "",
      },
      friday: {
        isOpen: false,
        close: "",
        open: "",
      },
      saturday: {
        isOpen: false,
        close: "",
        open: "",
      },
      sunday: {
        isOpen: false,
        close: "",
        open: "",
      },
    }, // Horario de apertura
    mainImage: {
      url: "",
      description: "",
    }, // Imagen principal del local
    additionalImages: [], // Lista de imágenes adicionales del local
    description: "", // Descripción del local
    services: [], // Lista de servicios que ofrece el local
  });

  const getClientHTTP = async () => {
    const res = await clientByID(clientSelector.id);
    if (res) {
      setClient(res);
    }
  };

  const get = async () => {
    if (idRoom) {
      const res = await getRoomHTTP(idRoom);
      if (res) {
        setRoom(res);
      }
    }
  };

  useEffect(() => {
    get();
    getClientHTTP();
    setIsLoading(false);
  }, []);

  const onClickDateSelect = () => {
    setIsDateSelect(!isDateSelect);
  };

  const filterByClientIdShifts = () => {
    return room.availableAppointments.filter((a) => a.client == client._id);
  };



  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className={RoomStyle.room_container}>
            <div key={room.name} className={RoomStyle.container_room}>
              <RoomInfo room={room} />
              <div className={RoomStyle.room_calendar_reservation}>
                <button className={RoomStyle.room_calendar_reservation_button}>Has tu reserva aquí</button>
              <DateSelector load={get} room={room} />
                
              </div>

              <div className={RoomStyle.room_calendar}>
              <button
                  className={RoomStyle.room_calendar_reservation_button}
                  onClick={onClickDateSelect}
                >
                  Mis Reservas
                </button>

                {isDateSelect ? <AppointmentCalendar
                  idClient={client._id}
                  _appointments={filterByClientIdShifts()}
                  idRoom={room._id}
                  dto={room.dtoRoomHours}
                  price={room.priceBase}
                  nameRoom={room.name}
                  capacity={room.capacity}
                  Width={room.Width}
                  length={room.length}
                /> : <></>}
                
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Room;
