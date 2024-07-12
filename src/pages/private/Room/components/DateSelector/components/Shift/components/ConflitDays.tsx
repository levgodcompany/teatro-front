import { useEffect, useState } from "react";
import ConflitDaysStyle from "./ConflitDays.module.css";
import { getAppointmentHTTP } from "../../../../../service/Room.service";
import { IAppointment } from "../../../../../../Rooms/services/Rooms.service";
import InputSelectHorus from "../../InputSelectHorus/InputSelectHorus";

interface ConflitDaysProps {
  conflicts: IDaysSelConflict[];
  roomId: string;
  addNewAppointment: (start: Date, end: Date) => void;
  close: () => void;
  save: () => void;
}

interface IDaysSelConflict {
  day: number;
  start: Date;
  end: Date;
  dataDay: string;
}

interface IConflitView {
  daySelect: IDaysSelConflict; // aca va el dia
  dayInput: {
    start: string;
    end: string;
  }
  appointmentReservation: IAppointment[]; // aca los turnos que son de ese dia
}

const ConflitDays: React.FC<ConflitDaysProps> = ({ conflicts, roomId, addNewAppointment, close, save }) => {
  const [daysAppointments, setDaysAppointments] = useState<IConflitView[]>([]);
  const [dataDaySelects, setDataDaySelects] = useState<IDaysSelConflict[]>([]);

  useEffect(() => {
    const httpAppointment = async () => {
      const apps = await getAppointmentHTTP(roomId);

      if (apps) {
        function groupAppointmentsByDay(
          appointments: IAppointment[]
        ): IConflitView[] {
          const groupedByDay: { [key: number]: IAppointment[] } = {};

          // Convert conflicts to a set of days for quick lookup
          const conflictDays = new Set(
            conflicts.map((conflict) => conflict.day)
          );

          appointments.forEach((appointment) => {
            appointment.date = new Date(appointment.date);
            appointment.start = new Date(appointment.start);
            appointment.end = new Date(appointment.end);
            const day = appointment.date.getDate();

            // Only group appointments that are in the conflict days
            if (conflictDays.has(day)) {
              if (!groupedByDay[day]) {
                groupedByDay[day] = [];
              }
              groupedByDay[day].push(appointment);
            }
          });

          const conflitViews: IConflitView[] = Object.keys(groupedByDay).map(
            (dayStr) => {
              const day = parseInt(dayStr, 10);
              const appointmentsForDay = groupedByDay[day];

              const conflictsIndex = conflicts.findIndex(c => c.day == day);

              const uniqueAppointments = appointmentsForDay.reduce((acc, appointment) => {
                const startTime = appointment.start.getHours(); // Convertir a string para comparaciones
                if (!acc.some(appt => appt.start.getHours() === startTime)) {
                  acc.push(appointment);
                }
                return acc;
              }, [] as IAppointment[]);

              return {
                daySelect: {
                  day: day,
                  start: appointmentsForDay[0].start,
                  end: appointmentsForDay[0].end,
                  dataDay: conflicts[conflictsIndex].dataDay
                },
                dayInput: {
                  end: "",
                  start: ""
                },
                appointmentReservation: uniqueAppointments,
              };
            }
          );



          return conflitViews;
        }

        setDaysAppointments(groupAppointmentsByDay(apps));
      }
    };
    httpAppointment();
  }, [conflicts]);

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const addShifts = ()=> {
    dataDaySelects.forEach(d => {
      addNewAppointment(d.start, d.end)
    })
    save()
  }

  const addDaySelect = (day: IDaysSelConflict) => {
    setDataDaySelects(prev=> {
      const prevIndex = prev.findIndex(p=> p.dataDay == day.dataDay);

      if(prevIndex == -1) {
        return [...prev, day]
      }else {
        prev[prevIndex] = day;
        return [...prev]
      }
    })
  }

  return (
    <div className={ConflitDaysStyle.container}>
      <p>Conflictos con los siguientes horarios</p>
      {daysAppointments.map((conflitView, index) => (
        <div className={ConflitDaysStyle.containerDay} key={index}>
          <div className={ConflitDaysStyle.containerDayInput}>
            <span>
              Día: <strong>{conflitView.daySelect.day}</strong>
            </span>
            <div className={ConflitDaysStyle.containerTime}>
              <InputSelectHorus
                shiftsReservations={conflitView.appointmentReservation}
                daySelects={addDaySelect}
                dataDay={conflitView.daySelect.dataDay}
                timeEnd={conflitView.dayInput.end}
                timeStart={conflitView.dayInput.start}
              />
            </div>
          </div>
          <span className={ConflitDaysStyle.spanReservation}>
            Turnos reservados
          </span>
          <ul className={ConflitDaysStyle.containerList}>
            {conflitView.appointmentReservation.map((appointment) => (
              <li className={ConflitDaysStyle.list} key={appointment._id}>
                {formatTime(appointment.start)} - {formatTime(appointment.end)}
              </li>
            ))}
          </ul>
        </div>
      ))}
  
      <div className={ConflitDaysStyle.containerButtons}>
      <button className={ConflitDaysStyle.buttonCancel} onClick={close}>Cancelar</button>
        <button className={ConflitDaysStyle.buttonReserve} onClick={addShifts}>Guardar</button>
      </div>
    </div>
  );
};

export default ConflitDays;
