
import PerfilStyle from '../css/perfil.module.css'
const Perfil = () => {

    return (
      <div className={PerfilStyle.container} >
        <div className={PerfilStyle.container_perfil}>
          <span className={PerfilStyle.container_perfil_user}>Perfil</span>
        </div>
      </div>
    );
  };

export default Perfil;