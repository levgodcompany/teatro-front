import React, { useState } from "react";
import OpeningHoursStyle from "./css/OpeningHours.module.css";
import editImage from '../../../Local/assets/edit-3-svgrepo-com.svg'
import OpeningHoursModal from "../Forms/OpeningHoursForm/OpeningHoursForm";

export interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface IOpeningDays {
  monday: IOpeningCloseHours; // Horario de apertura los lunes
  tuesday: IOpeningCloseHours; // Horario de apertura los martes
  wednesday: IOpeningCloseHours; // Horario de apertura los miércoles
  thursday: IOpeningCloseHours; // Horario de apertura los jueves
  friday: IOpeningCloseHours; // Horario de apertura los viernes
  saturday: IOpeningCloseHours; // Horario de apertura los sábados
  sunday: IOpeningCloseHours; // Horario de apertura los domingos
}

interface OpeningHoursProps {
  openingDays: IOpeningDays;
  idRoom: string;
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ idRoom, openingDays }) => {
  const days = [
    { name: "Lunes", value: openingDays.monday },
    { name: "Martes", value: openingDays.tuesday },
    { name: "Miércoles", value: openingDays.wednesday },
    { name: "Jueves", value: openingDays.thursday },
    { name: "Viernes", value: openingDays.friday },
    { name: "Sábado", value: openingDays.saturday },
    { name: "Domingo", value: openingDays.sunday },
  ];


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log('Opening Hours Data:', data);
    handleCloseModal();
  };

  return (
    <div className={OpeningHoursStyle.opening_hours}>
      <div className={OpeningHoursStyle.header}>
        <h2>Horarios</h2>
        <img onClick={handleOpenModal} src={editImage} alt="" /> 
        <OpeningHoursModal openingHoursRoom={openingDays} idRoom={idRoom} isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      </div>
      {days.map((day, index) => (
        <div key={index} className={OpeningHoursStyle.opening_hours_day}>
          <span className={OpeningHoursStyle.day_name}>{day.name}:</span>
          {day.value.isOpen ? (
            <span className={OpeningHoursStyle.hours}>
              {day.value.open} - {day.value.close}
            </span>
          ) : (
            <span className={OpeningHoursStyle.closed}>Cerrado</span>
          )}
        </div>
      ))}

    </div>
  );
};

export default OpeningHours;
