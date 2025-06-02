import React, { useState } from "react";
import "./EnviarNotificacion.css";
import { crearNotificacion } from "../../../api/NotificacionApi";

const EnviarNotificacion = () => {
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      await crearNotificacion(asunto, mensaje);
      setFeedback(" Notificación enviada exitosamente");
      setAsunto("");
      setMensaje("");
    } catch (error) {
      setFeedback(`Error: ${error.message || "No se pudo enviar la notificación"}`);
    } finally {
      setLoading(false);
    }
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
          <button type="submit" className="enviar-noti-btn" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {feedback && <p>{feedback}</p>}
        </form>
      </div>
    </div>
  );
};

export default EnviarNotificacion;
