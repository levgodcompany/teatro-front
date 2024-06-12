import React, { useState } from "react";
import CouruselImageStyle from "./css/Carousel.module.css";

interface Image {
  id: number;
  url: string;
}

const CarouselImage: React.FC<{ images: Image[] }> = ({ images }) => {
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
      <button onClick={goToPreviousSlide} className={CouruselImageStyle.prev}>
        &#10094;
      </button>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={
            index === currentImageIndex
              ? `${CouruselImageStyle.slide} ${CouruselImageStyle.active}`
              : `${CouruselImageStyle.slide}`
          }
        >
          <img src={image.url} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <button onClick={goToNextSlide} className={CouruselImageStyle.next}>
        &#10095;
      </button>
    </div>
  );
};

export default CarouselImage;
