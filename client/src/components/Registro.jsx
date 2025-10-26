import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleRegistro = async () => {
    if (!nombre || !usuario || !clave) {
      setMensaje('⚠️ Por favor completa todos los campos.');
      return;
    }

    setCargando(true);
    setMensaje('');

    try {
      const res = await fetch('http://localhost:5000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          usuario,
          clave,
          esAdmin: false
        })
      });

      const data = await res.json();
      if (data.success) {
        setMensaje('✅ Usuario creado correctamente. Redirigiendo...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // espera 2 segundos antes de redirigir
      } else {
        setMensaje(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Error al registrar:', err);
      setMensaje('❌ Error de conexión con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro">
      <h2>Crear cuenta</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <button onClick={handleRegistro} disabled={cargando}>
        {cargando ? 'Registrando...' : 'Registrarse'}
      </button>
      {mensaje && <p style={{ marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
}