import React, { useState }  from "react";
import './ReservaForm.css';
import logoDupars from '../assets/logoDupars.png';
import { Link } from 'react-router-dom';


export default function ReservaForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        rut: '',
        contacto: '',
        servicio: '',
        fecha: '',
        comentarios: ''
    });

    const  [errors, setErrors] = useState({});
    const  [reservaEnviada, setReservaEnviada]  = useState(false);
    const  [mostrarResumen, setMostrarResumen]  = useState(false);
    const [cerrandoModal, setCerrandoModal] = useState(false);

    const validarRut = (rut) => {
        rut = rut.replace(/\./g, '').replace('-', '');
        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1).toUpperCase();
        let suma = 0;
        let multiplo = 2;
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        const dvEsperado = 11 - (suma % 11);
        const dvEsperadoStr = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        return dv === dvEsperadoStr;
    };
    const validarFormulario = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
        if (!formData.rut.trim() || !validarRut(formData.rut)) newErrors.rut = 'RUT invalido';
        if (!formData.contacto.trim()) newErrors.contacto = 'Ingresa un email o whatsapp';
        if (!formData.servicio) newErrors.servicio = 'El servicio es obligatorio';
        if (!formData.fecha) newErrors.fecha = 'Seleciona una fecha';
            else {
        const fechaSeleccionada = new Date(formData.fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // elimina la hora para comparar solo fechas

    if (fechaSeleccionada < hoy) {
      newErrors.fecha = 'FECHA NO DISPONIBLE';
    
    }

    const diaSemana = fechaSeleccionada.getDay(); // 0 = domingo, 6 = sábado
    if (diaSemana === 0 || diaSemana === 5) {
      newErrors.fecha = 'No se puede reservar en fin de semana';
    }
  }
        return newErrors;
    }
    const handleChange = e => {
      const { name, value } = e.target;
      console.log(`actualizando ${name}: ${value}`);
        setFormData({ ... formData, [e.target.name]: e.target.value });

    };
    const handleSubmit = async e => {
        e.preventDefault();
        const newErrors = validarFormulario();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log('Datos del formulario:', formData);
        setMostrarResumen(true);
    };
    const confirmarEnvio = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log('Reserva enviada:', result);
      setErrors({});
      setReservaEnviada(true);
      setMostrarResumen(false);

      setTimeout(() => {
        setFormData({
          nombre: '',
          rut: '',
          contacto: '',
          servicio: '',
          fecha: '',
          comentarios: ''
        });
        setReservaEnviada(false);
      }, 5000);
    } catch (error) {
      console.error('Error al enviar reserva:', error);    
  }
};

const cerrarResumen = () => setMostrarResumen(false);

return (
  <>
    {/*  Modal flotante para resumen */}
    {mostrarResumen && (
      <div className="modal-overlay">
        <div className={`modal ${cerrandoModal ? 'modal-out' : ''}`}>
          <img src={logoDupars} alt="Logo Dupar’s Bike" className="logo" />
          <h2>📋 Revisa tu reserva</h2>
          <ul>
            <li><strong>Nombre:</strong> {formData.nombre}</li>
            <li><strong>RUT:</strong> {formData.rut}</li>
            <li><strong>Contacto:</strong> {formData.contacto}</li>
            <li><strong>Servicio:</strong> {formData.servicio}</li>
            <li><strong>Fecha:</strong> {formData.fecha}</li>
            <li><strong>Comentarios:</strong> {formData.comentarios || '—'}</li>
          </ul>
          <div className="modal-buttons">
            <button onClick={confirmarEnvio}>Confirmar reserva</button>
            <button onClick={() => {
              setCerrandoModal(true);
              setTimeout(() => {
                setMostrarResumen(false);
                setCerrandoModal(false);
              }, 300);
            }}>
              Editar
            </button>
          </div>
        </div>
      </div>
    )}

    {/* 🟢 Pantalla de confirmación final */}
    {reservaEnviada ? (
      <div className="confirmacion">
        <img src={logoDupars} alt="Logo Dupar’s Bike" className="logo" />
        <h2>✅ ¡Reserva enviada con éxito!</h2>
        <p>Gracias por confiar en Dupar’s Bike. Te contactaremos pronto para confirmar tu cita.</p>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="formulario">
        <div className='Reservah2'>
                <h1>Reserva tu servicio aquí</h1>
              </div>
        <label>Nombre completo</label>
        <input name="nombre" onChange={handleChange} value={formData.nombre} />
        {errors.nombre && <span className="error">{errors.nombre}</span>}

        <label>RUT</label>
        <input name="rut" onChange={handleChange} value={formData.rut} />
        {errors.rut && <span className="error">{errors.rut}</span>}

        <label>Telefono</label>
        <input name="contacto" onChange={handleChange} value={formData.contacto} />
        {errors.contacto && <span className="error">{errors.contacto}</span>}

        <label>Servicio</label>
        <select name="servicio" onChange={handleChange} value={formData.servicio}>
          <option value="">Selecciona un servicio</option>
          <option value="mantencion">Mantención general</option>
          <option value="frenos">Ajuste de frenos</option>
          <option value="accesorios">Instalación de accesorios</option>
        </select>
        {errors.servicio && <span className="error">{errors.servicio}</span>}

        <label>Fecha</label>
        <input type="date" name="fecha" onChange={handleChange} value={formData.fecha} />
        {errors.fecha && <span className="error">{errors.fecha}</span>}

        <label>Comentarios</label>
        <textarea name="comentarios" onChange={handleChange} value={formData.comentarios} />

        <button type="submit">Reservar ahora</button>
      </form>
    )}
  </>
);
}