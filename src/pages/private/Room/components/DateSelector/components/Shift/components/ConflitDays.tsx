import { useEffect, useState } from "react";
import ConflitDaysStyle from "./ConflitDays.module.css";
import { getAppointmentHTTP } from "../../../../../service/Room.service";
import { IAppointment } from "../../../../../../Rooms/services/Rooms.service";
import InputSelectHorus from "../../InputSelectHorus/InputSelectHorus";

interface ConflitDaysProps {
  conflicts: IDaysSel[];
  roomId: string;
}

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

interface IConflitView {
  daySelect: IDaysSel; // aca va el dia
  appointmentReservation: IAppointment[]; // aca los turnos que son de ese dia
}

const ConflitDays: React.FC<ConflitDaysProps> = ({ conflicts, roomId }) => {
  const [daysAppointments, setDaysAppointments] = useState<IConflitView[]>([]);
  const [dataDaySelects, setDataDaySelects] = useState<IDaysSel[]>([]);

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

              return {
                daySelect: {
                  day: day,
                  start: appointmentsForDay[0].start,
                  end: appointmentsForDay[0].end,
                },
                appointmentReservation: appointmentsForDay,
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


  return (
    <div className={ConflitDaysStyle.contianer}>
        {daysAppointments.map((conflitView, index) => (
          <div className={ConflitDaysStyle.contianer_day} key={index} style={{ marginBottom: "20px" }}>
            <div>
                <span>Día: {conflitView.daySelect.day}</span>
                <div className={ConflitDaysStyle.container_time}>
               

              </div>
            </div>
            <ul>
              {conflitView.appointmentReservation.map((appointment) => (
                <li key={appointment._id}>
                  <strong>{appointment.title}</strong>
                  <br />
                  {formatTime(appointment.start)} -{" "}
                  {formatTime(appointment.end)}
                  <br />
                  {appointment.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default ConflitDays;
