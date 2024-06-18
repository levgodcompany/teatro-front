import InfoLocalStyles from "./css/InfoLocal.module.css";
import "./css/info.css";
import editImage from "../../assets/edit-3-svgrepo-com.svg";
import { useState } from "react";
import LocalForm from "../Forms/LocalForm/LocalForm";
export interface PropsCard {
  image: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const InfoLocal: React.FC<PropsCard> = ({
  title,
  email,
  phone,
  address,
  image,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("Form Data:", data);
    handleCloseModal();
  };

  return (
    <div className={InfoLocalStyles.user_profile}>
      <div className={InfoLocalStyles.user_image}>
        <img src={image} alt={`${title}'s profile`} />
      </div>
      <div className={InfoLocalStyles.user_info}>
        <div className={InfoLocalStyles.header_title}>
          <h2>{title}</h2>
          <img onClick={handleOpenModal} src={editImage} alt="" />
          <LocalForm
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={InfoLocalStyles.user_info_info}>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
        </div>
        <p className={InfoLocalStyles.description}>{description}</p>
      </div>
    </div>
  );
};

export default InfoLocal;
