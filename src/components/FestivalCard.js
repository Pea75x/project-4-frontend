import React from 'react';
import { Link } from 'react-router-dom';

const FestivalCard = ({ id, name, location, image }) => {
  return (
    <Link to={`/festival/${id}`}>
      <div className='search-festival-card'>
        <div className='card-image'>
          <figure className='image is-4by3'>
            <img className='imagecard' src={image} />
          </figure>
        </div>

        <div className='image-card-overlay'>
          <p>{name}</p>
          <p>{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default FestivalCard;
