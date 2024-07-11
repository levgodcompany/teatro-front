import styles from "./Footer.module.css";
import logoElJuvenil from "../../assets/el_juvenil.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={logoElJuvenil} alt="Logo" />
      </div>
      <div className={styles.services}>
        <h2>Servicios</h2>
        <ul className={styles.services_local}>
          <li>Reserva de salas</li>
          <li>Bar</li>
          <li>Desayunos</li>
          <li>Clases</li>
          <li>Dancer</li>
        </ul>
      </div>
      <div className={styles.contacts}>
        <h2>Contactos</h2>
        <ul className={styles.contacts_local}>
          <li className={styles.contacts_local_item}>
            <a
              href="https://www.facebook.com/teatrobar.eljuvenil/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li className={styles.contacts_local_item}>
            <a
              href="https://www.instagram.com/teatroeljuvenil/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
          <li className={styles.contacts_local_item}>
            <a href="mailto:info@eljuvenil.com">Email</a>
          </li>
          <li className={styles.contacts_local_item}>
            <a href="https://api.whatsapp.com/send?phone=5491156321826&text=Hola,%20quiero%20más%20info!">
              +54 9 11 5632 1826
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
