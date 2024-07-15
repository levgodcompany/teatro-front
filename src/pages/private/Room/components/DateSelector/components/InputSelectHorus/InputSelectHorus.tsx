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
  day: number;
  dataDay: string;
  timeStart: string;
  timeEnd: string;
  shiftsReservations: IAppointment[];
  daySelects: (daySelects: IDaysSelConflict) => void;
  onChangeConf: (day: number, isConflic: boolean)=> void;
}

const InputSelectHorus: React.FC<IInputSelectHoursPorps> = ({
  day,
  timeStart,
  timeEnd,
  shiftsReservations,
  dataDay,
  daySelects,
  onChangeConf
}) => {
  const [inputValueTimeStart, setInputValueTimeStart] = useState<string>("");

  const [_ts, setTS] = useState<string>(timeStart);
  const [_te, setTE] = useState<string>(timeEnd);
  const [inputValueTimeEnd, setInputValueTimeEnd] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTS(timeStart);
    setTE(timeEnd);
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, "0");
      times.push(`${hourString}:00`);
    }
    return times;
  };

  const allOptions = generateTimeOptions();

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setter(e.target.value);
      if (inputValueTimeEnd != "") {
        if (value >= inputValueTimeEnd) {
          // Aquí puedes mostrar un mensaje de error o realizar alguna acción
          setError(
            "La hora de salida no puede ser menor o igual a la hora de entrada."
          );
          onChangeConf(day, true);
        } else {
          setError("");
        }
      }
    };

  const handleFilterChangeEnd =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setter(e.target.value);
      if (inputValueTimeStart !== "" && value <= inputValueTimeStart) {
        // Aquí puedes mostrar un mensaje de error o realizar alguna acción
        setError(
          "La hora de salida no puede ser menor o igual a la hora de entrada."
        );
        onChangeConf(day, true);
      } else {
        const startHour = new Date(
          `${dataDay}T${inputValueTimeStart}`
        );
        const endHour = new Date(`${dataDay}T${value}`);

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
          if (daySeletStart >= appStart && daySeletStart < appEnd) {
            return false;
          }

          // Verifica si la hora de fin del intervalo seleccionado está dentro del rango de la cita.
          if (daySeletEnd > appStart && daySeletEnd <= appEnd) {
            return false;
          }

          // Verifica si el intervalo seleccionado cubre completamente la cita.
          if (daySeletStart < appStart && daySeletEnd > appEnd) {
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
          onChangeConf(day, false);
          setError("");
        } else {
          onChangeConf(day, true);
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
            <select
              className={InputSelectHorusStyle.inputTime}
              value={inputValueTimeStart}
              onChange={handleFilterChange(setInputValueTimeStart)}
            >
              <option value="">Hora de inicio</option>
              {allOptions.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
          <div className={InputSelectHorusStyle.containerTimeEnd}>
            <select
              className={InputSelectHorusStyle.inputTime}
              value={inputValueTimeEnd}
              onChange={handleFilterChangeEnd(setInputValueTimeEnd)}
            >
              <option value="">Hora de fin</option>
              {allOptions.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <p style={{color: "red", fontSize: "12px", margin: "0"}} className={InputSelectHorusStyle.error}>{error}</p>}
    </div>
  );
};

export default InputSelectHorus;
