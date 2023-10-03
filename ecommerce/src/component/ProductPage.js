// ProductCard.js
import React from 'react';
import { useFavorite } from './FavoriteContext';
import heartSolid from '../assets/heart-solid.svg';
import heartRegular from '../assets/heart-regular.svg';

const ProductCard = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();

  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  return (
    <div className="card h-100 text-center p-4">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        height="250px"
      />
      <div className="card-body">
        <h5 className="card-title mb-2">{product.title}</h5>
        <p className="card-text fw-bold">${product.price}</p>
        <button onClick={toggleFavorite} className="btn btn-outline-dark">
          {isFavorite ? (
            <img src={heartSolid} alt="Favorite" width="24" height="24" />
          ) : (
            <img src={heartRegular} alt="Not Favorite" width="24" height="24" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
