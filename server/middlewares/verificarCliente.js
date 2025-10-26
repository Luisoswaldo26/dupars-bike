function verificarCliente(req, res, next) {
  if (!req.usuario || req.usuario.esAdmin) {
    return res.status(403).json({ success: false, message: 'Acceso restringido: solo clientes' });
  }
  next();
}

module.exports = verificarCliente;