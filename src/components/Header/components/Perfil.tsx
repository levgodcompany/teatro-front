
import { useAppSelector } from '../../../redux/hooks';
import PerfilStyle from '../css/perfil.module.css'
const Perfil = () => {

    return (
      <div className={PerfilStyle.container} >
        <div className={PerfilStyle.container_perfil}>
          <p className={PerfilStyle.container_perfil_user}>Leandro Veron</p>
          <p className={PerfilStyle.container_perfil_email}>leandroveron1110@gmail.com</p>
        </div>
      </div>
    );
  };

export default Perfil;