import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registro.css";

const Registro = () => {
  return (
    <div className="registro-container">
      <div className="registro-form">
        <div className="logo-container">
          <img src="LogoGym.jpeg" alt="Logo Gym" className="gym-logo" />
        </div>
        <br />
        <h2 className="text-center fw-bold">FORMULARIO DE REGISTRO</h2>
        <br />
        <form>
          <div className="row">
            <div className="col-md-6">
              <label>Nombre Completo</label>
              <input type="text" className="form-control" placeholder="Carlos Ramírez López" />
            </div>
            <div className="col-md-6">
              <label>Edad</label>
              <input type="text" className="form-control" placeholder="20" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Número de contacto</label>
              <input type="text" className="form-control" placeholder="3225489612"  />
            </div>
            <div className="col-md-6">
              <label>Peso</label>
              <input type="text" className="form-control" placeholder="54 kg"  />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Correo electrónico</label>
              <input type="email" className="form-control" placeholder="carlos.ramirez@example.com"  />
            </div>
            <div className="col-md-6">
              <label>Altura</label>
              <input type="text" className="form-control" placeholder="165 cm"  />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Número de identidad</label>
              <input type="text" className="form-control" placeholder="100035641"  />
            </div>
            <div className="col-md-6">
              <label>Contraseña</label>
              <input type="password" className="form-control" placeholder="Ingrese la contraseña" />
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
