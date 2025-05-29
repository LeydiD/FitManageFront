import React, { useState, useContext } from "react";
import "./rutinas.css";
import { generarRutina } from "../../../api/RutinaApi.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

const Rutinas = () => {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hola, ¿qué músculos deseas trabajar hoy y cuánto tiempo tienes disponible?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const respuesta = await generarRutina({
        message: input,
        altura: user.altura,
        peso: user.peso,
        objetivo: user.objetivo,
        nombre: user.nombre,
      });
      setMessages([...newMessages, { from: "bot", text: respuesta.response }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          from: "bot",
          text: "Lo siento, ocurrió un error al generar la rutina.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const limpiarMarkdown = (texto) => {
    return texto
      .replace(/[*_`>#-]+/g, "")        // elimina *, _, `, #, >, - usados en markdown
      .replace(/\n{2,}/g, "\n")         // reduce múltiples saltos de línea
      .replace(/\n/g, "\n\n");          // agrega espacio entre líneas
  };

 const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("Rutina Personalizada", 105, 20, null, null, "center");

  doc.setFontSize(11);
  doc.text(`Nombre: ${user.nombre}`, 15, 30);
  doc.text(`Objetivo: ${user.objetivo}`, 15, 36);
  doc.text(`Altura: ${user.altura} cm  |  Peso: ${user.peso} kg`, 15, 42);
  doc.line(15, 45, 195, 45);

  let y = 52;

  messages.forEach((msg, i) => {
    if (msg.from === "bot" && i > 0) {
      const textoLimpio = limpiarMarkdown(msg.text);
      const lineas = doc.splitTextToSize(textoLimpio, 180);

      lineas.forEach((linea) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(linea, 15, y);
        y += 6; // incremento pequeño y constante
      });
      y += 4; // espacio extra entre mensajes
    }
  });

  doc.save("conversacion.pdf");
};


  const hayRutinaGenerada = messages.some(
    (msg, index) => msg.from === "bot" && index > 0
  );

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu objetivo o pregunta..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>Enviar</button>
        {hayRutinaGenerada && (
          <button onClick={handleDownloadPDF}>PDF</button>
        )}
      </div>
    </div>
  );
};

export default Rutinas;
