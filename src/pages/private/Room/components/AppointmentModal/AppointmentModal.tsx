import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import NewEventModalStyle from "./css/AppointmentModal.module.css";
import {
  DtoRoom,
  IAppointment,
  IDtoAppointment,
} from "../../../Rooms/services/Rooms.service";
import HoursImage from "../../../../../assets/clock-svgrepo-com.svg";
import { format } from "date-fns";
import CapacityClientImage from "../../../../../assets/users-svgrepo-com.svg";
import DimeImage from "../../../../../assets/dime.svg";
import { es } from "date-fns/locale";
import { useAppSelector } from "../../../../../redux/hooks";
import { IClientID } from "../../../../../redux/slices/ClientID.slice";
import { clientByID, IClient } from "../../../../../services/Auth.service";
import formateador from "../../../../../utilities/formateador";

interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (event: string) => void;
  capacity: number;
  event: IAppointment;
  price: number;
  dto: DtoRoom[];
  length: string;
  Width: string;
}

const AppointmentModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  event,
  capacity,
  price,
  Width,
  length
}) => {
  // State hooks for form fields
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState(event.start as Date);
  const [end, setEnd] = useState(event.end as Date);
  const [dtoRoom, setDtoRoom] = useState<IDtoAppointment | null>(null);


  const clientSelector: IClientID = useAppSelector((state) => state.clientID);

  const [client, setClient] = useState<IClient>({
    _id: "",
    email: "",
    name: "",
    phone: "",
    token: "",
  });

  // State hooks for client management
  const [inputValuePrice, setInputValuePrice] = useState<number>(price);


  const getClientHTTP = async () => {
    const res = await clientByID(clientSelector.id);
    if (res) {
      setClient(res);
    }
  };


  // Effect to sync event data with state
  useEffect(() => {
    getClientHTTP();


    setDtoRoom(event.dto);

    setTitle(event.title);
    setStart(event.start as Date);
    setEnd(event.end as Date);
    setInputValuePrice(event.price);


  }, [event]);

  // Effect to fetch clients data

  // Save handler for the modal
  const handleSave = () => {

    // Obtén la fecha y hora actual
    let now: Date = new Date();

    // Calcula la diferencia en milisegundos entre la fecha del turno y la fecha actual
    let diffInMillis: number = start.getTime() - now.getTime();

    // Calcula las horas a partir de la diferencia en milisegundos
    let diffInHours: number = diffInMillis / (1000 * 60 * 60);

    // Verifica si la diferencia es mayor a 24 horas
    if (diffInHours > 24 && client._id == event.client) {
      onSave(event._id);
    } else {
      alert("No puedes cancelar el turno, faltan menos de 24 horas.")
    }
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (date: Date): string => {
    // Formatear la fecha en el formato deseado
    const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: es });

    // Capitalizar la primera letra del resultado formateado
    return capitalizeFirstLetter(formattedDate);
  };

  const formatTime = (date: Date): string => {
    const formattedTime = format(date, "hh:mm a");

    return formattedTime.toLocaleLowerCase();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className={NewEventModalStyle.modal}
        overlayClassName={NewEventModalStyle.modal_overlay}
        onRequestClose={onRequestClose}
      >
        <div className={NewEventModalStyle.container}>
          <div className={NewEventModalStyle.container_form}>
            <div className={NewEventModalStyle.from_title}>
              <span>{title.split(";")[0]} {title.split(";")[1] ? title.split(";")[1] : "" }</span>
            </div>

            <div className={NewEventModalStyle.date_start}>
              <div className={NewEventModalStyle.container_image_hour}>
                <img
                  className={NewEventModalStyle.image_hour}
                  src={HoursImage}
                  alt="Clock"
                />
              </div>
              <div className={NewEventModalStyle.date_hour}>
                {end.getDate() !== start.getDate() ? (
                  <>
                    <span>{`${formatDate(start)} ⋅ ${formatTime(start)}`}</span>

                    <span>{`${formatDate(end)} ⋅ ${formatTime(end)}`}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {`${formatDate(start)}`} ⋅ {`${formatTime(start)}`} -{" "}
                      {`${formatTime(end)}`}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className={NewEventModalStyle.container_capacity_max}>
              <div className={NewEventModalStyle.container_image_hour}>
                <img
                  className={NewEventModalStyle.image_hour}
                  src={CapacityClientImage}
                  alt="users"
                />
              </div>
              <span>Capacidad para {capacity} personas</span>
            </div>

            <div className={NewEventModalStyle.container_capacity_max}>
              <div className={NewEventModalStyle.container_image_hour}>
                <img
                  className={NewEventModalStyle.image_hour}
                  src={DimeImage}
                  width={15}
                  alt="users"
                />
              </div>
              <span>
                Medidas <strong>{Width == length ? `${length} m²` : `${length}x${Width} m`}</strong>
              </span>
            </div>
              
              {
                client._id == event.client ? <div className={NewEventModalStyle.container_client}>
                <div className={NewEventModalStyle.autocomplete_select}>
                  <div className={NewEventModalStyle.container_availability}>
                    <p className={NewEventModalStyle.p_dto}>
                      {dtoRoom == null ? (
                        <>
                          <strong className={NewEventModalStyle.dto_price}>
                            {formateador.format(inputValuePrice)}
                          </strong>
                        </>
                      ) : (
                        <div className={NewEventModalStyle.dto_value}>
                          <span className={NewEventModalStyle.span_dto_value}>
                            {dtoRoom.dto}% dto.
                          </span>
  
                          <div>
                            <span className={NewEventModalStyle.p_span_dto}>
                              {formateador.format(dtoRoom.prevPrice)}
                            </span>{" "}
                            <strong className={NewEventModalStyle.dto_price}>
                              {formateador.format(dtoRoom.newPrice)}
                            </strong>
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              : <></>
              }
            

            <div className={NewEventModalStyle.container_buttons}>
              {
                client._id == event.client ? <>
                <button type="button" style={{backgroundColor: "#545454"}} onClick={handleSave}>
                Cancelar reserva
              </button>
              <button onClick={()=> onRequestClose()}>Aceptar</button>
                </> : <button style={{marginTop: "10px"}} onClick={()=> onRequestClose()}>Aceptar</button> 
              }
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppointmentModal;
