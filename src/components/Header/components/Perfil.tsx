
import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import PerfilStyle from '../css/perfil.module.css'
const Perfil = () => {

  const ownerState = useAppSelector(state => state.owner);

  useEffect(()=> {

  }, [ownerState])

    return (
      <div className={PerfilStyle.container} >
        <div className={PerfilStyle.container_perfil}>
          <p className={PerfilStyle.container_perfil_user}>{ownerState.name}</p>
          <p className={PerfilStyle.container_perfil_email}>{ownerState.email}</p>
        </div>
      </div>
    );
  };

export default Perfil;