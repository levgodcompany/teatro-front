import { useEffect, useState } from "react";
import CarouselComp from "../../../components/CourserComps/CarouselComp";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Room from "./Components/Rooms/Room";

import HomeStyle from "./css/Home.module.css";
import { getHttpLocalID } from "../../../services/LocalID.service";
import { useAppDispatch } from "../../../redux/hooks";
import { createLocalID } from "../../../redux/slices/LocalID.slice";
import { getRoomsHTTP, IImage, IRoom } from "../Rooms/services/Rooms.service";

interface InfoRoom {
  idRoom: string;
  title: string;
  price: number;
  images: IImage[];
  capacity: number;
}

const Home = () => {
  const [rooms, setRooms] = useState<InfoRoom[]>([]);

  const dispatch = useAppDispatch();

  const getIdLocal = async () => {
    const res = await getHttpLocalID();
    if (res) {
      dispatch(createLocalID(res));
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

  useEffect(() => {
    getIdLocal();
    getRooms();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Sidebar />

        <div>
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
