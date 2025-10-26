// routes/reservas.js
const express = require('express');
const Reserva = require('../models/Reserva');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    await nuevaReserva.save();
    res.status(201).json({ mensaje: 'Reserva guardada con éxito' });
  } catch (error) {
    console.error('❌ Error al guardar reserva:', error);
    res.status(500).json({ error: 'Error al guardar reserva' });
  }
});

router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find().sort({ fecha: 1 });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

module.exports = router;