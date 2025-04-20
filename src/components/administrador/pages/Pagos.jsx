import React, { useState, useEffect } from "react";
import "./Pagos.css";
import logoGym from "../../../assets/LogoGym.jpeg";
import { obtenerMembresias } from "../../../api/MembresiaApi.js";
import { registrarPago } from "../../../api/PagosApi.js";
import { obtenerClientePorDNI } from "../../../api/ClienteApi";

const Pagos = () => {
  const [formData, setFormData] = useState({
    DNI: "",
    membresia: "",
    precio: "",
  });

  const [membresias, setMembresias] = useState([]);

  useEffect(() => {
    const cargarMembresias = async () => {
      try {
        const data = await obtenerMembresias();
        setMembresias(data);
      } catch (error) {
        console.error("Error al cargar membresías:", error);
      }
    };

    cargarMembresias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "membresia") {
      const seleccionada = membresias.find(
        (m) => m.id_membresia.toString() === value
      );
      setFormData({
        ...formData,
        membresia: value,
        precio: seleccionada ? seleccionada.precio : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.DNI || !formData.membresia) {
      alert("Debe ingresar la cédula y seleccionar una membresía.");
      return;
    }

    try {
      const cliente = await obtenerClientePorDNI(formData.DNI);
      const id_cliente = cliente.DNI;
      const id_membresia = formData.membresia;

      const resultado = await registrarPago({ id_cliente, id_membresia });
      console.log("Pago registrado exitosamente:", resultado);
      alert("Pago registrado exitosamente");

      // Opcional: resetear formulario (pero mantener el DNI si quieres)
      setFormData({ DNI: formData.DNI, membresia: "", precio: "" });
    } catch (error) {
      alert("Error al registrar el pago. Verifica los datos.");
    }
  };

  return (
    <div className="pago-container">
      <div className="pago-form">
        <div className="logo-container">
          <img src={logoGym} alt="Logo Gym" className="gym-logo" />
        </div>
        <h2 className="titulo-pago">REGISTRAR PAGO</h2>
        <form onSubmit={handleSubmit}>
          <label>Número de identidad</label>
          <input
            type="text"
            name="DNI"
            value={formData.DNI}
            onChange={handleChange}
            className="input-field"
          />

          <label>Tipo de membresía</label>
          <select
            name="membresia"
            value={formData.membresia}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Seleccione una opción</option>
            {membresias.map((m) => (
              <option key={m.id_membresia} value={m.id_membresia}>
                {m.tipo}
              </option>
            ))}
          </select>

          <label>Precio de la membresía</label>
          <input
            type="text"
            name="precio"
            value={
              formData.precio
                ? `$ ${Number(formData.precio).toLocaleString()}`
                : ""
            }
            className="input-field"
            disabled
          />

          <button type="submit" className="btn-registrar">
            REGISTRAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagos;
