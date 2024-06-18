import { useEffect, useState } from "react";
import CarouselComp from "../../../components/CourserComps/CarouselComp";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Room from "./Components/Rooms/Room";

import HomeStyle from "./css/Home.module.css";
import { getHttpLocalID, ILocalID } from "../../../services/LocalID.service";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import { getRoomsHTTP, IImage, IRoom } from "../Rooms/services/Rooms.service";
import { getLocal, ILocal } from "../Local/services/Local.service";
import imgLogo from "../../../assets/el_juvenil.svg";
import { IToken } from "../../../redux/slices/token.slice";

interface InfoRoom {
  idRoom: string;
  title: string;
  price: number;
  images: IImage[];
  capacity: number;
}

const Home = () => {
  const [rooms, setRooms] = useState<InfoRoom[]>([]);
  const [local, setLocal] = useState<ILocal | undefined>(undefined);

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
        })
      );
      setRooms([...transformedRooms]);
    }
  };

  const getLocalL = async () => {
    const res = await getLocal();
    setLocal(res);
  };

  useEffect(() => {
    getIdLocal();
    getRooms();
    getLocalL();
  }, []);

  return (
    <>
      <Header />
      <main>
        {local ? (
          <>
            <div
              className={HomeStyle.background}
              style={{ backgroundImage: `url(${local.mainImage.url})` }}
            >
              <div className={HomeStyle.content}>
                <img className={HomeStyle.content_logo} src={imgLogo} alt="" />
                <div className={HomeStyle.content_descrip}>
                  <p>{local.description}</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.local_services}>
              <span className={HomeStyle.services_title}>
                Servicios principales
              </span>
              <div className={HomeStyle.services}>
                {local.services.map((s, i) => (
                  <>
                    <span key={i}>{s}</span>
                  </>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className={HomeStyle.rooms}>
          <div className={HomeStyle.rooms_title}>
            <h3>Salas de Ensayo</h3>
            ___
          </div>
          <div className={HomeStyle.container_room}>
            {rooms.map((room) => (
              <>
                <Room
                  idRoom={room.idRoom}
                  capacity={room.capacity}
                  title={room.title}
                  images={room.images}
                  price={room.price}
                />
              </>
            ))}
          </div>
        </div>

        <div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default Home;
