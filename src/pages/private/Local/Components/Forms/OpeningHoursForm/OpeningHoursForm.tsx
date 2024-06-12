// src/components/OpeningHoursModal.tsx

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import OpeningHoursFormStyle from "./css/OpeningHoursForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { editLocal, ILocal, IOpeningDays } from "../../../services/Local.service";

interface OpeningHoursModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: IOpeningDays) => void;
}

interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

const OpeningHoursModal: React.FC<OpeningHoursModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
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

  const dispatch = useAppDispatch();

  const openingHoursState = useAppSelector((state) => state.local.openingHours);

  useEffect(() => {
    setOpeningHours({
      monday: openingHoursState.monday,
      tuesday: openingHoursState.tuesday,
      wednesday: openingHoursState.wednesday,
      thursday: openingHoursState.thursday,
      friday: openingHoursState.friday,
      saturday: openingHoursState.saturday,
      sunday: openingHoursState.sunday,
    });
  }, [openingHoursState]);

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

  const editetLocal = async (local: Partial<ILocal>)=> {
    const result = await  editLocal(local);
    console.log(result);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  editetLocal({
      openingHours: openingHours
  })
    onSubmit(openingHours);
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
