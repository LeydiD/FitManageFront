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
import InicioCliente from "./components/cliente/Inicio";
import ActualizarInformacion from "./components/cliente/pages/ActualizarInfo";
import ErrorBoundary from "./components/ErrorBoundary";
import CrearContraseña from "./components/CrearContraseña";
import RutaProtegida from "./components/RutaProtegida";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/crear-contrasena/:token"
            element={<CrearContraseña />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Rutas para Administración */}
          <Route element={<RutaProtegida rolRequerido="Administrador" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<InicioAdmin />} />
              <Route path="registro" element={<Registro />} />
              <Route path="clientes" element={<Clientes />} />
            </Route>
          </Route>

          {/* Rutas para Clientes */}
          <Route element={<RutaProtegida rolRequerido="Cliente" />}>
            <Route path="/cliente" element={<ClienteLayout />}>
              <Route index element={<InicioCliente />} />
              <Route path="actualizar" element={<ActualizarInformacion />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
