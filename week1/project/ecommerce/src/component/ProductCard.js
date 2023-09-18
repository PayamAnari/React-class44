import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-3 mb-4 " key={product.id}>
      <div className="card h-100 text-center p-4">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          height="250px"
        />
        <div className="card-body">
          <h5 className="card-title mb-0">
            {product.title.substring(0, 12)} ...
          </h5>
          <p className="card-text fw-bold">${product.price}</p>
          <a href="/" className="btn btn-outline-primary">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
