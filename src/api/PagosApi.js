const API_URL =   `${import.meta.env.VITE_BACKEND_URL}/pagos`;

export const registrarPago = async ({ id_cliente, id_membresia}) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_cliente: id_cliente,         
          id_membresia: id_membresia
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error en la solicitud al registrar el pago.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al registrar el pago:", error);
      throw error;
    }
  };
  