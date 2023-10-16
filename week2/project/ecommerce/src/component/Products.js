import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import Buttons from './Buttons';

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const getProducts = async () => {
      try {
        const response = await fetch('http://fakestoreapi.com/products');
        if (response.ok && componentMounted) {
          const jsonData = await response.json();
          setData(jsonData);
          setFilteredProducts(jsonData);
        } else {
          throw new Error(
            'Oops! Something went wrong. Please try again later.',
          );
        }
      } catch (error) {
        setError(
          'Oops! Unable to fetch products. Please check your internet connection and try again.',
        );
      } finally {
        if (componentMounted) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 text-center">
          <h3>Loading...</h3>
        </div>
        {[1, 2, 3, 4].map((id) => (
          <div className="col-md-3" key={id}>
            <Skeleton height={350} />
          </div>
        ))}
      </>
    );
  };

  const filterProducts = (cat) => {
    const updatedList =
      cat === 'All' ? data : data.filter((x) => x.category === cat);
    setFilteredProducts(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <Buttons filterProducts={filterProducts} />
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
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
                <NavLink
                  to={`/products/${product.id}`}
                  className="btn btn-outline-dark"
                >
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

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
