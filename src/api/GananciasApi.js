import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Obtener ganancias anuales
export const obtenerGananciasAnuales = async () => {
    try {
        const response = await axios.get(`${API_URL}/ganancias/anuales`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Obtener ganancias mensuales por año
export const obtenerGananciasMensuales = async (anio) => {
    try {
        const response = await axios.get(`${API_URL}/ganancias/mensuales/${anio}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener ganancias mensuales:", error);
        throw error;
    }
};

// Obtener ganancias por rango de fechas
export const obtenerGananciasPorRango = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(`${API_URL}/ganancias/rango`, {
            params: {
                fechaInicio,
                fechaFin
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener ganancias por rango de fechas:", error);
        throw error;
    }
};

export const obtenerDetalleGananciasPorRango = async (inicio, fin) => {
    try {
        const response = await axios.get(`${API_URL}/ganancias/detalle-rango`, {
            params: {
                fechaInicio: inicio,
                fechaFin: fin,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
