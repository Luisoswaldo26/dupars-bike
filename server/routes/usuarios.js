const express = require('express');
const Usuario = require('../models/Usuario');
const verificarToken = require('../middlewares/auth');
const verificarAdmin = require('../middlewares/verificarAdmin');

const router = express.Router();

// ✅ Obtener todos los usuarios
router.get('/', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-clave'); // excluye la clave
    res.json({ success: true, usuarios });
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// ✅ Registrar nuevo usuario 
const bcrypt = require('bcrypt');

router.post('/registro', async (req, res) => {
  const { nombre, usuario, clave, esAdmin } = req.body;

  if (!usuario || !clave || !nombre) {
    return res.status(400).json({ success: false, message: 'Faltan datos obligatorios' });
  }

  try {
    const existente = await Usuario.findOne({ usuario });
    if (existente) {
      return res.status(409).json({ success: false, message: 'El usuario ya existe' });
    }

    const hash = await bcrypt.hash(clave, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      usuario,
      clave: hash,
      esAdmin: esAdmin || false
    });

    await nuevoUsuario.save();

    res.json({ success: true, message: 'Usuario creado correctamente' });
  } catch (err) {
    console.error('❌ Error al registrar usuario:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// ✅ Editar usuario por ID (solo admin)
router.put('/:id', verificarToken, verificarAdmin, async (req, res) => {
  const { nombre, esAdmin } = req.body;

  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, esAdmin },
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.json({ success: true, usuario: actualizado });
  } catch (err) {
    console.error('❌ Error al actualizar usuario:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Eliminar usuario por ID (solo admin)
router.delete('/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar usuario:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

module.exports = router;