import React, { useState } from 'react';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface MyEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar = () => {
  const [events, setEvents] = useState<MyEvent[]>([
    {
      id: 0,
      title: 'Evento 1',
      start: new Date(),
      end: new Date(),
    },
  ]);

  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number; event: MyEvent | null } | null>(null);

  const handleEventClick = (event: React.MouseEvent, calendarEvent: MyEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            event: calendarEvent,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleOptionSelect = (option: string) => {
    console.log(`Selected option ${option} for event ${contextMenu?.event?.title}`);
    handleClose();
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => console.log(event)}
        components={{
          event: ({ event }) => (
            <div onContextMenu={(e) => handleEventClick(e, event as MyEvent)}>
              {event.title.toUpperCase()}
            </div>
          ),
        }}
      />
      {contextMenu !== null && (
        <div
          style={{
            position: 'absolute',
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            zIndex: 1000,
          }}
          onClick={handleClose}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: '5px' }}>
            <li onClick={() => handleOptionSelect('Option 1')}>Option 1</li>
            <li onClick={() => handleOptionSelect('Option 2')}>Option 2</li>
            <li onClick={() => handleOptionSelect('Option 3')}>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;