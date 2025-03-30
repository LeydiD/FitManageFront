const API_URL = "http://localhost:3000/clientes"; // Ajusta la URL según tu backend

export const registrarCliente = async (datos) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al registrar el cliente");
        }

        return data;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};

export const obtenerClientes = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener clientes");
        return await response.json();
    } catch (error) {
        console.error("Error en obtenerClientes:", error);
        throw error;
    }
};

export const obtenerClientePorDNI = async (dni) => {
    try {
        const response = await fetch(`${API_URL}/${dni}`);
        if (!response.ok) throw new Error("Cliente no encontrado");
        return await response.json();
    } catch (error) {
        console.error("Error en obtenerClientePorDNI:", error);
        throw error;
    }
};
