import { useState, useEffect } from 'react';
import Filtro from '../filtro';
import { useNavigate } from "react-router-dom";

import './style.css';

function Lista() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('All');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await fetch('https://api.escuelajs.co/api/v1/products');
      const json = await res.json();

      if (tipoSeleccionado.toLowerCase() === 'all') {
        setData(json);
      } else {
        const filtrados = json.filter(producto =>
          producto.category.name.toLowerCase() === tipoSeleccionado.toLowerCase()
        );
        setData(filtrados);
      }
    };

    obtenerDatos();
  }, [tipoSeleccionado]);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = data;

  if (busqueda.length >= 2) {
    if (!isNaN(busqueda)) {
      // Buscar por ID si es número
      const busquedaId = parseInt(busqueda);
      resultados = data.filter(producto => producto.id === busquedaId);
    } else {
      // Buscar por título si es texto
      resultados = data.filter(producto =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleTipoChange} />

      <section className='c-lista'>
        {resultados.map((producto, index) => (
          <div className='c-lista-pokemon'
            onClick={() => navigate(`/producto/${producto.id}`)}
            key={index}>
            <img
              src={producto.images[0]}
              alt={`Producto ${producto.title}`}
              width='auto'
              height='60'
              loading='lazy'
            />
            <p>{producto.title}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
