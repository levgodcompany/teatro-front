import UserStyle from "./css/User.module.css";
import { Header } from "../../../components/Header/Header";
import Footer from "../../../components/Footer/components/Footer"
import ID_Card from './components/ID_Card'
import Proxima_Reserva from './components/Proxima_Reserva'

const User = () => {
      <div className={UserStyle.id_card}>  

return(
    <>
    <ID_Card/>
    <Proxima_Reserva/>
    
    <ul>
        <li>Informacion Personal</li>
        <li>Nueva Reserva</li>
        <li>Mis Reservas</li>
    </ul>
    <Header/>
    <Footer/>
    </>
)
</div>
}



export default User;