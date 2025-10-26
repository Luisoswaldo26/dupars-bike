const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/registro', async (req, res) => {
  const { usuario, clave, nombre, esAdmin } = req.body;

  try {
    const existe = await Usuario.findOne({ usuario });
    if (existe) {
      return res.status(400).json({ success: false, message: 'Usuario ya existe' });
    }

    const claveEncriptada = await bcrypt.hash(clave, 10); // 10 es el "salt rounds"
    const nuevoUsuario = new Usuario({ usuario, clave: claveEncriptada, nombre, esAdmin });
    await nuevoUsuario.save();

    res.json({ success: true, message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('❌ Error al registrar:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

module.exports = router;