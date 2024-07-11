import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  idRoom: string;
  title: string;
  roomType: string;
  dimensions: string;
  maxCapacity: number;
  onRedirec: (idRoom:string) => void
}

const Card: React.FC<CardProps> = ({ idRoom, title, roomType, dimensions, maxCapacity, onRedirec }) => {
  return (
    <div className={styles.card} onClick={()=> onRedirec(idRoom)}>
      <div className={styles.roomType}>{roomType}</div>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>
        <p className={styles.dimensions}>Medidas: <strong>{dimensions}</strong></p>
        <p className={styles.maxCapacity}>Capacidad Máxima: <strong>{maxCapacity} personas</strong> </p>

        <p className={styles.not}>No tienes reservas en esta sala</p>
      </div>
    </div>
  );
};

export default Card;
