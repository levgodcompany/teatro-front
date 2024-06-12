import { Box } from "@mui/material";
import { Name } from "./components/Name";
import HeaderStyle from "./css/header.module.css";

import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Perfil from "./components/Perfil";



export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [bootcampsOpen, setBootcampsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleHome = () => {

    if(menuOpen){
      setMenuOpen(!menuOpen);
    }
    setBootcampsOpen(!bootcampsOpen);
    navigate("/theater/home")
  };

  const item = ()=>{
    return <div className={HeaderStyle.container_item_movil}>
     <Perfil />
    </div>
  }

  return (
    <header>
      <div className={HeaderStyle.container}>
        <div className={HeaderStyle.container_cont}>
          <Box order={1}>
            <Name toHome={toggleHome} />
          </Box>

        </div>
        <Box order={2}>
          <div className={HeaderStyle.apply_button}>
            <Perfil />
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
