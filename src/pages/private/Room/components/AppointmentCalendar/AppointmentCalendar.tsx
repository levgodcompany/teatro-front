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
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import ConfirCancelReservation from "../../../../../components/ConfirCancelReservation/ConfirCancelReservation";

interface CalendarProps {
  _appointments: IAppointment[];
  idRoom: string;
  nameRoom: string;
  capacity: number;
  price: number;
  dto: DtoRoom[];
  length: string;
  Width: string;
  idClient: string;
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
  Width,
  length,
  idClient,
}) => {
  // Event, variable para poder mostrar todos los eventos que hay
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Appointments, variable donde tenemos todo los turnos en la base de datos
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  // Mostramos el modal de un evento
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [isConfCancel, setIsConfCancel] = useState(false);

  const [confCancel, setConfCancel] = useState<{
    idRoom: string;
    idApp: string;
  }>({
    idApp: "",
    idRoom: "",
  });

  const cancelShifts = async (idRoom: string, id: string) => {
    setConfCancel({ idApp: id, idRoom: idRoom });
    setIsConfCancel(true);
  };

  const onClickConfCancelConf = () => {
    setIsConfCancel(!isConfCancel);
  };

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
        app.client === event.title?.toString().split("|")[0] &&
        app.start.getTime() === (event.start as Date).getTime()
    );

    if (appointment) {
      setSelectedAppointment(appointment);
      setIsOpen(true);
      setModalIsOpen(true);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    setModalIsOpen(false);
    cancelShifts(idRoom, id);
  };

  const resultDeletEvent = (apps: IAppointment[]) => {
    setIsConfCancel(false);
    const appsFilter = apps.filter(a => a.client && a.client == idClient);
    const _events: CalendarEvent[] = appsFilter.map((appointment) => ({
      title: `${appointment.client}|${appointment.title}`,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      allDay: false,
      resource: {
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
      },
    }));

    const app: IAppointment[] = appsFilter.map((appointment) => ({
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
  };

  useEffect(() => {
    const _app = _appointments.filter((a) => a.available == true);
    const _events: CalendarEvent[] = _app.map((appointment) => ({
      title: `${appointment.client}|${appointment.title}`,
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

  const eventPropGetter = (_event: CalendarEvent) => {
    let backgroundColor = "#fff";

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
    showMore: (total: any) => `${total}+`,
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

  const determineStatus = (start: Date) => {
    const today = new Date();
    const startDate = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    if (
      startDate <
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    ) {
      return "past";
    } else if (
      startDate.getTime() ===
      new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    ) {
      return "today";
    } else {
      return "future";
    }
  };

  const eventCalss = (eventTitle: string, start: Date | undefined) => {
    const isClientEvent = eventTitle.split("|")[0] === idClient;
    if (isClientEvent && start) {
      return determineStatus(start);
    }
    return "div_event_not";
  };
  const eventClient = (eventTitle: string) => {
    const [firstName, lastName] = eventTitle.split("|")[1].split(";");
    return [firstName, lastName];
  };

  return (
    <>
      {isConfCancel ? (
        <ConfirCancelReservation
          resHTTL={resultDeletEvent}
          cancel={onClickConfCancelConf}
          load={() => {}}
          idRoom={confCancel.idRoom}
          appointmentId={confCancel.idApp}
        />
      ) : (
        <></>
      )}
      <div className={AppointmentCalendarStyle.container}>
        <div className={AppointmentCalendarStyle.header}></div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, backgroundColor: "#fff", padding: "10px" }}
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
              <div className={AppointmentCalendarStyle.event_info}>
                {event.title ? (
                  <>
                    <div
                      className={`${
                        AppointmentCalendarStyle[
                          eventCalss(event.title.toString(), event.start)
                        ]
                      }`}
                    ></div>
                    <strong
                      className={AppointmentCalendarStyle.hideOnSmallScreen}
                      style={{ fontWeight: "500", fontSize: "10px" }}
                    >{`${eventClient(event.title.toString())}`}</strong>
                  </>
                ) : (
                  <></>
                )}
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
            Width={Width}
            length={length}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default AppointmentCalendar;
