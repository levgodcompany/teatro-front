// src/components/FormModal.tsx

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import LocalFormStyle  from "./css/LocalForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { editBasicInfo } from "../../../../../../redux/slices/Local.slice";
import { IRoom, updateRoomHTTP } from "../../../services/Rooms.service";

interface FormModalProps {
  isOpen: boolean;
  idRoom: string;
  image: string;
  title: string;
  phone: string;
  capacity: number;
  description: string,
  onRequestClose: () => void;
}

interface FormData {
  image: string;
  title: string;
  email: string;
  phone: string;
  capacity: number;
  description: string;
}

const LocalForm: React.FC<FormModalProps> = ({
  isOpen,
  idRoom,
  description,
  image,
  phone,
  capacity,
  title,
  onRequestClose
}) => {
  const [formData, setFormData] = useState<FormData>({
    image: "",
    title: "",
    email: "",
    phone: "",
    capacity: 0,
    description: "",
  });

  useEffect(() => {
    setFormData({
      image: image,
      title: title,
      email: "",
      phone: phone,
      capacity: capacity,
      description: description,
    });
  },[image, title, phone, description, capacity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editetLocal = async (room: Partial<IRoom>)=> {
    const result = await  updateRoomHTTP(idRoom, room);
    console.log(result);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  

    editetLocal({
        name: formData.title,
        description: formData.description,
        mainImage: {
            url: formData.image
        },
        phone: formData.phone
    })
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={LocalFormStyle.modal}
      overlayClassName={LocalFormStyle.overlay}
      ariaHideApp={false}
    >
      <h2>Informacion basica del Local</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Titulo:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Cel.:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Capacidad Máx:
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onRequestClose}>
          Cancelar
        </button>
      </form>
    </Modal>
  );
};

export default LocalForm;
