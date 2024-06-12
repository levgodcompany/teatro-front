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
  list: ISelects[];
}

const DateSelector: React.FC<IDateSelectorProps> = ({ list }) => {
  const [selectedDateList, setSelectedDateList] = useState<ISelects[]>([
    ...list,
  ]);

  useEffect(() => {
    setSelectedDateList([...list]);
  }, [list]);

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

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  return (
    <div className={DateSelectorStyle.date_selector}>
      <div className={DateSelectorStyle.selected_date_container}>
        <p>Días con turnos:</p>

        {selectedDateList.map((date) => {
          return (
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
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </div>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
