import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import NewEventModalStyle from "./NewEventModal.module.css";
import {
  DtoRoom,
  IAppointment,
} from "../../../../Rooms/services/Rooms.service";
import HoursImage from "../../../../../../assets/clock-svgrepo-com.svg";
import DescriptionImage from "../../../../../../assets/text-description-svgrepo-com.svg";
import UserImage from "../../../../../../assets/user-1-svgrepo-com.svg";
import {
  ClientDTO,
  getClientsHTTP,
  getClientsRegisterHTTP,
  postNotClientsHTTP,
} from "../../../service/Room.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface NewEventModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (event: IAppointment) => void;
  event: IAppointment;
  capacity: number;
  price: number;
  dto: DtoRoom[];
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  event,
  capacity,
  price,
  dto,
}) => {
  const [title, setTitle] = useState(event.title || "");
  const [available, setAvailable] = useState<boolean>(event.available);
  const [isAplicDtoCheck, setIsAplicDtoCheck] = useState<boolean>(false);
  const [description, setDescription] = useState(event.description || "");
  const [start, setStart] = useState(event.start as Date);
  const [end, setEnd] = useState(event.end as Date);

  const [inputValue, setInputValue] = useState<string>("");
  const [inputValuePrice, setInputValuePrice] = useState<number>(price);
  const [inputValueOrganizer, setInputValueOrganizer] = useState<string>("");
  const [selectedClients, setSelectedClients] = useState<ClientDTO[]>([]);
  const [isAddDescription, setIsAddDescription] = useState<boolean>(false);
  const [selectedClientOrganizer, setSelectedClientOrganizer] =
    useState<ClientDTO>({
      id: "",
      name: "",
      email: "",
      phone: "",
      isRegister: true,
    });

  const [isOpenNewNotClient, setIsOpenNewNotClient] = useState<boolean>(false);
  const [newNotClient, setNewNotClient] = useState<ClientDTO>({
    id: "",
    name: "",
    email: "",
    phone: "",
    isRegister: false,
  });

  const [clients, setClients] = useState<ClientDTO[]>([]);
  const [clientsRegister, setClientsRegister] = useState<ClientDTO[]>([]);

  const [isAplicDto, setIsAplicDto] = useState<DtoRoom | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValuePrice(Number.parseInt(e.target.value));
  };

  const handleInputOrganizerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValueOrganizer(e.target.value);
  };

  const handleOptionClick = (client: ClientDTO) => {
    if (
      !selectedClients.some(
        (selectedClient) => selectedClient.id === client.id
      ) &&
      selectedClients.length + 2 <= capacity
    ) {
      setSelectedClients((prev) => [...prev, client]);
    }
    setInputValue("");
  };

  const handleOptionOrganizerClick = (client: ClientDTO) => {
    setSelectedClientOrganizer(client);
    setInputValueOrganizer("");
  };

  const handleRemoveOption = (client: ClientDTO) => {
    setSelectedClients((prev) =>
      prev.filter((selectedClient) => selectedClient.email !== client.email)
    );
  };

  const handleRemoveOrganizerOption = () => {
    setSelectedClientOrganizer({
      id: "",
      name: "",
      email: "",
      phone: "",
      isRegister: true,
    });
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      client.email.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredClientsRegister = clientsRegister.filter(
    (client) =>
      client.name.toLowerCase().includes(inputValueOrganizer.toLowerCase()) ||
      client.email.toLowerCase().includes(inputValueOrganizer.toLowerCase())
  );

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleAddNewClient = () => {
    if (isValidEmail(inputValue) && selectedClients.length + 2 <= capacity) {
      const newClient: ClientDTO = {
        id: "",
        name: "",
        email: inputValue,
        phone: "",
        isRegister: false,
      };

      const isEmailInList = selectedClients.some(
        (client) => client.email.toLowerCase() === inputValue.toLowerCase()
      );

      if (isEmailInList) {
        alert("El correo ya está registrado en la lista");
      } else {
        setSelectedClients((prev) => [...prev, newClient]);
        setInputValue("");
      }
    } else {
      alert("Correo electrónico no válido");
    }
  };

  const handleSave = () => {
    const idClientOrg =
      selectedClientOrganizer.id == "" ? null : selectedClientOrganizer.id;
    const idSelectClients: string[] = [];
    const idSelectNotClients: string[] = [];

    selectedClients.forEach((client) => {
      if (client.isRegister) {
        idSelectClients.push(client.id);
      } else {
        idSelectNotClients.push(client.id);
      }
    });

    if (
      idClientOrg == null &&
      (idSelectClients.length > 0 || idSelectNotClients.length > 0)
    ) {
      alert(
        "Tienes que agregar a un Organiizador, para poder invitar a mas gente"
      );
    } else {
      let val = 0;

      if (inputValuePrice > 0) {
        val = inputValuePrice;
      } else {
        val = price;
      }

      if (isAplicDto && isAplicDtoCheck) {
        if (inputValuePrice > 0) {
          val = inputValuePrice - (isAplicDto.dto / 100) * inputValuePrice;
        } else {
          val = price - (isAplicDto.dto / 100) * price;
        }
      }

      onSave({
        ...event,
        title,
        start,
        end,
        description,
        available,
        price: val,
        client: idClientOrg,
        GuestListClient: idSelectClients,
        GuestListNotClient: idSelectNotClients,
      });
    }
  };

  const addInfoNotClient = (client: ClientDTO) => {
    setIsOpenNewNotClient(true);
    setNewNotClient(client);
  };

  const saveNewNotClient = async () => {
    try {
      await postNotClientsHTTP(newNotClient);
      setSelectedClients((prev) =>
        prev.map((client) =>
          client.email === newNotClient.email ? newNotClient : client
        )
      );
      setClients((prev) => [...prev, newNotClient]);
      setIsOpenNewNotClient(false);
    } catch (error) {
      console.error("Error saving new client:", error);
    }
  };

  const handleInputNameNewNotClient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewNotClient((prev) => ({
      ...prev,
      name: e.target.value,
    }));
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
        console.log("checkTime > startTime", checkTime > startTime);
        console.log("checkTime < endTime", checkTime < endTime);
        return checkTime >= startTime && checkTime < endTime;
      }) || null
    );
  };

  const handelDateStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ahora = new Date();
    const val = new Date(e.target.value);

    if (
      val.getDay() >= ahora.getDay() &&
      val.getMonth() >= ahora.getMonth() &&
      val.getFullYear() >= ahora.getFullYear()
    ) {
      const formattedTime = val.toTimeString().split(" ")[0]; // "HH:MM:SS"
      const hourMinute = formattedTime.substring(0, 5); // "HH:MM"
      console.log(dto);
      const roomWithDiscount = isTimeWithinAnyRange(hourMinute, dto);
      if (roomWithDiscount) {
        setIsAplicDto(roomWithDiscount);
      } else {
        setIsAplicDto(null);
      }

      setStart(val);
    } else {
      console.log("La fecha es anterior a la fecha actual");
    }
  };

  const handelDateEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = new Date(e.target.value);
    if (
      val.getDay() >= start.getDay() &&
      val.getMonth() >= start.getMonth() &&
      val.getFullYear() >= start.getFullYear()
    ) {
      setEnd(val);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const viewDto = () => {
    if (isAplicDto && isAplicDtoCheck) {
      if (inputValuePrice > 0) {
        return (
          <p className={NewEventModalStyle.p_dto}>
            <span className={NewEventModalStyle.p_span_dto}>
              ${inputValuePrice}
            </span>{" "}
            <strong>
              ${inputValuePrice - (isAplicDto.dto / 100) * inputValuePrice}
            </strong>
          </p>
        );
      }

      return (
        <p className={NewEventModalStyle.p_dto}>
          <span className={NewEventModalStyle.p_span_dto}>${price}</span>{" "}
          <strong>${price - (isAplicDto.dto / 100) * price}</strong>
        </p>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className={NewEventModalStyle.modal}
      overlayClassName={NewEventModalStyle.modal_overlay}
      onRequestClose={onRequestClose}
    >
      <div className={NewEventModalStyle.container}>
        <div className={NewEventModalStyle.container_form}>
          <div className={NewEventModalStyle.from_title}>
            <input
              type="text"
              placeholder="Añade un título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
              <input
                type="datetime-local"
                value={moment(start).format("YYYY-MM-DDTHH:mm")}
                onChange={handelDateStart}
              />
              <span>-</span>
              <input
                type="datetime-local"
                value={moment(end).format("YYYY-MM-DDTHH:mm")}
                onChange={handelDateEnd}
              />
            </div>
          </div>

          {isAddDescription ? (
            <div className={NewEventModalStyle.container_info}>
              <div className={NewEventModalStyle.container_image_description}>
                <img
                  className={NewEventModalStyle.image_description}
                  src={DescriptionImage}
                  alt="Description"
                />
              </div>

              <div className={NewEventModalStyle.container_info_description}>
                <ReactQuill
                  className={NewEventModalStyle.container_info_description_des}
                  value={description}
                  onChange={handleDescriptionChange}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "bold",
                    "italic",
                    "underline",
                    "list",
                    "bullet",
                    "link",
                  ]}
                />
              </div>
            </div>
          ) : (
            <div className={NewEventModalStyle.container_info_add}>
              <div className={NewEventModalStyle.container_image_description}>
                <img
                  className={NewEventModalStyle.image_description}
                  src={DescriptionImage}
                  alt="Description"
                />
              </div>
              <div onClick={() => setIsAddDescription(true)}>
                <span className={NewEventModalStyle.add_description}>
                  Agregar descripción
                </span>
              </div>
            </div>
          )}

          <div className={NewEventModalStyle.container_capacity_max}>
            <span>
              Capacidad máx. de Personas: <strong>{capacity}</strong>
            </span>
          </div>

          <div className={NewEventModalStyle.container_client}>
            <div className={NewEventModalStyle.container_image_client}>
              <img
                className={NewEventModalStyle.image_client}
                src={UserImage}
                alt="User"
              />
            </div>
            <div className={NewEventModalStyle.autocomplete_select}>
              <input
                type="text"
                value={inputValueOrganizer}
                onChange={handleInputOrganizerChange}
                placeholder="Añade organizador"
                className={NewEventModalStyle.input}
              />
              {inputValueOrganizer && (
                <ul className={NewEventModalStyle.options_list}>
                  {filteredClientsRegister.map((client) => (
                    <li
                      key={client.id}
                      onClick={() => handleOptionOrganizerClick(client)}
                    >
                      <span>{client.name}</span>
                      <span>{client.email}</span>
                    </li>
                  ))}
                </ul>
              )}
              {selectedClientOrganizer.id && (
                <ul className={NewEventModalStyle.selected_options}>
                  <li className={NewEventModalStyle.selected_option}>
                    <>
                      <span>{selectedClientOrganizer.name} *</span>
                      <button
                        onClick={handleRemoveOrganizerOption}
                        className={NewEventModalStyle.remove_button}
                      >
                        Remove
                      </button>
                    </>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className={NewEventModalStyle.container_capacity_max}>
            <span>Precio del Turno</span>
          </div>
          <div className={NewEventModalStyle.container_client}>
            <div className={NewEventModalStyle.container_image_client}>
              <span className={NewEventModalStyle.container_image_client_price}>
                $
              </span>
            </div>
            <div className={NewEventModalStyle.autocomplete_select}>
              <input
                type="number"
                value={inputValuePrice}
                onChange={handleInputPriceChange}
                placeholder="Añade Valor"
                className={NewEventModalStyle.input}
              />
            </div>
          </div>
          <div className={NewEventModalStyle.container_price_app}>
            <span>
              Si el valor es 0 se tomara el precio base de la sala:{" "}
              <strong>${price}</strong>
            </span>
          </div>

          {isAplicDto != null ? (
            <>
              <div className={NewEventModalStyle.container_availability}>
                <label className={NewEventModalStyle.availability_label}>
                  Aplicar descuento del {isAplicDto.dto}%
                </label>
                <input
                  type="checkbox"
                  name="available"
                  checked={isAplicDtoCheck}
                  onChange={(e) => setIsAplicDtoCheck(e.target.checked)}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {isAplicDtoCheck && isAplicDto ? viewDto() : <></>}

          <div className={NewEventModalStyle.container_availability}>
            <label className={NewEventModalStyle.availability_label}>
              Disponible:
            </label>
            <input
              type="checkbox"
              name="available"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </div>
          <div className={NewEventModalStyle.container_buttons}>
            <button type="button" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewEventModal;
