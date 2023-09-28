import React from 'react';
import Navbar from './component/Navbar';
import Home from './component/Home';
import ProductCard from './component/ProductCard';
import Products from './component/Products';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductCard />} />
      </Routes>
    </>
  );
}

export default App;
