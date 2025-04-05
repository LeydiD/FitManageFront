import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import MenuAdmin from "./MenuAdmin";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-container">
        <MenuAdmin />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default AdminLayout;
