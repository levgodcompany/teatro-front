import { useEffect, useState } from "react";
import ShiftStyle from "./Shift.module.css";
import { IOpeningCloseHoursShiftsDTO } from "../../services/Shifts.service";
import CarouselComp from "../../../../../components/CarouselComponents/CarouselComp";

interface IShiftProps {
  _setOpeningCloseHoursTurnos: (s: IOpeningCloseHoursShiftsDTO[])=> void
}

const Shift: React.FC<IShiftProps> = ({_setOpeningCloseHoursTurnos}) => {
  const [openingCloseHoursTurno, setOpeningCloseHoursTurno] =
    useState<IOpeningCloseHoursShiftsDTO>({
      startHours: "",
      endHours: "",
      title: "",
      description: "",
      available: false,
    });
  const [openingCloseHoursTurnos, setOpeningCloseHoursTurnos] = useState<
    IOpeningCloseHoursShiftsDTO[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOpeningCloseHoursTurno({
      ...openingCloseHoursTurno,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAvilited = (available: boolean) => {
    setOpeningCloseHoursTurno({
      ...openingCloseHoursTurno,
      available: available,
    });
  };

  useEffect(()=> {
    _setOpeningCloseHoursTurnos(openingCloseHoursTurnos)
  }, [openingCloseHoursTurnos])


  const handleDeleteShift = (index: number) => {
    const updatedShifts = [...openingCloseHoursTurnos];
    updatedShifts.splice(index, 1);
    setOpeningCloseHoursTurnos(updatedShifts);
  };

  const handleEditShift = (shift: IOpeningCloseHoursShiftsDTO) => {
    setOpeningCloseHoursTurno(shift);
  };

  const handleAddShift = () => {
    setOpeningCloseHoursTurno({
      startHours: "",
      endHours: "",
      title: "",
      description: "",
      available: false,
    })
    setOpeningCloseHoursTurnos((prevShifts) => {
      return [...prevShifts, openingCloseHoursTurno];
    });

    
  };

  useEffect(() => {
    console.log(openingCloseHoursTurnos);
  }, [openingCloseHoursTurnos]);

  return (
    <>
      <div className={ShiftStyle.container_shift}>
        <h2>Agregar Turnos</h2>
        <div className={ShiftStyle.shift}>
          <div className={ShiftStyle.time_inputs}>
            <label>
              Horario de Entrada
              <input
                type="time"
                name="startHours"
                value={openingCloseHoursTurno.startHours}
                onChange={handleChange}
                placeholder="Hora de entrada"
              />
            </label>
            <label>
              Horario de Salida
              <input
                type="time"
                name="endHours"
                value={openingCloseHoursTurno.endHours}
                onChange={handleChange}
                placeholder="Hora de salida"
              />
            </label>
          </div>
          <div className={ShiftStyle.inputs}>
            <input
              type="text"
              value={openingCloseHoursTurno.title}
              onChange={handleChange}
              name="title"
              placeholder="Título del turno"
            />
            <textarea
              name="description"
              value={openingCloseHoursTurno.description}
              onChange={handleChange}
              placeholder="Descripción del turno"
            />
          </div>
          <div>
            <label className={ShiftStyle.availability_label}>
              Disponible:
              <input
                type="checkbox"
                name="available"
                checked={openingCloseHoursTurno.available}
                onChange={(e) => handleChangeAvilited(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div className={ShiftStyle.buttons}>
          <button onClick={handleAddShift}>Añadir Turno</button>
        </div>
        <div>
          <div className={ShiftStyle.shifts}>
            <CarouselComp
              items={openingCloseHoursTurnos}
              renderCard={(shift, index) => (
                <div className={ShiftStyle.shifts_shift}>
                  <div className={ShiftStyle.header_shift}>
                    <p>{shift.title}</p>
                  </div>
                  <div className={ShiftStyle.container_main}>
                    <div className={ShiftStyle.main_hours}>
                      <div className={ShiftStyle.hours_start}>
                        <strong>
                          <span>Hora de entrada:</span>
                        </strong>
                        <span>{shift.startHours}</span>
                      </div>
                      <div className={ShiftStyle.hours_end}>
                        <strong>
                          <span>Hora de salida:</span>
                        </strong>
                        <span>{shift.endHours}</span>
                      </div>
                    </div>

                    <div className={ShiftStyle.main_description}>
                      <strong>
                        <span>Descripcion</span>
                      </strong>
                      <div className={ShiftStyle.main_description_info}>
                        <p>{shift.description}</p>
                      </div>
                    </div>
                    <div className={ShiftStyle.buttons_shift}>
                      <button
                        onClick={() => handleDeleteShift(index ? index : 0)}
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => handleDeleteShift(index ? index : 0)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shift;
