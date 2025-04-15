import React, { useEffect, useState } from "react";
import "./Membresias.css";
import { Pencil, Trash2 } from "lucide-react";
import { obtenerMembresias, crearMembresia } from "../../../api/MembresiaApi";
import { useModal } from "../../../context/ModalContext.jsx";

const Membresias = () => {
  const { showModal } = useModal();
  const [membresias, setMembresias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaMembresia, setNuevaMembresia] = useState({
    tipo: "",
    duracion: "",
    precio: "",
  });

  useEffect(() => {
    const cargarMembresias = async () => {
      try {
        const data = await obtenerMembresias();
        setMembresias(data);
      } catch (error) {
        console.error("Error al cargar las membresías:", error);
      }
    };

    cargarMembresias();
  }, []);

  const membresiasFiltradas = membresias.filter(
    (m) =>
      m.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.precio.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.duracion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNuevaMembresia({ tipo: "", duracion: "", precio: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaMembresia((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarMembresia = async () => {
    try {
      if (
        !nuevaMembresia.tipo ||
        !nuevaMembresia.duracion ||
        !nuevaMembresia.precio
      ) {
        showModal("Error al crear ", "Todos los campos son obligatorios.");
        return;
      }
      const nueva = await crearMembresia(nuevaMembresia);
      setMembresias([...membresias, nueva]);
      handleCloseModal();
      showModal("Guardado Correctamente ", "Su membresía se agregó con éxito");
    } catch (error) {
      showModal("Error al guardar la nueva membresía:", error.message);
    }
  };

  return (
    <div className="container-grande">
      <div className="membresias-container">
        <h2 className="titulo">MEMBRESIAS</h2>

        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar membresías"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn-buscar">Buscar</button>
        </div>

        <button className="btn-nueva" onClick={handleOpenModal}>
          Nueva +
        </button>

        <div className="lista">
          {membresiasFiltradas.map((m, index) => (
            <div key={index} className="membresia-item">
              <span className="nombre">{m.tipo}</span>
              <span className="duracion">{m.duracion}</span>
              <span className="precio">${m.precio}</span>

              <div className="acciones">
                <Pencil className="icono" />
                <Trash2 className="icono" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para crear nueva membresía */}
      {modalVisible && (
        <div className="modal1">
          <div className="modal1-content">
            <h3>Nueva membresía</h3>
            <input
              type="text"
              name="tipo"
              value={nuevaMembresia.tipo}
              onChange={handleInputChange}
              placeholder="Tipo"
              required
            />
            <input
              type="text"
              name="duracion"
              value={nuevaMembresia.duracion}
              onChange={handleInputChange}
              placeholder="Duración"
              required
            />
            <input
              type="number"
              name="precio"
              value={nuevaMembresia.precio}
              onChange={handleInputChange}
              placeholder="Precio"
              required
            />
            <button className="btn-guardar" onClick={handleGuardarMembresia}>
              Guardar
            </button>
            <button className="btn-cancelar" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membresias;
