import { Link, useNavigate } from 'react-router-dom';
import logoDupars from '../assets/logoDupars.png';
import { useEffect, useState, useRef } from 'react';
import './Navbar.css';

export default function Navbar({ usuarioLogeado, setUsuarioLogeado }) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const nombre = localStorage.getItem('nombreUsuario');
    if (typeof nombre === 'string') {
        setNombreUsuario(nombre);
    }  else {{
        setNombreUsuario('');
    }
    }
  }, []);

  const handleReservarClick = () => {
    navigate(usuarioLogeado ? '/formulario' : '/login');
    setMenuAbierto(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsuarioLogeado(false);
    setNombreUsuario('');
    navigate('/login');
    setMostrarDropdown(false);
    setMenuAbierto(false);
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const toggleDropdown = () => {
    setMostrarDropdown(!mostrarDropdown);
  };

  return (
    <nav className="navbar">
      <Link to="/" onClick={() => setMenuAbierto(false)}>
        <img src={logoDupars} alt="Dupar’s Bike" className="navbar-logo" />
      </Link>
      <div className="hamburguesa" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar-links ${menuAbierto ? 'activo' : ''}`}>
        <li className="btn"><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
        <li className="btn"><Link to="/tienda" onClick={() => setMenuAbierto(false)}>Tienda</Link></li>
        <li className="btn"><Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link></li>
        <li className="btn2">
          <button className='btn' onClick={handleReservarClick}>Reservar</button>
        </li>
        {!usuarioLogeado && (
          <>
            <li className="btn"><Link to="/registro" onClick={() => setMenuAbierto(false)}>Registrarse</Link></li>
            <li className="btn"><Link to="/login" onClick={() => setMenuAbierto(false)}>Iniciar sesión</Link></li>
          </>
        )}
        {usuarioLogeado && (
          <li className="navbar-user-dropdown" ref={dropdownRef}>
            {mostrarDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/perfil" onClick={() => setMenuAbierto(false)}>Mi perfil</Link></li>
                <li><Link to="/mis-reservas" onClick={() => setMenuAbierto(false)}>Mis reservas</Link></li>
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}