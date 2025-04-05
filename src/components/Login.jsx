import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../public/logo.png";
import { login } from "../api/LoginApi";
import {
  FaUser,
  FaUserCog,
  FaUserAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const [DNI, setDNI] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [role, setRole] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Para redirigir

  // Función para validar que solo sean números en el DNI
  const handleDNIChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDNI(value);
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case "Administrador":
        return <FaUserCog className="user-icon" />;
      case "Cliente":
        return <FaUserAlt className="user-icon" />;
      default:
        return <FaUser className="user-icon" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Enviando datos:", { DNI, contraseña, role });

    if (!DNI || !contraseña || !role) {
      setMensaje("Todos los campos son obligatorios, incluido el rol.");
      return;
    }

    try {
      const data = await login({ DNI, contraseña, role });
      console.log("✅ Respuesta del backend:", data);
      console.log("Rol recibido del backend:", data.role);
      localStorage.setItem("role", data.role);
      // Redirigir según el rol
      if (data.role.toLowerCase() === "administrador") {
        navigate("/admin");
      } else if (data.role.toLowerCase() === "cliente") {
        navigate("/cliente");
      }
    } catch (error) {
      console.error("❌ Error en login:", error.message);
      setMensaje(error.message);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Menú de usuario */}
        <div className="login-header">
          <div className="simple-dropdown">
            <button
              type="button"
              className="dropdown-toggle"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {getRoleIcon()}
              <span>{role || "Seleccionar Rol"}</span>
            </button>
            {menuAbierto && (
              <div className="simple-dropdown-menu">
                <button
                  className="dropdown-option"
                  onClick={() => {
                    setRole("Administrador");
                    setMenuAbierto(false);
                  }}
                >
                  <FaUserCog /> Administrador
                </button>
                <button
                  className="dropdown-option"
                  onClick={() => {
                    setRole("Cliente");
                    setMenuAbierto(false);
                  }}
                >
                  <FaUserAlt /> Cliente
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Gym Klinsmann" />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su documento"
              value={DNI}
              onChange={handleDNIChange}
              required
            />
          </div>
          <div className="mb-3 password-container">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-danger w-100">
              Iniciar Sesión
            </button>
          </div>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Login;
