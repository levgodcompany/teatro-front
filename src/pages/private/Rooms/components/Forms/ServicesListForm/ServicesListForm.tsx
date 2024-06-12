// src/components/ServicesModal.tsx

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ServicesModalStyle from './css/ServicesModal.module.css';
import deleteImage from '../../../../../../assets/delete-svgrepo-com.svg'
import editImage from '../../../../../../assets/edit-3-svgrepo-com.svg'
import { IRoom, updateRoomHTTP } from '../../../services/Rooms.service';

interface ServicesModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  services: string[];
  idRoom: string;
}

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onRequestClose, services, idRoom }) => {
  const [editedServices, setEditedServices] = useState<string[]>(services);
  const [newService, setNewService] = useState<string>('');

  const handleDeleteService = (service: string) => {
    setEditedServices(editedServices.filter((s) => s !== service));
  };

  useEffect(()=> {
    console.log("services", services)
    setEditedServices([...services])
  }, [services])

  const handleEditService = (oldService: string, newService: string) => {
    const index = editedServices.indexOf(oldService);
    if (index !== -1) {
      const updatedServices = [...editedServices];
      updatedServices[index] = newService;
      setEditedServices(updatedServices);
    }
  };

  const editetLocal = async (room: Partial<IRoom>)=> {
    const result = await  updateRoomHTTP(idRoom, room);
    console.log(result);
  }
  const handleSubmit = () => {
    editetLocal({
      services: editedServices
  })
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={ServicesModalStyle.modal}
      overlayClassName={ServicesModalStyle.overlay}
      ariaHideApp={false}
    >
      <div className={ServicesModalStyle.header_title}>
        <h2>Editar Servicios</h2>
      </div>
      <div className={ServicesModalStyle.service_list}>
        {editedServices.map((service, index) => (
          <div className={ServicesModalStyle.service} key={index}>
            <span>{service}</span>
            <div className={ServicesModalStyle.service_actions}>
              <img onClick={() => handleDeleteService(service)} src={deleteImage} alt="" />
              <img onClick={() => handleEditService(service, prompt('Editar servicio:', service) || service)} src={editImage} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className={ServicesModalStyle.new_service}>
        <input
          type="text"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          placeholder="Nuevo servicio"
        />
        <button onClick={() => setEditedServices([...editedServices, newService])}>Agregar</button>
      </div>
      
      <div className={ServicesModalStyle.buttons}>
        <button onClick={handleSubmit}>Guardar</button>
        <button onClick={onRequestClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default ServicesModal;