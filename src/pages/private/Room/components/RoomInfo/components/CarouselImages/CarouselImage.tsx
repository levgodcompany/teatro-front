import React, { useState } from "react";
import CouruselImageStyle from "./css/Carousel.module.css";
import { IImage } from "../../../../../Local/services/Local.service";

const CarouselImage: React.FC<{ images: IImage[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={CouruselImageStyle.carousel}>
      {images.length > 1 ? <button onClick={goToPreviousSlide} className={CouruselImageStyle.prev}>
        &#10094;
      </button>: <></>}
      
      {images.map((image, index) => (
        <div
          key={index}
          className={
            index === currentImageIndex
              ? `${CouruselImageStyle.slide} ${CouruselImageStyle.container_image} ${CouruselImageStyle.active}`
              : `${CouruselImageStyle.slide}`
          }
        >
          <figure  className={CouruselImageStyle.container_image_figure}>
            <div className={CouruselImageStyle.figure_cont}>
              <img className={CouruselImageStyle.figure_img} src={image.url} alt={`Slide ${index + 1}`} />

            </div>

          </figure>
        </div>
      ))}
      {
        images.length > 1 ? <button onClick={goToNextSlide} className={CouruselImageStyle.next}>
        &#10095;
      </button> : <></>
      }
      
    </div>
  );
};

export default CarouselImage;
