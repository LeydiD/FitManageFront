export const enviarNuevaContraseña = async (token, contraseña) => {
    try {
        const response = await fetch(`http://localhost:3000/clientes/crear-contrasena/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ contraseña }),
        });

        const data = await response.json();
        console.log("Respuesta cruda del backend:", data);
        if (!response.ok) {
            throw new Error(data.message || "Error al crear la contraseña");
        }

        return data;
    } catch (error) {
        console.error("Error en enviar Nueva Contraseña:", error);
        alert(error)
    }
};