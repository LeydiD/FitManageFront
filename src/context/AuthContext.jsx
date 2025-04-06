import { createContext, useEffect, useState } from "react";
import { obtenerClientePorDNI } from "../api/ClienteApi.js";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  useEffect(() => {
    const fetchFullUserData = async () => {
      if (user && user.DNI && !user.altura) {
        try {
          const datosCompletos = await obtenerClientePorDNI(user.DNI);
          setUser(datosCompletos);
        } catch (error) {
          console.error(
            "Error al obtener los datos completos del usuario:",
            error
          );
        }
      }
    };

    fetchFullUserData();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
