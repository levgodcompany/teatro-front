import { useEffect, useState } from "react";
import { Header } from "../../../components/Header/Header";
import Room from "./Components/Rooms/Room";

import fondoImg from "../../../assets/fondo_local.jpg"

import HomeStyle from "./css/Home.module.css";
import { getHttpLocalID, ILocalID } from "../../../services/LocalID.service";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import { DtoRoom, getRoomsHTTP, IImage, IRoom } from "../Rooms/services/Rooms.service";
import imgLogo from "../../../assets/el_juvenil.svg";
import { IToken } from "../../../redux/slices/token.slice";
import Footer from "../../../components/Footer/Footer";
import { getLocalHTTP, ILocal } from "./services/Home.service";
import Loading from "../../../components/Loading/Loading";

interface InfoRoom {
  idRoom: string;
  title: string;
  price: number;
  images: IImage[];
  capacity: number;
  length: number;
  Width: number;
  dtos: DtoRoom[];
  typeRoom: string;
}

const Home = () => {
  const [rooms, setRooms] = useState<InfoRoom[]>([]);
  const [local, setLocal] = useState<ILocal | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const token: IToken = useAppSelector((state) => state.token);
  const localId: ILocalID = useAppSelector((state) => state.localID);

  const getIdLocal = async () => {
    if (token.token.length > 0 && localId.id.length == 0) {
      const res = await getHttpLocalID();
      if (res) {
        dispatch(createLocalID(res));
      }
    }
  };

  const getRooms = async () => {
    const roomhttp = await getRoomsHTTP();
    if (roomhttp) {
      const transformedRooms = roomhttp.map(
        (room: IRoom): InfoRoom => ({
          idRoom: room._id,
          title: room.name,
          price: room.priceBase,
          capacity: room.capacity,
          images: [room.mainImage, ...room.additionalImages],
          length: room.length,
          Width: room.Width,
          dtos: room.dtoRoomHours,
          typeRoom: room.typeRoom
        })
      );
      setRooms([...transformedRooms]);
    }
  };

  const getLocalL = async () => {
    const res = await getLocalHTTP();
    setLocal(res);
  };

  useEffect(() => {
    getIdLocal();
    getRooms();
    getLocalL();
    setIsLoading(false); // Marcar la carga como completada después de cierto tiempo (simulado)

  }, []);

  return (
    <>
    {
      isLoading ? <Loading /> : <><Header />
      <main>
        {local ? (
          <>
            <div
              className={HomeStyle.background}
              style={{ backgroundImage: `url(${fondoImg})` }}
            >
              <div className={HomeStyle.content}>
                <img className={HomeStyle.content_logo} src={imgLogo} alt="" />
                <div className={HomeStyle.content_descrip}>
                  <p>{local.description}</p>
                </div>
              </div>
            </div>
            {
              local.services.length > 0 ?  <div className={HomeStyle.local_services}>
              <span className={HomeStyle.services_title}>
                SERVICIOS PRINCIPALES
              </span>
              <div className={HomeStyle.services}>
                {local.services.map((s, i) => (
                  <>
                    <span key={i}>{s}</span>
                  </>
                ))}
              </div>
            </div> :  <></>
            }
           
          </>
        ) : (
          <></>
        )}

        <div className={HomeStyle.rooms}>
          <div className={HomeStyle.rooms_title}>
            <h3>Salas de Ensayo</h3>
          </div>
          <div className={HomeStyle.container_room}>
            {rooms.map((room) => (
              <>
                <Room
                  idRoom={room.idRoom}
                  typeRoom={room.typeRoom}
                  capacity={room.capacity}
                  title={room.title}
                  images={room.images}
                  price={room.price}
                  Width={room.Width}
                  length={room.length}
                  dtos={room.dtos}
                />
              </>
            ))}
          </div>
        </div>

      </main>

      <Footer /></>
    }
      
    </>
  );
};

export default Home;
