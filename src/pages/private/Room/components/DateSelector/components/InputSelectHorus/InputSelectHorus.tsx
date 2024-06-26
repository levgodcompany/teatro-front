import { useState } from "react";
import InputSelectHorusStyle from "./InputSelectHorus.module.css";



interface IDaysSel {
    day: number;
    start: Date;
    end: Date;
  }


  interface ISelects {
    id: string;
    year: number;
    month: number;
    days: string[];
  }

  interface IInputSelectHoursPorps {
    daysSelect: ISelects;
    timeStart: string;
    timeEnd: string;
    daySelects: (daySelects: IDaysSel[]) => void 
  }


const InputSelectHorus: React.FC<IInputSelectHoursPorps> = ({daysSelect, timeStart, timeEnd, daySelects}) => {

    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [inputValueTimeStart, setInputValueTimeStart] = useState<string>("");
    const [showOptionsTimeStart, setShowOptionsTimeStart] = useState<boolean>(false);
  
    const [inputValueTimeEnd, setInputValueTimeEnd] = useState<string>("");
    const [showOptionsTimeEnd, setShowOptionsTimeEnd] = useState<boolean>(false);

    const [dataDaySelects, setDataDaySelects] = useState<IDaysSel[]>([]);

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
            const days: IDaysSel[] = []
            daysSelect.days.forEach((d) => {
              const start = new Date(`${d}T${inputValueTimeStart.slice(0, -3)}`);
              const day = start.getDate(); 
              days.push({
                day,
                start,
                end: new Date(`${d}T${inputValueTimeEnd.slice(0, -3)}`),
              });
            });
    
            setDataDaySelects([...days])
            timeStart = inputValueTimeStart;
            timeEnd = inputValueTimeEnd;
            daySelects(days)
            setError("");
    
    
    
    
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
          setError(null);
          const days: IDaysSel[] = []
            daysSelect.days.forEach((d) => {
              const start = new Date(`${d}T${inputValueTimeStart.slice(0, -3)}`);
              const day = start.getDate(); 
              days.push({
                day,
                start,
                end: new Date(`${d}T${value.slice(0, -3)}`),
              });
            });
    
            setDataDaySelects([...days])
            timeStart = inputValueTimeStart;
            timeEnd = inputValueTimeEnd;
            daySelects(days)
            setError("");
        }
      };


  return (
    <div>
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
      <span className={InputSelectHorusStyle.space_time}>-</span>
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
  );
};

export default InputSelectHorus;
