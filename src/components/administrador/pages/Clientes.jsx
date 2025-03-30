import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [allClientes, setAllClientes] = useState([]); // Almacena todos los clientes
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        if (!response.ok) throw new Error("Error al obtener los clientes");
        const data = await response.json();
        setClientes(data);
        setAllClientes(data); // Guarda la lista completa
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
      cliente.DNI.includes(search) // Busca por el DNI en la lista cargada
    );

    if (filteredClientes.length === 0) {
      alert("Cliente no encontrado");
    }

    setClientes(filteredClientes);
  };

  const handleViewInfo = async (dni) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${dni}`);
      if (!response.ok) throw new Error("Error al obtener la información del cliente");
      const data = await response.json();

      alert(`
        Nombre: ${data.nombre}
        DNI: ${data.DNI}
        Teléfono: ${data.telefono}
        Email: ${data.email}
        Edad: ${data.edad}
        Peso: ${data.peso} kg
        Altura: ${data.altura} m
      `);
    } catch (error) {
      console.error("Error:", error);
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
    </div>
  );
};

export default Clientes;
