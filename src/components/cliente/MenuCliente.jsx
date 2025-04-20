import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button.jsx";
import "./MenuCliente.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const MenuCliente = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`cliente-menu ${isOpen ? "open" : "closed"}`}>
      <div className="cliente-profile">
        <h2 className="nombre">{user.nombre}</h2>
      </div>
      <nav className="menu">
        <Link to="/cliente" onClick={handleLinkClick}>
          <Button text="Inicio" />
        </Link>
        <Link to="/cliente/actualizar" onClick={handleLinkClick}>
          <Button text="Actualizar información" />
        </Link>
        <Link to="/cliente/asistencias" onClick={handleLinkClick}>
          <Button text="Asistencias" />
        </Link>
        <Link to="/cliente/rutinas" onClick={handleLinkClick}>
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
