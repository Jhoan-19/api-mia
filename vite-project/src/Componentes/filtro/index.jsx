import { useState, useEffect } from 'react';
import './style.css'; 

function Filtro({ onTipoChange }) {
  const [categorias, setCategorias] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [activo, setActivo] = useState("All");

  useEffect(() => {
    const obtenerCategoriasConProductos = async () => {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories');
      const json = await res.json();

      const categoriasValidas = [];

      for (const categoria of json) {
        const resProd = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoria.id}/products`);
        const productos = await resProd.json();

        if (productos.length > 0) {
          categoriasValidas.push(categoria.name);
        }
      }

      setCategorias(["All", ...categoriasValidas]);
      setLoading(false);
    };

    obtenerCategoriasConProductos();
  }, []);

  const manejarCambio = (categoria) => {
    onTipoChange(categoria);
    setActivo(categoria);
  };

  return (
    <div className="c-filtro">
      {loading ? (
        <p className="loader">Cargando categorías...</p>
      ) : (
        categorias.map((categoria, index) => (
          <button
            key={index}
            onClick={() => manejarCambio(categoria)}
            className={categoria === activo ? 'activo' : ''}
          >
            {categoria}
          </button>
        ))
      )}
    </div>
  );
}

export default Filtro;
