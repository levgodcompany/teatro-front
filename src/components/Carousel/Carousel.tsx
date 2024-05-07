import React, { useState } from 'react';
import './Carousel.css';

interface Image {
  id: number;
  url: string;
}

const Carousel: React.FC<{ images: Image[] }> = ({ images }) => {
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
    <div className="carousel">
      <button onClick={goToPreviousSlide} className="prev">
        &#10094;
      </button>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={index === currentImageIndex ? 'slide active' : 'slide'}
        >
          <img src={image.url} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <button onClick={goToNextSlide} className="next">
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;