// src/components/ServicesModal.tsx

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ServicesModalStyle from './css/ServicesModal.module.css';
import { useAppSelector } from '../../../../../../redux/hooks';
import deleteImage from '../../../assets/delete-svgrepo-com.svg'
import editImage from '../../../assets/edit-3-svgrepo-com.svg'
import { editLocal, ILocal } from '../../../services/Local.service';

interface ServicesModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  services: string[];
  onSubmit: (services: string[]) => void;
}

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onRequestClose,  onSubmit }) => {
  const [editedServices, setEditedServices] = useState<string[]>([]);
  const servicesState = useAppSelector(state => state.local.services)
  const [newService, setNewService] = useState<string>('');

  const handleDeleteService = (service: string) => {
    setEditedServices(editedServices.filter((s) => s !== service));
  };

  useEffect(()=> {
    setEditedServices([...servicesState])
  }, [servicesState])

  const handleEditService = (oldService: string, newService: string) => {
    const index = editedServices.indexOf(oldService);
    if (index !== -1) {
      const updatedServices = [...editedServices];
      updatedServices[index] = newService;
      setEditedServices(updatedServices);
    }
  };

  const editetLocal = async (local: Partial<ILocal>)=> {
    const result = await  editLocal(local);
    console.log(result);
  }
  const handleSubmit = () => {
    onSubmit(editedServices);
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