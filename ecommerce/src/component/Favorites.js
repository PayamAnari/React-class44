// Favorites.js
import React, { useState, useEffect } from 'react';
import { useFavorite } from './FavoriteContext';
import ProductCard from './ProductPage';

const Favorites = () => {
  const { favorites } = useFavorite();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      const productData = await Promise.all(
        favorites.map(async (productId) => {
          const response = await fetch(
            `http://fakestoreapi.com/products/${productId}`,
          );
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error('Error fetching product');
          }
        }),
      );

      setFavoriteProducts(productData);
      setLoading(false);
    };

    fetchFavoriteProducts();
  }, [favorites]);

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">My Favorites</h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <div className="col-12 text-center">
            <h3>Loading...</h3>
          </div>
        ) : (
          favoriteProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
