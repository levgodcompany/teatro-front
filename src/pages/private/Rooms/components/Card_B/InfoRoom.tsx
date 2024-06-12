import InfoLocalStyles from "./css/InfoLocal.module.css";
import editImage from "../../../Local/assets/edit-3-svgrepo-com.svg";
import { useState } from "react";
import LocalForm from "../Forms/LocalForm/LocalForm";
export interface PropsCard {
  image: string;
  title: string;
  capacity: string | number;
  phone: string;
  description: string;
  price: number
  idRoom: string;
}

const InfoRoom: React.FC<PropsCard> = ({
  title,
  idRoom,
  capacity,
  phone,
  image,
  description,
  price
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
        {
          image.length > 0 ? <img src={image} alt={`${title}'s profile`} /> : <></>

        }
      </div>
      <div className={InfoLocalStyles.user_info}>
        <div className={InfoLocalStyles.header_title}>
          <h2>{title}</h2>
          <img onClick={handleOpenModal} src={editImage} alt="" />
          <LocalForm capacity={Number.parseInt(`${capacity}`)} description={description} image={image} phone={phone} title={title} idRoom={idRoom} isOpen={isModalOpen} onRequestClose={handleCloseModal} />
        </div>
        <div className={InfoLocalStyles.user_info_info}>
          <p>
            <strong>Capacidad:</strong> {capacity}
          </p>
          <p>
            <strong>Precio:</strong> ${price}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
        </div>
        <p className={InfoLocalStyles.description}>{description}</p>
      </div>

    </div>
  );
};

export default InfoRoom;
