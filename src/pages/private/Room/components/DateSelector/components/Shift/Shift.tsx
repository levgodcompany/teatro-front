import { useEffect, useState } from "react";
import ShiftStyle from "./Shift.module.css";
import CapacityClientImage from "../../../../../../../assets/users-svgrepo-com.svg";
import DimeImage from "../../../../../../../assets/dime.svg";
import HoursImage from "../../../../../../../assets/clock-svgrepo-com.svg";
import { useAppSelector } from "../../../../../../../redux/hooks";
import {
  IAppointment,
  IRoom,
} from "../../../../../Rooms/services/Rooms.service";
import {
  getAppointmentHTTP,
  saveAppointmentsHTTP,
} from "../../../../service/Room.service";
import ConflitDays from "./components/ConflitDays";
import { IClientID } from "../../../../../../../redux/slices/ClientID.slice";
import {
  clientByID,
  IClient,
} from "../../../../../../../services/Auth.service";

interface ISelects {
  id: string;
  year: number;
  month: number;
  days: string[];
}

interface IDaysSel {
  day: number;
  start: Date;
  end: Date;
}

interface IDaysSelConflict {
  day: number;
  start: Date;
  end: Date;
  dataDay: string;
}

interface IShiftProps {
  isOpen: boolean;
  room: IRoom;
  onRequestClose: () => void;
  daysSelect: ISelects;
  days: number[];
  updateDay: (daysSelect: number) => void;
}

const Shift: React.FC<IShiftProps> = ({
  days,
  onRequestClose,
  room,
  daysSelect,
  updateDay,
}) => {
  const [dataDaySelects, setDataDaySelects] = useState<IDaysSel[]>([]);
  const [dayConflict, setDayConflict] = useState<IDaysSelConflict[]>([]);

  const [client, setClient] = useState<IClient>({
    _id: "",
    token: "",
    email: "",
    name: "",
    phone: "",
  });
  const clientIDSelector: IClientID = useAppSelector((state) => state.clientID);
  const [isOpenConflict, setIsOpenConflict] = useState<boolean>(false);

  const [isReservation, setIsReservation] = useState<boolean>(false)

  const [isSave, setIsSave] = useState<boolean>(false);

  const [newsAppointments, setNewAppointment] = useState<IAppointment[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [inputValueTimeStart, setInputValueTimeStart] = useState("");
  const [showOptionsTimeStart, setShowOptionsTimeStart] = useState(false);

  const [inputValueTimeEnd, setInputValueTimeEnd] = useState("");
  const [showOptionsTimeEnd, setShowOptionsTimeEnd] = useState(false);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, "0");
      times.push(`${hourString}:00`);
    }
    return times;
  };

  const allOptions = generateTimeOptions();

  useEffect(() => {
    if (isSave) {
      const httpSave = async () => {
        await saveAppointmentsHTTP(room._id, client._id, newsAppointments);
        onRequestClose();
      };
      httpSave();
    }
  }, [isSave]);

  useEffect(() => {
    const getClientHTTP = async () => {
      const res = await clientByID(clientIDSelector.id);

      if (res) {
        setClient(res);
      }
    };
    getClientHTTP();
  }, []);

  const handleInputChangeTimeStart = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setInputValueTimeStart(value);
    setInputValueTimeEnd("");
    if (value.trim() === "") {
      setFilteredOptions([]);
    } else {
      const filtered = allOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
    setShowOptionsTimeStart(true);
  };

  const handleInputChangeTimeEnd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValueTimeEnd(value);
    if (value.trim() === "") {
      setFilteredOptions([]);
    } else {
      const filtered = allOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
    setShowOptionsTimeEnd(true);
    // Validar que la hora final sea mayor que la hora de inicio
    if (inputValueTimeStart !== "" && value <= inputValueTimeStart) {
      // Aquí puedes mostrar un mensaje de error o realizar alguna acción
      setError(
        "La hora de salida no puede ser menor o igual a la hora de entrada."
      );
      setIsReservation(false)
    } else {
      // Validar el formato con regex
      if (!/^([01]\d|2[0-3]):([0-5]\d)/.test(inputValueTimeEnd)) {
        setError("Formato no valido para la hora de salida");
        setIsReservation(false)
        return;
      } else {
        setIsReservation(true)
        const days: IDaysSel[] = [];
        daysSelect.days.forEach((d) => {
          const start = new Date(`${d}T${inputValueTimeStart}`);
          const day = start.getDate();
          days.push({
            day,
            start,
            end: new Date(`${d}T${inputValueTimeEnd}`),
          });
        });

        setDataDaySelects([...days]);
        setError("");
      }
    }
  };

  const handleClickDeleteDay = (day:number)=> {
    if(dataDaySelects.length > 0) {
       const filt = dataDaySelects.filter(d=> d.day != day);

       setDataDaySelects(filt)

    }
    updateDay(day)
  }


  const handleOptionClickTimeStart = (value: string) => {
    setInputValueTimeStart(value);
    setShowOptionsTimeStart(false);
  };

  const handleOptionClickTimeEnd = (value: string) => {
    setInputValueTimeEnd(value);
    setShowOptionsTimeEnd(false);
    // Validar que la hora final sea mayor que la hora de inicio
    if (inputValueTimeStart !== "" && value <= inputValueTimeStart) {
      // Aquí puedes mostrar un mensaje de error o realizar alguna acción
      setError(
        "La hora de salida no puede ser menor o igual a la hora de entrada."
      );
      setIsReservation(false)
    } else {
      setError(null);
      setIsReservation(true)
      const days: IDaysSel[] = [];
      daysSelect.days.forEach((d) => {
        const start = new Date(`${d}T${inputValueTimeStart.slice(0, -3)}`);
        const day = start.getDate();
        days.push({
          day,
          start,
          end: new Date(`${d}T${value.slice(0, -3)}`),
        });
      });

      setDataDaySelects([...days]);
      setError("");
    }
  };

  const addNewAppointment = (start: Date, end: Date) => {
    let priceBase = room.priceBase;

    let priceDto = 0;
    let totalDto = 0;

    room.dtoRoomHours.forEach((dto) => {
      const startHourDto = new Date(`2024-08-14T${dto.startHour}`);
      const endHourDto = new Date(`2024-08-14T${dto.endHour}`);

      if (
        start.getHours() >= startHourDto.getHours() &&
        start.getHours() < endHourDto.getHours()
      ) {
        priceDto = priceBase - (dto.dto / 100) * priceBase;
        totalDto = dto.dto;
      }
    });

    setNewAppointment((prev) => {
      const app: IAppointment = {
        _id: "",
        GuestListClient: [],
        GuestListNotClient: [],
        available: true,
        description: "",
        date: start,
        start: start,
        end: end,
        client: client._id,
        price: priceBase,
        title: client.name,
        dto:
          priceDto == 0
            ? null
            : {
                dto: totalDto,
                newPrice: priceDto,
                prevPrice: priceBase,
              },
      };
      return [...prev, app];
    });
  };

  function hasHourConflict(
    appointment: IAppointment,
    daySelet: IDaysSel
  ): boolean {
    const appStart = appointment.start;
    const appEnd = appointment.end;
    const daySeletStart = daySelet.start;
    const daySeletEnd = daySelet.end;
  
    // Si la hora de fin de la cita es la misma que la hora de inicio del intervalo seleccionado, no hay conflicto.
    if (appEnd.getTime() === daySeletStart.getTime()) {
      return true;
    }
  
    // Verifica si la hora de inicio del intervalo seleccionado está dentro del rango de la cita.
    if (
      daySeletStart >= appStart &&
      daySeletStart < appEnd
    ) {
      return false;
    }
  
    // Verifica si la hora de fin del intervalo seleccionado está dentro del rango de la cita.
    if (
      daySeletEnd > appStart &&
      daySeletEnd <= appEnd
    ) {
      return false;
    }
  
    // Verifica si el intervalo seleccionado cubre completamente la cita.
    if (
      daySeletStart < appStart &&
      daySeletEnd > appEnd
    ) {
      return false;
    }
  
    // Si ninguna de las condiciones anteriores se cumple, entonces no hay un conflicto.
    return true;
  }

  const reservation = async () => {
    if(isReservation) {
      // Validar el formato con regex
      if (!/^([01]\d|2[0-3]):([0-5]\d)/.test(inputValueTimeStart)) {
        setError("Formato no valido para la hora de inicio");
        return;
      } else {
        setError("");
      }
      // Validar el formato con regex
      if (!/^([01]\d|2[0-3]):([0-5]\d)/.test(inputValueTimeEnd)) {
        setError("Formato no valido para la hora de salida");
        return;
      } else {
        setError("");
      }
  
      const apps = await getAppointmentHTTP(room._id);
      let appointments: IAppointment[] = [];
      if (apps && apps.length > 0) {
        for (const a of apps) {
          const start = new Date(a.start);
          const end = new Date(a.end);
          const ahora = new Date();
          if (start >= ahora && a.available) {
            const appointment: IAppointment = {
              _id: a._id,
              date: a.date, // Fecha y hora del turno
              start, // Hora de entrada
              end, // Hora de salida
              price: a.price,
              dto: a.dto,
              title: a.title, // Título del turno
              description: a.description, // Descripción del turno
              available: a.available, // Para saber si el turno esta o no disponible
              client: a.client, // Cliente que reservó el turno
              GuestListClient: a.GuestListClient, // lista de invitados a al turno de clientes registrado en la app
              GuestListNotClient: a.GuestListNotClient, //
            };
            appointments.push(appointment);
          }
        }
  
  
        let dayConflic: IDaysSelConflict[] = [];
        function filterNonConflictingIntervals(
          appointmentsInternal: IAppointment[],
          dataDaySelectsInternal: IDaysSel[]
        ): IDaysSelConflict[] {
          let dayNotConflic: IDaysSelConflict[] = [];
          dataDaySelectsInternal.forEach((d) => {
            let bool = true;
            for (const a of appointmentsInternal) {
              if (
                a.start.getMonth() == d.start.getMonth() &&
                a.start.getDate() == d.start.getDate()
              ) {
                if (!hasHourConflict(a, d)) {
                  bool = false;
                }
              }
            }
            const day = d.start.getDate();
            const _d: IDaysSelConflict = {
              day,
              end: d.end,
              start: d.start,
              dataDay: "",
            };
            if (!bool) {
              dayConflic.push(_d);
            } else {
              dayNotConflic.push(_d);
            }
          });
  
          return dayNotConflic;
        }
  
        const nonConflictingIntervals = filterNonConflictingIntervals(
          appointments,
          dataDaySelects
        );
  
        if (nonConflictingIntervals.length > 0) {
          for (const notConflic of nonConflictingIntervals) {
            addNewAppointment(notConflic.start, notConflic.end);
          }
        }
  
        if (dayConflic.length > 0) {
          setIsOpenConflict(true);
          dayConflic = dayConflic.map((c) => {
            daysSelect.days.forEach((d) => {
              const start = new Date(`${d}`);
              const day = start.getDate() + 1;
              if (c.day == day) {
                c.dataDay = d;
              }
            });
  
            return c;
          });
  
          setDayConflict(dayConflic);
  
          let selConflict: ISelects = {
            id: daysSelect.id,
            days: [],
            month: daysSelect.month,
            year: daysSelect.year,
          };
  
          dayConflic.forEach((c) => {
            daysSelect.days.forEach((d) => {
              const start = new Date(`${d}`);
              const day = start.getDate() + 1;
              if (c.day == day) {
                selConflict.days.push(d);
              }
            });
          });
        } else {
          save();
        }
      } else {
        let dayNotConflic: IDaysSelConflict[] = [];
        dataDaySelects.forEach((d) => {
          const day = d.start.getDate();
          const _d: IDaysSelConflict = {
            day,
            end: d.end,
            start: d.start,
            dataDay: "",
          };
          dayNotConflic.push(_d);
        });
  
        if (dayNotConflic.length > 0) {
          for (const notConflic of dayNotConflic) {
            addNewAppointment(notConflic.start, notConflic.end);
          }
        }
        save();
      }

    }
  };
  const closeConflict = () => {
    setIsOpenConflict(false);
    setIsSave(false);
    setDayConflict([]);
  };

  const closeSaveConf = () => {
    setIsOpenConflict(false);
  };

  const save = () => {
    setIsSave(true);
    closeSaveConf()

  };
  return (
    <div className={ShiftStyle.modalOverlay}>
      <div className={ShiftStyle.modal}>
        <div className={ShiftStyle.containerForm}>
          {isOpenConflict ? (
            <ConflitDays
              save={save}
              close={closeConflict}
              addNewAppointment={addNewAppointment}
              roomId={room._id}
              conflicts={dayConflict}
            />
          ) : (
            <>
              <div className={ShiftStyle.formTitle}>
                <span>
                  {client.name.split(";")[0]} {client.name.split(";")[1] ?? ""}
                </span>
              </div>

              <div className={ShiftStyle.containerDaysSelect}>
                {days
                  .sort((a, b) => a - b)
                  .map((d) => (
                    <span key={d} className={ShiftStyle.containerDay}>
                      <span className={ShiftStyle.day}>{d}</span>
                      <span
                        className={ShiftStyle.closeDay}
                        onClick={() => handleClickDeleteDay(d)}
                      >
                        x
                      </span>
                    </span>
                  ))}
              </div>

              <div className={ShiftStyle.dateStart}>
                <div className={ShiftStyle.containerImageHour}>
                  <img
                    className={ShiftStyle.imageHour}
                    src={HoursImage}
                    alt="Clock"
                  />
                </div>
                <div className={ShiftStyle.containerTime}>
                  <input
                    id="timeInputStart"
                    type="text"
                    value={inputValueTimeStart}
                    onChange={handleInputChangeTimeStart}
                    className={ShiftStyle.inputTime}
                    autoComplete="off"
                    placeholder="Hora de inicio"
                  />
                  {showOptionsTimeStart && (
                    <ul className={ShiftStyle.options}>
                      {filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleOptionClickTimeStart(option)}
                          className={ShiftStyle.option}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className={ShiftStyle.spaceTime}>-</span>
                <div className={ShiftStyle.containerTimeEnd}>
                  <input
                    id="timeInputEnd"
                    type="text"
                    value={inputValueTimeEnd}
                    onChange={handleInputChangeTimeEnd}
                    className={ShiftStyle.inputTime}
                    autoComplete="off"
                    placeholder="Hora de fin"
                  />
                  {showOptionsTimeEnd && (
                    <ul className={ShiftStyle.options}>
                      {filteredOptions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => handleOptionClickTimeEnd(option)}
                          className={ShiftStyle.option}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {error && <p className={ShiftStyle.error}>{error}</p>}

              <div className={ShiftStyle.containerCapacityMax}>
                <div className={ShiftStyle.containerImageHour}>
                  <img
                    className={ShiftStyle.imageHour}
                    src={CapacityClientImage}
                    alt="users"
                  />
                </div>
                <span>Capacidad para {room.capacity} personas</span>
              </div>

              <div className={ShiftStyle.containerCapacityMax}>
                <div className={ShiftStyle.containerImageHour}>
                  <img
                    className={ShiftStyle.imageHour}
                    src={DimeImage}
                    width={15}
                    alt="users"
                  />
                </div>
                <span>
                  Medidas{" "}
                  <strong>
                    {room.length === room.Width
                      ? `${room.length} m²`
                      : `${room.length}x${room.Width} m`}
                  </strong>
                </span>
              </div>

              <div className={ShiftStyle.containerClient}>
                <div className={ShiftStyle.autocompleteSelect}>
                  <div className={ShiftStyle.containerAvailability}>
                    {room.dtoRoomHours.map((dto) => (
                      <p key={dto.startHour} className={ShiftStyle.pDto}>
                        <span className={ShiftStyle.dtp}>{dto.dto}% OFF</span> -{" "}
                        <span className={ShiftStyle.dtoHours}>
                          {dto.startHour} / {dto.endHour}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className={ShiftStyle.containerButtons}>
                <button
                  className={ShiftStyle.buttonCancel}
                  onClick={onRequestClose}
                >
                  Cancelar
                </button>
                <button
                  className={`${ isReservation ? ShiftStyle.buttonReserve : ShiftStyle.buttonCancel }`}
                  onClick={reservation}
                >
                  Reservar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shift;
