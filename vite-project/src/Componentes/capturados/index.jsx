import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexto/contexto';
import './style.css';

function Capturados() {
  const [productos, setProductos] = useState([]);
  const { favoritos, agregarAFavoritos, eliminarDeFavoritos } = useAppContext();

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => {
        let seleccionados = [];
        const guardados = localStorage.getItem('enPromocionIds');
        if (guardados) {
          const ids = JSON.parse(guardados);
          seleccionados = data.filter(producto => ids.includes(producto.id));
        } else {
          // Selecciona 6 productos aleatorios y guarda sus IDs
          const usados = new Set();
          while (seleccionados.length < 6 && data.length > 0) {
            const idx = Math.floor(Math.random() * data.length);
            if (!usados.has(idx)) {
              seleccionados.push(data[idx]);
              usados.add(idx);
            }
          }
          const ids = seleccionados.map(p => p.id);
          localStorage.setItem('enPromocionIds', JSON.stringify(ids));
        }
        setProductos(seleccionados);
      });
  }, []);

  const handleFavorito = (producto) => {
    const yaEsFavorito = favoritos.some(fav => fav.id === producto.id);
    if (yaEsFavorito) {
      eliminarDeFavoritos(producto.id);
    } else {
      agregarAFavoritos(producto);
    }
  };

  return (
    <div>
      <h1>En Promoción</h1>
      <div className="lista-grid">
        {productos.map(producto => {
          const yaEsFavorito = favoritos.some(fav => fav.id === producto.id);
          const precioPromo = (producto.price / 2).toFixed(2);
          return (
            <div className="lista-item" key={producto.id}>
              <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={producto.images?.[0]} alt={producto.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                <h3>{producto.title}</h3>
                <p>
                  <span style={{ textDecoration: 'line-through', color: 'red', marginRight: 8 }}>
                    ${producto.price}
                  </span>
                  <span style={{ color: 'green', fontWeight: 'bold' }}>
                    ${precioPromo}
                  </span>
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Capturados;