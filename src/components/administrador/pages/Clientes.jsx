import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Clientes.css";
import { obtenerClientes, obtenerClientePorDNI } from "../../../api/ClienteApi";

const EstadoBadge = ({ estado }) => {
  const estadoCapitalizado = estado.charAt(0).toUpperCase() + estado.slice(1);
  const clase = estado === "activo" ? "estado-activo" : "estado-inactivo";

  return (
    <span className={`estado-badge ${clase}`}>
      {estadoCapitalizado}
    </span>
  );
};


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [allClientes, setAllClientes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  

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
    let filtrados = allClientes;
  
    if (search) {
      filtrados = filtrados.filter(cliente =>
        cliente.DNI.includes(search)
      );
    }
  
    if (estadoFiltro !== "Todos") {
      filtrados = filtrados.filter(cliente => cliente.estado.toLowerCase() === estadoFiltro);
    }
  
    if (filtrados.length === 0) {
      alert("Cliente no encontrado");
    }
  
    setClientes(filtrados);
  };
  
  const handleEstadoChange = (estado) => {
    setEstadoFiltro(estado);
  
    let filtrados = allClientes;
  
    if (search) {
      filtrados = filtrados.filter(cliente =>
        cliente.DNI.includes(search)
      );
    }
  
    if (estado !== "Todos") {
      filtrados = filtrados.filter(cliente => cliente.estado.toLowerCase() === estado);
    }
  
    setClientes(filtrados);
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

  const ordenarPorNombre = () => {
    const clientesOrdenados = [...clientes].sort((a, b) => {
      const nombreA = a.nombre.toLowerCase();
      const nombreB = b.nombre.toLowerCase();
  
      if (nombreA < nombreB) return ordenAscendente ? -1 : 1;
      if (nombreA > nombreB) return ordenAscendente ? 1 : -1;
      return 0;
    });
  
    setClientes(clientesOrdenados);
    setOrdenAscendente(!ordenAscendente); // Alternar el orden para el próximo clic
  };
  
  return (
    <div className="clientes-container">
      <div className="search-bar d-flex align-items-center gap-2">
  <input
    type="text"
    placeholder="Cédula"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button onClick={handleSearch}>Buscar</button>

  <select
    className="form-select w-auto"
    value={estadoFiltro}
    onChange={(e) => handleEstadoChange(e.target.value)}
  >
    <option value="Todos">Todos</option>
    <option value="activo">Activo</option>
    <option value="inactivo">Inactivo</option>
  </select>
</div>


      <div className="clientes-list">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
              <th style={{ cursor: "pointer" }} onClick={ordenarPorNombre}>
  Nombre {ordenAscendente ? "▲" : "▼"}
</th>

                <th>Tipo Membresia</th>
                <th>Estado</th>
                <th>Días Restantes</th>
                <th>Información</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.tipo_membresia}</td>
                  <td><EstadoBadge estado={cliente.estado} /></td>
                  <td>{cliente.dias_restantes}</td>
                  <td>
                  <button className="ver-btn" onClick={() => handleViewInfo(cliente.DNI)}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
