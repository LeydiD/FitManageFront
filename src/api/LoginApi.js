const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL_LOGIN = `${API_URL}/auth/login`;
//const API_URL = "https://fitmanageback-production.up.railway.app/auth/login";

console.log("URL del backend:", import.meta.env.VITE_BACKEND_URL);

export const login = async ({ DNI, contraseña }) => {
  try {
    const response = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ DNI, contraseña }),
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
