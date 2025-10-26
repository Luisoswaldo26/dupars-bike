import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: '', esAdmin: false });
  const [busqueda, setBusqueda] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsuarios(res.data.usuarios))
    .catch(err => {
      console.error('❌ Error al cargar usuarios:', err);
      toast.error('Error al cargar usuarios', {
        className: 'toast-dupars',
        icon: '⚠️'
      });
    });
  }, []);

  const handleEdit = (usuario) => {
    setEditando(usuario._id);
    setForm({ nombre: usuario.nombre, esAdmin: usuario.esAdmin });
  };

  const handleSave = () => {
    axios.put(`/api/usuarios/${editando}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setUsuarios(prev =>
        prev.map(u => u._id === editando ? { ...u, ...form } : u)
      );
      setEditando(null);
      toast.success('✅ Cambios guardados correctamente', {
        className: 'toast-dupars'
      });
    })
    .catch(err => {
      console.error('❌ Error al guardar cambios:', err);
      toast.error('Error al guardar cambios', {
        className: 'toast-dupars',
        icon: '⚠️'
      });
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;

    axios.delete(`/api/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setUsuarios(prev => prev.filter(u => u._id !== id));
      toast.success('🗑️ Usuario eliminado correctamente', {
        className: 'toast-dupars'
      });
    })
    .catch(err => {
      console.error('❌ Error al eliminar usuario:', err);
      toast.error('Error al eliminar usuario', {
        className: 'toast-dupars',
        icon: '⚠️'
      });
    });
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h2>👥 Usuarios registrados</h2>
      <input
        type="text"
        placeholder="🔍 Buscar por nombre..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '300px' }}
      />
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map(u => (
            <tr key={u._id}>
              <td>{u.usuario}</td>
              <td>
                {editando === u._id ? (
                  <input
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                  />
                ) : (
                  u.nombre
                )}
              </td>
              <td>
                {editando === u._id ? (
                  <select
                    value={form.esAdmin}
                    onChange={e => setForm({ ...form, esAdmin: e.target.value === 'true' })}
                  >
                    <option value="false">Cliente</option>
                    <option value="true">Admin</option>
                  </select>
                ) : (
                  u.esAdmin ? 'Admin' : 'Cliente'
                )}
              </td>
              <td>
                {editando === u._id ? (
                  <button onClick={handleSave}>💾 Guardar</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(u)}>✏️ Editar</button>
                    <button onClick={() => handleDelete(u._id)}>🗑️ Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosAdmin;