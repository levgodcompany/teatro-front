import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import { IClientID } from "../../../../../redux/slices/ClientID.slice";
import { Header } from "../../../../../components/Header/Header";

import PerfilStyle from "./Perfil.module.css";
import { clientByIDHttps, editClientByID } from "../../services/Client.service";
import { IClient } from "../../../Rooms/services/Rooms.service";
import Footer from "../../../../../components/Footer/Footer";

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
    e.preventDefault();
    editClientByID(client._id, {
      name: `${formData.name};${formData.lastName}`,
      phone: formData.phone,
      password: formData.password.length > 0 ? formData.password : client.password 
    });
  };

  return (
    <>
      <Header />

      <div className={PerfilStyle.container}>
        <h2 className={PerfilStyle.title}>Editar Perfil</h2>
        <form onSubmit={handleSubmit} className={PerfilStyle.form}>
          <div className={PerfilStyle.formGroup}>
            <label className={PerfilStyle.label} htmlFor="name">Nombre:</label>
            <input
              className={PerfilStyle.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={PerfilStyle.formGroup}>
            <label className={PerfilStyle.label} htmlFor="lastName">Apellido:</label>
            <input
              className={PerfilStyle.input}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={PerfilStyle.formGroup}>
            <label className={PerfilStyle.label} htmlFor="phone">Celular:</label>
            <input
              className={PerfilStyle.input}
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={PerfilStyle.formGroup}>
            <label className={PerfilStyle.label} htmlFor="password">Contraseña:</label>
            <input
              className={PerfilStyle.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <button type="submit" className={PerfilStyle.button}>Guardar Cambios</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Perfil;
