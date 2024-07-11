import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselImage from "../../../../../components/CarouselImages/CarouselImage";
import { DtoRoom, IImage } from "../../../Rooms/services/Rooms.service";
import CardStyles from "./css/Room.module.css";
import { PrivateRoutes } from "../../../../../routes/routes";
import formateador from "../../../../../utilities/formateador";

interface PropsRoom {
  idRoom: string;
  title: string;
  price: number;
  images: IImage[];
  capacity: number;
  length: string;
  Width: string;
  dtos: DtoRoom[];
  typeRoom: string;
}

const Room: React.FC<PropsRoom> = ({
  idRoom,
  title,
  price,
  capacity,
  images,
  length,
  Width,
  dtos,
  typeRoom
}) => {
  const navigate = useNavigate();

  const [isInfoDto, setIsInfoDto] = useState<boolean>(false);

  const info = (prop: string, value: string | number) => {
    return (
      <div className={CardStyles.detail}>
        <span className={CardStyles.detail_prop}>{prop}</span>
        <span>
          <strong className={CardStyles.detail_value}>{value}</strong>
        </span>
      </div>
    );
  };

  const infoElement = (prop: string, value: JSX.Element) => {
    return (
      <div className={CardStyles.detail}>
        <span className={CardStyles.detail_prop}>{prop}</span>
        {value}
      </div>
    );
  };

  const onClick = () => {
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.ROOM}/?id=${idRoom}`, {
      replace: true,
    });
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      setIsInfoDto(!isInfoDto);
    }
  };

  return (
    <div
      className={`${CardStyles.container_card} ${isInfoDto ? CardStyles.show_dtos : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsInfoDto(true)}
      onMouseLeave={() => setIsInfoDto(false)}
    >
      <span className={CardStyles.type_room}>{typeRoom}</span>
      <div className={CardStyles.container_image}>
        <CarouselImage images={images} />
      </div>
      <div className={CardStyles.container_detail}>
        <div className={CardStyles.container_detail_title}>
          <span className={CardStyles.span_title}>{title}</span>
        </div>
        <div className={CardStyles.container_detail_info}>
          {info("Capacidad Máx.", `${capacity} Personas`)}
          {length === Width
            ? info("Medidas", `${length}m²`)
            : info("Medidas", `${length}x${Width} m`)}
          {infoElement(
            "Precio",
            <span className={CardStyles.span_inf}>
              <strong>{formateador.format(price)}</strong>
            </span>
          )}
          <div className={CardStyles.container_info_dtos}>
            <span className={CardStyles.dto_span}>Dtos.</span>
            <div className={CardStyles.container_dtos}>
              {dtos.map((dto) => (
                <div className={CardStyles.cont_dtos} key={dto.dto}>
                  <span className={CardStyles.dto}>{dto.dto}% OFF</span>
                  <span className={CardStyles.dto_horus}>
                    {dto.startHour}hs - {dto.endHour}hs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={CardStyles.container_button}>
          <button
            onClick={onClick}
            className={CardStyles.container_info__button}
          >
            VER MAS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
