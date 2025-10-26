const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  nombre: { type: String, required: true },
  esAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Usuario', usuarioSchema);