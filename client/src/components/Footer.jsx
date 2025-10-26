import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <div className="footer-logo">
          <h2>Dupar’s Bike</h2>
        </div>

        <div className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/tienda">Tienda</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/formulario">Reservar</a></li>
          </ul>
        </div>

        <div className="footer-contacto">
          <h4>Contacto</h4>
          <p>Seminario 3, Providencia, Santiago</p>
          <p>+56 9 5148 6006</p>
          <p>Duparsbike@gmail.com</p>
        </div>

        <div className="footer-redes">
          <h4>Síguenos</h4>
          <div className="redes-iconos">
            <a href="https://www.instagram.com/duparsbike/" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      <div className="footer-copy">
        <p>© {new Date().getFullYear()} Dupar’s Bike. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;