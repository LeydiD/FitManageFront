// src/components/Inicio.jsx

import React, { useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Inicio.css';
import logo from "../../../../public/Logo.png";
import { obtenerClientePorDNI } from '../../../api/ClienteApi';
import { registrarAsistencia } from '../../../api/AsistenciasApi';

function Inicio() {
  const [dni, setDni] = useState('');
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleBuscar = async () => {
    setError('');
    setMensaje('');
    try {
      const data = await obtenerClientePorDNI(dni);
      setCliente({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
      });
      localStorage.setItem('DNI', dni);
    } catch (err) {
      setError('Cliente no encontrado');
      setCliente({ nombre: '', email: '', telefono: '' });
      localStorage.removeItem('DNI');
    }
  };

  const handleAsistencia = async () => {
    setError('');
    setMensaje('');
    try {
      const response = await registrarAsistencia();
      setMensaje('Asistencia registrada con éxito');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="inicio-container d-flex justify-content-center align-items-center vh-100">
      <div className="form-box p-4 rounded-4 bg-white">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <label className="form-label mb-0 me-2 w-50">Identificación</label>
            <input
              type="text"
              className="form-control me-2 w-100"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            <button type="button" className="btn btn-danger ms-2" onClick={handleBuscar}>
              Buscar
            </button>
          </div>

          {error && <div className="text-danger mb-2">{error}</div>}

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={cliente.nombre}
              disabled
              style={{ backgroundColor: '#d9d9d9' }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={cliente.email}
              disabled
              style={{ backgroundColor: '#d9d9d9' }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Número de contacto</label>
            <input
              type="text"
              className="form-control"
              value={cliente.telefono}
              disabled
              style={{ backgroundColor: '#d9d9d9' }}
            />
          </div>

          <div className="text-center mb-3">
            <strong className="fs-5">Días restantes</strong>
            <div className="fs-3">15</div>
          </div>

          <div className="text-center">
            <button type="button" className="btn btn-danger px-4" onClick={handleAsistencia}>
              Asistencia
            </button>
          </div>
        </form>
      </div>

      <div className="logo-box ms-5">
        <img src={logo} alt="Logo" className="img-fluid" />
      </div>
    </div>
  );
}

export default Inicio;