function verificarAdmin(req, res, next) {
  if (!req.usuario || !req.usuario.esAdmin) {
    return res.status(403).json({ success: false, message: 'Acceso restringido: solo administradores' });
  }
  next();
}

module.exports = verificarAdmin;