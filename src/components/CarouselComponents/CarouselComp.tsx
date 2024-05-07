import React, { useState } from 'react';
import './Carousel.css';

interface Card {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

interface CarouselProps {
  cards: Card[];
  renderCard: (card: Card) => JSX.Element;
}

const CarouselComp: React.FC<CarouselProps> = ({ cards, renderCard }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={goToPreviousCard} className="prev">
        &#10094;
      </button>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={index === currentCardIndex ? 'card-slide active' : 'card-slide'}
        >
          {renderCard(card)}
        </div>
      ))}
      <button onClick={goToNextCard} className="next">
        &#10095;
      </button>
    </div>
  );
};

export default CarouselComp;
