import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("usuario o contraseña no valido");
    else navigate("/");
  };

  const goToRegistro = () => {
    navigate("/registro");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={goToRegistro} style={{ marginTop: '10px' }}>
        ¿No tienes cuenta? Regístrate
      </button>
    </div>
  );
}

export default Login;