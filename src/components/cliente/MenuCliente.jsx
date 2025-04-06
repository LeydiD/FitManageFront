import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button.jsx";
import "./MenuCliente.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const MenuCliente = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="cliente-menu">
      <div className="cliente-profile">
        <h2 className="nombre">{user.nombre}</h2>
      </div>
      <nav className="menu">
        <Link to="/cliente">
          <Button text="Inicio" />
        </Link>
        <Link to="/cliente/actualizar">
          <Button text="Actualizar información" />
        </Link>
        <Link to="/cliente/asistencias">
          <Button text="Asistencias" />
        </Link>
        <Link to="/cliente/rutinas">
          <Button text="Rutinas" />
        </Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default MenuCliente;
