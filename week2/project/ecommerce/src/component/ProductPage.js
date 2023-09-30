import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
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
      </div>
    </div>
  );
};

export default ProductCard;
