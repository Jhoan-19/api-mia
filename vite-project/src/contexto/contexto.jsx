import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const agregarAFavoritos = (producto) => {
    if (!favoritos.some(fav => fav.id === producto.id)) {
      setFavoritos([...favoritos, producto]);
    }
  };

  const eliminarDeFavoritos = (id) => {
    setFavoritos(favoritos.filter(fav => fav.id !== id));
  };

  return (
    <AppContext.Provider value={{ favoritos, agregarAFavoritos, eliminarDeFavoritos }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);