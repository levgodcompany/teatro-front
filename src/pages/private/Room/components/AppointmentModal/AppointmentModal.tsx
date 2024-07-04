import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import NewEventModalStyle from "./css/AppointmentModal.module.css";
import {
  DtoRoom,
  IAppointment,
  IDtoAppointment,
} from "../../../Rooms/services/Rooms.service";
import {
  ClientDTO,
  getClientsHTTP,
  getClientsRegisterHTTP,
} from "../../service/Room.service";
import HoursImage from "../../../../../assets/clock-svgrepo-com.svg";
import DescriptionImage from "../../../../../assets/text-description-svgrepo-com.svg";
import { format } from "date-fns";
import CapacityClientImage from "../../../../../assets/users-svgrepo-com.svg";
import DimeImage from "../../../../../assets/dime.svg";
import { es } from "date-fns/locale";
import { useAppSelector } from "../../../../../redux/hooks";

interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (event: string) => void;
  capacity: number;
  event: IAppointment;
  price: number;
  dto: DtoRoom[];
}

const AppointmentModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  event,
  capacity,
  price,
  dto,
}) => {
  // State hooks for form fields
  const [title, setTitle] = useState(event.title);
  const [available, setAvailable] = useState<boolean>(event.available);
  const [start, setStart] = useState(event.start as Date);
  const [end, setEnd] = useState(event.end as Date);
  const [dtoRoom, setDtoRoom] = useState<IDtoAppointment | null>(null);

  const clientState = useAppSelector(state => state.client);

  // State hooks for client management
  const [inputValuePrice, setInputValuePrice] = useState<number>(price);


  const [isAplicDto, setIsAplicDto] = useState<DtoRoom | null>(null);

  // Effect to sync event data with state
  useEffect(() => {
    const ahora = new Date();
    const val = new Date(event.start as Date);

    if (
      val.getDay() >= ahora.getDay() &&
      val.getMonth() >= ahora.getMonth() &&
      val.getFullYear() >= ahora.getFullYear()
    ) {
      const formattedTime = val.toTimeString().split(" ")[0]; // "HH:MM:SS"
      const hourMinute = formattedTime.substring(0, 5);

      const roomWithDiscount = isTimeWithinAnyRange(hourMinute, dto);
      if (roomWithDiscount) {
        setIsAplicDto(roomWithDiscount);
      } else {
        setIsAplicDto(null);
      }
    }

    setDtoRoom(event.dto);

    setTitle(event.title);
    setAvailable(event.available);
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
    if (diffInHours > 24 && clientState._id == event.client) {
      onSave(event._id);
    } else {
      alert("No puedes cancelar el turno, faltan menos de 24 horas.")
    }
  };

  const isTimeWithinAnyRange = (
    time: string,
    rooms: DtoRoom[]
  ): DtoRoom | null => {
    return (
      rooms.find((room) => {
        const startTime = new Date(`1970-01-01T${room.startHour}:00`);
        const endTime = new Date(`1970-01-01T${room.endHour}:00`);
        const checkTime = new Date(`1970-01-01T${time}:00`);
        return checkTime >= startTime && checkTime < endTime;
      }) || null
    );
  };

  const formateador = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

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
              <span>{title}</span>
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
                Medidas <strong>20x30 m</strong>
              </span>
            </div>

            <div className={NewEventModalStyle.container_client}>
              <div className={NewEventModalStyle.autocomplete_select}>
                <div className={NewEventModalStyle.container_availability}>
                  <p className={NewEventModalStyle.p_dto}>
                    {dtoRoom == null ? (
                      <>
                        <strong className={NewEventModalStyle.dto_price}>
                          ${formateador.format(inputValuePrice)}
                        </strong>
                      </>
                    ) : (
                      <div className={NewEventModalStyle.dto_value}>
                        <span className={NewEventModalStyle.span_dto_value}>
                          {dtoRoom.dto}% dto.
                        </span>

                        <div>
                          <span className={NewEventModalStyle.p_span_dto}>
                            ${formateador.format(dtoRoom.prevPrice)}
                          </span>{" "}
                          <strong className={NewEventModalStyle.dto_price}>
                            ${formateador.format(dtoRoom.newPrice)}
                          </strong>
                        </div>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className={NewEventModalStyle.container_buttons}>
              {
                clientState._id == event.client ? <button type="button" onClick={handleSave}>
                Cancelar reserva
              </button> : <button onClick={()=> onRequestClose()}>Aceptar</button> 
              }
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppointmentModal;
