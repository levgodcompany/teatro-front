import { useState } from "react";
import InputSelectHorusStyle from "./InputSelectHorus.module.css";
import { IAppointment } from "../../../../../Rooms/services/Rooms.service";

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

  const [inputValueTimeEnd, setInputValueTimeEnd] = useState<string>("");
  const [showOptionsTimeEnd, setShowOptionsTimeEnd] = useState<boolean>(false);


  const [error, setError] = useState<string | null>(null);

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
        "La hora de salida no puede ser menor o igual a la hora de entrada."
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
          const appStartHours = appointment.start.getHours();
        const appEndHours = appointment.end.getHours();

        const daySeletStartHours = daySelet.start.getHours();
        const daySeletEndHours = daySelet.end.getHours();

        if (
          daySeletStartHours >= appStartHours &&
          daySeletStartHours <= appEndHours
        ) {
          return false;
        }

        if (
          daySeletEndHours >= appStartHours &&
          daySeletEndHours <= appEndHours
        ) {
          return false;
        }

        if(
            (daySeletStartHours < appStartHours ) && (daySeletEndHours > appEndHours)
        ) {
            return false;
        }

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
        const appStartHours = appointment.start.getHours();
        const appEndHours = appointment.end.getHours();

        const daySeletStartHours = daySelet.start.getHours();
        const daySeletEndHours = daySelet.end.getHours();

        if (
          daySeletStartHours >= appStartHours &&
          daySeletStartHours <= appEndHours
        ) {
          return false;
        }

        if (
          daySeletEndHours >= appStartHours &&
          daySeletEndHours <= appEndHours
        ) {
          return false;
        }

        if(
            (daySeletStartHours < appStartHours ) && (daySeletEndHours > appEndHours)
        ) {
            return false;
        }

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
    <div className={InputSelectHorusStyle.container}>
        <div className={InputSelectHorusStyle.container_inputs}>
            <div className={InputSelectHorusStyle.container_time}>
                <input
                id="timeInput"
                type="text"
                value={inputValueTimeStart}
                onChange={handleInputChangeTimeStart}
                className={InputSelectHorusStyle.input_time}
                autoComplete="off"
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
            <div className={InputSelectHorusStyle.container_time_end}>
                <input
                id="timeInput"
                type="text"
                value={inputValueTimeEnd}
                onChange={handleInputChangeTimeEnd}
                className={InputSelectHorusStyle.input_time}
                autoComplete="off"
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
      {error && <p className={InputSelectHorusStyle.error}>{error}</p>}
    </div>
  );
};

export default InputSelectHorus;
