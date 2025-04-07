import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const RutaProtegida = ({ rolRequerido }) => {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="cargando">Cargando...</div>;
  }

  if (!role) return <Navigate to="/" replace />;
  if (role !== rolRequerido) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RutaProtegida;
