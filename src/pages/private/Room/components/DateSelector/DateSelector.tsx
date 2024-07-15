// DateSelector.tsx
import React, { useState } from "react";
import DateSelectorStyle from "./DateSelector.module.css";
import Shift from "./components/Shift/Shift";
import { IRoom } from "../../../Rooms/services/Rooms.service";
import Reservation from "../../../../../components/Reservation/Reservation";

interface ISelects {
  id: string;
  year: number;
  month: number;
  days: string[];
}

interface IDateSelectorProps {
  room: IRoom;
  load: () => void;
}

const DateSelector: React.FC<IDateSelectorProps> = ({ room, load }) => {
  const [selectedMonth, _setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, _setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDateList, setSelectedDateList] = useState<ISelects>({
    id: "",
    days: [],
    month: 0,
    year: 0
  });

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenSave, setIsOpenSave] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDayClick = (day: number) => {
    const date = new Date(`${selectedYear}-${selectedMonth + 1}-${day}`);
    const ahoraDate = new Date();
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
    if(date >= ahoraDate) {

    }
  };

  const handleAddButtonClick = () => {
    const formattedDates = selectedDays.map(
      (day) => `${selectedYear}-${(selectedMonth + 1) < 10 ? `0${(selectedMonth+1)}` : (selectedMonth+1)}-${(day) < 10 ? `0${day}`: day}`
    );
    setSelectedDateList(() => {

      const select: ISelects = {
        id: `${selectedMonth + 1}${selectedYear}`,
        year: selectedYear,
        month: selectedMonth + 1,
        days: formattedDates,
      };
      

      return select;
    });
    setIsOpen(true);
    setIsOpenModal(true);
  };

  const renderCalendar = () => {
    const days = Array.from(
      { length: daysInMonth(selectedMonth, selectedYear) },
      (_, i) => i + 1
    );
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sunday, 1 = Monday, ...
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <td key={`blank-${i}`} className={`${DateSelectorStyle.blank} ${DateSelectorStyle.item}`}></td>
    )
  
  );
    const rows: any = [];
    let cells = blanks;
    days.forEach((day, index) => {
      const date = new Date(`${selectedYear}-${selectedMonth + 1}-${day}`);
      const ahoraDate = new Date();
      if(date.getDate() < ahoraDate.getDate()) {
        cells.push(
          <td
            key={index}
            className={
              selectedDays.includes(day) ? `${DateSelectorStyle.selected}` : `${DateSelectorStyle.not_selected}`
            }
          >
            {day}
          </td>
        );
      }else {

        cells.push(
          <td
            key={index}
            className={
              selectedDays.includes(day) ? `${DateSelectorStyle.selected} ${DateSelectorStyle.item}` : `${DateSelectorStyle.item}`
            }
            onClick={() => handleDayClick(day)}
          >
            {day}
          </td>
        );
      }
      if (
        (index + firstDayOfMonth + 1) % 7 === 0 ||
        index === days.length - 1
      ) {
        rows.push(<tr key={rows.length}>{cells}</tr>);
        cells = [];
      }
    });
    return (
      <table className={DateSelectorStyle.calendar}>
        <thead>
        <tr>
            <th>DO</th>
            <th>LU</th>
            <th>MA</th>
            <th>MI</th>
            <th>JU</th>
            <th>VI</th>
            <th>SA</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }


  const onRequestClose = ()=> {
    setIsOpen(false);
    setIsOpenModal(false);
    load();
    setSelectedDays([]);
    setSelectedDateList({
      id: "",
      days: [],
      month: 0,
      year: 0
    });
  }

  const openSave = ()=> {
    setIsOpenSave(!isOpenSave)
  }


  return (
    <div className={DateSelectorStyle.date_selector}>
      <div className={DateSelectorStyle.container_calendar}>
        <div className={DateSelectorStyle.nav_container}>
          <h3 className={DateSelectorStyle.header_caledar}>
            {capitalizeFirstLetter(
              new Date(selectedYear, selectedMonth).toLocaleDateString(
                "default",
                { month: "long" }
              )
            )}
            <div className={DateSelectorStyle.select_container}>
              <span>{new Date().getFullYear()}</span>
            </div>
          </h3>
        </div>

        <div className={DateSelectorStyle.calendar_container}>
          {renderCalendar()}
        </div>
        <div className={DateSelectorStyle.button_container}>
          {selectedDays.length > 0 ? <button onClick={handleAddButtonClick}>Reservar</button> : <></>}
          
        </div>
      </div>
      <>
      {
        isOpenModal ? <Shift openSave={openSave} days={selectedDays} updateDay={handleDayClick} daysSelect={selectedDateList} room={room} isOpen={isOpen} onRequestClose={onRequestClose} /> : <></>
      }
      </>
      {
        isOpenSave ? <Reservation openSave={openSave} /> : <></>
      }
    </div>
  );
};

export default DateSelector;
