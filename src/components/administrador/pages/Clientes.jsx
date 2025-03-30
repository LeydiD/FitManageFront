import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Clientes.css";
import { obtenerClientes, obtenerClientePorDNI } from "../../../api/ClienteApi";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [allClientes, setAllClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data);
        setAllClientes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleSearch = () => {
    if (!search) {
      setClientes(allClientes);
      return;
    }

    const filteredClientes = allClientes.filter(cliente =>
      cliente.DNI.includes(search)
    );

    if (filteredClientes.length === 0) {
      alert("Cliente no encontrado");
    }

    setClientes(filteredClientes);
  };

  const handleViewInfo = async (dni) => {
    try {
      const data = await obtenerClientePorDNI(dni);
      setSelectedCliente(data);
      setShowModal(true);
    } catch (error) {
      alert("No se pudo obtener la información del cliente.");
    }
  };

  return (
    <div className="clientes-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar clientes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="clientes-list">
        {clientes.map((cliente, index) => (
          <div key={index} className="cliente-card">
            <span className="cliente-nombre">{cliente.nombre}</span>
            <span className="cliente-fecha">17/02/2025</span>
            <span className="cliente-fecha">17/03/2025</span>
            <button className="btn btn-info" onClick={() => handleViewInfo(cliente.DNI)}>
              Ver info
            </button>
          </div>
        ))}
      </div>

      {/* MODAL DE INFORMACIÓN */}
      {showModal && selectedCliente && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Información del Cliente</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Nombre:</strong> {selectedCliente.nombre}</p>
                <p><strong>DNI:</strong> {selectedCliente.DNI}</p>
                <p><strong>Teléfono:</strong> {selectedCliente.telefono}</p>
                <p><strong>Email:</strong> {selectedCliente.email}</p>
                <p><strong>Edad:</strong> {selectedCliente.edad}</p>
                <p><strong>Peso:</strong> {selectedCliente.peso} kg</p>
                <p><strong>Altura:</strong> {selectedCliente.altura} m</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fondo oscuro cuando el modal está activo */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Clientes;
