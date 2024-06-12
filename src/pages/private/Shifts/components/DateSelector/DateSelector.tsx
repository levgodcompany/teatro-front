// DateSelector.tsx
import React, { useEffect, useState } from "react";
import DateSelectorStyle from "./DateSelector.module.css";
import CarouselComp from "../../../../../components/CarouselComponents/CarouselComp";

interface ISelects {
  id: string;
  year: number;
  month: number;
  days: string[];
}

interface IDateSelectorProps {
  daysSelect: (days: ISelects[])=> void
}

const DateSelector: React.FC<IDateSelectorProps> = ({daysSelect}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDateList, setSelectedDateList] = useState<ISelects[]>([]);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setSelectedYear((prevYear) =>
      selectedMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setSelectedYear((prevYear) =>
      selectedMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  useEffect(()=> {
    daysSelect(selectedDateList);
  }, [selectedDateList])

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleDayClick = (day: number) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  const handleAddButtonClick = () => {
    const formattedDates = selectedDays.map(
      (day) => `${selectedYear}-${selectedMonth + 1}-${day}`
    );
    setSelectedDateList((prevList) => {
      const dayIndex = prevList.findIndex(
        (prevDays) =>
          prevDays.year == selectedYear && prevDays.month == selectedMonth + 1
      );
      const select: ISelects = {
        id: `${selectedMonth + 1}${selectedYear}`,
        year: selectedYear,
        month: selectedMonth + 1,
        days: formattedDates,
      };
      if (dayIndex == -1) {
        return [...prevList, select];
      }

      prevList[dayIndex] = select;

      return [...prevList];
    });
    setSelectedDays([]);
  };

  const renderCalendar = () => {
    const days = Array.from(
      { length: daysInMonth(selectedMonth, selectedYear) },
      (_, i) => i + 1
    );
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sunday, 1 = Monday, ...
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <td key={`blank-${i}`} className={DateSelectorStyle.blank}></td>
    ));
    const rows: any = [];
    let cells = blanks;
    days.forEach((day, index) => {
      cells.push(
        <td
          key={index}
          className={
            selectedDays.includes(day) ? `${DateSelectorStyle.selected}` : ""
          }
          onClick={() => handleDayClick(day)}
        >
          {day}
        </td>
      );
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
        <tbody>
          <tr>
            <th>DO</th>
            <th>LU</th>
            <th>MA</th>
            <th>MI</th>
            <th>JU</th>
            <th>VI</th>
            <th>SA</th>
          </tr>
          {rows}
        </tbody>
      </table>
    );
  };

  const handleClicEditDays = (selections: ISelects) => {
    const days = selections.days.map((d) => {
      const day = Number.parseInt(d.split("-")[2]);
      return day;
    });
    setSelectedYear(selections.year);
    setSelectedMonth(selections.month - 1);
    setSelectedDays(days);
  };

  const handleClicDeleteDays = (idSelectDaty: string) => {
    setSelectedDateList((prevDay) => {
      const filterDay = prevDay.filter((day) => day.id != idSelectDaty);
      return [...filterDay];
    });
  };

  const renderDaysSelect = (days: string[]) => {
    const daysNumber = days
      .map((d) => Number.parseInt(d.split("-")[2]))
      .sort((a, b) => a - b);

    return (
      <>
        {daysNumber.map((d) => (
          <span>{d}</span>
        ))}
      </>
    );
  };

  const renderSelectedDateList = () => {

    
    return (
      <>
        <CarouselComp
          items={selectedDateList}
          renderCard={(date) => (
            <div className={DateSelectorStyle.selected_date_list}>
              {
                <div className={DateSelectorStyle.container_date} key={date.id}>
                  <div className={DateSelectorStyle.container_date_header}>
                    <p>
                      {capitalizeFirstLetter(
                        new Date(date.year, date.month - 1).toLocaleDateString(
                          "default",
                          { month: "long" }
                        )
                      )}{" "}
                      - {date.year}
                    </p>
                  </div>
                  <div className={DateSelectorStyle.container_main}>
                    {renderDaysSelect(date.days)}
                  </div>
                  <div className={DateSelectorStyle.container_date_buttons}>
                    <button onClick={() => handleClicEditDays(date)}>
                      Editar
                    </button>
                    <button onClick={() => handleClicDeleteDays(date.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              }
            </div>
          )}
        />
      </>
    );
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  return (
    <div className={DateSelectorStyle.date_selector}>
      <div className={DateSelectorStyle.container_calendar}>
        <div className={DateSelectorStyle.nav_container}>
          <button
            className={DateSelectorStyle.nav_button}
            onClick={handlePreviousMonth}
          >
            &lt;
          </button>
          <h3 className={DateSelectorStyle.header_caledar}>
            {capitalizeFirstLetter(
              new Date(selectedYear, selectedMonth).toLocaleDateString(
                "default",
                { month: "long" }
              )
            )}
            <div className={DateSelectorStyle.select_container}>
              <select
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </h3>
          <button
            className={DateSelectorStyle.nav_button}
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>

        <div className={DateSelectorStyle.calendar_container}>
          {renderCalendar()}
        </div>
        <div className={DateSelectorStyle.button_container}>
          <button onClick={handleAddButtonClick}>Agregar</button>
        </div>
      </div>

      <div className={DateSelectorStyle.selected_date_container}>
        <p>Días seleccionados:</p>
        {renderSelectedDateList()}
      </div>
    </div>
  );
};

export default DateSelector;
