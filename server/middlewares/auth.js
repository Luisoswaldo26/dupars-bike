const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();
const SECRET = 'dupars-bike-secret'; // o usa process.env.JWT_SECRET

router.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });

    if (!usuarioEncontrado) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const coincide = await bcrypt.compare(clave, usuarioEncontrado.clave);
    if (!coincide) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuarioEncontrado._id,
        esAdmin: usuarioEncontrado.esAdmin
      },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      success: true,
      nombre: usuarioEncontrado.nombre,
      esAdmin: usuarioEncontrado.esAdmin,
      token
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

module.exports = router;

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // formato: "Bearer TOKEN"

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
}

module.exports = verificarToken;