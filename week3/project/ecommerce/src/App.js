// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Products from './component/Products';
import Favorites from './component/Favorites';
import { FavoriteProvider } from './component/FavoriteContext';
import ProductPage from './component/ProductPage';
import Home from './component/Home';

function App() {
  return (
    <Router>
      <FavoriteProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Products />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </FavoriteProvider>
    </Router>
  );
}

export default App;
