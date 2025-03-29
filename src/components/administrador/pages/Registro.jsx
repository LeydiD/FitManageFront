import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registro.css";
import { registrarCliente } from "../../../api/ClienteApi";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    peso: "",
    email: "",
    altura: "",
    DNI: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registrarCliente(formData);
      console.log("Cliente registrado con éxito:", response);
      alert("Registro exitoso");
      setFormData({
        DNI: "",
        nombre: "",
        telefono: "",
        email: "",
        edad: "",
        peso: "",
        altura: "",
        contraseña: ""
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-form">
        <div className="logo-container">
          <img src="LogoGym.jpeg" alt="Logo Gym" className="gym-logo" />
        </div>
        <br />
        <h2 className="text-center fw-bold">FORMULARIO DE REGISTRO</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label>Nombre Completo</label>
              <input type="text" name="nombre" className="form-control" placeholder="Carlos Ramírez López" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Edad</label>
              <input type="text" name="edad" className="form-control" placeholder="20" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Número de contacto</label>
              <input type="text" name="telefono" className="form-control" placeholder="3225489612" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Peso</label>
              <input type="text" name="peso" className="form-control" placeholder="54 kg" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Correo electrónico</label>
              <input type="email" name="email" className="form-control" placeholder="carlos.ramirez@example.com" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Altura</label>
              <input type="text" name="altura" className="form-control" placeholder="1,65 m" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Número de identidad</label>
              <input type="text" name="DNI" className="form-control" placeholder="100035641" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label>Contraseña</label>
              <input type="password" name="contraseña" className="form-control" placeholder="Ingrese la contraseña" onChange={handleChange} />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-danger btn-lg">REGISTRAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
