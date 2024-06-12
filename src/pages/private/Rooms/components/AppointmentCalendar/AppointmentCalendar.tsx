import React, { useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event as CalendarEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentCalendarStyle from "./css/AppointmentCalendar.module.css";
import { IAppointment, IClient } from "../../services/Rooms.service";
import editImage from '../../../Local/assets/edit-3-svgrepo-com.svg'
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../../../routes/routes";

interface CalendarProps {
  _appointments: IAppointment[];
  idRoom: string;
}

const localizer = momentLocalizer(moment);

const AppointmentCalendar: React.FC<CalendarProps> = ({ _appointments, idRoom }) => {

  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = appointments.find(
      (app) =>
        app.title === event.title &&
        app.start.getTime() === (event.start as Date).getTime()
    );

    if (appointment) {
      setSelectedAppointment(appointment);
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    const _events: CalendarEvent[] = _appointments.map((appointment) => ({
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      allDay: false,
      resource: { 
        description: appointment.description, 
        available: appointment.available,
        client: appointment.client 
      },
    }));

    const app: IAppointment[] = _appointments.map((appointment) => ({
      _id: appointment._id,
      date: new Date(appointment.date),
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      title: appointment.title,
      description: appointment.description,
      available: appointment.available,
      client: appointment.client,
    }));

    setEvents([..._events]);
    setAppointments([...app]);
  }, [_appointments]);

  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = 'grey';
    if (event.resource.client && event.resource.client.length > 0) {
      backgroundColor = 'blue';
    } else if (event.resource.available) {
      backgroundColor = 'green';
    }
    return {
      style: { backgroundColor },
    };
  };

  const onClick = ()=> {
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.ROOM}/?id=${idRoom}`, { replace: true });
  }

  return (
    <>
    <div className={AppointmentCalendarStyle.container}>
    <div className={AppointmentCalendarStyle.header}>
        <h2>Turnos disponibles:</h2>
        <img src={editImage} onClick={onClick} alt="" />
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        tooltipAccessor={(event) => event.resource.description}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventPropGetter}
        onView={(v)=> console.log("v", v)}
      />
      <AppointmentModal
        isOpen={modalIsOpen}
        idRoom={idRoom}
        onRequestClose={() => setModalIsOpen(false)}
        appointment={selectedAppointment}
      />
    </div>
    </>
  );
};

export default AppointmentCalendar;
