import Modal from "react-modal";
import { IAppointment } from "../../../../../Rooms/services/Rooms.service";
import ListOptionPrintStyle from "./ListOptionPrint.module.css";
import { useState } from "react";

interface ListOptionPrintProps {
  isOpen: boolean;
  onRequestClose: () => void;
  printAppointment: (event: IAppointment)=> void;
  printAppointments: (event: IAppointment[])=> void;
  event: IAppointment;
  appointments: IAppointment[];
}
const ListOptionPrint: React.FC<ListOptionPrintProps> = ({
  isOpen,
  onRequestClose,
  printAppointment,
  printAppointments,
  appointments,
  event
}) => {
  const [select, setSelect] = useState<string>();

  const onSelectRoom = (_event: React.ChangeEvent<HTMLSelectElement>) => {
    const sel = _event.target.value;
   if(sel == "1") {
    printAppointment(event)
   }else if(sel == "2"){
    const res =  appointments.filter(app => app.client != null && app.start.getDay() === (event.start as Date).getDay() && app.start.getMonth() === (event.start as Date).getMonth())
    printAppointments(res)
   }else if(sel == "3"){
    const res =  appointments.filter(app => app.client == null && app.start.getTime() === (event.start as Date).getTime() && app.start.getMonth() === (event.start as Date).getMonth())
    printAppointments(res)
   }else if(sel == "4"){
    const res =  appointments.filter(app => app.available == false && app.start.getTime() === (event.start as Date).getTime() && app.start.getMonth() === (event.start as Date).getMonth())
    printAppointments(res)
   }
   setSelect("");
  };

  const HandleronRequestClose = ()=> {
    setSelect("");
    onRequestClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        className={ListOptionPrintStyle.modal}
        overlayClassName={ListOptionPrintStyle.modal_overlay}
        onRequestClose={HandleronRequestClose}
      >
        <div style={{minHeight:"150px"}} >
          <select onChange={onSelectRoom} value={select}>
            <option value={"0"}>Selecciona una opcion para "Imprimir"</option>
            <option value={"1"}>Imprimir Turno</option>
            <option value={"2"}>Imprimir Todos los Turnos ocupados</option>
            <option value={"3"}>Imprimir Todos los Turnos desocupados</option>
            <option value={"4"}>Imprimir Todos los Turnos desavilitados</option>
          </select>

 
        </div>
      </Modal>
    </>
  );
};

export default ListOptionPrint;
