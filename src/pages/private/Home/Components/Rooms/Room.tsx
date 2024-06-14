import CarouselImage from "../../../../../components/CarouselImages/CarouselImage";
import { DtoRoom, IImage } from "../../../Rooms/services/Rooms.service";
import CardStyles from "./css/Room.module.css";
import DimeImage from "../../../../../assets/dime.svg";
import { PrivateRoutes } from "../../../../../routes/routes";
import { useNavigate } from "react-router-dom";

interface PropsRoom {
  idRoom: string;
  title: string;
  price: number;
  images: IImage[];
  capacity: number;
}

const Room: React.FC<PropsRoom> = ({
  idRoom,
  title,
  price,
  capacity,
  images,
}) => {
  const navigate = useNavigate();

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

  const formateador = new Intl.NumberFormat("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <div className={CardStyles.container_card}>
      <div className={CardStyles.container_image}>
          <CarouselImage images={images} />
        </div>
        <div className={CardStyles.container_detail}>
          <div className={CardStyles.container_detail_title}>
            <span className={CardStyles.span_title}>{title}</span>
          </div>
          <div className={CardStyles.container_detail_info}>
            {info("Capacidad Máx.", capacity)}
            {info("Medidas", "15x10 mt")}

            {infoElement(
              "Precio",
              <span className={CardStyles.span_inf}>
                $<strong>{formateador.format(price)}</strong>
              </span>
            )}
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
    </>
  );
};

export default Room;
