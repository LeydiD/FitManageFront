
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/clientes`;

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


export const actualizarCliente = async (dni, datos) => {
  try {

    const camposObligatorios = ["nombre", "telefono", "email", "edad", "peso", "altura"];
    for (const campo of camposObligatorios) {
      if (!datos[campo] || datos[campo].toString().trim() === "") {
        throw new Error(`Todos los campos son obligatorios`);
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      throw new Error("El correo electrónico no es válido");
    }

    if (!/^\d{7,15}$/.test(datos.telefono)) {
      throw new Error("El número de teléfono debe tener entre 7 y 15 dígitos");
    }

    const response = await fetch(`${API_URL}/${dni}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el cliente");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarCliente:", error);
    throw error;
  }
};

export const obtenerClienteConDias = async (dni) => {
  try {
    const response = await fetch(`${API_URL}/diasRestantes/${dni}`);
    if (!response.ok) throw new Error("Cliente no encontrado");
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerClientePorDNI:", error);
    throw error;
  }
};

export const obtenerFinSuscripcion = async (dni) => {
  try {
    const response = await fetch(`${API_URL}/fecha-fin/${dni}`);
    if (!response.ok) throw new Error("Cliente no encontrado");
    return response.json();
  } catch (error) {
    throw error;
  }
};