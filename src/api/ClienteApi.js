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
