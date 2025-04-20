import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../api/LoginApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginAnimation from "./LoginAnimation";

const Login = () => {
  const [DNI, setDNI] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showAnimation, setShowAnimation] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleDNIChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDNI(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ DNI, contraseña });
      setUser(data.usuario);
      setRole(data.role);
      localStorage.setItem("role", data.role);
      localStorage.setItem("DNI", data.usuario.DNI);
      localStorage.setItem("user", JSON.stringify(data.usuario));

      if (
        data.role.toLowerCase() === "administrador" ||
        data.role.toLowerCase() === "cliente"
      ) {
        setUserRole(data.role);
        setShowAnimation(true);
      }
    } catch (error) {
      setMensaje(error.message);
      setTimeout(() => setMensaje(""), 3000);
    }
  };
  if (showAnimation) {
    return <LoginAnimation role={userRole} />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src="Logo.png" alt="Gym Klinsmann" />
        </div>

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

          <div className="text-end mb-3">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => navigate("/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
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
