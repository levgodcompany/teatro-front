import React, { useState } from "react";
import HighlightedImagesStyle from "./css/HighlightedImages.module.css";
import { IImage } from "../../services/Local.service";
import deleteImage from "../../assets/delete-svgrepo-com.svg";
import editImage from "../../assets/edit-3-svgrepo-com.svg";
import ImageFormModal from "../Forms/HighlightedImagesForm/HighlightedImagesForm";

interface HighlightedImagesProps {
  images: IImage[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onViewMore: (index: number) => void;
}

const HighlightedImages: React.FC<HighlightedImagesProps> = ({
  images,
  onDelete,
  onEdit,
  onViewMore,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (newImages: IImage[]) => {};

  return (
    <div className={HighlightedImagesStyle.container}>
      <div className={HighlightedImagesStyle.header}>
        <h2>Imagenes del local</h2>
        <img onClick={() => setModalOpen(true)} src={editImage} alt="" />
        <ImageFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </div>

      <div className={HighlightedImagesStyle.highlighted_images_grid}>
        {images.map((image, index) => (
          <div
            key={index}
            className={HighlightedImagesStyle.highlighted_image}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={image.url}
              alt={image.description || `Image ${index + 1}`}
            />
            {hoveredIndex === index && (
              <div className={HighlightedImagesStyle.highlighted_image_overlay}>
                <img
                  className={HighlightedImagesStyle.image_delete}
                  src={deleteImage}
                  alt=""
                />
                <img
                  className={HighlightedImagesStyle.image_edit}
                  src={editImage}
                  alt=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightedImages;
