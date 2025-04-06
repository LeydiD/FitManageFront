import { Navigate, Outlet } from "react-router-dom";

const RutaProtegida = ({ rolRequerido }) => {
  const rol = localStorage.getItem("role");

  if (!rol) {
    return <Navigate to="/" replace />;
  }

  if (rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RutaProtegida;
