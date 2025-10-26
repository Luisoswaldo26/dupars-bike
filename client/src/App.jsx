import { Routes, Route, Navigate } from 'react-router-dom';
import ReservaForm from './components/ReservaForm';
import PanelReservas from './components/PanelReservas';
import Navbar from './components/Navbar';
import './App.css';
import Inicio from './components/Inicio';
import Tienda from './components/tienda';
import Contacto from './components/Contacto';
import Login from './components/Login';
import Registro from './components/Registro';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false); // ahora dinámico

  return (
    <>
      <ToastContainer />
      <Navbar usuarioLogeado={usuarioLogeado} esAdmin={esAdmin} />

      <div className='main-content' style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/panel-reservas"
            element={
              usuarioLogeado && esAdmin ? <PanelReservas /> : <Navigate to="/login" />
            }
          />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/formulario"
            element={
              usuarioLogeado ? <ReservaForm /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
             <Login
                setUsuarioLogeado={setUsuarioLogeado}
                setEsAdmin={setEsAdmin}
              />
              }
           />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;