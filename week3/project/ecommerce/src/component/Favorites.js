import React, { useState, useEffect } from 'react';
import { useFavorite } from './FavoriteContext';
import ProductCard from './ProductPage';

const Favorites = () => {
  const { favorites } = useFavorite();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const productData = await Promise.all(
          favorites.map(async (productId) => {
            const response = await fetch(
              `http://fakestoreapi.com/products/${productId}`,
            );
            if (!response.ok) {
              throw new Error(`Error fetching product: ${productId}`);
            }
            const data = await response.json();
            return data;
          }),
        );

        // Filter out null values (products that couldn't be fetched)
        const filteredProducts = productData.filter(
          (product) => product !== null,
        );

        console.log('Filtered products:', filteredProducts);

        setFavoriteProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Fetch favorites error:', error);
        setError('Error fetching favorites. Please try again.');
        setLoading(false);
      }
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
