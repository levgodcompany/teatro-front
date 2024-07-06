// src/components/AppointmentCalendar.tsx
import React, { useEffect, useState } from "react";
import {
  Calendar,
  Event as CalendarEvent,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentCalendarStyle from "./css/AppointmentCalendar.module.css";
import { DtoRoom, IAppointment } from "../../../Rooms/services/Rooms.service";
import { deleteAppointmentHTTP } from "../../service/Room.service";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";

interface CalendarProps {
  _appointments: IAppointment[];
  idRoom: string;
  nameRoom: string;
  capacity: number;
  price: number;
  dto: DtoRoom[];
}

// Configuración del localizador de date-fns
const locales = {
  es: es,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
});

const AppointmentCalendar: React.FC<CalendarProps> = ({
  _appointments,
  idRoom,
  capacity,
  dto,
  price,
}) => {
  // Event, variable para poder mostrar todos los eventos que hay
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Appointments, variable donde tenemos todo los turnos en la base de datos
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  // Mostramos el modal de un evento
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Seleccionamos un evento
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>({
    _id: "",
    available: false,
    client: null,
    date: new Date(),
    description: "",
    end: new Date(),
    start: new Date(),
    title: "",
    dto: null,
    price: 0,
    GuestListClient: [],
    GuestListNotClient: [],
  });

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = appointments.find(
      (app) =>
        app.title === event.title &&
        app.start.getTime() === (event.start as Date).getTime()
    );

    if (appointment) {
      setSelectedAppointment(appointment);
      setIsOpen(true);
      setModalIsOpen(true);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const rest = await deleteAppointmentHTTP(idRoom, id);
    if (rest) {
      const _events: CalendarEvent[] = rest.map((appointment) => ({
        title: appointment.title,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        allDay: false,
        resource: {
          description: appointment.description,
          available: appointment.available,
          client: appointment.client,
        },
      }));

      const app: IAppointment[] = rest.map((appointment) => ({
        _id: appointment._id,
        date: new Date(appointment.date),
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        title: appointment.title,
        dto: appointment.dto,
        description: appointment.description,
        available: appointment.available,
        price: appointment.price,
        client: appointment.client,
        GuestListClient: appointment.GuestListClient,
        GuestListNotClient: appointment.GuestListNotClient,
      }));
      setAppointments(app);
      setEvents([..._events]);
    }

    setModalIsOpen(false);
  };

  useEffect(() => {
    const _app = _appointments.filter((a) => a.available == true);
    const _events: CalendarEvent[] = _app.map((appointment) => ({
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      allDay: false,
      resource: {
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
      },
    }));

    const app: IAppointment[] = _app.map((appointment) => ({
      _id: appointment._id,
      date: new Date(appointment.date),
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      title: appointment.title,
      dto: appointment.dto,
      description: appointment.description,
      available: appointment.available,
      client: appointment.client,
      price: appointment.price,
      GuestListClient: appointment.GuestListClient,
      GuestListNotClient: appointment.GuestListNotClient,
    }));

    setEvents([..._events]);
    setAppointments([...app]);
  }, [_appointments]);

  const eventPropGetter = (event: CalendarEvent) => {
    let backgroundColor = "#B0BEC5";
    if (event.resource.client && event.resource.client.length > 0) {
      backgroundColor = "#F44336";
    } else if (event.resource.available) {
      backgroundColor = "#4CAF50";
    }
    return {
      style: { backgroundColor },
    };
  };

  // Textos traducidos
  const messages = {
    allDay: "Todo el día",
    previous: "<",
    next: ">",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango.",
    showMore: (total: any) => `+ Ver más (${total})`,
  };

  // Estilos personalizados para los botones
  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const capitalizeFirstLetter = (string: string): string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToToday = () => {
      toolbar.onNavigate("TODAY");
    };

    const handleViewChange = (event: any) => {
      toolbar.onView(event.target.value);
    };

    return (
      <div className={AppointmentCalendarStyle.toolbar}>
        <div className={AppointmentCalendarStyle.navigation}>
          <button
            onClick={goToToday}
            className={AppointmentCalendarStyle.button}
          >
            {"Hoy"}
          </button>
          <button
            onClick={goToBack}
            className={`${AppointmentCalendarStyle.button_prev}`}
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className={`${AppointmentCalendarStyle.button_nex}`}
          >
            ❯
          </button>
        </div>
        <div className={AppointmentCalendarStyle.year}>
          <span>{capitalizeFirstLetter(toolbar.label)}</span>
        </div>
        <div className={AppointmentCalendarStyle.viewSelect}>
          <select
            onChange={handleViewChange}
            value={toolbar.view}
            className={AppointmentCalendarStyle.select}
          >
            <option
              className={AppointmentCalendarStyle.select_option}
              value="day"
            >
              Día
            </option>
            <option
              className={AppointmentCalendarStyle.select_option}
              value="week"
            >
             Semana
            </option>
            <option
              className={AppointmentCalendarStyle.select_option}
              value="month"
            >
              Mes
            </option>
            <option
              className={AppointmentCalendarStyle.select_option}
              value="agenda"
            >
              Agenda
            </option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={AppointmentCalendarStyle.container}>
        <div className={AppointmentCalendarStyle.header}></div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, backgroundColor: "#fff" }}
          tooltipAccessor={(event) => event.resource.title}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          messages={messages}
          culture="es"
          components={{
            toolbar: CustomToolbar,
            header: (date) => {
              const dayOfWeekAbbreviated = format(date.date, "EEE", {
                locale: es,
              });
              const capitalizeFirstLetter = (string: string): string => {
                return string.charAt(0).toUpperCase() + string.slice(1);
              };

              return (
                <>
                  <span className={AppointmentCalendarStyle.day_header}>
                    {capitalizeFirstLetter(dayOfWeekAbbreviated)}
                  </span>
                </>
              );
            },
            event: ({ event }) => (
              <div style={{ fontSize: "10px" }}>
                <strong style={{ color: "#fff" }}>{`${event.title?.toString().split(";")[0]} ${event.title?.toString().split(";")[1] ? event.title?.toString().split(";")[1] : ""}`}</strong>
              </div>
            ),
          }}
        />
        {isOpen ? (
          <AppointmentModal
            dto={dto}
            isOpen={modalIsOpen}
            event={selectedAppointment}
            onRequestClose={() => setModalIsOpen(false)}
            onSave={handleDeleteEvent}
            capacity={capacity}
            price={price}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AppointmentCalendar;
