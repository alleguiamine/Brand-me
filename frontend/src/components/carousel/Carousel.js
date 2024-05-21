import React from 'react';
import './carousel.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { dataBestSeller } from './carousel-data';

const Carousel = () => {
  return (
    <div className="m-3" style={{ marginTop: '140px' }}> {/* Ajoutez une marge supérieure personnalisée */}
      <div className="card-slider">
        <div className="card-slide-track">
          {dataBestSeller.map(item => (
            <div className="card-slide" key={item.id}>
              <img src={item.linking} alt={item.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Carousel;
