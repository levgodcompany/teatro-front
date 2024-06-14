import { useEffect, useState } from "react";
import { IImage, IRoom } from "../../../Rooms/services/Rooms.service";
import RoomInfoStyle from "./css/RoomInfo.module.css";
import CarouselImage from "./components/CarouselImages/CarouselImage";

interface RoomInfoProps {
  room: IRoom;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ room }) => {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    setImages([room.mainImage, ...room.additionalImages]);
  }, [room]);

  const days = [
    { name: "Lunes", value: room.openingHours.monday },
    { name: "Martes", value: room.openingHours.tuesday },
    { name: "Miércoles", value: room.openingHours.wednesday },
    { name: "Jueves", value: room.openingHours.thursday },
    { name: "Viernes", value: room.openingHours.friday },
    { name: "Sábado", value: room.openingHours.saturday },
    { name: "Domingo", value: room.openingHours.sunday },
  ];

  const datailInfo = (props: string, value: string | number) => {
    return (
      <div className={RoomInfoStyle.detail_container}>
        <span className={RoomInfoStyle.detail_prop}>{props}</span>
        <span className={RoomInfoStyle.detail_value}>{value}</span>
      </div>
    );
  };

  const formateador = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className={RoomInfoStyle.container_room}>
      <div className={RoomInfoStyle.room_container_image_info}>
        <div className={RoomInfoStyle.room_images}>
          <CarouselImage images={images} />
        </div>
        <div className={RoomInfoStyle.room_info}>
          <div className={RoomInfoStyle.room_info_info_prop_value}>
            <div className={RoomInfoStyle.room_info_title}>
              <p>{room.name}</p>
            </div>
            {datailInfo("Capacidad", room.capacity)}
            {datailInfo("Precio", `$ ${formateador.format(room.priceBase)}`)}
            {datailInfo("Medidas", "20 x 30 mt")}
            {datailInfo("Contacto", room.phone)}
          </div>

          <div className={RoomInfoStyle.room_info_services}>
            <span className={RoomInfoStyle.services_title}>
              Servicios principales
            </span>
            <div className={RoomInfoStyle.services}>
              {room.services.map((s, i) => (
                <>
                  <span key={i} >⋅ {s}</span>
                </>
              ))}
            </div>
          </div>
          <div className={RoomInfoStyle.room_info_huors}>
        <span className={RoomInfoStyle.services_title}>Horarios</span>
        <div className={RoomInfoStyle.huors}>
          {days.map((day, i) => (
            <div key={i} className={RoomInfoStyle.cont_huors}>
              <span className={RoomInfoStyle.huor_day}>{day.name}</span>
              {day.value.isOpen ? (
                <span className={RoomInfoStyle.day_hour}>
                  {day.value.open} - {day.value.close}
                </span>
              ) : (
                <span className={RoomInfoStyle.closed}>Cerrado</span>
              )}
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>
      <div className={RoomInfoStyle.room_info_desc}>
        <p>{room.description}</p>
      </div>

    </div>
  );
};

export default RoomInfo;
