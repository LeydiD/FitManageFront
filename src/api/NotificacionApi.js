const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL_NOTIFICACIONES = `${API_URL}/notificaciones`;

import axios from "axios";

export const crearNotificacion = async (titulo, mensaje) => {
  try {
    const response = await axios.post(`${API_URL_NOTIFICACIONES}`, {
      titulo,
      mensaje,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error desconocido" };
  }
};