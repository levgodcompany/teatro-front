import "react-big-calendar/lib/css/react-big-calendar.css";
import RoomsStyle from "./css/Rooms.module.css";
import AppointmentCalendar from "./components/AppointmentCalendar/AppointmentCalendar";
import InfoRoom from "./components/Card_B/InfoRoom";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import OpeningHours from "./components/OpeningHours/OpeningHours";
import ServicesList from "./components/ServicesList/ServicesList";
import HighlightedImages from "./components/HighlightedImages/HighlightedImages";
import { getRoomsHTTP, IRoom } from "./services/Rooms.service";
import { useEffect, useState } from "react";
import NewRoom from "./components/NewRoom/NewRoom";

const RoomDetails = () => {
  const [rooms, setRooms] = useState<IRoom[]>();

  const [isNewRoom, setIsNewRoom] = useState<boolean>(false);

  const getRooms = async () => {
    const roomhttp = await getRoomsHTTP();
    if (roomhttp) {
      setRooms(roomhttp);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />

      {rooms ? (
        <>
          <div className={RoomsStyle.rooms_container}>
            {rooms.map((room) => (
              <div key={room.name} className={RoomsStyle.room_details}>
                <InfoRoom
                  idRoom={room._id}
                  image= {room.mainImage.url}
                  capacity={room.capacity}
                  description={room.description}
                  phone={room.phone}
                  title={room.name}
                  price={room.priceBase}
                />

                <OpeningHours
                  idRoom={room._id}
                  openingDays={room.openingHours}
                />

                <ServicesList idRoom={room._id} services={room.services} />

                <HighlightedImages
                  idRoom={room._id}
                  images={room.additionalImages}
                  onViewMore={(index) => console.log("A ver mas", index)}
                  onEdit={(index) => console.log("A editar", index)}
                  onDelete={(index) => console.log("A eliminar", index)}
                />

                <AppointmentCalendar
                  _appointments={room.availableAppointments}
                  idRoom={room._id}
                />
                <div className={RoomsStyle.container_button_delete_room}>
                  <button>Eliminar Sala</button>
                </div>
              </div>
            ))}

            <div className={RoomsStyle.container_button_new}>
              <button onClick={() => setIsNewRoom(!isNewRoom)}>
                Nueva Sala
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {isNewRoom ? (
        <>
          <NewRoom />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RoomDetails;
