const API_URL =   `${import.meta.env.VITE_BACKEND_URL}/asistencia`;

export const registrarAsistencia = async () => {
  try {
    // Obtener DNI del localStorage
    const dni = localStorage.getItem('DNI');
    
    if (!dni) {
      throw new Error('No se encontró el DNI en el almacenamiento local');
    }

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_cliente: dni 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar asistencia');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en registrarAsistencia:', error);
    throw error;
  }
};