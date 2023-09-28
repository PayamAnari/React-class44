import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://fakestoreapi.com/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          throw new Error('Error fetching product');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 text-center">
          <h3>Loading...</h3>
        </div>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={75} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={150} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 pt-5">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6 pt-5">
          <h4 className="text-uppercase text-warning ">{product.category}</h4>
          <hr />
          <h4 className=" text-black-50 ">{product.title}</h4>
          <hr />
          <p className="lead fw-bold text-black-50  ">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star text-secondary"></i>
          </p>
          <hr />
          <h3 className="display-7 fw-bold text-black-50 ">
            $ {product.price}
          </h3>
          <hr />
          <p className="lead fw-bold text-black-50  ">{product.description}</p>
          <button className="btn btn-outline-dark ms-2 px-3 py-3   ">
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-outline-dark ms-2 px-3 py-3  ">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="container py-5">
        <div className="row py-3">
          {loading ? (
            <Loading />
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <ShowProduct />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
