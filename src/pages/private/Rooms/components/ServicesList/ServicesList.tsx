import React, { useState } from 'react';
import ServiceStyle from './css/ServicesList.module.css';
import editImage from '../../../Local/assets/edit-3-svgrepo-com.svg'
import ServicesModal from '../Forms/ServicesListForm/ServicesListForm';

interface ServicesListProps {
  services: string[];
  idRoom: string;
}

const ServicesList: React.FC<ServicesListProps> = ({ services, idRoom }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (services: string[]) => {
    console.log('Servicios Seleccionados:', services);
    handleCloseModal();
  };



  return (
    <div className={ServiceStyle.services_list}>
      <div className={ServiceStyle.header}>
        <h2>Servicios que ofrece la sala</h2>
        <img onClick={handleOpenModal} src={editImage} alt="" /> 
        <ServicesModal
        services={services}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        idRoom={idRoom}
      />
      </div>
      <ul>
        {services.map((service, index) => (
          <li key={index} className={ServiceStyle.service_item}>
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
