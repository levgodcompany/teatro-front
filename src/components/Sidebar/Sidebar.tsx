import { useState } from "react";
import SidebarStyle from "./css/Sidebar.module.css";
import ArrowRrightImg from "../../assets/arrow-sm-right-svgrepo-com.svg";
import CloseImg from "../../assets/close-sm-svgrepo-com.svg";
import { PrivateRoutes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const redirect = (url: string)=> {
    navigate(`/${PrivateRoutes.PRIVATE}/${url}`, { replace: true });
  }


  return (
    <>
      <div>
        <div>
          {!isSidebarOpen ? (
            <button className={SidebarStyle.toggle_btn} onClick={toggleSidebar}>
              <p>Menu Teatro</p>
              <img src={ArrowRrightImg} alt="" width="30" height="30" />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>
          {isSidebarOpen ? (
            <div className={SidebarStyle.Container_sidebar}>
              <div className={SidebarStyle.cont_title_open_sidebar}>
                <h2 className={SidebarStyle.cont_title_open_sidebar_title}>
                 Menu Teatro
                </h2>
                <button
                  className={`${SidebarStyle.toggle_btn_close}`}
                  onClick={toggleSidebar}
                >
                  <img src={CloseImg} alt="" width="20" height="20" />
                </button>
              </div>

              <div className={SidebarStyle.Container_list}>
                <nav className={SidebarStyle.nav_container}>
                  <li onClick={()=> redirect(PrivateRoutes.LOCAL)} className={SidebarStyle.li_container}>
                    <span>Local</span>
                  </li>
                  <li  onClick={()=> redirect(PrivateRoutes.ROOMS)} className={SidebarStyle.li_container}>
                    <span>Salas</span>
                  </li>
                  <li onClick={()=> redirect(PrivateRoutes.CLIENTS)} className={SidebarStyle.li_container}>
                    <span>Clientes</span>
                  </li>
                </nav>
              </div>
            </div>
          ) : (
            <div
              className={`${SidebarStyle.Container} ${SidebarStyle.sidebar}`}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
