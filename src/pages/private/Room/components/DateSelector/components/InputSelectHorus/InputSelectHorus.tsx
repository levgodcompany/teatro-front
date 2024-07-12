import { useEffect, useState } from "react";
import InputSelectHorusStyle from "./InputSelectHorus.module.css";
import { IAppointment } from "../../../../../Rooms/services/Rooms.service";
import HoursImage from "../../../../../../../assets/clock-svgrepo-com.svg";

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

interface IInputSelectHoursPorps {
  dataDay: string;
  timeStart: string;
  timeEnd: string;
  shiftsReservations: IAppointment[];
  daySelects: (daySelects: IDaysSelConflict) => void;
}

const InputSelectHorus: React.FC<IInputSelectHoursPorps> = ({
  timeStart,
  timeEnd,
  shiftsReservations,
  dataDay,
  daySelects,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [inputValueTimeStart, setInputValueTimeStart] = useState<string>("");
  const [showOptionsTimeStart, setShowOptionsTimeStart] =
    useState<boolean>(false);

  const [_ts, setTS] = useState<string>(timeStart);
  const [_te, setTE] = useState<string>(timeEnd);
  const [inputValueTimeEnd, setInputValueTimeEnd] = useState<string>("");
  const [showOptionsTimeEnd, setShowOptionsTimeEnd] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTS(timeStart);
    setTE(timeEnd);
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hourString = hour.toString().padStart(2, "0");
        const minuteString = minute.toString().padStart(2, "0");
        const period = hour < 12 ? "AM" : "PM";
        times.push(`${hourString}:${minuteString} ${period}`);
      }
    }
    return times;
  };

  const allOptions = generateTimeOptions();

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
        `La hora de salida no puede ser menor o igual a la hora de entrada.`
      );
    } else {
      // Validar el formato con regex
      if (!/^([01]\d|2[0-3]):([0-5]\d) [AP]M$/.test(inputValueTimeEnd)) {
        setError("Formato no valido para la hora de salida");
        return;
      } else {
        const startHour = new Date(
          `${dataDay}T${inputValueTimeStart.slice(0, -3)}`
        );
        const endHour = new Date(
          `${dataDay}T${inputValueTimeEnd.slice(0, -3)}`
        );

        const daySelec: IDaysSel = {
          day: startHour.getDate(),
          end: endHour,
          start: startHour,
        };

        // Definir la interfaz de intervalo de tiempo
        interface TimeInterval {
          start: Date;
          end: Date;
        }

        // Función para verificar conflictos de hora

        function hasHourConflict(
          appointment: TimeInterval,
          daySelet: TimeInterval
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

        let bool = false;
        for (const appointment of shiftsReservations) {
          if (!hasHourConflict(appointment, daySelec)) {
            bool = true;
          }
        }

        if (!bool) {
          daySelects({
            dataDay: dataDay,
            day: startHour.getDate(),
            end: endHour,
            start: startHour,
          });
          timeStart = inputValueTimeStart;
          timeEnd = inputValueTimeEnd;

          setError("");
        } else {
          setError("No puede reserva a este horario, ya esta reservado");
        }
      }
    }
  };

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
    } else {
      const startHour = new Date(
        `${dataDay}T${inputValueTimeStart.slice(0, -3)}`
      );
      const endHour = new Date(`${dataDay}T${value.slice(0, -3)}`);

      const daySelec: IDaysSel = {
        day: startHour.getDate(),
        end: endHour,
        start: startHour,
      };

      // Definir la interfaz de intervalo de tiempo
      interface TimeInterval {
        start: Date;
        end: Date;
      }

      // Función para verificar conflictos de hora

      function hasHourConflict(
        appointment: TimeInterval,
        daySelet: TimeInterval
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

      let isConflic = false;
      for (const appointment of shiftsReservations) {
        if (!hasHourConflict(appointment, daySelec)) {
          isConflic = true;
        }
      }

      if (!isConflic) {
        daySelects({
          dataDay: dataDay,
          day: startHour.getDate(),
          end: endHour,
          start: startHour,
        });
        timeStart = inputValueTimeStart;
        timeEnd = inputValueTimeEnd;

        setError("");
      } else {
        setError("No puede reserva a este horario, ya esta reservado");
      }
    }
  };

  return (
    <div>
      <div className={InputSelectHorusStyle.container}>
        <div className={InputSelectHorusStyle.containerImageHour}>
          <img
            className={InputSelectHorusStyle.imageHour}
            src={HoursImage}
            alt="Clock"
          />
        </div>
        <div className={InputSelectHorusStyle.containerInputs}>
          <div className={InputSelectHorusStyle.containerTime}>
            <input
              id="timeInputStart"
              type="text"
              value={inputValueTimeStart}
              onChange={handleInputChangeTimeStart}
              className={InputSelectHorusStyle.inputTime}
              autoComplete="off"
              placeholder="Hora de inicio"
            />
            {showOptionsTimeStart && (
              <ul className={InputSelectHorusStyle.options}>
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClickTimeStart(option)}
                    className={InputSelectHorusStyle.option}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={InputSelectHorusStyle.containerTimeEnd}>
            <input
              id="timeInputEnd"
              type="text"
              value={inputValueTimeEnd}
              onChange={handleInputChangeTimeEnd}
              className={InputSelectHorusStyle.inputTime}
              autoComplete="off"
              placeholder="Hora de fin"
            />
            {showOptionsTimeEnd && (
              <ul className={InputSelectHorusStyle.options}>
                {filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClickTimeEnd(option)}
                    className={InputSelectHorusStyle.option}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {error && <p className={InputSelectHorusStyle.error}>{error}</p>}
    </div>
  );
};

export default InputSelectHorus;
