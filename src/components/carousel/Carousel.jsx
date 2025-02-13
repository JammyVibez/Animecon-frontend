import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';

const Carousel = () => {
  const featuredAnime = [
    { id: 1, title: 'Demon Slayer', image: 'banner1.jpg' },
    { id: 2, title: 'One Piece', image: 'banner2.jpg' },
  ];

  return (
    <ReactCarousel
      showThumbs={false}
      infiniteLoop
      autoPlay
      dynamicHeight={false}
      className="carousel"
    >
      {featuredAnime.map((anime) => (
        <div key={anime.id} className="carousel-item">
          <img src={anime.image} alt={anime.title} />
          <h2 className="carousel-title">{anime.title}</h2>
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
