const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reservasRoutes = require('./routes/reservas');
const registroRoutes = require('./routes/Registro');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificarToken = require('./middlewares/auth');
const verificarAdmin = require('./middlewares/verificarAdmin');
const usuariosRoutes = require('./routes/usuarios');
const Usuario = require('./models/Usuario'); // modelo real
const authRoutes = require('./middlewares/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/dupars-bike')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar:', err));

// Rutas
app.get('/api/reservas', verificarToken, async (req, res) => {
  // solo usuarios autenticados pueden acceder
});
app.get('/api/usuarios', verificarToken, verificarAdmin, async (req, res) => {
  // Solo administradores pueden acceder
});
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api', registroRoutes);
app.use('/api/login', authRoutes);       // Ruta de login


// Ruta de login con verificacion bcrypt y generacion de token JWT
app.post('/api/login', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const encontrado = await Usuario.findOne({ usuario });
    if (!encontrado) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
    
    const coincide = await bcrypt.compare(clave, encontrado.clave);
    if (!coincide) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: encontrado._id,
        esAdmin: encontrado.esAdmin,
        nombre: encontrado.nombre
      },
      'dupars-bike-secret',
      { expiresIn: '2h' }
    );

    
    res.json({
        success: true,
        esAdmin: encontrado.esAdmin,
        nombre: encontrado.nombre
      });
    } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

module.exports = app;