import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { FaUser } from "react-icons/fa";

const ClienteLayout = () => (
  <>
    <Header />
    <div className="cliente-container">
      {}
      <Outlet />
    </div>
  </>
);

export default ClienteLayout;
