const API_URL = "http://localhost:3000/membresias"; 

export async function obtenerMembresias() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Error al obtener las membresías");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la API de membresías:", error);
    throw error;
  }
}


export async function crearMembresia(membresia) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membresia),
    });

    if (!response.ok) {
      throw new Error("Error al crear la membresía");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear la membresía:", error);
    throw error;
  }
}