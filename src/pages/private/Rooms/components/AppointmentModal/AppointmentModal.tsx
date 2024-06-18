import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./css/AppointmentModal.css";
import { getClientAppointment, IAppointment, IClient } from "../../services/Rooms.service";


interface AppointmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  appointment: IAppointment | null;
  idRoom: string
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onRequestClose,
  appointment,
  idRoom
}) => {

 // const [client, setClient] = useState<IClient[]>([]);
  if (!appointment) return null;

 /* const getClient = async ()=> {
    const cl: IClient [] = [];
    if(appointment.client){
      const c = await getClientAppointment(idRoom, appointment.client[0], appointment._id);
      if(c){
        cl.push(c);
      }
      setClient(cl);
    }
  }
*/

  useEffect(()=> {
    //getClient();
    console.log("idRoom:",idRoom, appointment.client, "appointment._id:",appointment._id)
  }, [])


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Appointment Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modalHeader">
        <h2 className="modalTitle">{appointment.title}</h2>
        <button className="closeButton" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <div className="modalContent">
        <p>
          <strong>Fecha:</strong> {appointment.date.toLocaleDateString()}
        </p>
        <p>
          <strong>Hora de entrada:</strong>{" "}
          {appointment.start.getHours()}:{appointment.start.getMinutes()} 
        </p>
        <p>
          <strong>Hora de salida:</strong>{" "}
          {appointment.end.getHours()}:{appointment.end.getMinutes()} 
        </p>
        <p>
          <strong>Descripción:</strong> {appointment.description}
        </p>

        <div>
        </div>

      </div>
      <div className="modalFooter">
        <button className="actionButton" onClick={onRequestClose}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
