
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import PerfilStyle from '../css/perfil.module.css'
import { ClientID, getClientID, IClientID, initialStateClinetID } from '../../../redux/slices/ClientID.slice';
import { getLocalStorage } from '../../../utilities/localStorage.utility';
import { clientByID, IClient } from '../../../services/Auth.service';
import { createClient } from '../../../redux/slices/Client.slice';
const Perfil = () => {

  const clientState = useAppSelector(state => state.client);
  const [clientStat, setClient] = useState<IClient>({
    _id: "",
    email: "",
    name: "",
    phone: "",
    token: ""
  })

  const dispatch = useAppDispatch();
  const clientId: IClientID = useAppSelector(state=> state.clientID)


  const getClientHTTP = async ()=> {
    if(clientId.id.length > 0){
      const client = await clientByID(clientId.id);

      if(client){
        dispatch(createClient(client));
        setClient(client)

      }
    }
  }

  useEffect(()=> {
    if(clientState._id == ""){
      getClientHTTP()
      
    }

    console.log("clientState", clientState)
    
  }, [clientState._id])

  


    return (
      <div className={PerfilStyle.container} >
        <div className={PerfilStyle.container_perfil}>
          <p className={PerfilStyle.container_perfil_user}>{clientStat.name}</p>
          <p className={PerfilStyle.container_perfil_email}>{clientStat.email}</p>
        </div>
      </div>
    );
  };

export default Perfil;