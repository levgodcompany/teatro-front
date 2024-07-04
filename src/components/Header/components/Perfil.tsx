
import PerfilStyle from '../css/perfil.module.css'
const Perfil = () => {

    return (
      <div className={PerfilStyle.container} >
        <div className={PerfilStyle.container_perfil}>
          <p className={PerfilStyle.container_perfil_user}>Perfil</p>
        </div>
      </div>
    );
  };

export default Perfil;