// FavoriteContext.js
import { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (productId) => {
    if (!favorites.includes(productId)) {
      setFavorites([...favorites, productId]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((id) => id !== productId));
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
