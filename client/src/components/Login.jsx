import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUsuarioLogeado }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logeado = localStorage.getItem('usuarioLogeado') === 'true';
    const esAdmin = localStorage.getItem('esAdmin') === 'true';

    if (logeado) {
      setUsuarioLogeado(true);
      navigate(esAdmin ? '/panel-reservas' : '/formulario');
    }
  }, [navigate, setUsuarioLogeado]);

  const handleLogin = async () => {
    if (!usuario || !clave) {
      setError('Por favor completa ambos campos.');
      return;
    }

    setCargando(true);
    setError('');

    try {
      const respuesta = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });

      const datos = await respuesta.json();

      if (respuesta.ok && datos.success) {
        setUsuarioLogeado(true);
        localStorage.setItem('nombreUsuario', String(datos.nombre));
        console.log('Datos recibidos:', datos);
        localStorage.setItem('usuarioLogeado', 'true');
        localStorage.setItem('esAdmin', datos.esAdmin ? 'true' : 'false');

        navigate(datos.esAdmin ? '/panel-reservas' : '/formulario');
      } else {
        setError(datos.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      console.error('❌ Error de conexión:', err);
      setError('No se pudo conectar al servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <button onClick={handleLogin} disabled={cargando}>
        {cargando ? 'Verificando...' : 'Entrar'}
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}