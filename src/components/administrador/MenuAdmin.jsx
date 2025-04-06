import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./MenuAdmin.css";
import { AuthContext } from "../../context/AuthContext.jsx";

const MenuAdmin = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-menu">
      <div className="admin-profile">
        <h2 className="nombre">Administrador</h2>
      </div>
      <nav className="menu">
        <Link to="/admin">
          <Button text="Inicio" />
        </Link>
        <Link to="/admin/registro">
          <Button text="Registro" />
        </Link>
        <Link to="/admin/clientes">
          <Button text="Clientes" />
        </Link>
        <Link to="/admin/membresias">
          <Button text="Membresías" />
        </Link>
        <Link to="/admin/registrar-pago">
          <Button text="Registrar Pago" />
        </Link>
        <Link to="/admin/ganancias">
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
