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

interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (event: IAppointment) => void;
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
  const [description, setDescription] = useState(event.description);
  const [start, setStart] = useState(event.start as Date);
  const [end, setEnd] = useState(event.end as Date);
  const [dtoRoom, setDtoRoom] = useState<IDtoAppointment | null>(null);

  // State hooks for client management
  const [inputValuePrice, setInputValuePrice] = useState<number>(price);
  const [selectedClients, setSelectedClients] = useState<ClientDTO[]>([]);
  const [selectedClientOrganizer, setSelectedClientOrganizer] =
    useState<ClientDTO>({
      id: "",
      name: "",
      email: "",
      phone: "",
      isRegister: true,
    });

  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [clientsRegister, setClientsRegister] = useState<ClientDTO[]>([]);

  const [isAplicDtoCheck, setIsAplicDtoCheck] = useState<boolean>(false);

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
    setDescription(event.description);
    setStart(event.start as Date);
    setEnd(event.end as Date);
    setInputValuePrice(event.price);

    if (event.client) {
      const organizerIndex = clientsRegister.findIndex(
        (cl) => cl.id === event.client
      );
      if (organizerIndex !== -1) {
        setSelectedClientOrganizer(clientsRegister[organizerIndex]);
      } else {
        setSelectedClientOrganizer({
          id: "",
          name: "",
          email: "",
          phone: "",
          isRegister: true,
        });
      }
    } else {
      setSelectedClientOrganizer({
        id: "",
        name: "",
        email: "",
        phone: "",
        isRegister: true,
      });
    }

    const selectedEventClients: ClientDTO[] = [];
    if (event.GuestListClient.length > 0) {
      clients.forEach((client) => {
        if (event.GuestListClient.includes(client.id)) {
          selectedEventClients.push(client);
        }
      });
    }

    if (event.GuestListNotClient.length > 0) {
      clientsRegister.forEach((client) => {
        if (event.GuestListNotClient.includes(client.id)) {
          selectedEventClients.push(client);
        }
      });
    }
    setSelectedClients(selectedEventClients);
  }, [event, clients, clientsRegister]);

  // Effect to fetch clients data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const [clientsData, clientsRegisterData] = await Promise.all([
          getClientsHTTP(),
          getClientsRegisterHTTP(),
        ]);
        setClients(clientsData || []);
        setClientsRegister(clientsRegisterData || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Save handler for the modal
  const handleSave = () => {
    const organizerId =
      selectedClientOrganizer.id === "" ? null : selectedClientOrganizer.id;
    const selectedClientIds: string[] = [];
    const selectedNotClientIds: string[] = [];

    selectedClients.forEach((client) => {
      if (client.isRegister) {
        selectedClientIds.push(client.id);
      } else {
        selectedNotClientIds.push(client.id);
      }
    });

    let val = 0;

    if (inputValuePrice > 0) {
      val = inputValuePrice;
    } else {
      val = price;
    }

    onSave({
      ...event,
      title,
      start,
      end,
      description,
      price: val,
      available,
      client: organizerId,
      GuestListClient: selectedClientIds,
      GuestListNotClient: selectedNotClientIds,
    });
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

            {description.length > 0 ? (
              <div className={NewEventModalStyle.container_info}>
                <div className={NewEventModalStyle.container_image_description}>
                  <img
                    className={NewEventModalStyle.image_description}
                    src={DescriptionImage}
                    alt="Description"
                  />
                </div>
                <div className={NewEventModalStyle.container_info_description}>
                  <span
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></span>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className={NewEventModalStyle.container_buttons}>
              <button type="button" onClick={handleSave}>
                Reservar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppointmentModal;
