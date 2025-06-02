import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import "./MenuAdmin.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const MenuAdmin = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
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
    <div className={`admin-menu ${isOpen ? "open" : "closed"}`}>
      <div className="admin-profile">
        <img src="/public/avatar1.png" alt="Avatar" className="admin-avatar" />
        <span className="admin-name">Administrador</span>
      </div>
      <nav className="menu">
        <Link to="/admin" onClick={handleLinkClick}>
          <Button text="Inicio" />
        </Link>
        <Link to="/admin/registro" onClick={handleLinkClick}>
          <Button text="Registro" />
        </Link>
        <Link to="/admin/clientes" onClick={handleLinkClick}>
          <Button text="Clientes" />
        </Link>
        <Link to="/admin/membresias" onClick={handleLinkClick}>
          <Button text="Membresías" />
        </Link>
        <Link to="/admin/registrar-pago" onClick={handleLinkClick}>
          <Button text="Registrar Pago" />
        </Link>
        <Link to="/admin/ganancias" onClick={handleLinkClick}>
          <Button text="Ganancias" />
        </Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default MenuAdmin;
