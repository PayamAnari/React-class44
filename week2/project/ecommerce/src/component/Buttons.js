import React from 'react';

const Buttons = ({ filterProducts }) => {
  const buttons = [
    { label: 'All', category: 'All' },
    { label: "Men's Clothing", category: "men's clothing" },
    { label: "Women's Clothing", category: "women's clothing" },
    { label: 'Jewelry', category: 'jewelery' },
    { label: 'Electronics', category: 'electronics' },
  ];

  return (
    <div className="buttons d-flex justify-content-center mp-4 pb-5 flex-column flex-sm-row gap-2 align-items-center">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="btn btn-outline-dark me-2"
          onClick={() => filterProducts(button.category)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
