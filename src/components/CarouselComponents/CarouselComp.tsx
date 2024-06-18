import { useState } from "react";
import CarouselCompStyle from "./css/Carousel.module.css";

interface CarouselProps<T> {
  items: T[];
  renderCard: (item: T, index?: number) => JSX.Element;
}

const CarouselComp = <T,>({
  items,
  renderCard,
}: CarouselProps<T>): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {items.length > 0 ? (
        <>
          <div>
            {items.length > 0 ? currentIndex + 1 : 0}/{items.length}
          </div>
          <div className={CarouselCompStyle.carousel}>
            <button
              onClick={goToPreviousCard}
              className={CarouselCompStyle.prev}
            >
              &#10094;
            </button>
            {items.map((item, index) => (
              <div
                key={index}
                className={
                  index === currentIndex
                    ? `${CarouselCompStyle.card_slide} ${CarouselCompStyle.active}`
                    : `${CarouselCompStyle.card_slide}`
                }
              >
                {renderCard(item, index)}
              </div>
            ))}
            <button onClick={goToNextCard} className={CarouselCompStyle.next}>
              &#10095;
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CarouselComp;
