import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./MenuAdmin.css";

const MenuAdmin =  ({ profileImage }) => {
  return (
    <div className="admin-menu">
      <div className="admin-profile">
        <img src={profileImage} alt="Perfil" className="profile-picture" />
       
        <h2 className="nombre">Administrador</h2>
      </div>
      <nav className="menu">
        <Link to="/"><Button text="Inicio" /></Link>
        <Link to="/registro"><Button text="Registro" /></Link>
        <Link to="/clientes"><Button text="Clientes" /></Link>
        <Link to="/membresias"><Button text="Membresías" /></Link>
        <Link to="/registrar-pago"><Button text="Registrar Pago" /></Link>
        <Link to="/ganancias"><Button text="Ganancias" /></Link>
      </nav>
      <button className="logout-button">Cerrar Sesión</button>
    </div>
  );
};

export default MenuAdmin;
