import React, { useState, useEffect } from 'react';
import { useFavorite } from './FavoriteContext';
import useFetch from './useFetch';
import heartSolid from '../assets/heart-solid.svg';
import heartRegular from '../assets/heart-regular.svg';
import { NavLink, useParams } from 'react-router-dom';

const ProductCard = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch(`http://fakestoreapi.com/products/${id}`);

  // Declare state-setting functions here
  const [isFavorite, setIsFavorite] = useState(favorites.includes(id));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
      setIsFavorite(false);
    } else {
      addToFavorites(id);
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <div className="col-12 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row py-3">
        <div className="col-md-6 pt-5">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6 pt-5">
          <h4 className="text-uppercase text-warning">{product.category}</h4>
          <hr />
          <h4 className="text-black-50">{product.title}</h4>
          <hr />
          <p className="lead fw-bold text-black-50">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star text-secondary"></i>
          </p>
          <hr />
          <h3 className="display-7 fw-bold text-black-50">$ {product.price}</h3>
          <hr />
          <p className="lead fw-bold text-black-50">{product.description}</p>
          <button onClick={toggleFavorite} className="btn btn-outline-dark">
            {isFavorite ? (
              <img src={heartSolid} alt="Favorite" width="24" height="24" />
            ) : (
              <img
                src={heartRegular}
                alt="Not Favorite"
                width="24"
                height="24"
              />
            )}
          </button>
        </div>
        <div className="col-md-12">
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
                  <img
                    src={heartRegular}
                    alt="Not Favorite"
                    width="24"
                    height="24"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
