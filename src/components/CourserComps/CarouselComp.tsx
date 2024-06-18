import { useState, useRef, useEffect } from "react";
import "./CaruselComp.css";

interface CarouselProps<T> {
  items: T[];
  renderCard: (item: T) => JSX.Element;
}


const CarouselComp = <T,>({ items, renderCard }: CarouselProps<T>): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setCurrentIndex(items.length);
  }, [items]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= items.length * 2) {
      setCurrentIndex(items.length);
    } else if (currentIndex < items.length) {
      setCurrentIndex(items.length * 2 - 1);
    }
  };

  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => {
        if (prevIndex === items.length) {
          return items.length * 3 - 2;
        } else {
          return prevIndex - 1;
        }
      });
    }
  };

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (items.length * 3));
    }
  };

  return (
    <div className="carousel" ref={carouselRef}>
      <button onClick={goToPrevious} className="prev">
        &#10094;
      </button>
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${(currentIndex - items.length) * (100 / items.length)}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            width: `${items.length * 3 * 100}%`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {items.concat(items).concat(items).map((item, index) => (
            <div
              key={index}
              className="card-slide"
              style={{ flex: `0 0 ${100 / items.length}%` }}
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
      </div>
      <button onClick={goToNext} className="next">
        &#10095;
      </button>
    </div>
  );
};

export default CarouselComp;