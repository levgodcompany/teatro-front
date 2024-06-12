import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import HighlightedImagesFormStyle from "./css/HighlightedImagesForm.module.css";
import { useAppSelector } from "../../../../../../redux/hooks";
import { IRoom, updateRoomHTTP } from "../../../services/Rooms.service";

interface IImage {
  url: string;
  description?: string;
}

interface ImageFormModalProps {
  isOpen: boolean;
  idRoom: string;
  images: IImage[]
  onClose: () => void;
}

const ImageFormModal: React.FC<ImageFormModalProps> = ({ idRoom, isOpen, images, onClose }) => {
  const [localImages, setLocalImages] = useState<IImage[]>([]);

  useEffect(()=> {
    setLocalImages([...images])
  }, [images])

  const handleChange = (index: number, field: keyof IImage, value: string) => {
    const newImages = [...localImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setLocalImages(newImages);
  };

  const handleAddImage = () => {
    setLocalImages([...localImages, { url: "", description: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
  };

  const editetLocal = async (room: Partial<IRoom>)=> {
    const result = await  updateRoomHTTP(idRoom, room);
    console.log(result);
  }
  const handleSave = () => {
    editetLocal({
      additionalImages: localImages
    })
    onClose();
  };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Editar Imágenes"
    className={HighlightedImagesFormStyle.modal}
    overlayClassName={HighlightedImagesFormStyle.modal_overlay}
  >
    <button className={HighlightedImagesFormStyle.close_button} onClick={onClose}>
      X
    </button>
    <h2>Editar Imágenes</h2>
    <div className={HighlightedImagesFormStyle.image_form}>
      {localImages.map((image, index) => (
        <div key={index} className={HighlightedImagesFormStyle.image_form_group}>
          <input
            type="text"
            placeholder="URL de la imagen"
            value={image.url}
            onChange={(e) => handleChange(index, "url", e.target.value)}
          />
          {image.url && <img src={image.url} alt="Preview" className={HighlightedImagesFormStyle.image_preview} />}
          <input
            type="text"
            placeholder="Descripción de la imagen"
            value={image.description || ""}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />
          <button onClick={() => handleRemoveImage(index)} className={HighlightedImagesFormStyle.remove_button}>Eliminar</button>
        </div>
      ))}
      <button onClick={handleAddImage} className={HighlightedImagesFormStyle.add_button}>Agregar Imagen</button>
    </div>
    <button onClick={handleSave} className={HighlightedImagesFormStyle.save_button}>Guardar</button>
  </Modal>
  );
};

export default ImageFormModal;
