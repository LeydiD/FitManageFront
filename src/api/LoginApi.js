const API_URL = "http://localhost:3000/auth/login";

export const login = async ({ DNI, contraseña, role }) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ DNI, contraseña, role }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error en el inicio de sesión");
    }
    return data;
  } catch (error) {
    console.error("Error en login:", error.message);
    throw error;
  }
};
