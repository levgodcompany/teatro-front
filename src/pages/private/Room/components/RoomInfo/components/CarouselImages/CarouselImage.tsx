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

  const backgroundUrl =
    "http://eljuvenil.com/wp-content/uploads/2019/11/encabezado.jpg";

  return (
    <div className={CouruselImageStyle.carousel}>
      <button onClick={goToPreviousSlide} className={CouruselImageStyle.prev}>
        &#10094;
      </button>
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
      <button onClick={goToNextSlide} className={CouruselImageStyle.next}>
        &#10095;
      </button>
    </div>
  );
};

interface BackgroundWrapperProps {
  backgroundUrl: string;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  backgroundUrl,
}) => {
  const style = {
    backgroundImage: `url(${backgroundUrl})`,
  };

  return <div className={CouruselImageStyle.back_image} style={style}></div>;
};

export default CarouselImage;
