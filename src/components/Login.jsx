import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../public/logo.png";
import { login } from "../api/LoginApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [DNI, setDNI] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setRole } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleDNIChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDNI(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!DNI || !contraseña) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const data = await login({ DNI, contraseña });

      setUser(data.usuario);
      setRole(data.role);
      localStorage.setItem("role", data.role);
      localStorage.setItem("DNI", data.usuario.DNI);

      if (data.role.toLowerCase() === "administrador") {
        navigate("/admin");
      } else if (data.role.toLowerCase() === "cliente") {
        navigate("/cliente");
      }
    } catch (error) {
      setMensaje(error.message);
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src={logo} alt="Gym Klinsmann" />
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
