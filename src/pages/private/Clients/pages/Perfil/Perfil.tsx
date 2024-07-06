import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { IClientID } from "../../../../../redux/slices/ClientID.slice";
import { Header } from "../../../../../components/Header/Header";

import PerfilStyle from "./Perfil.module.css";
import { clientByIDHttps, editClientByID } from "../../services/Client.service";
import { IClient } from "../../../Rooms/services/Rooms.service";

interface FormData {
  name: string;
  lastName: string;
  phone: string;
  password: string;
}

const Perfil = () => {
  const clientSelector: IClientID = useAppSelector((state) => state.clientID);

  const [client, setClient] = useState<IClient>({
    _id: "",
    email: "",
    name: "",
    phone: "",
    token: "",
    password: ""
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastName: "",
    phone: "",
    password: "",
  });

  const getClientHTTP = async () => {
    const res = await clientByIDHttps(clientSelector.id);
    if (res) {
      setClient(res);
      setFormData({
        name: res.name.split(";")[0],
        lastName: res.name.split(";")[1],
        phone: res.phone,
        password: "",
      });
    }
  };

  useEffect(() => {
    getClientHTTP();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editClientByID(client._id, {
        name: `${formData.name};${formData.lastName}`,
        phone: formData.phone,
        password: formData.password.length > 0 ? formData.password : client.password 
    })
  };

  return (
    <>
      <Header />

      <div className={PerfilStyle.container_perfil}>
        <form onSubmit={handleSubmit}>
          <label className={PerfilStyle.label}>
            Nombre:
            <input
              className={PerfilStyle.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label className={PerfilStyle.label}>
            Apellido:
            <input
              className={PerfilStyle.input}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label className={PerfilStyle.label}>
            Celular:
            <input
              className={PerfilStyle.input}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label className={PerfilStyle.label}>
            Contraseña:
            <input
              className={PerfilStyle.input}
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <button type="submit" className={PerfilStyle.button}>Editar</button>
        </form>
      </div>
    </>
  );
};

export default Perfil;
