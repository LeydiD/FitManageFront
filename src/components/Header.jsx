import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo del Gym" className="header-logo" />
    </header>
  );
};

export default Header;
