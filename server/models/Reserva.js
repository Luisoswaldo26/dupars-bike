const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombre: String,
  rut: String,
  contacto: String,
  servicio: String,
  fecha: String,
  comentarios: String
});

module.exports = mongoose.model('Reserva', reservaSchema);