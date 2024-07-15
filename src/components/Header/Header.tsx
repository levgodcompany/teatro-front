import { Box } from "@mui/material";
import { Name } from "./components/Name";
import HeaderStyle from "./css/header.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeSeccionImg from "../../assets/close_seccion.svg"
import { useAppDispatch } from "../../redux/hooks";
import { resetClientID } from "../../redux/slices/ClientID.slice";
import { resetToken } from "../../redux/slices/token.slice";
import { resetLocalID } from "../../redux/slices/LocalID.slice";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [bootcampsOpen, setBootcampsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleHome = () => {
    if (menuOpen) {
      setMenuOpen(!menuOpen);
    }
    setBootcampsOpen(!bootcampsOpen);
    navigate("/theater/home");
  };

  const navMyShifts = () => {
    navigate("/theater/clients/my-shifts");
  };

  const navHome = () => {
    navigate("/theater/home");
  };

  const navPerfil = () => {
    navigate("/theater/clients/perfil");
  };

  const navClose = () => {
    dispatch(resetClientID())
    dispatch(resetToken())
    dispatch(resetLocalID())
    navigate("/singin");
  };

  const item = () => {
    return (
      <div className={HeaderStyle.container_item_movil}>
        <span onClick={navPerfil}>Perfil</span>
        <span onClick={navHome}>Home</span>
        <span onClick={navMyShifts}>Mis Reservas</span>
        <img className={HeaderStyle.img_close} src={closeSeccionImg} onClick={navClose} alt="" />
      </div>
    );
  };

  return (
    <header>
      <div className={HeaderStyle.container}>
        <div className={HeaderStyle.container_cont}>
          <Box order={1}>
            <Name toHome={toggleHome} />


          </Box>
        </div>

        <div className={HeaderStyle.container_items}>
          <span onClick={navHome}>Home</span>
          <span onClick={navMyShifts}>Mis Reservas</span>
        </div>

        
        <Box order={2}>
          <div className={HeaderStyle.apply_button}>
            <div className={HeaderStyle.perfil_close}>
              <span  onClick={navPerfil}>Perfil</span>
              <img className={HeaderStyle.img_close} src={closeSeccionImg} onClick={navClose} alt="" />

            </div>
          </div>
          <div className={HeaderStyle.button_option}>
            <button onClick={toggleMenu}>☰</button>
          </div>
        </Box>
      </div>

      <nav
        className={`${
          menuOpen
            ? `${HeaderStyle.navBar_movil}`
            : `${HeaderStyle.navBar_movil_close}`
        } `}
      >
        <ul className={HeaderStyle.container_ul}>{item()}</ul>
      </nav>
    </header>
  );
};
