import { deleteAppointmentHTTP } from "../../pages/private/Room/service/Room.service";
import { IAppointment } from "../../pages/private/Rooms/services/Rooms.service";
import styles from "./ConfirCancelReservation.module.css";

interface ConfirProps {
  idRoom: string;
  appointmentId: string;
  load: () => void;
  cancel: () => void;
  resHTTL?:(apps: IAppointment[])=> void; 
}

const ConfirCancelReservation: React.FC<ConfirProps> = ({
  idRoom,
  appointmentId,
  load,
  cancel,
  resHTTL
}) => {
  const onClickCancel = async () => {
    const res = await deleteAppointmentHTTP(idRoom, appointmentId);
    if (res) {
      load();
      if(resHTTL) {
          resHTTL(res)
      }
    }
  };

  return (
    <div className={styles.container}>

    <div className={styles.card}>
      <div onClick={cancel} className={styles.roomType}>X</div>
      <div className={styles.header}>
        <h2 className={styles.title}>Confirmación de Eliminación de Turno</h2>
      </div>
      <div className={styles.body}>
        <p className={styles.not}>Estás a punto de eliminar un turno programado. Esta acción es irreversible. ¿Estás seguro de que deseas proceder con la eliminación?</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buttons_acept} onClick={onClickCancel}>Aceptar</button>
        <button className={styles.buttons_cancel} onClick={cancel}>Cancelar</button>
      </div>
    </div>
    </div>
  );
};

export default ConfirCancelReservation;
