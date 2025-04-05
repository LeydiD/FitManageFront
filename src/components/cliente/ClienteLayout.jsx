// src/components/cliente/ClienteLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header"; // O puedes tener un header específico para clientes
import { FaUser } from "react-icons/fa";

const ClienteLayout = () => (
  <>
    <Header />
    <div className="cliente-container">
      {/* Aquí se renderizan las rutas hijas (por ejemplo, InicioCliente) */}
      <Outlet />
    </div>
  </>
);

export default ClienteLayout;
