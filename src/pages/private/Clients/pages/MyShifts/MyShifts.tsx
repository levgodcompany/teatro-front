import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { getAllRoomHTTP } from "../../services/Client.service";
import { IAppointment, IRoom } from "../../../Rooms/services/Rooms.service";
import { Header } from "../../../../../components/Header/Header";
import Footer from "../../../../../components/Footer/Footer";
import { clientByID, IClient } from "../../../../../services/Auth.service";
import { IClientID } from "../../../../../redux/slices/ClientID.slice";
import MyShiftsStyle from "./MyShifts.module.css"; // Importa el archivo de estilos CSS
import { deleteAppointmentHTTP } from "../../../Room/service/Room.service";
import Loading from "../../../../../components/Loading/Loading";
import Card from "./components/Card";

const MyShifts = () => {
  const clientSelector: IClientID = useAppSelector((state) => state.clientID);
  const [client, setClient] = useState<IClient>({
    _id: "",
    email: "",
    name: "",
    phone: "",
    token: "",
  });
  const [rooms, setRooms] = useState<IRoom[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  const getClientHTTP = async () => {
    const res = await clientByID(clientSelector.id);

    if (res) {
      setClient(client);
    }
  };

  const getRooms = async () => {
    const res = await getAllRoomHTTP();

    if (res) {
      const filterRooms = res.map((r) => {
        r.availableAppointments = r.availableAppointments.filter(
          (app) => app.client == clientSelector.id
        );

        r.availableAppointments = r.availableAppointments.map((app) => {
          app.start = new Date(app.start);
          app.date = new Date(app.date);
          app.end = new Date(app.end);
          return app;
        });

        return r;
      });
      setRooms(filterRooms);
    }
  };

  useEffect(() => {
    getClientHTTP();
    getRooms();
    setIsLoading(false)
  }, []);

  const cancelShifts = async (idRoom: string, id:string)=> {
    const res = await deleteAppointmentHTTP(idRoom, id);
    if(res) {
      getRooms();
    }
  }


  const formateador = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const tableView = (idRoom: string, appointments: IAppointment[]) => {
    const now: Date = new Date();

    const formatNumberDate = (num: number) => {
      if (num < 10) return `0${num}`;
      return `${num}`;
    };

    const getFormatDay = (num: number) => {
      switch (num) {
        case 0:
          return "Domingo";
        case 1:
          return "Lunes";
        case 2:
          return "Martes";
        case 3:
          return "Miércoles";
        case 4:
          return "Jueves";
        case 5:
          return "Viernes";
        case 6:
          return "Sábado";
        default:
          return "";
      }
    };

    const isCancel = (start: Date) => {
      let diffInMillis: number = start.getTime() - now.getTime();
      let diffInHours: number = diffInMillis / (1000 * 60 * 60);
      return diffInHours > 24;
    };

    return (
      <table className={MyShiftsStyle.table_appointment}>
        <thead className={MyShiftsStyle.table_appointment_head}>
          <tr className={MyShiftsStyle.table_appointment_head_tr}>
            <th>Fecha</th>
            <th>Día</th>
            <th>Hora Entrada</th>
            <th>Hora Salida</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Cancelar Reserva</th>
          </tr>
        </thead>
        <tbody className={MyShiftsStyle.table_appointment_body}>
          {appointments
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((app) => (
              <tr
                className={MyShiftsStyle.table_appointment_body_tr}
                key={app._id}
              >
                <td>
                  {formatNumberDate(app.date.getDate())}/
                  {formatNumberDate(app.date.getMonth() + 1)}/
                  {app.date.getFullYear()}
                </td>
                <td>{getFormatDay(app.date.getDay())}</td>
                <td>
                  {formatNumberDate(app.start.getHours())}:
                  {formatNumberDate(app.start.getMinutes())}
                </td>
                <td>
                  {formatNumberDate(app.end.getHours())}:
                  {formatNumberDate(app.end.getMinutes())}
                </td>
                <td>
                  {app.dto ? (
                    <span className={MyShiftsStyle.del_price}>
                      <del>${formateador.format(app.price)}</del>
                    </span>
                  ) : (
                    <span className={MyShiftsStyle.price}>{formateador.format(app.price)}</span>
                  )}
                </td>
                <td>{app.dto ? `${app.dto.dto}%` : ""}</td>
                <td>
                  {app.dto ? <span className={MyShiftsStyle.price}>{`$${formateador.format(app.dto.newPrice)}`}</span> : ""}
                </td>
                <td>
                  {isCancel(app.start) ? (
                    <button className={MyShiftsStyle.button_cancel} onClick={()=> cancelShifts(idRoom, app._id)}>
                      Cancelar
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const infoRoom = (room: IRoom) => {
    const info = (prop: string, value: string) => (
      <div className={MyShiftsStyle.info} key={prop}>
        <span className={MyShiftsStyle.info_prop}>{prop}:</span>
        <span className={MyShiftsStyle.info_value}>{value}</span>
      </div>
    );

    return (
      <>
      <div className={MyShiftsStyle.container_room} key={room._id}>
        <div className={MyShiftsStyle.room_info}>
        <p>{room.name}</p>
          {info("Tipo de sala", room.typeRoom)}
          {info(
            "Medidas",
            room.length === room.Width
              ? `${room.length} m²`
              : `${room.length}x${room.Width} m`
          )}
          {info("Capacidad máx.", `${room.capacity}`)}
          
        </div>
        <div className={MyShiftsStyle.container_appointments}>
          {room.availableAppointments.length > 0 ? (
            tableView(room._id, room.availableAppointments)
          ) : (
            <p>No hay reservas en esta sala</p>
          )}
        </div>
      </div>

      </>
    );
  };

  const infoRoomNotApp = (room: IRoom) => {

    return (
      <>
      <Card title={room.name} roomType={room.typeRoom} dimensions={room.Width == room.length ? `${room.length}m²` : `${room.length}x${room.Width} m`} maxCapacity={room.capacity} />

      </>
    );
  };

  const roomsWithAppAnNotApp = (rooms:IRoom[])=> {

    const roomsWith: IRoom[] = []
    const roomsNotWith: IRoom[] = [];

    for(const room of rooms) {
      if(room.availableAppointments.length>0) {
        roomsWith.push(room)
      }else {
        roomsNotWith.push(room)
      }
    }

    return [roomsWith, roomsNotWith]

  }

  return (
    <>
    {
      isLoading ? <Loading /> : <>      <Header />
      <div className={MyShiftsStyle.container}>
        <div className={MyShiftsStyle.container_rooms}>

          <div className={MyShiftsStyle.container_rooms_not_app}>
            {
              roomsWithAppAnNotApp(rooms)[1].map(room=> (
                <React.Fragment key={room._id}>{infoRoomNotApp(room)}</React.Fragment>
              ) )
            }

          </div>
          <div className={MyShiftsStyle.container_rooms_app}>
            {roomsWithAppAnNotApp(rooms)[0].map((room) => (
              <React.Fragment key={room._id}>{infoRoom(room)}</React.Fragment>
            ))}

          </div>
        </div>
      </div>
      <Footer /></>
    }

    </>
  );
};

export default MyShifts;
