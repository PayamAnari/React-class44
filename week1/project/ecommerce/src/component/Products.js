import React, { useState, useEffect } from 'react';
import allProducts from '../fake-data/all-products';
import allCategories from '../fake-data/all-categories';
import ProductCard from './ProductCard';

const Products = () => {
  const [filter, setFilter] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryKey = 'selectedCategory';

  useEffect(() => {
    const categoryLocalStorage = localStorage.getItem(categoryKey);
    setSelectedCategory(categoryLocalStorage || 'All');
  }, []);

  useEffect(() => {
    const filterProducts =
      selectedCategory === 'All'
        ? allProducts
        : allProducts.filter(
            (product) => product.category === selectedCategory.substring(6),
          );
    setFilter(filterProducts);

    localStorage.setItem(categoryKey, selectedCategory);
  }, [selectedCategory]);

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container my-5 py5 products-area">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center"> Latest Products</h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="buttons d-flex justify-content-center mp-5 pb-5">
          {['All', ...allCategories].map((category) => (
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === category ? 'active' : ''
              }`}
              key={category}
              onClick={() => handleCategory(category)}
            >
              {category === 'All' ? category : category.substring(6)}
            </button>
          ))}
        </div>
        {filter.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
