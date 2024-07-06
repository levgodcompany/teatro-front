import React, { useState } from 'react';
import styles from './PasswordReset.module.css';
import { resetPass } from '../../services/login.service';

interface PasswordResetProps {
  vol: () => void; // Función para volver al formulario de inicio de sesión
}

const PasswordReset: React.FC<PasswordResetProps> = ({ vol }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reset = async () => {
        await resetPass(email)
    }
    reset()
    // Lógica para enviar el email de recuperación de contraseña
    setMessage('Si el email está registrado, recibirás un email con tu nueva contraseña.');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
          placeholder='Email'
        />
        <button type="submit" className={styles.button}>Enviar</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      <a className={styles.backLink} onClick={vol}>Volver al inicio de sesión</a>
    </div>
  );
};

export default PasswordReset;
