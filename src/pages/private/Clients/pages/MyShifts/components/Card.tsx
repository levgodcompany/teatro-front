import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  roomType: string;
  dimensions: string;
  maxCapacity: number;
}

const Card: React.FC<CardProps> = ({ title, roomType, dimensions, maxCapacity }) => {
  return (
    <div className={styles.card}>
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
