// src/components/FormModal.tsx

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import LocalFormStyle  from "./css/LocalForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { editBasicInfo } from "../../../../../../redux/slices/Local.slice";
import { editLocal, ILocal } from "../../../services/Local.service";

interface FormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  image: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const LocalForm: React.FC<FormModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    image: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const localState = useAppSelector((state) => state.local);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFormData({
      image: localState.mainImage.url,
      title: localState.name,
      email: localState.email,
      phone: localState.phone,
      address: localState.address,
      description: localState.description,
    });
  },[localState]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const editetLocal = async (local: Partial<ILocal>)=> {
    const result = await  editLocal(local);
    console.log(result);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  

    dispatch(editBasicInfo({
        name: formData.title,
        address: formData.address,
        description: formData.description,
        email: formData.email,
        mainImage: {
            url: formData.image
        },
        phone: formData.phone
    }))

    editetLocal({
        name: formData.title,
        address: formData.address,
        description: formData.description,
        email: formData.email,
        mainImage: {
            url: formData.image
        },
        phone: formData.phone
    })
    onSubmit(formData);
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
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
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
