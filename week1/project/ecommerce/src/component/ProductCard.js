import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4 " key={product.id}>
      <div className="card h-100 text-center p-4">
        <img
          src={product.image}
          className="card-img-top h-100 img-responsive"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title mb-0">{product.title}</h5>
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
