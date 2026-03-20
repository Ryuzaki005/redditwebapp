import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="carousel-container">
      {images.length > 1 && (
        <button className="carousel-btn prev-btn" onClick={prevImage}>
          ❮
        </button>
      )}
      
      <div className="carousel-slide">
        <img 
          src={images[currentIndex].url} 
          alt={`Slide ${currentIndex + 1}`} 
          className="carousel-image"
          loading="lazy"
        />
        {images.length > 1 && (
          <div className="carousel-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <button className="carousel-btn next-btn" onClick={nextImage}>
          ❯
        </button>
      )}
    </div>
  );
};

export default Carousel;
