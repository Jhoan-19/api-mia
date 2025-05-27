import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAppContext } from '../../contexto/contexto';
import './style.css';

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { favoritos, agregarAFavoritos, eliminarDeFavoritos } = useAppContext();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then(response => response.json())
      .then(responseData => setProducto(responseData))
      .catch(error => console.error("Error:", error));
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  const yaEsFavorito = favoritos.some(fav => fav.id === producto.id);

  const handleFavorito = () => {
    if (yaEsFavorito) {
      eliminarDeFavoritos(producto.id);
    } else {
      agregarAFavoritos(producto);
    }
  };

  return (
    <div className="producto-detalle">
      <img
        src={producto.images?.[0]}
        alt={producto.title}
        width="200"
      />

      <p><strong>Nombre:</strong> {producto.title}</p>
      <p><strong>Categoría:</strong> {producto.category?.name}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      <p><strong>Descripción:</strong> {producto.description}</p>

      <button
        onClick={handleFavorito}
        className={`btn-favorito${yaEsFavorito ? ' favorito-activo' : ''}`}
      >
        <span style={{ color: yaEsFavorito ? 'red' : 'gray', fontSize: '20px' }}>
          {yaEsFavorito ? '❤️' : '🤍'}
        </span>
        {yaEsFavorito ? ' Quitar de favoritos' : ' Agregar a favoritos'}
      </button>
    </div>
  );
}

export default Producto;
