import { useAppContext } from '../../contexto/contexto';
import { Link } from 'react-router-dom';
import './style.css';

function Favoritos() {
  const { favoritos } = useAppContext();

  return (
    <div className="favoritos">
      <h1>Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No hay productos en favoritos.</p>
      ) : (
        favoritos.map(producto => (
          <Link
            key={producto.id}
            to={`/producto/${producto.id}`}
            className="producto-favorito"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={producto.images[0]} alt={producto.title} width="100" />
            <div>
              <p><strong>{producto.title}</strong></p>
              <p>Precio: ${producto.price}</p>
              <p>Categoría: {producto.category?.name}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Favoritos;