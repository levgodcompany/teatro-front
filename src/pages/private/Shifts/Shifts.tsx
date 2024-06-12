import React, { useEffect, useState } from "react";
import ShiftsFormStyle from "./css/ShiftsForm.module.css";
import {
  IDaysDTO,
  IOpeningCloseHoursShiftsDTO,
  IShiftsDTO,
  RoomIdName,
  saveShifs,
} from "./services/Shifts.service";
import { Header } from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import DateSelector from "./components/DateSelector/DateSelector";
import Shift from "./components/Shift/Shift";
import Rooms from "./components/Rooms/Rooms";

interface ISelects {
  id: string;
  year: number;
  month: number;
  days: string[];
}

const ShiftsForm: React.FC = () => {
  const [shifts, setShifts] = useState<IShiftsDTO>({
    days: [],
    openingCloseHoursTurnos: [],
    roomId: [],
  });

  const [selectedDateList, setSelectedDateList] = useState<ISelects[]>([]);
  const [day, setDay] = useState<IDaysDTO[]>([]);
  const [room, setRooms] = useState<RoomIdName[]>([]);
  const [rooms, setRoom] = useState<string[]>([]);

  const [openingCloseHoursTurnos, setOpeningCloseHoursTurnos] = useState<
    IOpeningCloseHoursShiftsDTO[]
  >([]);

  useEffect(() => {
    const daysSel: IDaysDTO[] = [];
    console.log(selectedDateList)
    for (const selec of selectedDateList) {
      for (const day of selec.days) {
        daysSel.push({
          date: new Date(day),
        });
      }
    }
    setDay(daysSel)

  }, [selectedDateList]);


  useEffect(()=> {
    const res = room.map(r=> r.id);
    setRoom(res);
  }, [room]);

  useEffect(()=> {
    setShifts({
      days: day,
      openingCloseHoursTurnos: openingCloseHoursTurnos,
      roomId: rooms
    })
  }, [setShifts])


  const onClickSave = async ()=> {
    console.log({
      days: day,
      openingCloseHoursTurnos: openingCloseHoursTurnos,
      roomId: rooms
    })
    await saveShifs({
      days: day,
      openingCloseHoursTurnos: openingCloseHoursTurnos,
      roomId: rooms
    })
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className={ShiftsFormStyle.shifts_form}>
        <h1>Reservar Sala de Teatro</h1>

        <div className={ShiftsFormStyle.section}>
          <DateSelector daysSelect={setSelectedDateList} />
        </div>
        <div className={ShiftsFormStyle.section}>
          <Shift _setOpeningCloseHoursTurnos={setOpeningCloseHoursTurnos} />
        </div>

        <div className={ShiftsFormStyle.section}>
          <Rooms rooms={room} setRooms={setRooms} />
        </div>

        <div>
          <button onClick={onClickSave} >GUARDAR</button>
        </div>
      </div>
    </>
  );
};

export default ShiftsForm;
