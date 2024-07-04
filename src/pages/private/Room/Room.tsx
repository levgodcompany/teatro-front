import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import InfoRoom from "../Rooms/components/Card_B/InfoRoom";
import { IAppointment, IRoom } from "../Rooms/services/Rooms.service";
import { getRoomHTTP } from "./service/Room.service";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import RoomStyle from "./css/Room.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoomInfo from "./components/RoomInfo/RoomInfo";
import DateSelector from "./components/DateSelector/DateSelector";
import { useAppSelector } from "../../../redux/hooks";
import Footer from "../../../components/Footer/Footer";

interface ISelects {
  id: string;
  year: number;
  month: number;
  days: string[];
}

const Room = () => {
  const location = useLocation();
  const idRoom = new URLSearchParams(location.search).get("id");

  const [isDateSelect, setIsDateSelect] = useState<boolean>(false);

  const clientState = useAppSelector(state => state.client);
  const [selectOptionFilter, setSelecOptionFilter] = useState<string>("Todo")

  const [room, setRoom] = useState<IRoom>({
    _id: "",
    name: "", // Nombre de la sala
    capacity: 0, // Capacidad máxima de personas en la sala
    availableAppointments: [], // Lista de turnos disponibles en la sala
    phone: "", // Número de teléfono del local
    priceBase: 0,
    dtoRoomHours: [],
    length: 0,
    typeRoom: "",
    Width: 0,
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
  }, []);

  const onClickDateSelect = () => {
    setIsDateSelect(!isDateSelect);
  };

  const filterClientShifts = (sel) => {
    const val = sel.target.value;
    if(val == "Todo") {
      get();
    }else {
      const f = room.availableAppointments.filter(a => a.client == clientState._id);
      setRoom({
        ...room,
        availableAppointments: f
      })
    }
    setSelecOptionFilter(sel.target.value)
  }

  return (
    <>
      <Header />

      <div className={RoomStyle.room_container}>
        <div key={room.name} className={RoomStyle.container_room}>
          <RoomInfo room={room} />
          <div className={RoomStyle.room_calendar_reservation}>
            <p onClick={onClickDateSelect}>
              As tu reserva <strong>aquí</strong>
            </p>

            {isDateSelect ? <DateSelector load={get} room={room} /> : <></>}
          </div>
          <div className={RoomStyle.container_select}>
            <select
              onChange={filterClientShifts}
              value={selectOptionFilter}
              className={RoomStyle.select}
            >
              <option
                className={RoomStyle.select_option}
                value="Todo"
              >
                Todo
              </option>
              <option
                className={RoomStyle.select_option}
                value="filt"
              >
                Mis turnos
              </option>
            </select>
          </div>
          <div className={RoomStyle.room_calendar}>
            <AppointmentCalendar
              _appointments={room.availableAppointments}
              idRoom={room._id}
              dto={room.dtoRoomHours}
              price={room.priceBase}
              nameRoom={room.name}
              capacity={room.capacity}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Room;
