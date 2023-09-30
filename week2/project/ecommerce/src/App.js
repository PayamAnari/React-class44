import React from 'react';
import Navbar from './component/Navbar';
import Home from './component/Home';
import ProductPage from './component/ProductPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
