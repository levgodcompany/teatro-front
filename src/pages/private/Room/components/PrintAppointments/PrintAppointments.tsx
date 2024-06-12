import { useEffect, useRef, useState } from "react";
import { IAppointment } from "../../../Rooms/services/Rooms.service";
import PrintAppointmentStyle from "./css/PrintAppointment.module.css";
import { useReactToPrint } from "react-to-print";
import Logo from "../../../../../assets/el_juvenil.svg";
import {
  AppointmentClientDTO,
  getAppointmentClientsHTTP,
} from "../../service/Room.service";

export interface IAppointmentPrint {
  _id: string;
  price: number;
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  title: string; // Título del turno
  description: string; // Descripción del turno
  available: boolean; // Para saber si el turno esta o no disponible
  GuestListClient: AppointmentClientDTO[]; // lista de invitados a al turno de clientes registrado en la app
}

interface PropPrint {
  appointment: IAppointment[];
  idRoom: string;
  name: string;
  capacity: number;
  onClose: () => void;
}

const PrintAppointments: React.FC<PropPrint> = ({
  appointment,
  idRoom,
  name,
  capacity,
  onClose,
}) => {
  const [appPrint, setAppPrint] = useState<IAppointmentPrint[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const http = async () => {
      for(const a of appointment) {
        console.log("a", a)
        const res = await getAppointmentClientsHTTP(idRoom, a._id);
        if (res) {
          setAppPrint((prev) => {

            const index = prev.findIndex(p => p._id == a._id);

            if(index != -1) {
              return prev;
            }

            return [...prev, {
              _id: a._id,
              available: a.available,
              date: new Date(a.date),
              description: a.description,
              end: new Date(a.end),
              price: a.price,
              GuestListClient: res,
              start: new Date(a.start),
              title: a.title,
            }];
          });
        }
      }

    };
    http();
  }, [appointment]);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const info = (prop: string, value: string | number) => {
    return (
      <div className={PrintAppointmentStyle.container_info}>
        <span className={`${PrintAppointmentStyle.info_prop}`}>{prop}:</span>
        <span className={PrintAppointmentStyle.info_value}>{value}</span>
      </div>
    );
  };

  const close = ()=> {
    setAppPrint([]);
    onClose()
  }

  return (
    <div className={PrintAppointmentStyle.container_print}>
      <div className={PrintAppointmentStyle.print}>
        <div ref={componentRef}>
          {appPrint.map((app) => {
            return (
              <div className={PrintAppointmentStyle.print_container}>
                {/* Logo y nombre */}
                <div className={PrintAppointmentStyle.print_header}>
                  <div
                    className={PrintAppointmentStyle.print_header_container_img}
                  >
                    <img width={120} src={Logo} alt="Logo" />
                  </div>
                </div>
                {/* Datos de la sala */}
                <div className={PrintAppointmentStyle.print_container_room}>
                  <hr />
                  <div>
                    <h2 className={PrintAppointmentStyle.title}>Sala</h2>
                  </div>
                  {info("Sala", name)}
                  {info("Capacidad max", capacity)}
                </div>
                <hr />
                {/* Datos del turno */}
                <div>
                  <div>
                    <h2 className={PrintAppointmentStyle.title}>
                      Datos del Evento
                    </h2>
                  </div>

                  <div>
                    {info("Nombre", app.title)}

                    <div className={PrintAppointmentStyle.container_info}>
                      <span className={`${PrintAppointmentStyle.info_prop}`}>
                        Descripción:
                      </span>
                      <span
                        className={PrintAppointmentStyle.info_value_description}
                      >
                        {app.description}
                      </span>
                    </div>

                    {app.end.getDate() !== app.start.getDate() ? (
                      <>
                        {info(
                          "Entrada",
                          `${formatDate(app.start)} ${formatTime(app.start)}`
                        )}
                        {info(
                          "Salida",
                          `${formatDate(app.end)} ${formatTime(app.end)}`
                        )}
                      </>
                    ) : (
                      <>
                        {info("Día", formatDate(app.date))}
                        {info("Hora de Entrada", formatTime(app.start))}
                        {info("Hora de Salida", formatTime(app.end))}
                      </>
                    )}
                  </div>
                </div>

                {/*Datos del cliente */}
                <div>
                  <div>
                    <h3 className={PrintAppointmentStyle.title}>
                      Participantes
                    </h3>
                  </div>

                  <div>
                    <table className={PrintAppointmentStyle.calendar}>
                      <tbody>
                        <tr>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Asistencia</th>
                        </tr>
                        {app.GuestListClient.map((c) => (
                          <tr>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>
                              {" "}
                              <input type="checkbox" name="" id="" />{" "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={PrintAppointmentStyle.container_buttons}>
        <button onClick={close}>Cancelar</button>
        <button onClick={handlePrint}>Imprimir</button>
      </div>
    </div>
  );
};

export default PrintAppointments;
