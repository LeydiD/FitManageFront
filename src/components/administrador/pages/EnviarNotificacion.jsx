import React, { useState } from "react";
import "./EnviarNotificacion.css";

const EnviarNotificacion = () => {
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Notificación enviada");
  };

  return (
    <div className="enviar-noti-bg">
      <div className="enviar-noti-container">
        <h2>Enviar Notificaciones</h2>
        <form className="enviar-noti-form" onSubmit={handleSubmit}>
          <div className="enviar-noti-main">
            <div className="enviar-noti-campos">
              <label htmlFor="asunto">Asunto</label>
              <input
                id="asunto"
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Asunto de la notificación"
                required
              />
            </div>
          </div>
          <div className="enviar-noti-mensaje">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe el mensaje aquí..."
              required
              rows={5}
            />
          </div>
          <button type="submit" className="enviar-noti-btn">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnviarNotificacion;
