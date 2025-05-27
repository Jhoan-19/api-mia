import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Ajusta la ruta si es necesario
import { AppProvider } from './contexto/contexto';

import Aleatorios from './Componentes/aleatorios';
import Capturados from './Componentes/capturados';
import Favoritos from './Componentes/favoritos';
import Lista from './Componentes/lista';
import Pokemon from './Componentes/pokemon';
import Usuario from './Componentes/usuarios';
import Menu from './Componentes/menu';
import Login from './Componentes/login';
import Registro from './Componentes/registro';
import Administrador from './Componentes/administrador';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();
    // Escucha cambios en la sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>
          <Route path="/" element={usuario ? <Lista /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/aleatorios" element={usuario ? <Aleatorios /> : <Navigate to="/login" />} />
          <Route path="/capturados" element={usuario ? <Capturados /> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/producto/:id" element={usuario ? <Pokemon /> : <Navigate to="/login" />} />
          <Route path="/login" element={!usuario ? <Login /> : <Navigate to="/" />} />
          <Route path="/registro" element={!usuario ? <Registro /> : <Navigate to="/" />} />
          <Route path="/admin" element={usuario ? <Administrador /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;