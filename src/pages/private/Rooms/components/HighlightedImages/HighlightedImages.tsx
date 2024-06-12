import React, { useState } from "react";
import HighlightedImagesStyle from "./css/HighlightedImages.module.css";
import deleteImage from "../../../Local/assets/delete-svgrepo-com.svg";
import editImage from "../../../Local/assets/edit-3-svgrepo-com.svg";
import { IImage } from "../../../Local/services/Local.service";
import ImageFormModal from "../Forms/HighlightedImagesForm/HighlightedImagesForm";

interface HighlightedImagesProps {
  images: IImage[];
  idRoom: string;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onViewMore: (index: number) => void;
}

const HighlightedImages: React.FC<HighlightedImagesProps> = ({
  images,
  idRoom,
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
        <h2>Imagenes de la sala</h2>
        <img onClick={() => setModalOpen(true)} src={editImage} alt="" />
        <ImageFormModal
          images={images}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          idRoom={idRoom}
        />
      </div>

      <div className={HighlightedImagesStyle.highlighted_images_grid}>
        {images.map((image, index) => (
          <>
            {image.url.length > 0 ? (
              <>
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
                    <div
                      className={
                        HighlightedImagesStyle.highlighted_image_overlay
                      }
                    >
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
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default HighlightedImages;
