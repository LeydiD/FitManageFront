// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import AdminLayout from "./components/administrador/AdminLayout";
import InicioAdmin from "./components/administrador/pages/Inicio";
import Registro from "./components/administrador/pages/Registro";
import Clientes from "./components/administrador/pages/Clientes";
import ClienteLayout from "./components/cliente/ClienteLayout";
import InicioCliente from "./components/cliente/inicio";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas para Administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<InicioAdmin />} />
          <Route path="registro" element={<Registro />} />
          <Route path="clientes" element={<Clientes />} />
        </Route>

        {/* Rutas para Clientes */}
        <Route path="/cliente" element={<ClienteLayout />}>
          <Route index element={<InicioCliente />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
