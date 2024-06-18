// src/components/OpeningHoursModal.tsx

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import OpeningHoursFormStyle from "./css/OpeningHoursForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { IOpeningDays } from "../../OpeningHours/OpeningHours";
import { IRoom, updateRoomHTTP } from "../../../services/Rooms.service";

interface OpeningHoursModalProps {
  isOpen: boolean;
  idRoom: string;
  openingHoursRoom: IOpeningDays;
  onRequestClose: () => void;
}

interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

const OpeningHoursModal: React.FC<OpeningHoursModalProps> = ({
  isOpen,
  idRoom,
  onRequestClose,
  openingHoursRoom
}) => {
  const [openingHours, setOpeningHours] = useState<IOpeningDays>({
    monday: { isOpen: false, open: "", close: "" },
    tuesday: { isOpen: false, open: "", close: "" },
    wednesday: { isOpen: false, open: "", close: "" },
    thursday: { isOpen: false, open: "", close: "" },
    friday: { isOpen: false, open: "", close: "" },
    sunday: { isOpen: false, open: "", close: "" },
    saturday: { isOpen: false, open: "", close: "" },
  });


  useEffect(() => {
    setOpeningHours({
      monday: openingHoursRoom.monday,
      tuesday: openingHoursRoom.tuesday,
      wednesday: openingHoursRoom.wednesday,
      thursday: openingHoursRoom.thursday,
      friday: openingHoursRoom.friday,
      saturday: openingHoursRoom.saturday,
      sunday: openingHoursRoom.sunday,
    });
  }, [openingHoursRoom]);

  const handleChange = (
    day: keyof IOpeningDays,
    field: keyof IOpeningCloseHours,
    value: string | boolean
  ) => {
    setOpeningHours({
      ...openingHours,
      [day]: {
        ...openingHours[day],
        [field]: value,
      },
    });
  };

  const editetLocal = async (room: Partial<IRoom>)=> {
    const result = await  updateRoomHTTP(idRoom, room);
    console.log(result);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  editetLocal({
      openingHours: openingHours
  })
  };


  const dayParse = (d: string)=> {
    if(d == "monday") return "Lunes"
    if(d == "tuesday") return "Martes"
    if(d == "wednesday") return "Miércoles"
    if(d == "thursday") return "Jueves"
    if(d == "friday") return "Viernes"
    if(d == "saturday") return "Sábado"
    if(d == "sunday") return "Domingo"
    return d;
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={OpeningHoursFormStyle.modal} 
      overlayClassName={OpeningHoursFormStyle.overlay}
      ariaHideApp={false}
    >
      <h2>Editar Horarios de Apertura</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(openingHours).map((day) => (
          <div key={day} className={OpeningHoursFormStyle.day_section}>
            <h3>{dayParse(`${day}`)}</h3>
            <label>
               
            Abierto:
              <input
                type="checkbox"
                checked={openingHours[day as keyof IOpeningDays].isOpen}
                onChange={(e) =>
                  handleChange(
                    day as keyof IOpeningDays,
                    "isOpen",
                    e.target.checked
                  )
                }
              />
            </label>
            {openingHours[day as keyof IOpeningDays].isOpen && (
              <>
                <label>
                Hora de Apertura:
                  <input
                    type="time"
                    value={openingHours[day as keyof IOpeningDays].open}
                    onChange={(e) =>
                      handleChange(
                        day as keyof IOpeningDays,
                        "open",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label>
                Hora de Cierre:
                  <input
                    type="time"
                    value={openingHours[day as keyof IOpeningDays].close}
                    onChange={(e) =>
                      handleChange(
                        day as keyof IOpeningDays,
                        "close",
                        e.target.value
                      )
                    }
                  />
                </label>
              </>
            )}
          </div>
        ))}
        <button type="submit">Guardar</button>
        <button type="button" onClick={onRequestClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default OpeningHoursModal;
