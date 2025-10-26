exports.crearReserva = (req, res) => {
  const datos = req.body;
  console.log('Reserva recibida:', datos);
  res.status(200).json({ mensaje: 'Reserva guardada correctamente' });
};