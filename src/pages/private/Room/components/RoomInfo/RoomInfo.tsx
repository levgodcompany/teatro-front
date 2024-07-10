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
          <span className={RoomInfoStyle.type_room}>Estandar</span>
          <CarouselImage images={images} />
        </div>
        <div className={RoomInfoStyle.room_info}>
          <div className={RoomInfoStyle.room_info_info_prop_value}>
            <div className={RoomInfoStyle.room_info_title}>
              <p>{room.name}</p>
            </div>
            {datailInfo("Tipo de sala:", `${room.typeRoom}`)}
            {room.Width == room.length ? datailInfo("Medidas:", `${room.length} m²`) : datailInfo("Medidas:", `${room.length}x${room.Width} m`) }
            {datailInfo("Capacidad máxima de personas:", `${room.capacity}`)}
            {room.phone.length > 0 ? datailInfo("Contacto:", room.phone) : datailInfo("Contacto", "+ 54 9 11 5632 1826")}
            {datailInfo("Precio:", `$ ${formateador.format(room.priceBase)}`)}
            {
              room.dtoRoomHours.length > 0 ? <div className={RoomInfoStyle.container_dtos}>
                <p className={RoomInfoStyle.container_dtos_p}>Off</p>
                <div className={RoomInfoStyle.cont_dtos}>
                  {room.dtoRoomHours.map(dto => <div className={RoomInfoStyle.dtos}>
                    <span className={RoomInfoStyle.dto}>{dto.dto}% OFF</span>
                    <span className={RoomInfoStyle.dto_horus}>{dto.startHour}hs a {dto.endHour}hs</span>
                  </div>)}
                </div>
              </div> : <></>
            }
            
          </div>
          {
            room.services.length > 0 ? <div className={RoomInfoStyle.room_info_services}>
            <span className={RoomInfoStyle.services_title}>
              Servicios principales
            </span>
            <div className={RoomInfoStyle.services}>
              {room.services.map((s, i) => (
                <>
                  <span key={i}>⋅ {s}</span>
                </>
              ))}
            </div>
          </div> : <></>
          }
          
        </div>
      </div>
      {room.description.length > 0 ? <div className={RoomInfoStyle.room_info_desc}>
        <p>{room.description}</p>
      </div> : <></> }
      
    </div>
  );
};

export default RoomInfo;
