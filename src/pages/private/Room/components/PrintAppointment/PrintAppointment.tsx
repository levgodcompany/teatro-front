import { useEffect, useRef, useState } from "react";
import { IAppointment } from "../../../Rooms/services/Rooms.service";
import PrintAppointmentStyle from "./css/PrintAppointment.module.css";
import { useReactToPrint } from "react-to-print";
import Logo from "../../../../../assets/el_juvenil.svg";
import {
  AppointmentClientDTO,
  getAppointmentClientOrganizadorHTTP,
  getAppointmentClientsHTTP,
} from "../../service/Room.service";

interface PropPrint {
  appointment: IAppointment;
  idRoom: string;
  name: string;
  capacity: number;
  onClose: () => void;
}

const PrintAppointment: React.FC<PropPrint> = ({
  appointment,
  idRoom,
  name,
  capacity,
  onClose,
}) => {
  const [clients, setClient] = useState<AppointmentClientDTO[]>([]);
  const [clientOrg, setClientOrg] = useState<AppointmentClientDTO>({
    id: "",
    email: "",
    name: "",
    phone: "",
  });
  const [app, setApp] = useState<IAppointment>({
    _id: "",
    price: 0,
    available: false,
    client: null,
    date: new Date(),
    description: "",
    end: new Date(),
    start: new Date(),
    title: "",
    GuestListClient: [],
    GuestListNotClient: [],
  });
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const http = async () => {
      const res = await getAppointmentClientsHTTP(idRoom, appointment._id);
      if (res) {
        setApp(appointment);
        setClient(res);
      }

      const or = await getAppointmentClientOrganizadorHTTP(
        idRoom,
        appointment._id
      );
      if (or) {
        setClientOrg(or);
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

  const startDate = app.start;
  const endDate = app.end;

  return (
    <div className={PrintAppointmentStyle.container_print}>
      <div className={PrintAppointmentStyle.print}>
        <div
          className={PrintAppointmentStyle.print_container}
          ref={componentRef}
        >
          {/* Logo y nombre */}
          <div className={PrintAppointmentStyle.print_header}>
            <div className={PrintAppointmentStyle.print_header_container_img}>
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
            {info("Capacidad máx.", capacity)}
            {info("Valor de sala", "$1500")}
          </div>
          <hr />
          {/* Datos del turno */}
          <div>
            <div>
              <h2 className={PrintAppointmentStyle.title}>Datos del Evento</h2>
            </div>

            <div>
              {info("Nombre", app.title)}

              <div className={PrintAppointmentStyle.container_info}>
                <span className={`${PrintAppointmentStyle.info_prop}`}>
                  Descripción:
                </span>
                <span
                  className={PrintAppointmentStyle.info_value_description}
                  dangerouslySetInnerHTML={{ __html: app.description }}
                ></span>
              </div>

              {info(
                "Participantes totales",
                clients.length + (clientOrg.id != "" ? 1 : 0)
              )}

              {endDate.getDate() !== startDate.getDate() ? (
                <>
                  {info(
                    "Entrada",
                    `${formatDate(startDate)} ${formatTime(startDate)}`
                  )}
                  {info(
                    "Salida",
                    `${formatDate(endDate)} ${formatTime(endDate)}`
                  )}
                </>
              ) : (
                <>
                  {info("Día", formatDate(app.date))}
                  {info("Hora de Entrada", formatTime(app.start))}
                  {info("Hora de Salida", formatTime(endDate))}
                </>
              )}
            </div>
          </div>

          {/*Datos del cliente */}
          <div>
            <div>
              <h3 className={PrintAppointmentStyle.title}>Organizador</h3>
            </div>

            <div>
              <table className={PrintAppointmentStyle.calendar}>
                <tbody>
                  <tr>
                    <th>Nombre</th>
                    <th>E-mail</th>
                    <th>Cel.</th>
                    <th className={PrintAppointmentStyle.th_input_check}>
                      Confirmación de Asistencia
                    </th>
                    <th className={PrintAppointmentStyle.th_input_check}>
                      Asistencia
                    </th>
                  </tr>
                  {
                    <tr>
                      <td>{clientOrg.name}</td>
                      <td>{clientOrg.email}</td>
                      <td>{clientOrg.phone}</td>
                      <td>
                        {" "}
                        <input type="checkbox" checked name="" id="" />{" "}
                      </td>
                      <td>
                        {" "}
                        <input type="checkbox" name="" id="" />{" "}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/*Datos del cliente */}
          <div>
            <div>
              <h3 className={PrintAppointmentStyle.title}>Invitados</h3>
            </div>

            <div>
              <table className={PrintAppointmentStyle.calendar}>
                <tbody>
                  <tr>
                    <th>Nombre</th>
                    <th>E-mail</th>
                    <th>Cel.</th>
                    <th>Asistencia</th>
                  </tr>
                  {clients.map((c) => (
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
      </div>

      <div className={PrintAppointmentStyle.container_buttons}>
        <button onClick={() => onClose()}>Cancelar</button>
        <button onClick={handlePrint}>Imprimir</button>
      </div>
    </div>
  );
};

export default PrintAppointment;
