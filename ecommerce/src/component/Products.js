// Products.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductPage';
import useFetch from './useFetch';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useFetch('http://fakestoreapi.com/products');

  useEffect(() => {
    if (!loading && !error) {
      setProducts(data);
    }
  }, [data, loading, error]);

  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        {loading ? (
          <div className="col-12 text-center">
            <h3>Loading...</h3>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
