// Products.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Buttons from './Buttons';
import { useFavorite } from './FavoriteContext';
import heartSolid from '../assets/heart-solid.svg';
import heartRegular from '../assets/heart-regular.svg';
import useFetch from './useFetch';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorite();

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const { data: productsData } = useFetch('https://fakestoreapi.com/products');

  useEffect(() => {
    if (productsData) {
      setData(productsData);
      setFilter(productsData);
      setLoading(false);
    }
  }, [productsData]);

  const filterProducts = (category) => {
    if (category === 'All') {
      setFilter(data);
    } else {
      const filteredProducts = data.filter(
        (product) => product.category === category,
      );
      setFilter(filteredProducts);
    }
  };

  const Loading = () => (
    <div className="col-12 text-center">
      <h3>Loading...</h3>
    </div>
  );

  const ProductItem = ({ product }) => (
    <div className="col-md-4 mb-4">
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
          <button
            onClick={() => toggleFavorite(product.id)}
            className="btn btn-outline-dark"
          >
            {favorites.includes(product.id) ? (
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
          <NavLink
            to={`/products/${product.id}`}
            className="btn btn-outline-dark mt-3"
          >
            Buy Now
          </NavLink>
        </div>
      </div>
    </div>
  );

  const ShowProducts = () => (
    <>
      <Buttons filterProducts={filterProducts} />
      {filter.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <ShowProducts />
        )}
      </div>
    </div>
  );
};

export default Products;
