import React from 'react';
import { Link } from 'react-router-dom';

const FestivalCard = ({ id, name, location, image }) => {
  return (
    <Link to={`/festival/${id}`}>
      <div className='card search-card'>
        <div className='card-image'>
          <figure className='image is-4by3'>
            <img className='imagecard' src={image} />
          </figure>
        </div>
        <div className='image-card-overlay'>
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default FestivalCard;
