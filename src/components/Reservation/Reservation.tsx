import styles from "./Reservation.module.css"
interface IReservationProps {
    openSave: () => void;
}
const Reservation: React.FC<IReservationProps> = ({openSave})=>{
    return (
        <div className={styles.container}>
    
        <div className={styles.card}>
          
          <div className={styles.header}>
            <h2 className={styles.title}>Reserva Exitosa</h2>
          </div>
          <div className={styles.body}>
            <p className={styles.not}>Tu reserva se realizó con éxito.</p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.buttons_acept} onClick={openSave}>Aceptar</button>
          </div>
        </div>
        </div>
      );
}

export default Reservation