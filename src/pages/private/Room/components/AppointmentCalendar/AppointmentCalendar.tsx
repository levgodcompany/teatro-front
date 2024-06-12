import React, { useEffect, useState } from "react";
import {
  Calendar,
  Event as CalendarEvent,
  SlotInfo,
  dateFnsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentCalendarStyle from "./css/AppointmentCalendar.module.css";
import NewEventModal from "./components/NewEventModal";
import { DtoRoom, IAppointment } from "../../../Rooms/services/Rooms.service";
import {
  deleteAppointmentHTTP,
  postAppointmentHTTP,
  putAppointmentHTTP,
} from "../../service/Room.service";
import PrintAppointment from "../PrintAppointment/PrintAppointment";
import ListOptionPrint from "./components/ListOptionPrint/ListOptionPrint";
import PrintAppointments from "../PrintAppointments/PrintAppointments";

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
  nameRoom,
  capacity,
  dto,
  price
}) => {
  // Event, variable para poder mostrar todos los eventos que hay
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Appointments, variable donde tenemos todo los turnos en la base de datos
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  // Mostramos el modal para crear un nuevo evento
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);

  // Mostramos el modal de un evento
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Mostramos el modal de un evento
  const [modalIsOpenPrint, setModalIsOpenPrint] = useState(false);

  // Modal para imprimir un turno
  const [openPrint, setOpenPrint] = useState<boolean>(false);
  // Modal para imprimir un turno
  const [openPrints, setOpenPrints] = useState<boolean>(false);
  // Nuevo evento
  const [newEvent, setNewEvent] = useState<IAppointment | null>(null);

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
    price: 0,
    GuestListClient: [],
    GuestListNotClient: [],
  });

  // Seleccionamos un evento
  const [appointmentsPrints, setAppointmentsPrints] = useState<IAppointment[]>(
    []
  );

  // Seleccionamos un evento
  const [selectedAppointmentPrint, setSelectedAppointmentPrint] =
    useState<IAppointment>({
      _id: "",
      available: false,
      client: null,
      date: new Date(),
      description: "",
      end: new Date(),
      start: new Date(),
      title: "",
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
      setModalIsOpen(true);
    }
  };

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    const start = new Date(slotInfo.start);
    const end = new Date(slotInfo.end);
    const ahora = new Date();
    if (start >= ahora) {
      setNewEvent({
        title: "",
        start,
        end,
        description: "",
        _id: "",
        price: 0,
        available: false,
        client: null,
        date: start,
        GuestListClient: [],
        GuestListNotClient: [],
      });
      setNewEventModalOpen(true);
    }
  };

  const handleNewEventSave = async (event: IAppointment) => {
    const e: CalendarEvent = {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: false,
      resource: {
        description: event.description,
        available: event.available,
        client: event.client,
      },
    };
    const rest = await postAppointmentHTTP(idRoom, event);

    if (rest) {
      const app: IAppointment[] = rest.map((appointment) => ({
        _id: appointment._id,
        date: new Date(appointment.date),
        start: new Date(appointment.start),
        end: new Date(appointment.end),
        title: appointment.title,
        price: appointment.price,
        description: appointment.description,
        available: appointment.available,
        client: appointment.client,
        GuestListClient: appointment.GuestListClient,
        GuestListNotClient: appointment.GuestListNotClient,
      }));

      setEvents([...events, e]);
      setAppointments(app);
    }
    setNewEventModalOpen(false);
  };

  const handleEditEventSave = async (event: IAppointment) => {
    const rest = await putAppointmentHTTP(idRoom, event._id, event);
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

  const printAppointment = async (event: IAppointment) => {
    setSelectedAppointment(event);
    setModalIsOpenPrint(false);
    setOpenPrint(true);
  };

  const onPrint = async () => {
    setModalIsOpen(false);
    setOpenPrint(true);
  };

  const printAppointments = async (_event: IAppointment[]) => {
    setAppointmentsPrints(_event);
    console.log("_event", _event);
    setModalIsOpenPrint(false);
    setOpenPrints(true);
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
    const _events: CalendarEvent[] = _appointments.map((appointment) => ({
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

    const app: IAppointment[] = _appointments.map((appointment) => ({
      _id: appointment._id,
      date: new Date(appointment.date),
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      title: appointment.title,
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

  const handleEventDClick = (
    event: React.MouseEvent,
    calendarEvent: IAppointment
  ) => {
    event.preventDefault();
    const appointment = appointments.find(
      (app) =>
        app.title === calendarEvent.title &&
        app.start.getTime() === (calendarEvent.start as Date).getTime()
    );

    if (appointment) {
      setSelectedAppointmentPrint(appointment);
      setModalIsOpenPrint(true);
    }
  };

  // Textos traducidos
  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "No hay eventos en este rango.",
  };

  return (
    <>
      <div className={AppointmentCalendarStyle.container}>
        <div className={AppointmentCalendarStyle.header}>
          
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, backgroundColor: "#fff" }}
          tooltipAccessor={(event) => event.resource.title}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          selectable
          onSelectSlot={handleSlotSelect}
          messages={messages}
          culture="es"
          components={{
            event: ({ event }) => (
              <div
              style={{fontSize: "10px"}}
                onContextMenu={(e) =>
                  handleEventDClick(e, event as IAppointment)
                }
              >
                <strong  style={{color: "#fff"}}>{event.title}</strong>
              </div>
            ),
          }}
        />

        <ListOptionPrint
          printAppointments={printAppointments}
          printAppointment={printAppointment}
          event={selectedAppointmentPrint}
          appointments={appointments}
          onRequestClose={() => setModalIsOpenPrint(false)}
          isOpen={modalIsOpenPrint}
        />

        <AppointmentModal
          dto={dto}
          isOpen={modalIsOpen}
          event={selectedAppointment}
          onRequestClose={() => setModalIsOpen(false)}
          onSave={handleEditEventSave}
          onDelet={handleDeleteEvent}
          onPrint={onPrint}
          capacity={capacity}
          price={price}
        />
        {/* Modal para nuevo evento */}
        {newEventModalOpen && newEvent && (
          <NewEventModal
            dto={dto}
            isOpen={newEventModalOpen}
            onRequestClose={() => setNewEventModalOpen(false)}
            onSave={handleNewEventSave}
            event={newEvent}
            capacity={capacity}
            price={price}
          />
        )}
      </div>

      {openPrint ? (
        <PrintAppointment
          idRoom={idRoom}
          onClose={() => setOpenPrint(false)}
          appointment={selectedAppointment}
          name={nameRoom}
          capacity={capacity}
        />
      ) : (
        <></>
      )}

      {openPrints ? (
        <PrintAppointments
          idRoom={idRoom}
          onClose={() => setOpenPrints(false)}
          appointment={appointmentsPrints}
          name={nameRoom}
          capacity={capacity}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AppointmentCalendar;
