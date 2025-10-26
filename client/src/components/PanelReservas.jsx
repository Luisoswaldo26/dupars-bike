import React, { useEffect, useState } from 'react';

export default function PanelReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reservas')
      .then(res => res.json())
      .then(data => setReservas(data))
      .catch(err => console.error('Error al cargar reservas:', err));
  }, []);

  return (
    <div className="panel">
      <h2>📋 Reservas registradas</h2>
      <p>✅ Panel cargado correctamente</p>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Contacto</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r, i) => (
            <tr key={i}>
              <td>{r.nombre}</td>
              <td>{r.rut}</td>
              <td>{r.contacto}</td>
              <td>{r.servicio}</td>
              <td>{r.fecha}</td>
              <td>{r.comentarios || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
