import React, { useState } from "react";
import "./Notificaciones.css";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const opciones = [
  { value: "todos", label: "Todos" },
  { value: "asistencias", label: "Asistencias" },
  { value: "eventos", label: "Eventos" },
  { value: "vencimiento", label: "Vencim. Membresía" },
];

// Ejemplo de datos de notificaciones
const notificacionesEjemplo = [
  {
    id: 1,
    titulo: "¡Bienvenido!",
    mensaje: "Gracias por unirte.",
    etiqueta: "eventos",
    leido: true,
  },
  {
    id: 2,
    titulo: "Asistencia registrada",
    mensaje: "Tu asistencia fue registrada hoy.",
    etiqueta: "asistencias",
    leido: false,
  },
  {
    id: 3,
    titulo: "Membresía por vencer",
    mensaje: "Tu membresía vence en 3 días.",
    etiqueta: "vencimiento",
    leido: false,
  },
];

const Notificaciones = () => {
  const [filtro, setFiltro] = useState("todos");

  const notificacionesFiltradas =
    filtro === "todos"
      ? notificacionesEjemplo
      : notificacionesEjemplo.filter((n) => n.etiqueta === filtro);

  return (
    <div className="notificaciones-bg">
      <div className="notificaciones-container">
        <div className="notificaciones-header">
          <h2>Notificaciones</h2>
          <select
            className="notificaciones-filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            {opciones.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
        <table className="notificaciones-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Mensaje</th>
              <th>Etiqueta</th>
              <th>Leído</th>
            </tr>
          </thead>
          <tbody>
            {notificacionesFiltradas.map((n) => (
              <tr key={n.id}>
                <td>{n.titulo}</td>
                <td>{n.mensaje}</td>
                <td>
                  <span className={`etiqueta etiqueta-${n.etiqueta}`}>
                    {opciones.find((o) => o.value === n.etiqueta)?.label ||
                      n.etiqueta}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  {n.leido ? (
                    <FaCheckCircle color="#2ecc40" title="Leído" />
                  ) : (
                    <FaRegCircle color="#d60000" title="No leído" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notificaciones;
