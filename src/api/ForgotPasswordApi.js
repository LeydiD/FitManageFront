import axios from "axios";

const API_URL = "http://localhost:3000/auth/forgot-password";

export const solicitarRecuperacion = async (dni, email) => {
  const res = await axios.post(API_URL, { dni, email });
  return res.data;
};
