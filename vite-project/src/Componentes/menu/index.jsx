import "./style.css"
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Lista</Link>
          <Link to="/aleatorios">Mas Vendidos</Link>
          <Link to="/capturados">En Promocion</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>
    )
  }
  
  export default Menu