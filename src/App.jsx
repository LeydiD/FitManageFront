import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import MenuAdmin from "./components/administrador/MenuAdmin";
import Inicio from "./components/administrador/pages/Inicio";
import Registro from "./components/administrador/pages/Registro";
// import Clientes from "./pages/Clientes";
// import Membresias from "./pages/Membresias";
// import RegistrarPago from "./pages/RegistrarPago";
// import Ganancias from "./pages/Ganancias";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Header />
      <div className="admin-container">
        <MenuAdmin profileImage="https://cdn-icons-png.flaticon.com/512/12225/12225881.png" />
        <div className="content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/registro" element={<Registro />} />
            {/* <Route path="/clientes" element={<Clientes />} />
            <Route path="/membresias" element={<Membresias />} />
            <Route path="/registrar-pago" element={<RegistrarPago />} />
            <Route path="/ganancias" element={<Ganancias />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
